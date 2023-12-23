const axios = require("axios");

module.exports.config = {
  name: "advice",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "August Quinn",
  description: "Generate random advice based on a topic",
  commandCategory: "fun",
  usePrefix: true,
  usages: "[topic]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const topic = args.join(" ");
  const apiEndpoint = `https://api.adviceslip.com/advice/search/${encodeURIComponent(topic)}`;

  try {
    const response = await axios.get(apiEndpoint);
    const adviceData = response.data;

    if (adviceData.total_results === "0" || !adviceData.slips) {
      api.sendMessage(`No advice found for the topic: ${topic}`, event.threadID, event.messageID);
      return;
    }

    const randomAdvice = adviceData.slips[Math.floor(Math.random() * adviceData.slips.length)];
    const advice = randomAdvice.advice;

    api.sendMessage(`💌 𝗥𝗔𝗡𝗗𝗢𝗠 𝗔𝗗𝗩𝗜𝗖𝗘 𝗥𝗘𝗦𝗨𝗟𝗧\n\n𝗧𝗢𝗣𝗜𝗖: ${topic}\n𝗔𝗗𝗩𝗜𝗖𝗘: ${advice}`, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage("𝗜𝗡𝗩𝗔𝗟𝗜𝗗 𝗨𝗦𝗔𝗚𝗘\n\n𝗨𝗦𝗔𝗚𝗘: Advice [topic]", event.threadID, event.messageID);
    console.error("Advice API Error:", error.message);
  }
};
  