require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Important: Parse JSON request bodies

// Routes
app.use("/api/auth", authRoutes);
app.use("api/user", userRoutes);

module.exports = app;


