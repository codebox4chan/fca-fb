const axios = require("axios");

module.exports.config = {
  name: "bored",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "August Quinn",
  description: "Get random activity suggestions",
  commandCategory: "fun",
  usePrefix: false,
  usages: "",
  cooldowns: 5
};

const apiEndpoint = "https://www.boredapi.com/api/activity";

module.exports.run = async function({ api, event }) {
  try {
    const response = await axios.get(apiEndpoint);
    const activity = response.data.activity;

    api.sendMessage(`Feeling bored?\n\nHow about: ${activity}.`, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage("An error occurred while fetching activity suggestions. Please try again later.", event.threadID, event.messageID);
    console.error("Bored API Error:", error.message);
  }
};