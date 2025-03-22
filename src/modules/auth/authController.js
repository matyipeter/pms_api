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

// Generate reset token
exports.generateResetToken = async (req, res) => {
    try {
        const { email } = req.body;
        const resetToken = await authService.generateResetToken(email);
        res.status(200).json({ message: 'Reset token generated successfully', resetToken });

        // sending token in email logic here
        //
        //

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Reset password
exports.resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        const result = await authService.resetPassword(token, newPassword); // returns message
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
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