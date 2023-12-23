const axios = require('axios');

module.exports.config = {
  name: "ml",
  version: "1.0.",
  hasPermission: 0,
  credits: "RICKCIEL",
  usePrefix: false,
  description: "pogi sige na mlbb",
  commandCategory: "fun",
  usages: "",
  cooldowns: 2,
};

const API_SERVER_URL = 'https://pogi-sige-api.chatbotmesss.repl.co';

module.exports.run = async ({ api, event }) => {
  try {
    const response = await axios.get(`${API_SERVER_URL}/api/pogi`);
    const videoUrls = response.data;

    const randomVideoUrl = videoUrls[Math.floor(Math.random() * videoUrls.length)];

    const videoStreamResponse = await axios.get(randomVideoUrl, { responseType: 'stream' });

    const message = {
      body: "Pogi sige na",
      attachment: videoStreamResponse.data,
    };

    await api.sendMessage(message, event.threadID, event.messageID);
  } catch (error) {
    console.error('Error fetching or sending the video:', error);
    api.sendMessage("Error sending the video.", event.threadID, event.messageID);
  }
};
