const express = require("express");
const propertyController   = require('./propertyController');
const {verifyToken, requireRole} = require('../../middleware/authMiddleware');

const router = express.Router();

// POST /api/property
router.post("/create", verifyToken, requireRole('owner'), propertyController.createProperty);

// GET /api/property
router.get("/getall", verifyToken, requireRole('admin'), propertyController.getAllProperties);

// GET Property
router.get("/getprop", verifyToken, propertyController.getProperty);

module.exports = router;