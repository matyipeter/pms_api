const express = require("express");
const { getUsers } = require("../controllers/userController");
const { requireRole, verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();


// GET : Get all users // ONLY FOR DEV
router.get("/getall", verifyToken, requireRole('admin'), getUsers);


module.exports = router;