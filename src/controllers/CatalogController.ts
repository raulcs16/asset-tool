import { Request, Response } from "express";
import CatalogService from "../services/CatalogService.js";

export default class CatalogController {
  private catalogService: CatalogService;
  constructor(catalogService: CatalogService) {
    this.catalogService = catalogService;
  }
  public getBooks = async (req: Request, res: Response) => {};
}
