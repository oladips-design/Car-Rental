const express = require("express");
const router = express.Router();
const { signUp, login } = require("../controller/auth");

router.post("/sign-up", signUp);
router.post("/login", login);

module.exports = router;
