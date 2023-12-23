const axios = require("axios");

module.exports.config = {
  name: "jokes",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "August Quinn",
  description: "Get random jokes from the Official Joke API",
  commandCategory: "fun",
  usePrefix: true,
  usages: "",
  cooldowns: 5
};

const apiEndpoint = "https://official-joke-api.appspot.com/random_joke";

module.exports.run = async function({ api, event }) {
  try {
    const response = await axios.get(apiEndpoint);
    const joke = response.data;

    const jokeMessage = `🃏 Here's a joke for you:\n\n𝗖𝗔𝗧𝗘𝗚𝗢𝗥𝗬: ${joke.type}\n𝗦𝗘𝗧𝗨𝗣: ${joke.setup}\n𝗣𝗨𝗡𝗖𝗛𝗟𝗜𝗡𝗘: ${joke.punchline}`;
    api.sendMessage(jokeMessage, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage("An error occurred while fetching jokes. Please try again later.", event.threadID, event.messageID);
    console.error("Jokes API Error:", error.message);
  }
};