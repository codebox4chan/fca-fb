const axios = require('axios');
const fs = require('fs');
const path = require('path');
 
module.exports.config = {
  name: 'nasa',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'August Quinn',
  description: 'Search for NASA images and information.',
  commandCategory: 'image',
  usePrefix: false,
  usages: '[image/search] [query]',
  cooldowns: 5,
};
 
module.exports.run = async function ({ api, event, args }) {
  if (args.length < 2) {
    api.sendMessage('Invalid command. Please use one of the following formats:\n/Nasa image [query]\n/Nasa search [query]', event.threadID, event.messageID);
    return;
  }
 
  const apiKey = 'PH3BOkVhDPj2TAQKafwWTfECMFQpuQda7itIO8Ah';
  const command = args[0];
  const query = args.slice(1).join(' ');
 
  try {
    if (command === 'image') {
      const response = await axios.get(`https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      });
 
      if (response.data && response.data.collection && response.data.collection.items && response.data.collection.items.length > 0) {
        const items = response.data.collection.items.slice(0, 10);
        const attachments = [];
 
        for (const item of items) {
          const imageUrl = item.links[0].href;
          const imageStream = await axios.get(imageUrl, { responseType: 'stream' });
 
          const imagePath = path.join(__dirname, '/cache', path.basename(imageUrl));
          const writer = fs.createWriteStream(imagePath);
 
          imageStream.data.pipe(writer);
 
          await new Promise((resolve) => {
            writer.on('finish', resolve);
          });
 
          attachments.push(fs.createReadStream(imagePath));
        }
 
        api.sendMessage({ body: 'NASA Images:', attachment: attachments }, event.threadID, event.messageID);
      } else {
        api.sendMessage('No NASA images found for the specified query.', event.threadID, event.messageID);
      }
    } else if (command === 'search') {
      const response = await axios.get(`https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      });
 
      if (response.data && response.data.collection && response.data.collection.items && response.data.collection.items.length > 0) {
        const items = response.data.collection.items.slice(0, 5);
        const results = [];
 
        for (const item of items) {
          const info = {
            title: item.data[0].title,
            description: item.data[0].description,
            keywords: item.data[0].keywords.join(', '),
          };
          results.push(info);
        }
 
        const resultText = results.map((result, index) => `   — Result ${index + 1}:\n𝗧𝗜𝗧𝗟𝗘: ${result.title}\n𝗗𝗘𝗦𝗖𝗥𝗜𝗣𝗧𝗜𝗢𝗡: ${result.description}\n𝗞𝗘𝗬𝗪𝗢𝗥𝗗𝗦: ${result.keywords}\n`).join('\n');
 
        api.sendMessage(`🌟 Search results for "${query}":\n\n${resultText}`, event.threadID, event.messageID);
      } else {
        api.sendMessage('No NASA search results found for the specified query.', event.threadID, event.messageID);
      }
    }
  } catch (error) {
    console.error(error);
    api.sendMessage('An error occurred while fetching NASA data.', event.threadID, event.messageID);
  }
};
