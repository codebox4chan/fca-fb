const axios = require('axios');

module.exports.config = {
  name: "dota2",
  version: "1.0.",
  hasPermssion: 0,
  credits: "HVCKER",
  usePrefix: true,
  description: "Random Dota 2 Video",
  commandCategory: "fun",
  usePrefix: false,
  usages: "",
  cooldowns: 10,
};

const API_SERVER_URL = 'https://dota-api.yodi-iyods.repl.co';

module.exports.run = async ({ api, event }) => {
  try {
    api.sendMessage("Hello Dota 2 Players Please Wait. ", event.threadID);

    const response = await axios.get(`${API_SERVER_URL}/api/dota2`);
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