const axios = require('axios');

module.exports.config = {
  name: 'funfact',
  hasPermssion: 0,
  version: '1.0 alpha',
  commandCategory: 'fun',
  credits: 'reiko dev',
  usePrefix: true,
  cooldowns: 20,
  description: 'Get a random weird facts',
  usages: '',
};

module.exports.run = async function ({ api, event }) {
  const { messageID, threadID } = event;

  try {
    const response = await axios.get('https://replhome.codebox4chan.repl.co/api/random-fact');
    const fact = response.data.text;
    const src = response.data.source;

    api.sendMessage(`𝗙𝗨𝗡 𝗙𝗔𝗖𝗧🍃:\n\n${fact}\n\nSource: ${src}`, threadID, messageID);
  } catch (error) {
    console.error('Error fetching random facts:', error);
    api.sendMessage('Sorry, there was an error fetching the random facts.', threadID, messageID);
  }
};
