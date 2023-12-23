const fs = require("fs");

module.exports.config = {
  name: "set",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "Joshua Sy",
  description: "change the bot's prefix.",
  commandCategory: "admin",
  usePrefix: true,
  usages: "[newPrefix]",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, senderID } = event;

  const getUserInfo = async (api, userID) => {
    try {
      const userInfo = await api.getUserInfo(userID);
      return userInfo[userID].name;
    } catch (error) {
      console.error(`Error fetching user info: ${error}`);
      return "";
    }
  };

  const userName = await getUserInfo(api, senderID);

  if (args.length === 0) {
    const currentPrefix = global.config.PREFIX;
    const response = `🤖 Oh hello there, ${userName}! My current prefix is ${currentPrefix}. Would you like to change it? You can use “Set prefix [newPrefix]” to do that.`;
    api.sendMessage(response, threadID, event.messageID);
    return;
  }

  if (args.length !== 2 || args[0] !== "prefix") {
    api.sendMessage(`⚠️ Invalid execution. Usage: “Set prefix [newPrefix]”`, threadID, event.messageID);
    return;
  }

  const newPrefix = args[1];
  global.config.PREFIX = newPrefix;

  fs.writeFileSync("config.json", JSON.stringify(global.config, null, 2));

  api.sendMessage(`✅ Prefix changed to: ${newPrefix}`, threadID, event.messageID);
};