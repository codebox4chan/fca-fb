const axios = require("axios");

module.exports.config = {
  name: "gscholar",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Anjelo Cayao Arabis",
  description: "Search for articles on Google Scholar.",
  commandCategory: "educational",
  usePrefix: false,
  usages: "[query]",
  cooldowns: 3,
};

module.exports.run = async function ({ api, event, args }) {
  const query = args.join(" ");

  if (!query) {
    return api.sendMessage("Please provide a query to search on Google Scholar.", event.threadID);
  }

  api.sendMessage("🔍 Processing your request...", event.threadID);

  try {
    const response = await axios.get(`https://official-anjelo-api-latest-aug-16-2023.yukihirasomaa.repl.co/gscholar?query=${encodeURIComponent(query)}`);

    if (response.data.error) {
      return api.sendMessage(response.data.error, event.threadID);
    }

    const result = response.data.result;
    api.sendMessage(result, event.threadID);
  } catch (error) {
    console.error(error);
    api.sendMessage("An error occurred while processing the request.", event.threadID);
  }
};