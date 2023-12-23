const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { DateTime } = require("luxon");

module.exports.config = {
  name: "box",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "kennethpanio",
  description: "Get Answers From Python AI with MrBeast-like Voice",
  commandCategory: "educational",
  usePrefix: false,
  usages: "[prompt]",
  cooldowns: 3,
  dependencies: {
    "axios": "",
    "fs-extra": ""
  }
};

module.exports.run = async function ({ api, event, args }) {
  let { messageID, threadID, senderID } = event;
  const query = args.join(" ");

  if (!query) {
    api.sendMessage("❔ | Please Provide Input...", threadID, messageID);
    return;
  }

  try {
    api.setMessageReaction("🕣", messageID, () => {}, true);
    api.sendMessage("🕣 | 𝘈𝘯𝘴𝘸𝘦𝘳𝘪𝘯𝘨....", threadID, messageID);

    // Box API for AI responses
    const boxUrl = 'https://useblackbox.io/chat-request-v4';
    const boxData = {
      textInput: query,
      allMessages: [{ user: query }],
      stream: '',
      clickedContinue: false,
    };
    const boxResponse = await axios.post(boxUrl, boxData);
    const answer = boxResponse.data.response[0][0] || 'No Answers Found';
    const manilaTime = DateTime.now().setZone("Asia/Manila").toFormat("yyyy-MM-dd hh:mm:ss a");

    // Send AI response text
    const formattedResponse = `𝗕𝗟𝗔𝗖𝗞𝗕𝗢𝗫 𝗔𝗜⬛:\n\n${answer}\n\n𝗗𝗲𝘃 𝗟𝗶𝗻𝗸: https://www.facebook.com/100081201591674\n\n𝗕𝘂𝘆 𝗠𝗲 𝗔 𝗖𝗼𝗳𝗳𝗲𝗲!☕\nhttps://reikodev.gumroad.com/l/codebox4chan\n\n${manilaTime}`;
    api.sendMessage(formattedResponse, threadID, messageID);

    // Mrbeast Voice
    const beastUrl = 'https://www.api.vyturex.com/beast';
    const beastResponse = await axios.get(`${beastUrl}?query=${encodeURIComponent(answer)}`);

    if (beastResponse.data && beastResponse.data.audio) {
      const audioURL = beastResponse.data.audio;
      const fileName = "mrbeast_voice.mp3"; 
      const filePath = path.resolve(__dirname, 'cache', fileName);

      await global.utils.downloadFile(audioURL, filePath);

      api.sendMessage({
        body: "💽 𝗩𝗼𝗶𝗰𝗲",
        attachment: fs.createReadStream(filePath)
      }, threadID, () => fs.unlinkSync(filePath));
    } else {
      api.sendMessage("Failed to fetch Beast API response.", threadID);
    }
  } catch (error) {
    api.sendMessage(error.message, threadID, messageID);
  }
};
