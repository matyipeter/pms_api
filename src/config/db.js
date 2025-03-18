const { Pool } = require("pg");
require("dotenv").config();

// Create a new pool instance
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS || null, // Handle empty passwords
    port: process.env.DB_PORT || 5432,
});

const connectDB = async () => {
    try {
        const client = await pool.connect();
        console.log("✅ Connected to PostgreSQL");
        client.release(); // Release the client back to the pool
    } catch (error) {
        console.error("❌ Database connection failed:", error);
    }
};

module.exports = { pool, connectDB };

