const axios = require('axios');

module.exports.config = {
  name: "hourlyquotes",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "Arjhil", // I DON'T KNOW WHO PROVIDED THIS API BUT I DID IMPLEMENTED IT TO MIRAI - Arjhil
  description: "Randomly automatic receive quotes",
  commandCategory: "system",
  usePrefix: true,
  usages: "",
  cooldowns: 10,
};

async function sendQuote(api, threadID) {
  try {
    const response = await axios.get('https://api.quotable.io/random');
    const quote = response.data;
    const content = quote.content;
    const author = quote.author;
    const message = `"${content}" - ${author}`;
    api.sendMessage(message, threadID);
  } catch (error) {
    console.error('Something went wrong:', error);
    api.sendMessage('An error occurred while fetching from the API. Please try again.', threadID);
  }
}

module.exports.run = async function({ api, event }) {
  // Send a quote when the command is initially invoked
  sendQuote(api, event.threadID);

  // Schedule sending a quote every 1 hour (3600000 milliseconds)
  setInterval(() => {
    sendQuote(api, event.threadID);
  }, 3600000);
};