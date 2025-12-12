import express from "express";
import cors from "cors";
import carRoutes from "./routes/carRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// CORS configuration for local + production frontend
const allowedOrigins = [
  "http://localhost:5173", // Vite dev server
  "https://your-netlify-site.netlify.app" // replace with your Netlify URL
];

app.use(cors({
  origin: allowedOrigins,
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));

app.use(express.json());

// Routes
app.use("/api/cars", carRoutes);
app.use("/api/auth", authRoutes);

// Health check
app.get("/", (req, res) => res.send("CarNova Backend is running!"));

// Start server
app.listen(process.env.PORT || 5000, () =>
  console.log("Server running on port", process.env.PORT || 5000)
);
