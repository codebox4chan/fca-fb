const axios = require('axios');

module.exports.config = {
  name: "fbshare",
  version: "0.0.1",
  hasPermssion: 0,
  credits: "reiko",
  usePrefix: true,
  description: "Boost shares on Facebook Post using an API",
  commandCategory: "tools",
  usages: "[token] [link] [amount] [interval (optional)]",
  cooldowns: 0,
};

module.exports.run = async ({ api, event, args }) => {
  try {
    if (args.length < 3 || args.length > 4) {
      api.sendMessage('Invalid number of arguments. Usage: !fbshare [token] [url] [amount] [interval (optional not needed)]', event.threadID);
      return;
    }

    const accessToken = args[0];
    const shareUrl = args[1];
    const shareAmount = parseInt(args[2]);
    const customInterval = args[3] ? parseInt(args[3]) : 1;

    if (isNaN(shareAmount) || shareAmount <= 0 || (args[3] && isNaN(customInterval)) || (args[3] && customInterval <= 0)) {
      api.sendMessage('Invalid share amount or interval. Please provide valid positive numbers.', event.threadID);
      return;
    }

    const apiKey = 'aHR0cHM6Ly9yZXBsaG9tZS5jb2RlYm94NGNoYW4ucmVwbC5jby9zaGFyZT8=';
    const codebox4chan = Buffer.from(apiKey, 'base64').toString('utf-8');
    const reikodev = `${codebox4chan}token=${accessToken}&link=${shareUrl}&amount=${shareAmount}&customInterval=${customInterval}`;

    const kennethpanio = await axios.get(reikodev);
    const result = kennethpanio.data.message || 'Token is no longer valid, please replace and use a valid token!';

    api.sendMessage(result, event.threadID);
  } catch (error) {
    console.error('Error:', error);
  }
};
