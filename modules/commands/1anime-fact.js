const axios = require('axios');

module.exports.config = {
  name: 'anime-fact',
  hasPermssion: 0,
  version: '1.0 alpha',
  commandCategory: 'anime',
  credits: 'reiko dev',
  usePrefix: true,
  cooldowns: 15,
  description: 'Get a random anime facts',
  usages: '',
};

module.exports.run = async function ({ api, event }) {
  const { messageID, threadID } = event;

  try {
    const response = await axios.get('https://replhome.codebox4chan.repl.co/api/anime-fact?apiKey=y7jvrnh8yms071n9f5ruox8');
    const fact = response.data.fact;

    api.sendMessage(`𝗔𝗡𝗜𝗠𝗘-𝗙𝗔𝗖𝗧☆:\n\n${fact}`, threadID, messageID);
  } catch (error) {
    console.error('Error fetching random anime facts:', error);
    api.sendMessage('Sorry, there was an error fetching the random anime facts.', threadID, messageID);
  }
};

