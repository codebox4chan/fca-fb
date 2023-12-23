const axios = require('axios');
 
module.exports.config = {
  name: "sad",
  version: "1.0.",
  hasPermssion: 2,
  credits: "RICKCIEL",
  usePrefix: false,
  usages: "",
  description: "Random-sad quotes",
  commandCategory: "Random-quote",
  cooldowns: 51,
};
 
const SAD_QUOTES_API = 'https://api-1.chatbotmesss.repl.co/api/sadquotes1';
 
module.exports.run = async ({ api, event }) => {
  try {
    const response = await axios.get(SAD_QUOTES_API);
    const { quote, author } = response.data;
 
    // Build the final quote message
    const message = `${quote} - Kenneth Panio`;
 
    // Send the quote as a message
    api.sendMessage(message, event.threadID, event.messageID);
  } catch (error) {
    console.error(error);
    api.sendMessage("Error fetching quotes.", event.threadID, event.messageID);
  }
};
 