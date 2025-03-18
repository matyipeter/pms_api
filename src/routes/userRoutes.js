const express = require("express");
const { createUser, getUsers } = require("../controllers/userController");

const router = express.Router();

// POST : Create User
router.post("/create", createUser);

// GET : Get all users
router.get("/getall", getUsers);

module.exports = router;