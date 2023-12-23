const axios = require('axios');

module.exports.config = {
  name: "quotes",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "???", // I DON'T KNOW WHO PROVIDED THIS API BUT I DID IMPLEMENTED IT TO MIRAI - Yan
  description: "Randomly receive quotes",
  usePrefix: false,
  commandCategory: "random-quote",
  usages: "quotes",
  cooldowns: 10,
};

module.exports.run = async function({ api, event }) {
  try {
    const response = await axios.get('https://api.quotable.io/random');
    const quote = response.data;
    const content = quote.content;
    const author = quote.author;
    const message = `"${content}" - ${author}`;
    api.sendMessage(message, event.threadID, event.messageID);
  } catch (error) {
    console.error('Something went wrong:', error);
    api.sendMessage('An error occurred while fetching from the API. Please try again.', event.threadID, event.messageID);
  }
};
