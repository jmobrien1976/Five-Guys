const User = require("./user");
const Menu_items = require("./menu");
const Cart = require("./cart");

User.belongsToMany(Menu_items, {
  through: Cart,
});

Menu_items.belongsToMany(User, {
  through: User,
});

module.exports = { User, Menu, Cart };
