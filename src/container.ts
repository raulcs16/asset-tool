import CatalogController from "./controllers/CatalogController.js";
import PGPool from "./database/PGPool.js";
import CatalogRepo from "./repos/CatalogRepo.js";
import CatalogRouter from "./routers/CatalogRouter.js";
import CatalogService from "./services/CatalogService.js";

export const createContainer = async (pool: PGPool) => {
  //repos
  const catalogRepo = new CatalogRepo(pool);

  //services
  const catalogService = new CatalogService(catalogRepo);

  //controllers
  const catalogController = new CatalogController(catalogService);

  //routers
  const catalogRouter = new CatalogRouter(catalogController);

  return {
    catalogRouter,
  };
};
