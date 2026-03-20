import PGPool from "./PGPool.js";
import { SchemaManager } from "./SchemaManager.js";
import runMigrations from "./migrator.js";
import { randomBytes } from "crypto";
import dotenv from "dotenv";
dotenv.config();

export default class Context {
  private roleName: string;
  private sandBoxPool: PGPool;

  constructor(roleName: string, pool: PGPool) {
    this.roleName = roleName;
    this.sandBoxPool = pool;
  }

  static async build() {
    const roleName = "test+" + randomBytes(4).toString("hex");
    const adminPool = PGPool.fromEnv();
    const manager = new SchemaManager(adminPool);
    await manager.createSandbox(roleName);
    await adminPool.close();
    await runMigrations(roleName, roleName, roleName, false);
    const sanboxPool = PGPool.fromEnv({ user: roleName, password: roleName });
    return new Context(roleName, sanboxPool);
  }
  async close() {
    //disconnect from PG
    await this.sandBoxPool.close();
    //connect as root user
    const adminPool = PGPool.fromEnv();
    //delete role and schema previously created
    await new SchemaManager(adminPool).dropSandbox(this.roleName);
    //disconnect again
    await adminPool.close();
  }

  //clean up all data aka delete rows from all tables
  async reset() {
    return this.sandBoxPool.query(`DELETE FROM _table`);
  }
}
