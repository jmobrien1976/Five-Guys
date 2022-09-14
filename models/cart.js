const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Cart extends Model {}

Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    description: {
      type: DataTypes.INTEGER,
      references: {
        model: "menu",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscore: true,
    modelName: "cart",
  }
);

module.exports = Cart;
