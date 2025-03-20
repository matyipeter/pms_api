require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./modules/auth/authRoutes");
const propertyRoutes = require("./modules/property/propertyRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Important: Parse JSON request bodies

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/property", propertyRoutes);

module.exports = app;


