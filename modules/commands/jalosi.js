const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports.config = {
  name: "jalosi",
  version: "1.0",
  hasPermission: 0,
  credits: "Riu Dev",
  usePrefix: false,
  description: "SEND A JALOSI VIDEO",
  commandCategory: "fun",
  commandCategory: "fun",
  cooldowns: 2,
};

const API_SERVER_URL = 'https://jalosi-api.wwah336.repl.co';

module.exports.run = async ({ api, event }) => {
  try {
    if (event.body.toLowerCase() !== 'jalosi') {
      return;
    }

    const response = await axios.get(`${API_SERVER_URL}/api/jalosi-urls`);
    const audioUrls = response.data;

    const randomAudioUrl = audioUrls[Math.floor(Math.random() * audioUrls.length)];

    const audioStreamResponse = await axios.get(randomAudioUrl, { responseType: 'arraybuffer' });

    const tempFolderPath = path.join(__dirname, '..', 'temp');
    if (!fs.existsSync(tempFolderPath)) {
      fs.mkdirSync(tempFolderPath);
    }

    const audioFilePath = path.join(tempFolderPath, 'random_audio.mp3');
    fs.writeFileSync(audioFilePath, audioStreamResponse.data);

    const message = {
      body: "Nag sisilus akuh in inglis jalosi ", 
      attachment: fs.createReadStream(audioFilePath), 
    };

  
    await api.sendMessage(message, event.threadID, event.messageID);


    fs.unlinkSync(audioFilePath);
  } catch (error) {
    console.error('Error fetching or sending the audio:', error);
    api.sendMessage("Error sending the audio.", event.threadID, event.messageID);
  }
};