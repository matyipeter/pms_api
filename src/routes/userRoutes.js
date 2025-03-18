const express = require("express");
const { getUsers } = require("../controllers/userController");

const router = express.Router();


// GET : Get all users // ONLY FOR DEV
router.get("/getall", getUsers);


module.exports = router;