const { Sequelize } = require("sequelize");
const db = require("../config/db");

const User = db.define("user", {
  name: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  picture: {
    type: Sequelize.STRING,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
  },
});

User.sync().then(() => {
  console.log("table created");
});

module.exports = { User };
