import express from "express";
const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin";
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

  if (username === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.json({ success: true });
  }
  res.status(401).json({ success: false, message: "Invalid credentials" });
});

export default router;
