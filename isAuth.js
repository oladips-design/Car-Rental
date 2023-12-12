const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async function isAuth(req, res, next) {
  const token = req.headers["authorization"].split(" ")[1];

  jwt.verify(token, process.env.key, (err, user) => {
    if (err) return res.json({ message: err });

    req.user = user;
    next();
  });
};
