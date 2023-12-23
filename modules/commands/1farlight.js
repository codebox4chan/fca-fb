const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports.config = {
  name: 'farlight',
  version: '1.0',
  hasPermssion: 0,
  credits: 'HVCKER',
  usePrefix: false,
  description: 'Random Farlight Video',
  commandCategory: 'fun',
  usages: '',
  cooldowns: 2,
};

module.exports.run = async ({ api, event }) => {
  try {
    api.sendMessage('Rattle your dags, we got a fight coming.', event.threadID);

    const response = await axios.get('https://farlight.yodi-iyods.repl.co/farlight/?apikey=farlight');
    const videoInfo = response.data;

    const videoUrl = videoInfo.url;


    const videoStreamResponse = await axios.get(videoUrl, { responseType: 'stream' });
    const videoData = videoStreamResponse.data;


    const tempFilePath = '84.mp4';
    const writeStream = fs.createWriteStream(tempFilePath);
    videoData.pipe(writeStream);

    writeStream.on('finish', () => {

      const message = {
        body: 'Come on you eggs, lets go make a mess.:',
        attachment: fs.createReadStream(tempFilePath),
      };

      api.sendMessage(message, event.threadID, () => {

        fs.unlink(tempFilePath, (err) => {
          if (err) {
            console.error('Error deleting temporary file:', err);
          }
        });
      });
    });
  } catch (error) {
    console.error('Error fetching or sending the video:', error);
    api.sendMessage('Error sending the video.', event.threadID, event.messageID);
  }
};