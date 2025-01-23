const swaggerDefinition = require("../config/swagger");

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"],
};

module.exports = options;
