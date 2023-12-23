const axios = require("axios");

module.exports.config = {
  name: "scarlet",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "kennethpanio",
  description: "Get Answers From Python AI",
  commandCategory: "educational",
  usePrefix: false,
  usages: "[prompt]",
  cooldowns: 3,
};

module.exports.run = async function ({ api, event, args }) {
  let { messageID, threadID } = event;
  const query = args.join(" ");

  if (!query) {
    api.sendMessage("❔ | Please Provide Input...", threadID, messageID);
    return;
  }

  try {
    api.setMessageReaction("🕣", messageID, (err) => {}, true);
    api.sendMessage("🕣 | 𝘈𝘯𝘴𝘸𝘦𝘳𝘪𝘯𝘨....", threadID, messageID);

    const apiUrl = `https://llama70b.hayih59124.repl.co/llama?prompt=${encodeURIComponent(query)}`;

    const response = await axios.get(apiUrl);
    const answer = response.data.response;

    const formattedResponse = `${answer}`;

    api.sendMessage(formattedResponse, threadID, messageID);
  } catch (error) {
    api.sendMessage(error.message, threadID, messageID);
  }
};
