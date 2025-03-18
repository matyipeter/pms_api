const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// POST /api/auth/register
router.post("/register", userController.register);

// POST /api/auth/login
router.post("/login", userController.login);

module.exports = router;

