const { pool } = require('../../config/db');
const authService = require('./authService');


// Create a new user
exports.register = async (req, res) => {
    try {
        const user = await authService.registerUser(req.body); 
        res.status(201).json({ message: 'User registered successfully', user });
    } catch(error){
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { token, user } = await authService.loginUser(req.body);
        console.log(token);
        console.log(user);
        res.status(200).json({message: 'Login successful', token, user})
    } catch(error){
        res.status(401).json({ error: error.message });
    }
};


// Fetch all users
exports.getUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching users' });
  }
};