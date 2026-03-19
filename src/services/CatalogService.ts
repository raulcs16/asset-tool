import { BookDetailsDTO } from "../models/Catalog.js";
import CatalogRepo from "../repos/CatalogRepo.js";

export default class CatalogService {
  private catalogRepo: CatalogRepo;
  constructor(catalogRepo: CatalogRepo) {
    this.catalogRepo = catalogRepo;
  }
  public async retrieveBooks(
    page: number,
    size: number
  ): Promise<BookDetailsDTO[]> {
    const offset = (page - 1) * size;
    return await this.catalogRepo.find(size, offset);
  }
  public async getBookById(id: string): Promise<BookDetailsDTO> {
    const book: BookDetailsDTO = {
      id: 0,
      authors: [],
      title: "",
      category: "",
    };
    return book;
  }
  public async getBooksByAuthor(authorName: string) {}
  public async getBooksByCategory(categoryId: number) {}
}
