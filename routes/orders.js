const express = require("express");
const router = express.Router();
const Order = require("../src/models/order"); // Adjust path if your model is elsewhere
const jwt = require("jsonwebtoken");

// Middleware to verify JWT and get user ID
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// GET /api/orders - get all orders for the logged-in user
router.get("/", authenticateToken, async (req, res) => {
  try {
    // Assuming your JWT payload has user { id: ... }
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

module.exports = router;
