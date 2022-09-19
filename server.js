const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
require('dotenv').config();
const { Menu_items, Cart } = require("./models");

const app = express();
const PORT = process.env.PORT || 3002;
const stripe = require("stripe")(process.env.STRIPE_SECRETKEY);
console.log(process.env.STRIPE_SECRETKEY);
const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');
const { parse } = require('path');




const sess = {
  secret: 'Super secret secret',
  cookie: {
    // Stored in milliseconds
    maxAge: 24 * 60 * 60 * 1000, // expires after 1 day
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exphbs.create({ helpers,layoutsDir:__dirname + "/views/layouts"});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join('public')));

app.use(routes);


const calcOrderAmount = (items) => {
  console.log(items);
  var subTotal = 0;


  const cartContents = items[0].menu_item_id;
  const itemTemp = JSON.parse(JSON.parse(cartContents));

console.log(itemTemp);



for (const item of itemTemp) {
    
  subTotal += Number.parseFloat(item.price);
  console.log (subTotal);
}
    
  return subTotal * 100;

};


app.post("/create-payment-intent", async (req, res) => {
  console.log(req.body);
  const { items } = req.body;
  
  let cart = await Cart.findAll({
    where: { user_id: req.session.currentUser },
  });  
  
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calcOrderAmount(cart),
    currency: "usd",
    payment_method_types: ['card'],
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(
      `\nServer running on port ${PORT}. Visit http://localhost:${PORT} and create an account!`
    )
  );
});

