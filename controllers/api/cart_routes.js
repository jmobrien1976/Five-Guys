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
    const menuData = await Menu_items.findAll();
    //res.json(menuData);
    const menuItems = menuData.map((items) => items.get({ plain: true }));
    res.redirect("/");
    //res.status(200).json(cart);
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
    if (!cartContents) {
      cartContents = JSON.stringify([req.body]);
    } else {
      var itemAdd = JSON.parse(JSON.parse(cartContents));
      var displayCart = false;
      if(itemAdd.length > 0){
        displayCart = true;
      }
      itemAdd.push(req.body);
      cartContents = JSON.stringify(itemAdd);
      var menuData = await Menu_items.findAll();
      var menuItems = menuData.map((items) => items.get({ plain: true }));
    }
    let updateCart = await Cart.update(
      {
        menu_item_id: JSON.stringify(cartContents),
      },
      { where: { user_id: req.session.currentUser } }
    );
    res.render("homepage", { 
      displayCart,
      itemAdd,
      menuItems,
      loggedIn: req.session.loggedIn 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
