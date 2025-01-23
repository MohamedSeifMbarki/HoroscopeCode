const { validationResult } = require("express-validator");
const errorsList = require("../utils/errors");

const validatorMiddleware = (req, res, next) => {
  const results = validationResult(req);
  if (!results.isEmpty()) {
    const { errors } = results;
    const errorCode = errors[0].msg;
    return res.status(errorsList[errorCode].code).json({
      status: "error",
      errorCode: errorsList[errorCode].errorCode,
      error: errorsList[errorCode].message,
      code: errorsList[errorCode].code,
    });
  }
  next();
};

module.exports = validatorMiddleware;
