const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { DateTime } = require('luxon');

module.exports.config = {
  name: 'replit',
  version: '4.0.0',
  hasPermssion: 0,
  credits: 'Reiko Dev',
  description: 'Talk to Replit Ai',
  commandCategory: 'educational',
  usages: '[ask]',
  cooldowns: 6,
  usePrefix: false,
};

module.exports.run = async ({ api, event, args }) => {
  const { threadID, messageID, senderID } = event;
  if (args.length < 1) {
    return api.sendMessage('Please provide a question.', threadID, messageID);
  }

  const input = args.join(' ');
  const manilaTime = DateTime.now().setZone('Asia/Manila').toFormat('yyyy-MM-dd hh:mm:ss a');

  let userName = await getUserName(api, senderID);
  const cai = `You're Now Replit AI Powered By Replit.\n\n${userName}: ${input}`;

  try {
    api.setMessageReaction("🕣", messageID, () => {}, true);
    api.sendMessage("🕣 | 𝘈𝘯𝘴𝘸𝘦𝘳𝘪𝘯𝘨....", threadID, messageID);

    const response = await axios.get(`https://replhome.codebox4chan.repl.co/api/palm?prompt=${encodeURIComponent(cai)}&apiKey=y7jvrnh8yms071n9f5ruox8`);
    const sagot = response.data.reply || 'No Answers Found!';

    api.sendMessage(`𝗥𝗘𝗣𝗟𝗜𝗧 𝗔𝗜🐯:\n\n${sagot}\n\n𝗗𝗲𝘃 𝗟𝗶𝗻𝗸: https://www.facebook.com/100081201591674\n\n𝗕𝘂𝘆 𝗠𝗲 𝗔 𝗖𝗼𝗳𝗳𝗲𝗲!☕\nhttps://reikodev.gumroad.com/l/codebox4chan\n\n${manilaTime}`, threadID, (error) => {
      if (!error) {
        // MrBeast API for voice
        const beastUrl = 'https://www.api.vyturex.com/beast';
        axios.get(`${beastUrl}?query=${encodeURIComponent(sagot)}`)
          .then((beastResponse) => {
            if (beastResponse.data && beastResponse.data.audio) {
              const audioURL = beastResponse.data.audio;
              const fileName = "mrbeast_voice.mp3";
              const filePath = path.resolve(__dirname, 'cache', fileName);

              global.utils.downloadFile(audioURL, filePath)
                .then(() => {

                  api.sendMessage({
                    body: '💽𝗝𝗶𝗺𝗺𝘆 𝗩𝗼𝗶𝗰𝗲 𝗕𝗼𝘅',
                    attachment: fs.createReadStream(filePath),
                  }, threadID, () => fs.unlinkSync(filePath));
                })
                .catch((downloadError) => {
                  console.error('Error during audio file download:', downloadError);
           //       api.sendMessage("Failed to download Beast API audio.", event.threadID);
                });
            } else {
      //        api.sendMessage("Failed to fetch Beast API response.", event.threadID);
            }
          })
          .catch((beastError) => {
            console.error('Error during Beast API request:', beastError);
    //        api.sendMessage("Failed to fetch Beast API response.", event.threadID);
          });
      } else {
        console.error('Error sending AI text response:', error);
        api.sendMessage(`An error occurred during the execution of the command: ${error.message}`, threadID);
      }
    });
  } catch (error) {
    console.error('Error during execution:', error);
    api.sendMessage(`An error occurred during the execution of the command: ${error.message}`, threadID);
  }
}

async function getUserName(api, userID) {
  try {
    const userInfo = await api.getUserInfo(userID);
    if (userInfo && userInfo[userID]) {
      return userInfo[userID].name;
    } else {
      return "unknown";
    }
  } catch (error) {
    return "unknown";
  }
}
