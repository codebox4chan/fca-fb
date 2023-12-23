module.exports.config = {
  name: "citizendium",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "JOHN RÉ PORAS",
  description: "This serves as a free, open, and collaborative online encyclopedia that provides information on a wide range of topics. It aims to compile knowledge from various sources and contributors around the world and make it accessible to anyone with an internet connection.",
  usage: "[query]",
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

  const languageCodes = {
    tagalog: "tl",
    japanese: "ja",
    russian: "ru",
    german: "de",
  };

  if (args[0] && languageCodes[args[0].toLowerCase()]) {
    options.additional_params.hl = languageCodes[args[0].toLowerCase()];
    query = args.slice(1).join(" ");
  }

  api.sendMessage(`🔎 Searching for "${query}" on Citizendium...`, event.threadID, event.messageID);

  const response = await google.search(`site:en.citizendium.org ${query}`, options);

  if (response.results.length > 0) {
    let title = response.results[0].title;
    let description = response.results[0].description;
    let url = response.results[0].url;

    let result = `𝗧𝗜𝗧𝗟𝗘: ${title}\n\n𝗗𝗘𝗦𝗖𝗥𝗜𝗣𝗧𝗜𝗢𝗡: ${description}\n\n𝗨𝗥𝗟: ${url}\n\n`;
    try {
      const apiResponse = await axios.get(`https://en.citizendium.org/api.php?format=json&action=query&prop=extracts&exintro&explaintext&titles=${encodeURIComponent(title)}`);
      const pages = apiResponse.data.query.pages;
      const pageId = Object.keys(pages)[0];
      const pageData = pages[pageId];
      const extract = pageData.extract || "";

      if (extract) {
        result += `SUMMARY: ${extract}\n\n`;
      }

      result += `HISTORY: ${url}/History\n`;
      result += `REFERENCES: ${url}/References\n`;
      result += `PUBLISHED: ${url}\n\n`;
      result += `All written content is available under the Creative Commons-Attribution-ShareAlike 3.0 Unported license or any later. Written content that originated in part from Wikipedia is also available under Creative Commons Attribution-NonCommercial-ShareAlike.\n\n`;
    } catch (error) {
      console.error("🚫 ERROR!\n\nError fetching API:", error);
    }

    api.sendMessage(result, event.threadID, event.messageID);
  } else {
    api.sendMessage("🚫 INVALID!\n\nNo results found for the given query.", event.threadID);
  }
};
  