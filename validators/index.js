const { query } = require("express-validator");
const validatorMiddleware = require("../middlewares/validationErrorFormatting");
exports.paramValidator = [
  query("birthdate")
    .notEmpty()
    .withMessage("MISSING_BIRTHDATE")
    .isDate({ format: "string" })
    .withMessage("INVALID_DATE_FORMAT"),

  validatorMiddleware,
];
