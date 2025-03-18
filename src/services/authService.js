const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { pool } = require("../config/db");


exports.registerUser = async ({ name, email, password, role, phone }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    'INSERT INTO users (name, email, password, role, phone) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, role',
    [name, email, hashedPassword, role, phone]
  );
  return result.rows[0];
};

exports.loginUser = async ({ email, password }) => {
  const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  if (!user.rows.length) throw new Error('Invalid credentials');

  const isValid = await bcrypt.compare(password, user.rows[0].password);
  if (!isValid) throw new Error('Invalid credentials');

  const token = jwt.sign({ id: user.rows[0].id, role: user.rows[0].role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  return { token, user: { id: user.rows[0].id, name: user.rows[0].name, email: user.rows[0].email } };
};



