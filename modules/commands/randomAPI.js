const axios = require('axios');

module.exports.config = {
  name: "randomapi",
  version: "1.1.0",
  hasPermssion: 0,
  credits: "August Quinn",
  description: "Fetch a random entry from the Public APIs database.",
  commandCategory: "tools",
  usePrefix: true,
  usages: "",
  cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
  try {
    
    const apiUrl = "https://api.publicapis.org/random";

    const response = await axios.get(apiUrl);

    const randomEntry = response.data.entries[0];

    const message = `🔍 𝗥𝗔𝗡𝗗𝗢𝗠 𝗣𝗨𝗕𝗟𝗜𝗖 𝗔𝗣𝗜 𝗘𝗡𝗧𝗥𝗬:\n\n▣ 𝗧𝗜𝗧𝗟𝗘: ${randomEntry.API}\n▣ 𝗗𝗘𝗦𝗖𝗥𝗜𝗣𝗧𝗜𝗢𝗡: ${randomEntry.Description}\n▣ 𝗨𝗥𝗟: ${randomEntry.Link}`;

    api.sendMessage(message, event.threadID, event.messageID);
  } catch (error) {
    console.error("Error fetching random Public API entry:", error);
    api.sendMessage("Error fetching random Public API entry. Please try again later.", event.threadID, event.messageID);
  }
};