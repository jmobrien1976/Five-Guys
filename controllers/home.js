const router = require('express').Router();
const {Menu_items,Cart} = require("../models");

//TODO: Show buttons when not logged in, only check login on "add to cart"
router.get("/", async (req, res) => {
  try {
    const menuData = await Menu_items.findAll();
    //res.json(menuData);
    const menuItems = menuData.map((items) => items.get({ plain: true }));
    const addedItem = await Cart.findAll({
      where: { user_id: req.session.currentUser },
    });
    let displayCart = false;
    let cartContents = addedItem[0].menu_item_id;
    if (cartContents) {
      var itemAdd = JSON.parse(JSON.parse(cartContents));
      if(itemAdd.length > 0){
        displayCart = true;
      }
    }
    //res.json(menuItems);
    res.render("homepage", { 
      displayCart,
      itemAdd,
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

router.get('/checkout',async (req,res)=>{
  if (req.session.loggedIn) {
    const addedItem = await Cart.findAll({
      where: { user_id: req.session.currentUser },
    });
    let displayCart = false;
    let cartContents = addedItem[0].menu_item_id;
    if (cartContents) {
      var itemAdd = JSON.parse(JSON.parse(cartContents));
      if(itemAdd.length > 0){
        displayCart = true;
      }
    }
    res.render('checkout',{
      displayCart,
      itemAdd,
      loggedIn: req.session.loggedIn,
    });
    return;
  }
  res.render('login',{layout:'main'});
});
  
router.post("/view-cart", async (req, res) => {
  try {
    console.log(req.body);
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

// router.post("/", async (req, res) => {
//   console.log(req.body);
//   try {
//     const addedItem = await Cart.findAll({
//       where: { user_id: req.session.currentUser },
//     });
//     let cartContents = addedItem[0].menu_item_id;
//     console.log("this is " + cartContents);

//     console.log("NEW " + !cartContents);
//     if (!cartContents) {
//       console.log("HERE " + cartContents);
//       cartContents = JSON.stringify([req.body]);
//     } else {
//       var itemAdd = JSON.parse(JSON.parse(cartContents));
//       itemAdd.push(req.body);
//       cartContents = JSON.stringify(itemAdd);
//       // most recent commit change
//       var menuData = await Menu_items.findAll();
//       var menuItems = menuData.map((items) => items.get({ plain: true }));
//     }
//     let updateCart = await Cart.update(
//       {
//         menu_item_id: JSON.stringify(cartContents),
//       },
//       { where: { user_id: req.session.currentUser } }
//     );
//     console.log(res);
//     res.render("homepage", { 
//       menuItems,
//       loggedIn: req.session.loggedIn 
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

module.exports = router;