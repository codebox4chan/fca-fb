const axios = require('axios');

module.exports.config = {
  name: 'rizz',
  hasPermssion: 0,
  version: '1.0 alpha',
  commandCategory: 'fun',
  credits: 'reiko dev',
  usePrefix: false,
  cooldowns: 8,
  description: 'Get a random rizz',
  usages: '',
};

module.exports.run = async function ({ api, event }) {
  const { messageID, threadID, senderID } = event;
  let userName = await getUserName(api, senderID);

  try {
    const response = await axios.get('https://replhome.codebox4chan.repl.co/api/random-rizz');
    const rizz = response.data.pickup;

    api.sendMessage(`${userName}, ${rizz}`, threadID, messageID);
  } catch (error) {
    console.error('Error fetching random rizz:', error);
    api.sendMessage('Sorry, there was an error fetching the random rizz.', threadID, messageID);
  }
};

async function getUserName(api, userID) {
  try {
    const userInfo = await api.getUserInfo(userID);
    if (userInfo && userInfo[userID]) {
      return userInfo[userID].name;
    } else {
      return "unknown";
    }
  } catch (error) {
    return "unknown";
  }
}



