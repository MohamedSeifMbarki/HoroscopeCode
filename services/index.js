const { getSign, getZodiac } = require("horoscope");

exports.getZodiacSign = async (birthdate) => {
  try {
    const date = new Date(birthdate);
    if (isNaN(date)) throw new Error("Invalid date");
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const sign = await getSign({ month, day });
    const zodiac = await getZodiac(year);
    return { sign, zodiac };
  } catch (error) {
    return null;
  }
};
