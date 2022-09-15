const router = require('express').Router();
const Menu_items = require("../models/Menu");

//TODO: Show buttons when not logged in, only check login on "add to cart"
router.get("/", async (req, res) => {
  try {
    const menuData = await Menu_items.findAll();
    //res.json(menuData);
    const menuItems = menuData.map((items) => items.get({ plain: true }));
    //res.json(menuItems);
    res.render("homepage", { 
      menuItems,
      loggedIn: req.session.loggedIn 
    });
  } catch (err) {
    res.render('login',{layout:'main'});
  }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login',{layout:'main'});
});

router.get('/checkout',(req,res)=>{
  if (req.session.loggedIn) {
    res.render('checkout',{
      loggedIn: req.session.loggedIn,
    });
    return;
  }
  res.render('login',{layout:'main'});
});
  
module.exports = router;