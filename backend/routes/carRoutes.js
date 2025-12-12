import express from "express";
import { getCars, addCar, editCar, deleteCar } from "../controllers/carController.js";

const router = express.Router();

router.get("/", getCars);
router.post("/", addCar);
router.put("/:id", editCar);
router.delete("/:id", deleteCar);

export default router;
