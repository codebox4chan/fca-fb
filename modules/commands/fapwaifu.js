const axios = require('axios');

module.exports.config = {
  name: 'fap',
  version: '0.0.1',
  hasPermssion: 0,
  credits: 'kennethpanio',
  description: 'Random waifu nsfw Image',
  usage: '[category]',
  usePrefix: false,
  commandCategory: 'nsfw',
  cooldowns: 5,
};

module.exports.run = async ({ api, event, args }) => {
  if (args.length === 0) {
    api.sendMessage(
      'Please select category!\nAVAILABLE CATEGORIES:\nwaifu, neko, trap, blowjob',
      event.threadID,
      event.messageID
    );
    return;
  }

  const category = args[0].toLowerCase();
  const Categories = ['waifu', 'neko', 'trap', 'blowjob'];

  if (!Categories.includes(category)) {
    api.sendMessage('Invalid category.', event.threadID, event.messageID);
    return;
  }

  try {
    const response = await axios.get('https://api.waifu.pics/nsfw/' + category);
    const imageUrl = response.data.url;
    const options = { responseType: 'stream' };
    const imageResponse = await axios.get(imageUrl, options);
    const attachment = { attachment: imageResponse.data };
    api.sendMessage(attachment, event.threadID, event.messageID);
  } catch (error) {
    console.error('Something went wrong:', error);
    api.sendMessage('An error occurred. Please try again.', event.threadID, event.messageID);
  }

  if (module.exports.config.credits !== 'kennethpanio') {
    return api.sendMessage('Please make sure to give proper credits.', event.threadID);
  }
};
