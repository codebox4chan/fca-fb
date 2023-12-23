const axios = require('axios');
const fs = require('fs');

let animeAutoInterval; 

module.exports.config = {
  name: 'shoticron',
  version: '1.0',
  hasPermssion: 0,
  credits: '𝙼𝙰𝚁𝙹𝙷𝚄𝙽 𝙱𝙰𝚈𝙻𝙾𝙽',//wag na palitan credits please
  usePrefix: false,
  description: 'Random shawty Video',
  commandCategory: 'fun',
  usages: '',
  cooldowns: 10,
};

const sendRandomAnimeVideo = async (api, threadID) => {
  try {
    let response = await axios.post('https://api--v1-shoti.vercel.app/api/v1/get', { apikey: "$shoti-1hgn47v69gjvs50u8e" });
    const videoInfo = response.data;
    const videoUrl = videoInfo.data.url;

    const videoStreamResponse = await axios.get(videoUrl, { responseType: 'stream' });
    const videoData = videoStreamResponse.data;

    const tempFilePath = 'temp_video.mp4';
    const writeStream = fs.createWriteStream(tempFilePath);
    videoData.pipe(writeStream);

    writeStream.on('finish', () => {
      const message = {
        body: '🌸 ʏᴏᴜʀ ᴠɪᴅᴇᴏ sᴇɴsᴇɪ 🌸',
        attachment: fs.createReadStream(tempFilePath),
      };

      api.sendMessage(message, threadID, () => {
        fs.unlink(tempFilePath, (err) => {
          if (err) {
            console.error('Error deleting temporary file:', err);
          }
        });
      });
    });
  } catch (error) {
    console.error('Error fetching or sending the video:', error);
    api.sendMessage('Error sending the video.', threadID);
  }
};

module.exports.run = ({ api, event }) => {
  const commandStatus = event.body.toLowerCase().split(' ')[1];

  if (commandStatus === 'on') {
    if (animeAutoInterval) {
      api.sendMessage('🌸|•ᴄᴏᴍᴍᴀɴᴅ ғᴇᴀᴛᴜʀᴇ ɪs ᴀʟʀᴇᴀᴅʏ ᴛᴜʀɴᴇᴅ ᴏɴ', event.threadID);
    } else {
      api.sendMessage('🌸|•ᴄᴏᴍᴍᴀɴᴅ ғᴇᴀᴛᴜʀᴇ ɪs ᴛᴜʀɴᴇᴅ ᴏɴ, ᴡɪʟʟ sᴇɴᴅ ᴠɪᴅᴇᴏ ᴇᴠᴇʀʏ 1 ᴍɪɴᴜᴛᴇ', event.threadID);

      
      sendRandomAnimeVideo(api, event.threadID);

      
      animeAutoInterval = setInterval(() => {
        sendRandomAnimeVideo(api, event.threadID);
      }, 60000);
    }
  } else if (commandStatus === 'off') {
    if (animeAutoInterval) {
      clearInterval(animeAutoInterval);
      animeAutoInterval = undefined;
      api.sendMessage('🌸|•ᴄᴏᴍᴍᴀɴᴅ ғᴇᴀᴛᴜʀᴇ ɪs ᴛᴜʀɴᴇᴅ ᴏғғ', event.threadID);
    } else {
      api.sendMessage('🌸|•ᴄᴏᴍᴍᴀɴᴅ ғᴇᴀᴛᴜʀᴇ ɪs ᴀʟʀᴇᴀᴅʏ ᴛᴜʀɴᴇᴅ ᴏғғ', event.threadID);
    }
  } else {
    api.sendMessage('🌸|•ɪɴᴠᴀʟɪᴅ ᴄᴏᴍᴍᴀɴᴅ. ᴜsᴇ "shoticron on" ᴏʀ "shoticron off"', event.threadID);
  }
};
