import { createContainer } from "./container.js";
import PGPool from "./database/PGPool.js";
import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

export const initializeApp = async () => {
  const adminPool = PGPool.fromEnv();
  const container = await createContainer(adminPool);
  const app = express();

  app.use(express.json());
  app.use("/catalog", container.catalogRouter.routes());
  app.use("/", (req: Request, res: Response) => res.json({ status: 200 }));

  return app;
};
