const router = require("express").Router();
const { Menu_items, Cart } = require("../../models");

router.get("/", async (req, res) => {
  try {
    console.log(req.session.currentUser);
    let cart = await Cart.findAll({
      where: { user_id: req.session.currentUser },
    });
    if (cart === []) {
      cart = await Cart.create({
        user_id: req.session.currentUser,
      });
    }
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const addedItem = await Cart.findAll({
      where: { user_id: req.session.currentUser },
    });
    let cartContents = addedItem[0].menu_item_id;
    console.log("this is " + cartContents);

    console.log("NEW " + !cartContents);
    if (!cartContents) {
      console.log("HERE " + cartContents);
      cartContents = JSON.stringify([req.body]);
    } else {
      let itemAdd = JSON.parse(JSON.parse(cartContents));
      itemAdd.push(req.body);
      cartContents = JSON.stringify(itemAdd);
      // most recent commit change
      const menuData = await Menu_items.findAll();
      const menuItems = menuData.map((items) => items.get({ plain: true }));
      res.render("homepage", { 
        itemAdd,
        menuItems,
        loggedIn: req.session.loggedIn 
      });
    }
    let updateCart = await Cart.update(
      {
        menu_item_id: JSON.stringify(cartContents),
      },
      { where: { user_id: req.session.currentUser } }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
