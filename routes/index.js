const express = require("express");
const { horoscopeController } = require("../controllers");
const { paramValidator } = require("../validators");

const horoscopeRouter = express.Router();

horoscopeRouter.get("/horoscope", paramValidator, horoscopeController);

module.exports = horoscopeRouter;
