const axios = require('axios');

module.exports.config = {
  name: 'inspire',
  hasPermssion: 0,
  version: '1.0 alpha',
  commandCategory: 'fun',
  credits: 'reiko dev',
  usePrefix: true,
  cooldowns: 15,
  description: 'Get a random inspirational quote',
  usages: '',
};

module.exports.run = async function ({ api, event }) {
  const { messageID, threadID } = event;

  try {
    const apiUrl = 'https://zenquotes.io/api/random';
    const response = await axios.get(apiUrl);
    const quoteData = response.data[0];

    const quoteMessage = `"${quoteData.q}"\n\n- ${quoteData.a}`;

    api.sendMessage(`Inspirational Quote:\n\n${quoteMessage}`, threadID, messageID);
  } catch (error) {
    console.error('Error fetching a random inspirational quote:', error);
    api.sendMessage('Sorry, there was an error fetching an inspirational quote.', threadID, messageID);
  }
};
