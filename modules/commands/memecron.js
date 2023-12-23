const axios = require('axios');
const { Readable } = require('stream');
const cron = require('node-cron');

module.exports.config = {
  name: "memecron",
  version: "1.0",
  hasPermssion: 0,
  credits: "Rickciel",//simple remod by kenneth panio
  usePrefix: true,
  description: "DARK MEME",
  commandCategory: "fun",
  usages: "[on/off]",
  cooldowns: 2,
};

const activeThreads = {};

module.exports.run = async ({ api, event, args }) => {
  const threadID = event.threadID;

  if (args[0] === "on") {
    if (!activeThreads[threadID]) {
      activeThreads[threadID] = true;
      api.sendMessage("Automatic sending of memes is now ON.", threadID);

      const sendMeme = async () => {
        try {
          const response = await axios.get('https://api31.chatbotmesss.repl.co/api/meme', {
            responseType: 'stream',
          });

          api.sendMessage(
            {
              //body: "Random Meme cron schedule :",
              attachment: response.data,
            },
            threadID
          );
        } catch (error) {
          console.error(error);
          api.sendMessage("Error fetching memes.", threadID);
        }
      };

      cron.schedule('*/1 * * * *', sendMeme); // Send meme every minutes? or hour ikaw bahala mag adjust
    } else {
      api.sendMessage("Automatic sending of memes is already ON in this thread.", threadID);
    }
  } else if (args[0] === "off") {
    if (activeThreads[threadID]) {
      activeThreads[threadID] = false;
      api.sendMessage("Automatic sending of memes is now OFF.", threadID);
    } else {
      api.sendMessage("Automatic sending of memes is already OFF in this thread.", threadID);
    }
  }
};
