import { createContainer } from "./container.js";
import PGPool from "./PGPool.js";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

export const initializeApp = async () => {
  const pool = new PGPool(
    process.env.DB_HOST,
    parseInt(process.env.DB_PORT || "5432"),
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS
  );
  const container = await createContainer(pool);
  const app = express();

  app.use(express.json());
  app.use("/api/catalog", container.catalogRouter.routes());

  return app;
};
