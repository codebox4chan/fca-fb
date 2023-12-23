const axios = require('axios');

module.exports.config = {
  name: 'meowfact',
  hasPermssion: 0,
  version: '1.0 alpha',
  commandCategory: 'fun',
  credits: 'reiko dev',
  usePrefix: true,
  cooldowns: 15,
  description: 'Get a random meow fact',
  usages: '',
};

module.exports.run = async function ({ api, event }) {
  const { messageID, threadID } = event;

  try {
    const apiUrl = 'https://meowfacts.herokuapp.com/';
    const response = await axios.get(apiUrl);
    const animalFact = response.data.data;

    api.sendMessage(`Random Meow Fact:\n\n${animalFact}`, threadID, messageID);
  } catch (error) {
    console.error('Error fetching a random meow fact:', error);
    api.sendMessage('Sorry, there was an error fetching an meow fact.', threadID, messageID);
  }
};
