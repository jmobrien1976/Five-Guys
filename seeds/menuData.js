const { Menu_items } = require("../models");

const menudata = [
  {
    name: "hamburger",
    description: "meat and bacon",
    price: "9.99",
  },
  {
    name: "cheese burger",
    description: "cheese with meat",
    price: "7.99",
  },
  {
    name: "chicken burger",
    description: "fried chicken with pickle and lettuce",
    price: "8.99",
  },
  {
    name: "french fries",
    description: "classic french fries",
    price: "2.99",
  },
  {
    name: "soda ",
    description: "coke and sprite",
    price: "1.99",
  },
];

const seedMenu = () => Menu_items.bulkCreate(menudata);

module.exports = seedMenu;
