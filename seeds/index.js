const test = require('dotenv').config();
const sequelize = require('../config/connection.js');
const menuData = require("./menuSeedData.json");
const seedMenu = require("./menuData");
const { menu } = require('../models');



const seedDatabase = async () => {
  console.log(test);
  await sequelize.sync({ force: true });
  await seedMenu();
  process.exit(0);
};

seedDatabase();