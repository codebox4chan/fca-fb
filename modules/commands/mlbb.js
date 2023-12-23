const axios = require('axios');

module.exports.config = {
  name: "mlbb",
  version: "1.0.",
  hasPermission: 0,
  credits: "RICKCIEL",
  usePrefix: `false`,
  description: "SEND A RANDOM MLBB EDITS",
  commandCategory: "fun",
  usages: "",
  cooldowns: 2,
};

const API_SERVER_URL = 'https://video-api.chatbotmesss.repl.co';

module.exports.run = async ({ api, event }) => {
  try {
    api.sendMessage("The video is sending please wait...", event.threadID);

    const response = await axios.get(`${API_SERVER_URL}/api/video-urls`);
    const videoUrls = response.data;

    const randomVideoUrl = videoUrls[Math.floor(Math.random() * videoUrls.length)];

    const videoStreamResponse = await axios.get(randomVideoUrl, { responseType: 'stream' });

    const message = {
      attachment: videoStreamResponse.data,
    };

    await api.sendMessage(message, event.threadID);
  } catch (error) {
    console.error('Error fetching or sending the video:', error);
    api.sendMessage("Error sending the video.", event.threadID, event.messageID);
  }
};
