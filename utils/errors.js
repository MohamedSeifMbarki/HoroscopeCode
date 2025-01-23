const errors = {
  NOT_FOUND: {
    message: "Can't find the document",
    code: 404,
    errorCode: "NOT_FOUND",
  },
  BAD_REQUEST: {
    message: "Bad request, check the input data",
    code: 400,
    errorCode: "BAD_REQUEST",
  },
  UNAUTHORIZED: {
    message: "Unauthorized access",
    code: 401,
    errorCode: "UNAUTHORIZED",
  },
  FORBIDDEN: {
    message: "Forbidden action",
    code: 403,
    errorCode: "FORBIDDEN",
  },
  INTERNAL_SERVER_ERROR: {
    message: "An internal server error occurred",
    code: 500,
    errorCode: "INTERNAL_SERVER_ERROR",
  },
  INVALID_DATE_FORMAT: {
    message: "Invalid birthdate format or date out of range",
    code: 400,
    errorCode: "INVALID_DATE_FORMAT",
  },
  MISSING_BIRTHDATE: {
    message: "Birthdate is required (format: YYYY-MM-DD)",
    code: 400,
    errorCode: "MISSING_BIRTHDATE",
  },
};

module.exports = errors;
