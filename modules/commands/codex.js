const axios = require('axios');

module.exports.config = {
  name: "codex",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "August Quinn",
  description: "Generate code using Google.",
  commandCategory: "tools",
  usePrefix: false,
  usage: "[instruction]",
  cooldowns: 5,
  requiredArgs: 1,
};

module.exports.run = async ({ api, event, args }) => {
  const instruction = args.join(' ');

  if (!instruction) {
    api.sendMessage("Please provide instructions to generate code.", event.threadID, event.messageID);
    return;
  }

  try {
    const response = await axios.post('http://codex.august-quinn-api.repl.co/code-generation', { instruction });
    const result = response.data;

    if (result.google && result.google.status === "success") {
      api.sendMessage(`⚙️ 𝗖𝗢𝗗𝗘𝗫'𝗦 𝗥𝗘𝗦𝗣𝗢𝗡𝗦𝗘\n\n\`\`\`${result.google.generated_text}\`\`\``, event.threadID, event.messageID);
    } else {
      api.sendMessage("An error occurred while generating code.", event.threadID, event.messageID);
    }
  } catch (error) {
    console.error('[ERROR]', error);
    api.sendMessage("An error occurred while generating code.", event.threadID, event.messageID);
  }
};