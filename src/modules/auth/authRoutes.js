const express = require("express");
const authController = require('./authController');
const {verifyToken, requireRole} = require('../../middleware/authMiddleware');

const router = express.Router();

// POST /api/auth/register
router.post("/register", authController.register);

// POST /api/auth/login
router.post("/login", authController.login);

router.post("/generateResetToken", authController.generateResetToken);

router.post("/resetPassword", authController.resetPassword);

router.get("/getall", verifyToken, requireRole('admin'), authController.getUsers);

module.exports = router;

