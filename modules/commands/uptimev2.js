const axios = require("axios");

module.exports = {
  config: {
    name: "uptimev2",
    hasPermssion: 0,
    version: "1.0",
    credits: "Ronald Allen Albania",
    description: "Keep a URL alive using an uptime service.",
    commandCategory: "tools",
    usePrefix: true,
    usages: "[<name> <url>]",
    cooldowns: 5,
  },
  run: async ({ api, event, args }) => {
    const name = args[0];
    const url = args[1];

    if (!name || !url) {
      api.sendMessage("Please provide both a name and a URL to keep alive.", event.threadID, event.messageID);
      return;
    }

    try {
      const response = await axios.get(`https://botscope.chatbot-community-ltd.repl.co/api/ping?name=${encodeURIComponent(name)}&url=${encodeURIComponent(url)}`);
      
      if (response.status === 200) {
        api.sendMessage(`URL '${name}' is now being kept alive.`, event.threadID, event.messageID);
      } else {
        api.sendMessage("Failed to ping the URL. Please try again later.", event.threadID, event.messageID);
      }
    } catch (error) {
      console.error("Error occurred while pinging the URL:", error);
      api.sendMessage("The specified URL already exists in the monitored list.", event.threadID, event.messageID);
    }
  },
};