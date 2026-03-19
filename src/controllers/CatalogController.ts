import { Request, Response } from "express";
import CatalogService from "../services/CatalogService.js";

export default class CatalogController {
  private catalogService: CatalogService;
  constructor(catalogService: CatalogService) {
    this.catalogService = catalogService;
  }
  public getBooks = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const books = await this.catalogService.retrieveBooks(page, limit);
      res.status(200).json({
        data: books,
        page,
        limit,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
  public getBookById = async (req: Request, res: Response) => {};
}
