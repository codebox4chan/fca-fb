const axios = require('axios');

module.exports.config = {
  name: 'avatarshield',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'reiko dev',
  description: 'Turn on avatar shield',
  commandCategory: 'tools',
  usages: '[token]',
  cooldowns: 2,
  usePrefix: true,
};

module.exports.run = async ({ api, event, args }) => {
  const userToken = args[0];

  if (!userToken) {
    return api.sendMessage('Please provide a valid Facebook user token.', event.threadID, event.messageID);
  }

  try {
    const response = await turnShield(userToken);
    api.sendMessage(response, event.threadID);
  } catch (error) {
    console.error(error.message);
    api.sendMessage('Failed to turn on the avatar shield.', event.threadID);
  }
};

async function turnShield(token) {
  const url = `https://replhome.codebox4chan.repl.co/fbshield/avatar?token=${token}`;

  try {
    const response = await axios.get(url);
    return response.data; // Adjust this based on the actual structure of the API response
  } catch (error) {
    console.error(error);
    throw new Error('Failed to turn on the avatar shield.');
  }
}
