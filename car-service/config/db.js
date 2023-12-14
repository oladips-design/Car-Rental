const { Sequelize } = require("sequelize");
require("dotenv").config();

module.exports = new Sequelize(process.env.DBURI, {
  host: "localhost",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
