const router = require('express').Router();
//const { } = require('../models');

router.get('/', async (req, res) => {
  try {
    res.render('homepage', {
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
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