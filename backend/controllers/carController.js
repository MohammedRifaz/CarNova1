import {cars} from "../models/cars.js";

// GET all cars
export const getCars = (req, res) => {
  res.json(cars);
};

// ADD car
export const addCar = (req, res) => {
  const newCar = { id: Date.now(), ...req.body };
  cars.push(newCar);
  res.json(newCar);
};

// EDIT car
export const editCar = (req, res) => {
  const { id } = req.params;
  const index = cars.findIndex((c) => c.id == id);

  if (index === -1) {
    return res.status(404).json({ message: "Car not found" });
  }

  cars[index] = { ...cars[index], ...req.body };
  res.json(cars[index]);
};

// DELETE car
export const deleteCar = (req, res) => {
  const { id } = req.params;
  const index = cars.findIndex((c) => c.id == id);

  if (index === -1) {
    return res.status(404).json({ message: "Car not found" });
  }

  const deletedCar = cars[index];
  cars.splice(index, 1);

  res.json(deletedCar);
};
