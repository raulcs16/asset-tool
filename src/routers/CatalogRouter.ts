import { Router } from "express";
import CatalogController from "../controllers/CatalogController.js";

export default class CatalogRouter {
  private router: Router = Router();
  private catalogContrll: CatalogController;

  constructor(catalogController: CatalogController) {
    this.catalogContrll = catalogController;
  }
  public routes(): Router {
    this.router.get("/books", this.catalogContrll.getBooks);
    this.router.get("/books/:id");
    return this.router;
  }
}
