const axios = require("axios");

module.exports.config = {
  name: "history",
  version: "1.1.0",
  hasPermssion: 0,
  credits: "Blue",
  description: "Get information about historical events or topics.",
  usePrefix: true,
  commandCategory: "educational",
  cooldowns: 5,
  usages: "[search_query]",
};

module.exports.run = async function ({ api, event, args }) {
  const searchQuery = args.join(" ");

  if (!searchQuery) {
    return api.sendMessage("Please provide a search query (e.g., history World War 3).", event.threadID);
  }

  try {
    const response = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(searchQuery)}`);

    if (response.data.title && response.data.extract) {
      const title = response.data.title;
      const extract = response.data.extract;

      api.sendMessage(`Information about "${title}":\n${extract}`, event.threadID);
    } else {
      api.sendMessage(`No information found for "${searchQuery}".`, event.threadID);
    }
  } catch (error) {
    console.error("Error fetching historical information:", error);
    api.sendMessage("An error occurred while fetching historical information.", event.threadID);
  }
};