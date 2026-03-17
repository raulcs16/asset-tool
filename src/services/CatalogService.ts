import CatalogRepo from "../repos/CatalogRepo.js";

export default class CatalogService {
  private catalogRepo: CatalogRepo;
  constructor(catalogRepo: CatalogRepo) {
    this.catalogRepo = catalogRepo;
  }
  public retrieveBooks(startPage: number, pageSize: number) {}
}
