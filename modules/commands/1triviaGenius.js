const axios = require('axios');

module.exports.config = {
  name: 'triviagenius',
  hasPermission: 0,
  version: '1.0 alpha',
  commandCategory: 'fun',
  credits: 'reiko dev',
  usePrefix: true,
  cooldowns: 15,
  description: 'Get a random trivia genius',
  usages: '',
};

module.exports.run = async function ({ api, event }) {
  const { messageID, threadID } = event;

  try {
    const apiUrl = 'http://numbersapi.com/random/trivia?json';
    const response = await axios.get(apiUrl);
    const spaceFact = response.data.text;

    api.sendMessage(`Trivia Genius:\n\n${spaceFact}`, threadID, messageID);
  } catch (error) {
    console.error('Error fetching a random trivia genius:', error);
    api.sendMessage('Sorry, there was an error fetching a Trivia Genius', threadID, messageID);
  }
};
