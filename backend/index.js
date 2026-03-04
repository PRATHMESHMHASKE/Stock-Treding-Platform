require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Models
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const app = express();

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

/* -------------------- ROUTES -------------------- */

// Health check
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// Get all holdings
app.get("/allHoldings", async (req, res) => {
  try {
    const data = await HoldingsModel.find({});
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch holdings" });
  }
});

// Get all positions
app.get("/allPositions", async (req, res) => {
  try {
    const data = await PositionsModel.find({});
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch positions" });
  }
});

// 👇 This is only so browser GET /addHoldings shows something
app.get("/addHoldings", (req, res) => {
  res.send("Use POST /addHoldings with JSON body to add a holding.");
});

// Add new holding (actual DB save)
app.post("/addHoldings", async (req, res) => {
  try {
    const newHolding = new HoldingsModel(req.body); // must match schema
    await newHolding.save();
    res.status(201).json({ message: "Holding saved!" });
  } catch (err) {
    console.error("Error saving holding:", err);
    res.status(500).json({
      error: "Failed to save holding",
      details: err.message,
    });
  }
});

// Add new position
app.post("/addPositions", async (req, res) => {
  try {
    const newPosition = new PositionsModel(req.body);
    await newPosition.save();
    res.status(201).json({ message: "Position saved!" });
  } catch (err) {
    console.error("Error saving position:", err);
    res.status(500).json({
      error: "Failed to save position",
      details: err.message,
    });
  }
});

// Add new order
app.post("/newOrder", async (req, res) => {
  try {
    const newOrder = new OrdersModel({
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      mode: req.body.mode,
    });

    await newOrder.save();
    res.send("Order saved!");
  } catch (err) {
    res.status(500).json({ error: "Failed to save order" });
  }
});

/* -------------------- START SERVER -------------------- */

async function startServer() {
  try {
    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(uri);
    console.log("✅ DB connected!");

    app.listen(PORT, () => {
      console.log(`🚀 App started on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
}

startServer();
