import express from "express";
import cors from "cors";
import carRoutes from "./routes/carRoutes.js";
import authRoutes from "./routes/authRoutes.js"; // make sure path is correct

const app = express();

app.use(cors());          // allow frontend requests
app.use(express.json());   // parse JSON

app.use("/api/cars", carRoutes);
app.use("/api/auth", authRoutes);  // ⚠ this mounts /login

app.listen(5000, () => console.log("Server running on port 5000"));
