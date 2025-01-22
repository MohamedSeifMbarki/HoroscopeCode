const globalError = (err, req, res, next) => {
  // Set default values for status code and status
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // Trimmed environment variable check to ensure consistent matching
  const environment = process.env.NODE_ENV?.trim() || "production";

  if (environment === "development") {
    sendErrorForDev(err, res);
  } else {
    // Handle production errors as a fallback
    sendErrorForProd(err, res);
  }
};

const sendErrorForDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    errorCode: err.errorCode || err.original?.code,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorForProd = (err, res) => {
  // If the error is operational, provide a client-friendly response
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      errorCode: err.errorCode,
      message: err.message,
    });
  } else {
    // Log the detailed error for internal purposes and provide a generic response to clients
    console.error("ERROR 💥:", err);
    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};

module.exports = globalError;
