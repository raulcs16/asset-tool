import Context from "../../src/database/Context";

describe("Catalog Integration Tests", () => {
  let context: Context;

  beforeAll(async () => {
    context = await Context.build(); // Create Schema/Role + Migrate
  });

  afterAll(async () => {
    await context.close(); // Drop Schema/Role
  });

  beforeEach(async () => {
    await context.reset(); // Wipe all rows, keep the tables
  });

  it("should save a book", async () => {});
});
