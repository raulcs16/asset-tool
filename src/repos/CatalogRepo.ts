import PGPool from "../PGPool.js";

export default class CatalogRepo {
  private dbPool: PGPool;
  constructor(dbPool: PGPool) {
    this.dbPool = dbPool;
  }
}
