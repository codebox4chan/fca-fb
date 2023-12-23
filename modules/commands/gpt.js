const { Hercai } = require('hercai');
const gtts = require("gtts");
const fs = require("fs");
const path = require("path");

const herc = new Hercai();

module.exports.config = {
  name: 'gpt',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'KennethPanio',
  description: 'Ask a question to GPT4',
  commandCategory: 'educational',
  usages: '[question]',
  cooldowns: 6,
  usePrefix: false,
};

module.exports.run = async ({ api, event, args }) => {
  if (args.length < 1) {
    return api.sendMessage('Please provide a question.', event.threadID, event.messageID);
  }

  const question = args.join(' ');
  api.setMessageReaction("🕣", event.messageID, () => {}, true);
    api.sendMessage("🕣 | 𝘈𝘯𝘴𝘸𝘦𝘳𝘪𝘯𝘨....", event.threadID,
event.messageID);

  // Replace 'v2' with your desired model if needed
  herc.question({ model: 'v3-beta', content: question })
    .then((response) => {
      const reply = `𝗚𝗣𝗧4 𝗔𝗜👾:\n\n${response.reply}\n\n𝗗𝗲𝘃 𝗟𝗶𝗻𝗸: https://www.facebook.com/100081201591674\n\n𝗕𝘂𝘆 𝗠𝗲 𝗔 𝗖𝗼𝗳𝗳𝗲𝗲!☕\nhttps://reikodev.gumroad.com/l/codebox4chan`;

      api.sendMessage(reply, event.threadID, event.messageID);

const gttsInstance = new gtts(response.reply, 'en-us');
      const gttsPath = path.join(__dirname, 'voicebox.mp3');
      gttsInstance.save(gttsPath, function (error, result) {
        if (error) {
          console.error("Error saving gTTS:", error);
        } else {
          api.sendMessage({
            body: "💽 𝗩𝗼𝗶𝗰𝗲 𝗕𝗼𝘅 𝗔𝗜",
            attachment: fs.createReadStream(gttsPath)
          }, event.threadID, () => {
            fs.unlinkSync(gttsPath);
          });
        }
      });
    })
    .catch((error) => {
      console.error('Error while making the Hercai API request:', error);
      api.sendMessage('An error occurred while processing your question.', event.threadID);
    });
};