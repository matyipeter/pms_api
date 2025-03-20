require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./modules/auth/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Important: Parse JSON request bodies

// Routes
app.use("/api/auth", authRoutes);

module.exports = app;


