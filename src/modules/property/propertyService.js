const { pool } = require("../../config/db");

exports.createProperty = async ({ name, address, city, state, zipcode, property_type, status }, owner_id) => {

  const result = await pool.query(
    'INSERT INTO properties (owner_id ,name, address, city, state, zipcode, property_type, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, owner_id, name, address, city, state, zipcode, property_type, status',
    [owner_id, name, address, city, state, zipcode, property_type, status]
  );
  return result.rows[0];
};

exports.getAllProperties = async () => {
  const result = await pool.query('SELECT * FROM properties');
  return result.rows;
};

exports.getProperty = async (property_id) => {
    const result = await pool.query('SELECT * FROM properties WHERE id = $1', [property_id]);
    return result.rows[0];
}
