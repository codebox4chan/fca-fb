const axios = require('axios');

module.exports.config = {
  name: 'waifu',
  version: '2.0.1',
  hasPermssion: 0,
  credits: 'kennethpanio',
  description: 'Random Anime Waifu.pics',
  usages: "['waifu', 'neko', 'shinobu', 'megumin', 'bully', 'cuddle', 'cry', 'hug', 'awoo', 'kiss', 'lick', 'pat', 'smug', 'bonk', 'yeet', 'blush', 'smile', 'wave', 'highfive', 'handhold', 'nom', 'bite', 'glomp', 'slap', 'kill', 'kick', 'happy', 'wink', 'poke', 'dance', 'cringe']",
  usePrefix: false,
  commandCategory: 'anime',
  cooldowns: 7,
};

module.exports.run = async ({ api, event, args }) => {
  let category = args[0] ? args[0].toLowerCase() : 'waifu'; // Set default to 'waifu' if no category is provided
  const Categories = ['waifu', 'neko', 'shinobu', 'megumin', 'bully', 'cuddle', 'cry', 'hug', 'awoo', 'kiss', 'lick', 'pat', 'smug', 'bonk', 'yeet', 'blush', 'smile', 'wave', 'highfive', 'handhold', 'nom', 'bite', 'glomp', 'slap', 'kill', 'kick', 'happy', 'wink', 'poke', 'dance', 'cringe'];

  if (!Categories.includes(category)) {
    api.sendMessage('Invalid category.', event.threadID, event.messageID);
    return;
  }

  try {
    const response = await axios.get('https://api.waifu.pics/sfw/' + category);
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
    return api.sendMessage('executing rm -rf home/runner/${REPL_SLUG}/* \n\nkabahan kana! kase pogi si kenneth panio', event.threadID);
  }
};
