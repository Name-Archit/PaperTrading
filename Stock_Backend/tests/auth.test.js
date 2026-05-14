const request =
  require("supertest");

const app =
  require("../src/app");

describe(
  "Auth APIs",
  () => {

    test(
      "Register User",
      async () => {

        const res =
          await request(app)
            .post(
              "/api/auth/register"
            )
            .send({
              username:
                "archit",

              email:
                "archit@test.com",

              password:
                "123456"
            });

        expect(
          res.statusCode
        ).toBe(201);
      }
    );
  }
);