const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports.config = {
  name: 'robohash',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'August Quinn',
  description: 'Generate a robot avatar image',
  commandCategory: 'image',
  usePrefix: false,
  usages: '[text]',
  cooldowns: 3,
};

module.exports.run = async function ({ api, event, args }) {
  try {
    const text = args.join(' ');
    const apiUrl = `https://robohash.org/${encodeURIComponent(text)}.png`;

    api.sendMessage('Generating a robot avatar image. Please wait...', event.threadID, event.messageID);

    const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });

    if (response.status === 200 && response.data) {
      const pathToAvatar = path.join(__dirname, 'cache', 'robohash.png');
      fs.writeFileSync(pathToAvatar, Buffer.from(response.data, 'binary'));

      api.sendMessage({
        body: 'Here is the result:',
        attachment: fs.createReadStream(pathToAvatar),
      }, event.threadID, () => fs.unlinkSync(pathToAvatar));
    } else {
      api.sendMessage('Failed to generate the robot avatar image.', event.threadID, eventMessageID);
    }
  } catch (error) {
    console.error('Error:', error);
    api.sendMessage('An error occurred while generating the robot avatar image.', event.threadID, eventMessageID);
  }
};