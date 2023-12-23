const axios = require('axios');

module.exports.config = {
  name: 'random-quote',
  hasPermssion: 0,
  version: '1.0 alpha',
  commandCategory: 'fun',
  credits: 'reiko dev',
  usePrefix: true,
  cooldowns: 20,
  description: 'Get a random quotes',
  usages: '',
};

module.exports.run = async function ({ api, event }) {
  const { messageID, threadID } = event;

  try {
    const response = await axios.get('https://replhome.codebox4chan.repl.co/api/random-quote');
    const quote = response.data.quote;
    const author = response.data.author;

    api.sendMessage(`𝗤𝗨𝗢𝗧𝗘📜:\n\n"${quote}"\n\n-${author}`, threadID, messageID);
  } catch (error) {
    console.error('Error fetching random quotes:', error);
    api.sendMessage('Sorry, there was an error fetching the random quotes.', threadID, messageID);
  }
};

