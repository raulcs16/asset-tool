import Context from "../../src/database/Context";

let context: Context;
beforeAll(async () => {
  context = await Context.build();
});

afterAll(() => {
  return context.close();
});
