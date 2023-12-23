const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports.config = {
  name: 'rapsa',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'Your Name',
  description: 'Get rapsa information',
  commandCategory: 'info',
  usePrefix: true,
  usages: '[count]',
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  const apiUrl = 'https://replhome.codebox4chan.repl.co/api/rapsa';
  const apiKey = 'codebox4chan'; // Replace with your actual API key
  const count = args.length > 0 ? parseInt(args[0], 10) : 4;

  try {
    const response = await axios.get(apiUrl, {
      params: {
        apiKey: apiKey,
      },
    });

    if (response.data && response.data.urls && response.data.urls.length > 0) {
      const attachments = [];

      for (let i = 0; i < Math.min(count, response.data.urls.length); i++) {
        const url = response.data.urls[i].url;
        const contentExtension = response.data.urls[i].contentExtension;
        const imagePath = path.join(__dirname, '/cache', `rapsa_${i + 1}.${contentExtension}`);

        const imageStream = await axios.get(url, { responseType: 'stream' });
        const imageWriter = fs.createWriteStream(imagePath);

        await new Promise((resolve, reject) => {
          imageStream.data.pipe(imageWriter);
          imageWriter.on('finish', resolve);
          imageWriter.on('error', reject);
        });

        attachments.push({
          link: `attachment://${path.basename(imagePath)}`,
          type: 'image',
          name: `attachment.${contentExtension}`
        });
      }

      api.sendMessage({ body: `Rapsa images (count: ${count}):`, attachment: attachments }, threadID, messageID);
    } else {
      api.sendMessage('No image URLs received from the endpoint.', threadID, messageID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage('Error fetching data from the endpoint.', threadID, messageID);
  }
};
