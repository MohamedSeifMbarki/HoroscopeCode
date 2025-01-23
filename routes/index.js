const express = require("express");
const { horoscopeController } = require("../controllers");
const { paramValidator } = require("../validators");

const horoscopeRouter = express.Router();

/**
 * @swagger
 * /api/v0/horoscope:
 *   get:
 *     summary: Get zodiac sign for a given birthdate
 *     description: Returns the zodiac sign and Chinese zodiac sign for the provided birthdate.
 *     parameters:
 *       - in: query
 *         name: birthdate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Birthdate in YYYY-MM-DD format.
 *     responses:
 *       200:
 *         description: Zodiac sign and Chinese zodiac sign successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sign:
 *                   type: string
 *                   example: Scorpio
 *                 zodiac:
 *                   type: string
 *                   example: Dog
 *       400:
 *         description: Missing birthdate parameter.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MissingBirthdateError'
 * components:
 *   schemas:
 *     MissingBirthdateError:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: Birthdate parameter is missing.
 *         errorCode:
 *           type: string
 *           example: MISSING_BIRTHDATE
 */

horoscopeRouter.get("/horoscope", paramValidator, horoscopeController);

module.exports = horoscopeRouter;
