const axios = require('axios');

module.exports.config = {
  name: 'historyfact',
  hasPermssion: 0,
  version: '1.0 alpha',
  commandCategory: 'fun',
  credits: 'reiko dev',
  usePrefix: true,
  cooldowns: 15,
  description: 'Get a random historical fact',
  usages: '',
};

module.exports.run = async function ({ api, event }) {
  const { messageID, threadID } = event;

  try {
    const apiUrl = 'http://numbersapi.com/random/year?json';
    const response = await axios.get(apiUrl);
    const historyFact = response.data.text;

    api.sendMessage(`Random Historical Fact:\n\n${historyFact}`, threadID, messageID);
  } catch (error) {
    console.error('Error fetching a random historical fact:', error);
    api.sendMessage('Sorry, there was an error fetching a historical fact.', threadID, messageID);
  }
};
