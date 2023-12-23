const axios = require('axios');
const fs = require('fs-extra');

const bannedWords = [
  'porn',
  'adult',
  'nsfw',
  'xxx',
  'hentai',
  'pussy',
  'nudes',
  'sex pictures',
  'naked',
  'dick',
  'fuck',
  'gay',
  'blowjob',
  'pron',
  'brazzers',
  'beeg',
  'vagina',
  'penis',
  'hentaigasm',
  'childporn',
  'naked',
  'nude',
  ];

module.exports.config = {
  name: "poli",
  version: "1.0.",
  hasPermssion: 0,
  credits: "jameslim",
  description: "generate image from polination",
  commandCategory: "image",
  usePrefix: false,
  usages: "query",
  cooldowns: 10
};

module.exports.run = async ({ api, event, args }) => {
  let { threadID, messageID } = event;
  let query = args.join(" ").toLowerCase();

  // Check for banned words in the query
  const hasBannedWord = bannedWords.some((word) => query.includes(word));

  if (hasBannedWord) {
    try {
      await api.sendMessage("Generate Query Suspended Reason: Inappropriate Content", threadID, messageID);
    } catch (error) {
      console.error(error);
    }
    return; // Return here to prevent further execution
  }

  if (!query) {
    try {
      await api.sendMessage("Put text/query", threadID, messageID);
    } catch (error) {
      console.error(error);
    }
    return; // Return here to prevent further execution
  }

  const path = __dirname + `/cache/poli.png`;
  const url = `https://image.pollinations.ai/prompt/${query}`;

  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer",
    });

    fs.writeFileSync(path, Buffer.from(response.data, "utf-8"));

    try {
      await api.sendMessage(
        {
          body: "Here is the image for you!",
          attachment: fs.createReadStream(path),
        },
        threadID,
        (error, messageInfo) => {
          if (error) return console.error(error);

          // Automatically unsend the image after 1 minute (60000 milliseconds)
          setTimeout(() => {
            api.unsendMessage(messageInfo.messageID); // Remove the command message
            fs.unlinkSync(path); // Remove the image file
          }, 60000);
        }
      );
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(error);
    try {
      await api.sendMessage("An error occurred while generating the image.", threadID, messageID);
    } catch (error) {
      console.error(error);
    }
  }
};