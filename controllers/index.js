const { getZodiacSign } = require("../services");

exports.horoscopeController = async (req, res) => {
  const { birthdate } = req.query;

  const sign = await getZodiacSign(birthdate);

  res.status(200).send(sign);
};
