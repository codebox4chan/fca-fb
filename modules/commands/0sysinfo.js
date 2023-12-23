const os = require('os');

module.exports.config = {
  name: 'sysinfo',
  hasPermssion: 0,
  version: '1.0 alpha',
  commandCategory: 'utility',
  credits: 'codebox4chan',
  usePrefix: true,
  cooldowns: 5,
  description: 'Get basic system information',
  usages: '',
};

module.exports.run = async function ({ api, event }) {
  const { messageID, threadID, senderID } = event;
  let userName = await getUserName(api, senderID);

  try {
    const systemInfo = {
      platform: os.platform(),
      architecture: os.arch(),
      totalMemory: Math.round(os.totalmem() / (1024 * 1024)) + ' MB',
      freeMemory: Math.round(os.freemem() / (1024 * 1024)) + ' MB',
      cpuModel: os.cpus()[0].model,
      cpuSpeed: os.cpus()[0].speed + ' MHz',
    };

    const infoText = Object.entries(systemInfo)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');

    api.sendMessage(`${userName}, here's some basic system information:\n${infoText}`, threadID, messageID);
  } catch (error) {
    console.error('Error fetching system information:', error);
    api.sendMessage('Sorry, there was an error fetching system information.', threadID, messageID);
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
