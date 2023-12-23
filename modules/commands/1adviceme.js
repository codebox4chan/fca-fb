const axios = require('axios');

module.exports.config = {
  name: 'adviceme',
  hasPermssion: 0,
  version: '1.0 alpha',
  commandCategory: 'fun',
  credits: 'reiko dev',
  usePrefix: true,
  cooldowns: 15,
  description: 'Get a random piece of advice',
  usages: '',
};

module.exports.run = async function ({ api, event }) {
  const { messageID, threadID } = event;

  try {
    const apiUrl = 'https://api.adviceslip.com/advice';
    const response = await axios.get(apiUrl);
    const adviceData = response.data.slip;

    const adviceMessage = adviceData.advice;

    api.sendMessage(`Random Advice:\n\n${adviceMessage}`, threadID, messageID);
  } catch (error) {
    console.error('Error fetching a random piece of advice:', error);
    api.sendMessage('Sorry, there was an error fetching advice.', threadID, messageID);
  }
};

