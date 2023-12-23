const axios = require('axios');
const gtts = require("gtts");
const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: 'gpt4test',
  version: '4.0.0',
  hasPermssion: 0,
  credits: 'kennethpanio',//change mo nalang
  description: 'Ask a question to GPT4',
  commandCategory: 'educational',
  usages: '[question]',
  cooldowns: 5,
  usePrefix: false,
};

module.exports.run = async ({ api, event, args, senderID, messageID }) => {
  if (args.length < 1) {
    return api.sendMessage('Please provide a question.', event.threadID, event.messageID);
  }

  const question = args.join(' ');

  api.sendMessage("🕣 | 𝘈𝘯𝘴𝘸𝘦𝘳𝘪𝘯𝘨....", event.threadID, event.messageID);

  try {
    const response = await axios.get(`https://reikodev.spiritii.repl.co/api/gpt4?query=${encodeURIComponent(question)}`);

    if (response.status !== 200) {
      throw new Error('API request failed');
    }

    const reply = response.data.reply;

    api.sendMessage(reply, event.threadID, event.messageID);

    const gttsInstance = new gtts(reply, 'en-us');
    const gttsPath = path.join(__dirname, 'voicebox.mp3');

    gttsInstance.save(gttsPath, (error, result) => {
      if (error) {
        console.error("Error saving gTTS:", error);
        api.sendMessage('An error occurred while generating the audio.', event.threadID);
      } else {
        api.sendMessage({
          body: "💽 Voice Box AI",
          attachment: fs.createReadStream(gttsPath)
        }, event.threadID, () => {
          fs.unlinkSync(gttsPath);
        });
      }
    });
  } catch (error) {
    console.error('Error while making the API request:', error);
    api.sendMessage('An error occurred while processing your question.', event.threadID);
  }
};
