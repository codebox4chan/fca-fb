const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { DateTime } = require('luxon');

module.exports.config = {
  name: 'paraphrase',
  version: '4.0.0',
  hasPermssion: 0,
  credits: 'reiko dev',
  description: 'Paraphraser AI',
  commandCategory: 'tools',
  usages: '[text]',
  cooldowns: 4,
  usePrefix: true,
};

module.exports.run = async ({ api, event, args }) => {
  const { threadID, messageID, senderID } = event;
  if (args.length < 1) {
    return api.sendMessage('Please provide a text', threadID, messageID);
  }

  const input = args.join(' ');
  const manilaTime = DateTime.now().setZone('Asia/Manila').toFormat('yyyy-MM-dd hh:mm:ss a');

  api.setMessageReaction("🕣", messageID, () => {}, true);
  api.sendMessage("🕣 | Paraphrasing....", threadID, messageID);
 // const Name = global.config.BOTNAME;
  let userName = await getUserName(api, senderID);

  const response = await axios.get(`https://replhome.codebox4chan.repl.co/api/paraphrase?text=${encodeURIComponent(input)}&apiKey=codebox4chan`)
  const sagot = response.data.paraphrase || 'No Response Server is Down';

  api.sendMessage(`𝗣𝗔𝗥𝗔𝗣𝗛𝗥𝗔𝗦𝗘𝗥🚔: @${userName}\n\n\n${sagot}\n\n𝗗𝗲𝘃 𝗟𝗶𝗻𝗸: https://www.facebook.com/100081201591674\n\n𝗕𝘂𝘆 𝗠𝗲 𝗔 𝗖𝗼𝗳𝗳𝗲𝗲!☕\nhttps://reikodev.gumroad.com/l/codebox4chan\n\n${manilaTime}`, threadID, messageID);

  // MrBeast API for voice
  try {
    const beastResponse = await axios.get(`https://replhome.codebox4chan.repl.co/api/tts?text=${encodeURIComponent(sagot)}`);
    if (beastResponse.data && beastResponse.data.audioUrl) {
      const audioURL = beastResponse.data.audioUrl;
      const fileName = "mrbeast_voice.mp3";
      const filePath = path.resolve(__dirname, 'cache', fileName);

      await global.utils.downloadFile(audioURL, filePath);

      api.sendMessage({
        body: '💽𝗩𝗼𝗶𝗰𝗲 𝗕𝗼𝘅',
        attachment: fs.createReadStream(filePath),
      }, threadID, async (voiceError) => {
        if (voiceError) {
          console.error('Error sending voice response:', voiceError);
        }

        fs.unlinkSync(filePath); // Remove the temporary voice file
      });
    } else {
      console.error("Failed to fetch Beast API response.");
    }
  } catch (beastError) {
    console.error('Error during Beast API request:', beastError);
  }
};

async function getUserName(api, userID) {
  try {
    const userInfo = await api.getUserInfo(userID);
    return userInfo && userInfo[userID] ? userInfo[userID].name : "unknown";
  } catch (error) {
    console.error('Error getting user name:', error);
    return "unknown";
  }
}

