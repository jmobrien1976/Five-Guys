const User = require("./user");
const Menu_items = require("./menu");
const Cart = require("./cart");

Cart.belongsTo(User, {
  foreignKey: "user_id",
});

// User.hasOne(Cart,{

// })

module.exports = { User, Menu_items, Cart };
