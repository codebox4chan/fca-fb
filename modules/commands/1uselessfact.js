const axios = require('axios');

module.exports.config = {
  name: 'uselessfact',
  hasPermission: 0,
  version: '1.0 alpha',
  commandCategory: 'fun',
  credits: 'reiko dev',
  usePrefix: true,
  cooldowns: 15,
  description: 'Get a random science fact',
  usages: '',
};

module.exports.run = async function ({ api, event }) {
  const { messageID, threadID } = event;

  try {
    const apiUrl = 'https://uselessfacts.jsph.pl/random.json?language=en';
    const response = await axios.get(apiUrl);
    const weird = response.data.text;

    api.sendMessage(`Random Useless Fact:\n\n${weird}`, threadID, messageID);
  } catch (error) {
    console.error('Error fetching a random useless fact:', error);
    api.sendMessage('Sorry, there was an error fetching a useless fact.', threadID, messageID);
  }
};
