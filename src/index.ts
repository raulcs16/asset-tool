import express from "express";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

const pool = new pg.Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
});

try {
  const client = await pool.connect();
  client.release();
  app.listen(port, () => {
    console.log(`🚀 Asset Server running at http://localhost:${port}`);
  });
} catch (error) {
  console.log(error);
}
