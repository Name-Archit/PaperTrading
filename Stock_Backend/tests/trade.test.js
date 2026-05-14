const request =
  require("supertest");

const app =
  require("../src/app");

describe(
  "Trade APIs",
  () => {

    test(
      "Buy Stock",
      async () => {

        const res =
          await request(app)
            .post(
              "/api/trade/buy"
            );

        expect(
          res.statusCode
        ).not.toBe(404);
      }
    );
  }
);