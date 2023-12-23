const axios = require('axios');

module.exports.config = {
  name: 'programmingjoke',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'August Quinn',
  description: 'Get a random programming joke.',
  commandCategory: 'fun',
  usePrefix: true,
  usages: '',
  cooldowns: 5,
};

module.exports.run = async function ({ api, event }) {
  try {
    const response = await axios.get('https://official-joke-api.appspot.com/jokes/programming/random');
    const joke = response.data[0];

    api.sendMessage(`💻 𝗣𝗥𝗢𝗚𝗥𝗔𝗠𝗠𝗜𝗡𝗚 𝗝𝗢𝗞𝗘:\n\n${joke.setup}\n${joke.punchline}`, event.threadID, event.messageID);
  } catch (error) {
    console.error(error);
    api.sendMessage('An error occurred while fetching a programming joke.', event.threadID, event.messageID);
  }
};

