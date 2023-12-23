const axios = require('axios');

module.exports.config = {
  name: "aidetection",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "August Quinn",
  description: "Detect AI-generated content powered by Originality AI.",
  commandCategory: "tools",
  usePrefix: true,
  usage: "[content]",
  cooldowns: 5,
  requiredArgs: 1,
};

module.exports.run = async ({ api, event, args }) => {
  const text = args.join(' ');

  if (!text) {
    api.sendMessage("Please provide content for AI detection.", event.threadID, event.messageID);
    return;
  }

  try {
    const response = await axios.post('http://ai-content-detector.august-quinn-api.repl.co/result', { text });
    const result = response.data;

    let message = `𝗔𝗜 𝗗𝗘𝗧𝗘𝗖𝗧𝗜𝗢𝗡 𝗦𝗖𝗢𝗥𝗘: ${result.originalityai.ai_score}\n\n`;

    if (result.originalityai.items && result.originalityai.items.length > 0) {
      result.originalityai.items.forEach((item) => {
        message += `✅ 𝗖𝗔𝗡𝗗𝗜𝗗𝗔𝗧𝗘:\n\n- 𝗧𝗘𝗫𝗧: ${item.text}\n\n- 𝗣𝗥𝗘𝗗𝗜𝗖𝗧𝗜𝗢𝗡: ${item.prediction}\n- 𝗔𝗜 𝗦𝗖𝗢𝗥𝗘: ${item.ai_score}\n\n`;
      });

      api.sendMessage(message, event.threadID, event.messageID);
    } else {
      api.sendMessage("No AI-generated content detected.", event.threadID, event.messageID);
    }
  } catch (error) {
    console.error('[ERROR]', error);
    api.sendMessage("An error occurred while detecting AI-generated content.", event.threadID, event.messageID);
  }
};