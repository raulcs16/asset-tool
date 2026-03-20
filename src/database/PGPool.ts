import pg, { Pool, QueryResult, PoolConfig } from "pg";

export default class PGPool {
  private pool: Pool;

  public constructor(config: PoolConfig) {
    this.pool = new pg.Pool({
      ...config,
      connectionTimeoutMillis: 2500,
    });
  }
  static fromEnv(overrides: Partial<PoolConfig> = {}) {
    return new PGPool({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || "5432"),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      ...overrides,
    });
  }
  public async query(
    sql: string,
    params: any[] = []
  ): Promise<QueryResult<any>> {
    return this.pool.query(sql, params);
  }
  public async hasConnection(): Promise<boolean> {
    try {
      const client = await this.pool.connect();
      client.release();
      return true;
    } catch (err) {
      return false;
    }
  }
  public async close(): Promise<void> {
    return this.pool.end();
  }
}
