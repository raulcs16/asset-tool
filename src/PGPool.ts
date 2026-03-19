import pg, { Pool, QueryResult } from "pg";

export default class PGPool {
  private host: string;
  private port: number;
  private database: string;
  private user: string;
  private password: string;
  private pool: Pool;

  public constructor(
    host: string = "",
    port: number = 5432,
    database: string = "",
    user: string = "",
    password: string = ""
  ) {
    this.host = host;
    this.port = port;
    this.database = database;
    this.user = user;
    this.password = password;

    this.pool = new pg.Pool({
      host: host,
      port: port,
      database: database,
      user: user,
      password: password,
      connectionTimeoutMillis: 2500,
    });
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

  public async query(
    sql: string,
    params: string[] | any
  ): Promise<QueryResult<any>> {
    return this.pool.query(sql, params);
  }
}
