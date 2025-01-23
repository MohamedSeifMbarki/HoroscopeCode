const request = require("supertest");
const app = require("../server");
const errors = require("../utils/errors");

describe("GET /horoscope", () => {
  it("should return the zodiac sign for a valid birthdate", async (done) => {
    const response = await request(app)
      .get("/horoscope")
      .query({ birthdate: "1990-07-14" });
    expect(response.status).toBe(200);
    expect(response.body.zodiacSign).toBe("Cancer");
    done();
  });

  it("should return 400 if birthdate is missing", async (done) => {
    const response = await request(app).get("/horoscope");
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(errors.MISSING_BIRTHDATE.message);
    expect(response.body.errorCode).toBe(errors.MISSING_BIRTHDATE.errorCode);
    expect(response.body.code).toBe(errors.MISSING_BIRTHDATE.code);
    done();
  });

  it("should return 400 for an invalid birthdate", async () => {
    const response = await request(app)
      .get("/horoscope")
      .query({ birthdate: "not-a-date" });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(errors.INVALID_DATE_FORMAT.message);
    expect(response.body.errorCode).toBe(errors.INVALID_DATE_FORMAT.errorCode);
    expect(response.body.code).toBe(errors.INVALID_DATE_FORMAT.code);
    done();
  });

  afterAll(() => {
    app.close();
  });
});
