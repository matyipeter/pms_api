const crypto = require('crypto');
const { pool } = require("../../config/db");
const { hashPassword, comparePassword } = require("../../core/utils/bcrypt");
const { generateToken } = require("../../core/utils/jwt");


exports.registerUser = async ({ name, email, password, role, phone }) => {
  const hashedPassword = await hashPassword(password);
  const result = await pool.query(
    'INSERT INTO users (name, email, password, role, phone) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, role',
    [name, email, hashedPassword, role, phone]
  );
  return result.rows[0];
};

exports.loginUser = async ({ email, password }) => {
  const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  if (!user.rows.length) throw new Error('Invalid credentials');

  const isValid = await comparePassword(password, user.rows[0].password);
  if (!isValid) throw new Error('Invalid credentials');

  const token = generateToken({ id: user.rows[0].id, role: user.rows[0].role });

  return { token, user: { id: user.rows[0].id, name: user.rows[0].name, email: user.rows[0].email } };
};

exports.generateResetToken = async (email) => {
  const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  if (!user.rowCount) throw new Error('User not found');

  const resetToken = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 3600000); // 1 hour expiration

  await pool.query(
    'UPDATE users SET reset_token = $1, reset_token_expires_at = $2 WHERE email = $3',
    [resetToken, expiresAt, email]
  );

  return resetToken; // Send via email
};

exports.resetPassword = async (token, newPassword) => {
  const user = await pool.query(
    'SELECT * FROM users WHERE reset_token = $1 AND reset_token_expires_at > NOW()',
    [token]
  );
  if (!user.rowCount) throw new Error('Invalid or expired token');

  const hashedPassword = await hashPassword(newPassword);
  await pool.query(
    'UPDATE users SET password = $1, reset_token = NULL, reset_token_expires_at = NULL WHERE id = $2',
    [hashedPassword, user.rows[0].id]
  );

  return { message: 'Password reset successful' };
};




