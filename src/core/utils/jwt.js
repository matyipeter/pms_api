const jwt = require('jsonwebtoken');


const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (payload, expiresIn = '1h') =>
  jwt.sign(payload, JWT_SECRET, { expiresIn });

const verifyToken = (token) => jwt.verify(token, JWT_SECRET);

module.exports = { generateToken, verifyToken };
