const axios = require('axios');

module.exports.config = {
  name: "catgpt",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Minn", //don't change please:(( explore explore din mga site/apis jan, wag puro chage credits
  description: "Chat with catgpt",
  usePrefix: false,
  commandCategory: "educational",
  usages: "[text]",
  cooldowns: 3,
};

module.exports.run = async function ({ api, event, args }) {
  const q = args.join(" ");
  try {
    const response = await axios.post("https://catgpt.guru/api/chat", {
      messages: [
        {
          role: "user",
          content: q,
        },
      ],
    });
    api.sendMessage(response.data, event.threadID, event.messageID);
  } catch (error) {
    console.error(error);
    api.sendMessage('catgpt didn\'t meow back:(', event.threadID, event.messageID);
  }
};