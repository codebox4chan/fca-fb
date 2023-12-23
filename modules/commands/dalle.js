const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports.config = {
  name: 'dalle',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'Yan Maglinte',
  description: 'A Text to Image Generator using your own Openai API key',
  usePrefix: true,
  commandCategory: 'image',
  usages: '[images of a duck -3], [a kitten]',
  cooldowns: 0,
};

module.exports.run = async function({ api, event, args }) {
  const apiUrl = 'http://main.yanmaglinte.repl.co/api/dalle';
  let text = args.join(' ');
  if (!text) {
    return api.sendMessage('Please provide a prompt to initiate the command❗', event.threadID, event.messageID);
  }

  api.sendMessage(`⌛Generating ${text}, please wait...`, event.threadID);
  api.setMessageReaction("⌛", event.messageID, (err) => {}, true);

  const requestData = {
    prompt: text,
    apiKey: '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', // PLEASE INSERT YOU APIKEY HERE
  };

  axios
    .post(apiUrl, requestData)
    .then(async (response) => {
      const imageUrls = response.data.data.map((item) => item.url);

      for (const imageUrl of imageUrls) {
        const imagePath = path.join(__dirname, 'cache', 'dalle', '1.jpg');
        const imageDirectory = path.dirname(imagePath);

        if (!fs.existsSync(imageDirectory)) {
          fs.mkdirSync(imageDirectory, { recursive: true });
        }

        try {
          const { data } = await axios.get(imageUrl, { responseType: 'arraybuffer' });
          fs.writeFileSync(imagePath, Buffer.from(data, 'binary'));

          const imageAttachment = fs.createReadStream(imagePath);
          api.sendMessage({ attachment: imageAttachment }, event.threadID);
          api.setMessageReaction("✅", event.messageID, (err) => {}, true);
        } catch (error) {
          console.error('Image Error:', error);
          api.sendMessage('⚠️ Failed to generate the image. Please try again.', event.threadID, event.messageID);
          api.setMessageReaction("❌", event.messageID, (err) => {}, true);
        }
      }
    })
    .catch((error) => {
      console.error('API Error:', error);
      api.sendMessage('⚠️ Something went wrong. Please try again.', event.threadID, event.messageID);
      api.setMessageReaction("❌", event.messageID, (err) => {}, true);
    });
};
