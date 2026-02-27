import express, { Request, Response } from "express";
import dotenv from "dotenv";
import PGPool from "./PGPool.js";
import CatalogRouter from "./routers/CatalogRouter.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const pool = new PGPool(
  process.env.DB_HOST,
  parseInt(process.env.DB_PORT || "5432"),
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS
);
const catalogRouter = new CatalogRouter(pool);

app.use("/api/catalog", catalogRouter.routes());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Library System API Online",
    db_connected: true,
  });
});

app.listen(port, () => {
  console.log(`🚀 Asset Server running at http://localhost:${port}`);
});

try {
  const connected = await pool.hasConnection();
  if (!connected) {
    throw new Error("❌ Database connection failed! Ensure Vagrant is up.");
  }
  console.log("✅ Database connected successfully.");
} catch (error) {
  console.error("💥 Failed to start server:");
  console.error(error);
  process.exit(0);
}
