const axios = require('axios');

module.exports.config = {
  name: 'zodiac',
  version: '1.0.1',
  credits: 'August Quinn',
  hasPermssion: 0,
  description: 'Get information about a zodiac sign.',
  commandCategory: 'fun',
  usePrefix: false,
  usages: '[sign]',
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  try {
    const sign = args[0]?.toLowerCase();

    if (!sign) {
      return api.sendMessage('Please provide a zodiac sign. Example: /Zodiac aries', event.threadID, event.messageID);
    }

    const jsonLink = 'https://raw.githubusercontent.com/Augustquinn/JSONify/main/ZodiacSigns.json';
    const response = await axios.get(jsonLink);
    const zodiacData = response.data.zodiacSigns;

    const foundSign = zodiacData.find((zodiac) => zodiac.sign.toLowerCase() === sign);

    if (foundSign) {
      const message = `✨ 𝗭𝗢𝗗𝗜𝗔𝗖 𝗦𝗜𝗚𝗡\n\n⦿ 𝗡𝗔𝗠𝗘: ${foundSign.sign}\n⦿ 𝗘𝗟𝗘𝗠𝗘𝗡𝗧: ${foundSign.element}\n⦿ 𝗥𝗨𝗟𝗜𝗡𝗚 𝗣𝗟𝗔𝗡𝗘𝗧: ${foundSign.rulingPlanet}\n⦿ 𝗧𝗥𝗔𝗜𝗧𝗦: ${foundSign.traits.join(', ')}\n⦿ 𝗖𝗢𝗠𝗣𝗔𝗧𝗜𝗕𝗜𝗟𝗜𝗧𝗬: ${foundSign.compatibility.join(', ')}\n⦿ 𝗠𝗢𝗧𝗜𝗩𝗔𝗧𝗜𝗢𝗡𝗦: ${getRandomItem(foundSign.motivations)}\n⦿ 𝗟𝗨𝗖𝗞𝗬 𝗡𝗨𝗠𝗕𝗘𝗥: ${foundSign.luckyNumber}\n⦿ 𝗣𝗘𝗥𝗦𝗢𝗡𝗔𝗟𝗜𝗧𝗬: ${foundSign.personality}\n⦿ 𝗟𝗨𝗖𝗞𝗬 𝗖𝗢𝗟𝗢𝗥: ${foundSign.luckyColor}
      `;

      api.sendMessage(message, event.threadID, event.messageID);
    } else {
      api.sendMessage('Invalid zodiac sign. Please provide a valid sign.', event.threadID, event.messageID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage('An error occurred while fetching zodiac information.', event.threadID, event.messageID);
  }
};

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}