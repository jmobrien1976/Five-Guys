const router = require("express").Router();
const Menu_items = require("../../models/menu");

// route to get all menu items
router.get("/", async (req, res) => {
  try {
    const menuData = await Menu_items.findAll();
    //res.json(menuData);
    const menuItems = menuData.map((items) => items.get({ plain: true }));
    //res.json(menuItems);
    res.render("homepage", {
      menuItems,
      loggedIn: req.session.loggedIn,
    });
    //TODO: test to make sure it runs with real data
  } catch (err) {
    res.redirect("login");
  }
});

module.exports = router;
