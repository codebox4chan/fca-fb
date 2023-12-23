const axios = require('axios');

module.exports.config = {
  name: "queen",
  version: "1.0.",
  hasPermssion: 0,
  credits: "RICKCIEL",
  usePrefix: false,
  description: "Gangster rap by quen elizabeth nigha",
  commandCategory: "fun",
  usePrefix: false,
  cooldowns: 2,
};

const API_SERVER_URL = 'https://ganster-api.chatbotmesss.repl.co';
const SPECIFIC_VIDEO_PATH = '/api/elizabeth'; 

module.exports.run = async ({ api, event }) => {
  try {
    const response = await axios.get(`${API_SERVER_URL}${SPECIFIC_VIDEO_PATH}`);
    const specificVideoUrl = response.data;

    const videoStreamResponse = await axios.get(specificVideoUrl, { responseType: 'stream' });

    const message = {
      body: "Gangster Elizabeth",
      attachment: videoStreamResponse.data,
    };

    await api.sendMessage(message, event.threadID, event.messageID);
  } catch (error) {
    console.error('Error fetching or sending the video:', error);
    api.sendMessage("Error sending the video.", event.threadID, event.messageID);
  }
};