import { Router, Request, Response } from "express";
import PGPool from "../PGPool.js";

export default class CatalogRouter {
  private pgPool: PGPool;
  private router: Router = Router();
  constructor(pool: PGPool) {
    this.pgPool = pool;
  }
  public routes(): Router {
    this.router.get("/books", (req: Request, res: Response) => {
      res.status(200).json({ books: "empty" });
    });
    return this.router;
  }
}
