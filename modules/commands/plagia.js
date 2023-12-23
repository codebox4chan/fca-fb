const axios = require('axios');

module.exports.config = {
  name: "plagia",
  hasPermssion: 0,
  version: "1.0.0",
  credits: "August Quinn",
  description: "Check for plagiarism powered by Winston AI.",
  commandCategory: "tools",
  usePrefix: false,
  usage: "[content]",
  cooldowns: 5,
  requiredArgs: 1,
};

module.exports.run = async ({ api, event, args }) => {
  const text = args.join(' ');

  if (!text) {
    api.sendMessage("Please provide content to analyze for plagiarism.", event.threadID, event.messageID);
    return;
  }

  try {
    const response = await axios.post('http://plagiarism-detector.august-quinn-api.repl.co/result', { text });
    const result = response.data;

    let message = `𝗣𝗟𝗔𝗚𝗜𝗔𝗥𝗜𝗦𝗠 𝗦𝗖𝗢𝗥𝗘: ${result.plagia_score}\n\n`;

    if (result.items && result.items.length > 0) {
      result.items.forEach((item, index) => {
        message += `✅ 𝗖𝗔𝗡𝗗𝗜𝗗𝗔𝗧𝗘 ${index + 1}:\n\n- 𝗨𝗥𝗟: ${item.candidates[0].url}\n- 𝗣𝗟𝗔𝗚𝗜𝗔𝗥𝗜𝗦𝗠 𝗦𝗖𝗢𝗥𝗘: ${item.candidates[0].plagia_score}\n- 𝗣𝗥𝗘𝗗𝗜𝗖𝗧𝗜𝗢𝗡: ${item.candidates[0].prediction}\n\n`;
      });

      api.sendMessage(message, event.threadID, event.messageID);
    } else {
      api.sendMessage("No plagiarism candidates found.", event.threadID, event.messageID);
    }
  } catch (error) {
    console.error('[ERROR]', error);
    api.sendMessage("An error occurred while checking for plagiarism.", event.threadID, event.messageID);
  }
};