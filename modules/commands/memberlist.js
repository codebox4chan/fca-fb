const axios = require("axios");
const fs = require("fs");
const request = require("request");
const axiosClient = axios.create();
axiosClient.defaults.timeout = 10000;

module.exports.config = {
  name: "memberlist",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "August Quinn",
  description: "Displays a list of members in the group along with their Facebook IDs and group information.",
  commandCategory: "info",
  usePrefix: false,
  usage: "",
  cooldowns: 5
};

module.exports.run = async function ({ api, event }) {
  const threadInfo = await api.getThreadInfo(event.threadID);
  const participants = threadInfo.participantIDs;

  let message = `𝗚𝗥𝗢𝗨𝗣 𝗡𝗔𝗠𝗘: ${threadInfo.name}\n𝗚𝗥𝗢𝗨𝗣 𝗜𝗗: ${event.threadID}\n\n`;

  for (const userId of participants) {
    const userProfile = await api.getUserInfo(userId);
    const username = userProfile[userId].name;
    message += `𝗨𝗦𝗘𝗥 𝗡𝗔𝗠𝗘: ${username}\n𝗨𝗦𝗘𝗥 𝗜𝗗: ${userId}\n\n`;
  }

  api.sendMessage(message, event.threadID);
};
  