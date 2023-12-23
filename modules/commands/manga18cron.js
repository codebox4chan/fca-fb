const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cron = require('node-cron');
const hero = Array.from(global.config.BOTOWNER).join('');

module.exports.config = {
  name: 'manga18cron',
  description: 'Hentai Sauces',
  hasPermssion: 0,
  commandCategory: 'nsfw',
  credits: 'Kenneth Panio',
  usages: '[on/off]',
  usePrefix: true,
  cooldowns: 0,
  version: '2.0.0',
};

const activeThreads = {};

module.exports.run = async function ({ api, event, args }) {
  const { threadID } = event;
  const cacheDir = path.join(__dirname, '..', '..', 'cache');

  if (this.config.credits !== 'Kenneth Panio') {
    return api.sendMessage('Error Occured!', threadID);
  }

  if (args[0] === 'on') {
    if (!activeThreads[threadID]) {
      activeThreads[threadID] = true;
      api.sendMessage('Automatic sending of manga is now ON.', threadID);

      const sendManga = async () => {
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
              : 'No tags available!';
            const message = `Title: ${mangaData.title}\nAuthor: ${mangaData.author}\nTags: ${tags}\nNHentai: ${mangaData.nh}\nE-Hentai: ${mangaData.eh}\n\nSauce Hero: ${hero}`;

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
                    'Error! Or Temporary Blocked by Facebook.',
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
              'Error While Downloading Manga Images, Try again later.',
              threadID
            );
            fs.unlinkSync(imgFilePath);
          });
        } catch (error) {
          console.error('Error fetching manga data:', error);
          api.sendMessage('Server Busy! try again later.', threadID);
        }
      };

      // Schedule sending manga every 1 ? minutes or hour? (adjust the cron expression as needed)
      cron.schedule('*/5 * * * *', sendManga);
    } else {
      api.sendMessage('Automatic sending of manga is already ON in this thread.', threadID);
    }
  } else if (args[0] === 'off') {
    if (activeThreads[threadID]) {
      activeThreads[threadID] = false;
      api.sendMessage('Automatic sending of manga is now OFF.', threadID);
    } else {
      api.sendMessage('Automatic sending of manga is already OFF in this thread.', threadID);
    }
  }
};