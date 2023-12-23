const axios = require('axios');

module.exports.config = {
  name: 'anime-quote',
  hasPermssion: 0,
  version: '1.0 alpha',
  commandCategory: 'anime',
  credits: 'reiko dev',
  usePrefix: true,
  cooldowns: 15,
  description: 'Get a random anime quotes',
  usages: '',
};

module.exports.run = async function ({ api, event }) {
  const { messageID, threadID } = event;

  try {
    const response = await axios.get('https://replhome.codebox4chan.repl.co/api/anime-quote?apiKey=y7jvrnh8yms071n9f5ruox8');
    const anime = response.data.anime;
    const quote = response.data.quote;
    const src = response.data.author;

    api.sendMessage(`𝗔𝗡𝗜𝗠𝗘 𝗤𝗨𝗢𝗧𝗘✦: ${anime}\n\n"${quote}"\n\nAuthor: ${src}`, threadID, messageID);
  } catch (error) {
    console.error('Error fetching random anime quotes:', error);
    api.sendMessage('Sorry, there was an error fetching the random anime quotes.', threadID, messageID);
  }
};

