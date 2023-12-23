const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports.config = {
  name: 'motivatevideo',
  version: '1.0.1',
  hasPermssion: 0,
  credits: 'August Quinn',
  description: 'Get a random motivational video.',
  commandCategory: 'fun',
usePrefix: true,
  usages: '',
  cooldowns: 5,
};

module.exports.run = async function ({ api, event }) {
  try {
    const processingMessage = await api.sendMessage(
      {
        body: '🔄 Initializing the video. Please be patient...',
      },
      event.threadID
    );

    const response = await axios.get('https://motivational.august-api.repl.co/video', { timeout: 90000 });const videoData = response.data;

    if (!videoData.url) {
      return api.sendMessage('An error occurred while fetching the motivational video. Please try again later.', event.threadID, event.messageID);
    }

    const mp4Url = videoData.url.replace(/\.([a-z0-9]+)(?:[\?#]|$)/i, '.mp4$1');

    const videoResponse = await axios.get(mp4Url, { responseType: 'arraybuffer', timeout: 90000 }); 

    const videoPath = path.join(__dirname, 'cache', 'video.mp4');
    fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

    await api.sendMessage(
      {
        attachment: fs.createReadStream(videoPath),
        body: `🎥 𝗠𝗢𝗧𝗜𝗩𝗔𝗧𝗜𝗢𝗡𝗔𝗟 𝗩𝗜𝗗𝗘𝗢\n\n  – “${videoData.title}”`,
      },
      event.threadID
    );

    fs.unlink(videoPath, (err) => {
      if (err) {
        console.error(`Error deleting file: ${err}`);
      } else {
        console.log(`Clear File Successfully for Motivational video: ${videoPath}`);
      }
    });
  } catch (error) {
    console.error('Error processing Motivational Video command:', error);

    if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
      api.sendMessage('The request timed out. Please try again later.', event.threadID);
    } else {
      api.sendMessage(
        'Timeout! An error occurred while processing the Motivational Video. Please try again later.',
        event.threadID
      );
    }
  }
};