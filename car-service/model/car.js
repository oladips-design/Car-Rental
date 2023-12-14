const { Sequelize, DataTypes } = require("sequelize");
const carDB = require("../config/db");

const Car = carDB.define("car", {
  name: {
    type: Sequelize.STRING,
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
  dateOfCollection: {
    type: DataTypes.DATE,
  },
  dateOfReturn: {
    type: DataTypes.DATE,
  },
  rentalPrize: {
    type: DataTypes.INTEGER,
  },
  deposit: {
    type: DataTypes.INTEGER,
  },
});

Car.sync().then(() => {
  console.log("Car table created");
});

module.exports = { Car };
