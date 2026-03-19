import { BookDetailsDTO } from "../models/Catalog.js";
import PGPool from "../PGPool.js";

export default class CatalogRepo {
  private dbPool: PGPool;
  private readonly BASE_SELECT = `
  SELECT
    b.id,
    b.title,
    c.name as category
    COALESCE(json_agg(a.name) FILTER (WHERE a.name IS NOT NULL),'[]') as authors
    FROM book b
    LEFT JOIN category c ON b.category_id = c.id
    LEFT JOIN book_author ba ON b.id = ba.book_id
    LEFT JOIN author a ON ba.author_id = a.id
  `;
  constructor(dbPool: PGPool) {
    this.dbPool = dbPool;
  }
  public async find(limit: number, offset: number): Promise<BookDetailsDTO[]> {
    const sql = `${this.BASE_SELECT} GROUP BY b.id, c.name LIMIT $1 OFFSET $2`;
    const { rows } = await this.dbPool.query(sql, [limit, offset]);
    return rows;
  }
  public async findById(id: string) {
    const { rows } = await this.dbPool.query(
      `SELECT * FROM users WHERE id = $1`,
      [id]
    );
  }
  public async findByAuthor() {}
}
