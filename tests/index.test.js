const request = require("supertest");
const app = require("../server");
const errors = require("../utils/errors");

describe("GET /api/v0/horoscope", () => {
  it("should return the zodiac sign for a valid birthdate", async () => {
    const response = await request(app)
      .get("/api/v0/horoscope")
      .query({ birthdate: "1994-11-13" });
    expect(response.status).toBe(200);
    expect(response.body.sign).toBe("Scorpio");
    expect(response.body.zodiac).toBe("Dog");
  });

  it("should return 400 if birthdate is missing", async () => {
    const response = await request(app).get("/api/v0/horoscope");
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(errors.MISSING_BIRTHDATE.message);
    expect(response.body.errorCode).toBe(errors.MISSING_BIRTHDATE.errorCode);
    expect(response.body.code).toBe(errors.MISSING_BIRTHDATE.code);
  });

  it("should return 400 for an invalid birthdate", async () => {
    const response = await request(app)
      .get("/api/v0/horoscope")
      .query({ birthdate: "not-a-date" });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(errors.INVALID_DATE_FORMAT.message);
    expect(response.body.errorCode).toBe(errors.INVALID_DATE_FORMAT.errorCode);
    expect(response.body.code).toBe(errors.INVALID_DATE_FORMAT.code);
  });

  afterAll(() => {
    app.close();
  });
});
