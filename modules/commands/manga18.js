const fs = require('fs');
const path = require('path');
const axios = require('axios');
const hero = Array.from(global.config.BOTOWNER).join(''); 

module.exports.config = {
  name: 'manga18',
  description: 'Hentai Sauces',
  hasPermssion: 0,
  commandCategory: 'nsfw',
  credits: 'pogi',
  usages: '',
  usePrefix: false,
  cooldowns: 0,
  version: '2.0.0',
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID } = event;
  const cacheDir = path.join(__dirname, "..", "..", "cache");

  if (this.config.credits !== 'pogi') {
    return api.sendMessage(
      'Error Occured!',
      threadID
    );
  }

  try {
    const response = await axios.get('https://wholesomelist.com/api/random');
    const mangaData = response.data.entry;
    const imgUrl = mangaData.image;
    const imgFilename = path.basename(imgUrl);
    const imgFilePath = path.join(cacheDir, imgFilename);
    const writer = fs.createWriteStream(imgFilePath);
    const imageResponse = await axios.get(imgUrl, { responseType: 'stream' });
    imageResponse.data.pipe(writer);

    writer.on('finish', () => {
      const tags = mangaData.siteTags
        ? mangaData.siteTags.tags.join(', ')
        : '𝗡𝗼 𝘁𝗮𝗴𝘀 𝗮𝘃𝗮𝗶𝗹𝗮𝗯𝗹𝗲!';
      const message = `𝗧𝗶𝘁𝗹𝗲: ${mangaData.title}\n𝗔𝘂𝘁𝗵𝗼𝗿: ${mangaData.author}\n𝗧𝗮𝗴𝘀: ${tags}\n𝗡𝗵𝗲𝗻𝘁𝗮𝗶: ${mangaData.nh}\n𝗘-𝗛𝗲𝗻𝘁𝗮𝗶: ${mangaData.eh}\n\n𝗦𝗮𝘂𝗰𝗲 𝗛𝗲𝗿𝗼: ${hero}`;

      api.sendMessage(
        {
          body: message,
          attachment: fs.createReadStream(imgFilePath),
        },
        threadID,
        (err, messageInfo) => {
          if (err) {
            console.error('Error sending message:', err);
            api.sendMessage(
              '𝗘𝗿𝗿𝗼𝗿! 𝗼𝗿 𝗧𝗲𝗺𝗽𝗼𝗿𝗮𝗿𝘆 𝗕𝗹𝗼𝗰𝗸𝗲𝗱 𝗯𝘆 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸.',
              threadID
            );
          }
          fs.unlinkSync(imgFilePath);

          setTimeout(() => {
            api.unsendMessage(messageInfo.messageID); // Remove the command message
          }, 60000); // 1 minute = 60,000 milliseconds
        }
      );
    });

    writer.on('error', (err) => {
      console.error('Error downloading manga image:', err);
      api.sendMessage(
        '𝗘𝗿𝗿𝗼𝗿 𝗪𝗵𝗶𝗹𝗲 𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱𝗶𝗻𝗴 𝗠𝗮𝗻𝗴𝗮 𝗜𝗺𝗮𝗴𝗲𝘀, 𝗧𝗿𝘆 𝗮𝗴𝗮𝗶𝗻! 𝗹𝗮𝘁𝗲𝗿.',
        threadID
      );
      fs.unlinkSync(imgFilePath);
    });
  } catch (error) {
    console.error('Error fetching manga data:', error);
    api.sendMessage('𝗦𝗲𝗿𝘃𝗲𝗿 𝗕𝘂𝘀𝘆! 𝘁𝗿𝘆 𝗮𝗴𝗮𝗶𝗻 𝗹𝗮𝘁𝗲𝗿.', threadID);
  }
};
