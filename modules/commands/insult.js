const axios = require("axios");

module.exports.config = {
  name: "insult",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "August Quinn",
  description: "Generate insults using the Evil Insult Generator API",
  commandCategory: "fun",
  usePrefix: true,
  usages: "",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const apiEndpoint = "https://evilinsult.com/generate_insult.php?lang=en&type=json";

  try {
    const response = await axios.get(apiEndpoint);
    const insult = response.data.insult;

    api.sendMessage(`🙉 𝗥𝗔𝗡𝗗𝗢𝗠 𝗜𝗡𝗦𝗨𝗟𝗧 𝗥𝗘𝗦𝗨𝗟𝗧\n\nHere's an insult for you: ${insult}`, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage("An error occurred while generating an insult. Please try again later.", event.threadID, event.messageID);
    console.error("Evil Insult Generator API Error:", error.message);
  }
};
                                                 