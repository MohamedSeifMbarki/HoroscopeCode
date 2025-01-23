// ========================
// Importing Modules
// ========================
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const helmet = require("helmet");
const expressSanitizer = require("express-sanitizer");
const ApiError = require("./utils/apiError"); // Custom error handler
const globalError = require("./middlewares/error"); // Global error middleware
const horoscopeRouter = require("./routes"); // Route handler
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const options = require("./utils/swaggerDef"); // Swagger documentation configuration
require("dotenv").config(); // Load environment variables

// ========================
// Application Initialization
// ========================
const app = express();

// ========================
// Global Middlewares
// ========================
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse incoming JSON payloads
app.use(expressSanitizer()); // Sanitize user inputs to prevent injection attacks
app.use(helmet()); // Set security HTTP headers
app.use(hpp()); // Prevent HTTP parameter pollution
app.use(globalError); // Attach the global error handler

// ========================
// Logging and Environment Setup
// ========================
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); // Log requests in the console for development
  console.log(`Running in ${process.env.NODE_ENV} mode`);
}

// ========================
// Request Rate Limiting
// ========================
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15-minute time window
  max: 10000, // Maximum number of requests per IP
  message: "Too many requests from this IP, please try again after some time.", // Custom error message
});
app.use("/api", limiter); // Apply rate limiting to all routes under /api

// ========================
// Swagger Documentation
// ========================
const swaggerSpec = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Serve API documentation

// ========================
// Routes
// ========================
app.use("/api/v0", horoscopeRouter); // Mount the main router for the API

// Handle undefined routes
app.all("*", (req, res, next) => {
  next(new ApiError(`Cannot find this route: ${req.originalUrl}`, 404)); // Forward to error handler
});

// ========================
// Server Initialization
// ========================
const PORT = process.env.PORT || 7004; // Use the port from environment variables or default to 7004
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// ========================
// Global Error Handling
// ========================
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error("Shutting down the server...");
    process.exit(1); // Exit process with failure
  });
});

module.exports = server;
