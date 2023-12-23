const axios = require("axios");

module.exports.config = {
  name: "gscholarv2",
  version: "2.2",
  hasPermssion: 0,
  credits: "Hazeyy",
  description: "𝗚-𝗦𝗰𝗵𝗼𝗹𝗮𝗿- Search Citation for your research",
  commandCategory: "educational",
  usages: "[topic of your research]",
  usePrefix: false,
  cooldowns: 3,
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID } = event;

  if (!args[0]) {
    api.sendMessage("🫰 𝖯𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 (", threadID);
    return;
  }

  const query = args.join(" ");

  api.sendMessage("🕑 | 𝘚𝘦𝘢𝘳𝘤𝘩𝘪𝘯𝘨...", threadID);

  try {
    const response = await axios.get(`https://gscholar-node-scrape.kyrinwu.repl.co/search=${encodeURIComponent(query)}`);
    
    if (response.status === 200 && response.data) {
      const answers = response.data;

      let responseText = "𝗛𝗲𝗿𝗲 𝗮𝗿𝗲 𝘁𝗵𝗲 𝗮𝗻𝘀𝘄𝗲𝗿𝘀 𝗳𝗿𝗼𝗺 𝗚-𝗦𝗰𝗵𝗼𝗹𝗮𝗿 ✅:\n\n";
      for (const answer of answers) {
        responseText += `𝗧𝗶𝘁𝗹𝗲: ${answer.title}\n`;
        responseText += `𝗔𝘂𝘁𝗵𝗼𝗿𝘀: ${answer.authors.join(", ")}\n`;
        responseText += `𝗣𝘂𝗯𝗹𝗶𝗰𝗮𝘁𝗶𝗼𝗻: ${answer.publication}\n`;
        responseText += `𝗬𝗲𝗮𝗿: ${answer.year}\n`;
        responseText += `𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: ${answer.description}\n`;
        responseText += `𝗨𝗥𝗟: ${answer.url}\n`;
        responseText += `𝗖𝗶𝘁𝗮𝘁𝗶𝗼𝗻 𝗨𝗥𝗟: ${answer.citationUrl}\n`;
        responseText += `𝗥𝗲𝗹𝗮𝘁𝗲𝗱 𝗨𝗥𝗟: ${answer.relatedUrl}\n`;
        responseText += "-------------------------\n";
      }

      if (responseText) {
        api.sendMessage(responseText, threadID);
      } else {
        api.sendMessage("😿 𝖲𝗈𝗋𝗋𝗒, 𝖭𝗈 𝗋𝖾𝗅𝖾𝗏𝖺𝗇𝗍 𝖺𝗇𝗌𝗐𝖾𝗋 𝖿𝗈𝗎𝗇𝖽", threadID);
      }
    } else {
      api.sendMessage("😿 𝖲𝗈𝗋𝗋𝗒, 𝖭𝗈 𝗋𝖾𝗅𝖾𝗏𝖺𝗇𝗍 𝖺𝗇𝗌𝗐𝖾𝗋 𝖿𝗈𝗎𝗇𝖽", threadID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage("😿 𝖠𝗇 𝖤𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗌𝖾𝖺𝗋𝖼𝗁𝗂𝗇𝗀 𝗈𝗇 𝖦-𝖲𝖼𝗁𝗈𝗅𝖺𝗋", threadID);
    return;
  }
};
          