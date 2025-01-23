require("dotenv").config();
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Horoscope App",
    version: "1.0.0",
    description: "Swagger documentation for Horoscope App",
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT || 7004}`,
      description: "Development server",
    },
  ],
};

module.exports = swaggerDefinition;
