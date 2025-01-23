const horoscope = require("horoscope");
const { getZodiacSign } = require("../services");

exports.horoscopeController = async (req, res) => {
  const { birthdate } = req.query;
  if (!birthdate) {
    return res
      .status(400)
      .json({ error: "Birthdate is required (format: YYYY-MM-DD)" });
  }

  const sign = await getZodiacSign(birthdate);
  if (!sign) {
    return res
      .status(400)
      .json({ error: "Invalid birthdate format or date out of range" });
  }

  res.status(200).send(sign);
};
