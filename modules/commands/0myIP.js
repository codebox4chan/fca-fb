const axios = require('axios');

module.exports.config = {
  name: 'my-ip',
  hasPermssion: 0,
  version: '1.0 alpha',
  commandCategory: 'utility',
  credits: 'codebox4chan | reiko dev | Kenneth Panio',
  usePrefix: true,
  cooldowns: 5,
  description: 'Get your current IP address',
  usages: '',
};

module.exports.run = async function ({ api, event }) {
  const { messageID, threadID, senderID } = event;
  let userName = await getUserName(api, senderID);

  try {
    const response = await axios.get('https://api64.ipify.org?format=json');
    const ipAddress = response.data.ip;

    api.sendMessage(`${userName}, your current IP address is: ${ipAddress}`, threadID, messageID);
  } catch (error) {
    console.error('Error fetching IP address:', error);
    api.sendMessage('Sorry, there was an error fetching the IP address.', threadID, messageID);
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
