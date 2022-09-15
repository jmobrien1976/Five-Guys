const router = require("express").Router();
const Menu_items = require("../../models/Menu");

// route to get all menu items
router.get("/", async (req, res) => {
  try {
    const menuData = await Menu_items.findAll();
    // res.json(menuData);
    const menuItems = menuData.map((items) => items.get({ plain: true }));

    res.render("menu-details", { menuItems });
    //TODO: test to make sure it runs with real data
  } catch (err) {
    res.redirect("login");
  }
});

module.exports = router;
