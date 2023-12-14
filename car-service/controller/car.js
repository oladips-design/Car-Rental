const { Car } = require("../model/car");
const { ErrorResponse, showError } = require("../utils");

const addCar = async (req, res) => {
  try {
    const { name, quantity, rentalPrize } = req.body;

    const quickcheck = !name || !quantity || !rentalPrize;
    if (quickcheck) new ErrorResponse("invalid req", 400);

    let newCar = await Car.create({
      name: name,
      quantity,
      rentalPrize,
    });
    let created = newCar;

    res.status(201).json({
      car: created,
    });
  } catch (error) {
    console.log(`err: ${error}`);
    const message = error.message || "Internal server Error";
    const cs = error.statusCode || 500;
    res.status(cs).json(showError(message, cs));
  }
};

const rentCar = async (req, res) => {
  try {
    const { names, quantity, doc, dor, deposit } = req.body;

    const quickcheck = !names || !quantity || !doc || !dor || !deposit;
    if (quickcheck) new ErrorResponse("invalid req", 400);

    let cars = [];
    for (let index = 0; index < names.length; index++) {
      const car = array[index];

      let carToRent = await Car.findOne({ where: { name: car } });
      if (!carToRent) {
        throw new ErrorResponse("we no get this car", 404);
      }
      cars.push(carToRent);
    }
    res.status(200).json({
      available: cars,
    });
  } catch (error) {
    console.log(`err: ${error}`);
    const message = error.message || "Internal server Error";
    const cs = error.statusCode || 500;
    res.status(cs).json(showError(message, cs));
  }
};

const getAllCars = async (req, res) => {
  try {
    const allCars = await Car.findAll();

    res.status(200).json({
      allCars,
    });
  } catch (error) {
    console.log(`err: ${error}`);
    const message = error.message || "Internal server Error";
    const cs = error.statusCode || 500;
    res.status(cs).json(showError(message, cs));
  }
};

module.exports = { addCar, rentCar, getAllCars };
