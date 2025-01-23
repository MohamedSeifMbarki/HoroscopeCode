// ========================
// Importation des modules
// ========================
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const helmet = require("helmet");
const expressSanitizer = require("express-sanitizer");
const ApiError = require("./utils/apiError"); // Gestion des erreurs personnalisées
const globalError = require("./middlewares/error"); // Middleware global de gestion des erreurs
const horoscopeRouter = require("./routes");
require("dotenv").config(); // Chargement des variables d'environnement

// ========================
// Initialisation de l'application
// ========================
const app = express();

// ========================
// Middlewares globaux
// ========================
app.use(cors()); // Autorise les requêtes cross-origin
app.use(expressSanitizer()); // Protège contre les injections en nettoyant les données
app.use(helmet()); // Renforce la sécurité des headers HTTP
app.use(hpp()); // Protège contre la pollution des paramètres HTTP
app.use(globalError); // Gestion globale des erreurs

// ========================
// Logs et environnement
// ========================
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); // Log des requêtes en développement
  console.log(`node:${process.env.NODE_ENV}`);
}

// ========================
// Limitation des requêtes
// ========================
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Période de 15 minutes
  max: 10000, // Nombre maximum de requêtes autorisées par IP
  message:
    "Too many accounts created from this IP, please try again after an hour", // Message d'erreur
});
app.use("/api", limiter); // Application de la limitation sur les routes commençant par /api

// ========================
// Routes
// ========================
app.use("/api/v0", horoscopeRouter); // Route simple pour tester l'API

// Gestion des routes non trouvées
app.all("*", (req, res, next) => {
  next(new ApiError(`can t find this route ${req.originalUrl}`, 404));
});

// ========================
// Serveur
// ========================
const PORT = process.env.PORT || 7004; // Port par défaut
const server = app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`)
);

// ========================
// Gestion des erreurs globales
// ========================
process.on("unhandledRejection", (err) => {
  console.error(`UnhanledRejection Errors : ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down ...`);
    process.exit(1); // Arrêt du processus
  });
});
module.exports = server;
