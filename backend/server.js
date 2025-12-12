import express from "express";
import cors from "cors";
import carRoutes from "./routes/carRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// ⚡ Enable CORS for Netlify frontend
app.use(cors({
  origin: "*" // optional: replace "*" with your Netlify URL for security
}));

app.use(express.json());

// Mount API routes
app.use("/api/cars", carRoutes);
app.use("/api/auth", authRoutes);

// Optional: default route
app.get("/", (req, res) => {
  res.send("CarNova Backend is running!");
});

app.listen(process.env.PORT || 5000, () =>
  console.log("Server running on port 5000")
);
