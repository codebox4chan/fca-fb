module.exports.config = {
  name: "research",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "August Quinn",
  description: "Search information on ResearchGate",
  usages: "[topic]",
  usePrefix: false,
  commandCategory: "educational",
  cooldowns: 5,
};

module.exports.run = async ({ api, event, args }) => {
  const google = require("googlethis");
  let query = args.join(" ");
  const options = {
    page: 0,
    safe: false,
    additional_params: {
      hl: "en",
    },
  };

  if (!query) {
    return api.sendMessage(
      "┌───═━┈━═───┐ 𝗠𝗜𝗦𝗦𝗜𝗡𝗚 𝗜𝗡𝗣𝗨𝗧! └───═━┈━═───┘\n\n𝗥𝗲𝘀𝗲𝗮𝗿𝗰𝗵 𝗶𝗻𝗽𝘂𝘁 <𝗧𝗶𝘁𝗹𝗲 𝘁𝗼𝗽𝗶𝗰> 𝗰𝗮𝗻𝗻𝗼𝘁 𝗯𝗲 𝗹𝗲𝗳𝘁 𝗯𝗹𝗮𝗻𝗸!",
      event.threadID
    );
  }

  api.sendMessage(`✦ 𝗦𝗘𝗔𝗥𝗖𝗛𝗜𝗡𝗚 ✦\n"${query}"`, event.threadID, event.messageID);

  const response = await google.search(`site:researchgate.net ${query}`, options);

  let results = "";
  for (let i = 0; i < 5; i++) {
    let title = response.results[i].title || 'No Data';
    let author = response.results[i].description || 'No Data';
    let link = response.results[i].url + ".pdf" || 'No Data';

    results += `\n 📄𝗥𝗘𝗦𝗘𝗔𝗥𝗖𝗛 𝗣𝗔𝗣𝗘𝗥 ${i + 1}:\n\n𝗧𝗜𝗧𝗟𝗘: ${title}\n\n𝗗𝗘𝗦𝗖𝗥𝗜𝗣𝗧𝗜𝗢𝗡: ${author}\n\n𝗟𝗜𝗡𝗞: [𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱 ∇ 𝗣𝗗𝗙!] ${link}\n\n`;
  }

  api.sendMessage(results, event.threadID, event.messageID);
};
