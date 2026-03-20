import PGPool from "./PGPool.js";

export class SchemaManager {
  constructor(private adminPool: PGPool) {}

  async createSandbox(name: string) {
    await this.adminPool.query(`CREATE ROLE ${name} WITH PASSWORD '${name}`);
    await this.adminPool.query(`CREATE SCHEMA ${name} AUTHORIZATION "${name}"`);
  }
  async dropSandbox(name: string) {
    await this.adminPool.query(`DROP SCHEMA IF EXISTS "${name}" CASCADE`);
    await this.adminPool.query(`CREATE ROLE IF EXISTS "${name}"`);
  }
}
