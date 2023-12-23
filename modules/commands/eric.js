module.exports.config = {
  name: `eric`,
  version: "1.0.0",
  hasPermssion: 0,
  credits: "JOHN RÉ PORAS",
  description: "ERIC (Education Resources Information Center) Ed Gov is to serve as a comprehensive online resource for education-related research, information, and resources.",
  usages: "[query]",
  usePrefix: true,
  commandCategory: "educational",
  cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  const axios = global.nodemodule["axios"];
  const google = require("googlethis");
  let query = args.join(" ");
  const options = {
    page: 0,
    safe: false,
    additional_params: {
      hl: "en",
    },
  };

  api.sendMessage(`🔎 𝖲𝖾𝖺𝗋𝖼𝗁𝗂𝗇𝗀 𝖿𝗈𝗋 "${query}..."`, event.threadID, event.messageID);

  const response = await google.search(`site:eric.ed.gov ${query}`, options);

  let results = "";
  for (let i = 0; i < 10; i++) {
    let title = response.results[i].title;
    let description = response.results[i].description;
    let url = response.results[i].url;
    results += `📌 ${i + 1}:\n\n𝗧𝗜𝗧𝗟𝗘: ${title}\n\n𝗗𝗘𝗦𝗖𝗥𝗜𝗣𝗧𝗜𝗢𝗡: ${description}\n\n𝗨𝗥𝗟: ${url}\n\n━━━━━━━━━━━━━\n\n`;
  }

  api.sendMessage(results, event.threadID, event.messageID);
};
    