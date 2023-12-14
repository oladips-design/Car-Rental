const express = require("express");
const router = express.Router();
const { addCar, rentCar, getAllCars } = require("../controller/car");

router.post("/add", addCar);
router.post("/rent", rentCar);
router.get("/get", getAllCars);

module.exports = router;
