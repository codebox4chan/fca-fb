const axios = require('axios');

module.exports.config = {
    name: "chrome",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "XyryllPanget", //just remade by Blue
    description: "Search on Chrome for a given query",
    commandCategory: "search",
  usePrefix: true,
    usages: "",
    cooldowns: 2,
};

module.exports.run = async function({ api, event, args }) {
    const query = args.join(' ');
    if (!query) {
        api.sendMessage("Please provide a search query.", event.threadID);
        return;
    }

    const cx = "7514b16a62add47ae"; // Replace with your Custom Search Engine ID
    const apiKey = "AIzaSyAqBaaYWktE14aDwDE8prVIbCH88zni12E"; // Replace with your API key
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${query}`;

    try {
        const response = await axios.get(url);
        const searchResults = response.data.items.slice(0, 10);
        let message = `Top 10 results for '${query} Searching on Chrome':\n\n`;
        searchResults.forEach((result, index) => {
            message += `${index + 1}. ${result.title}\n${result.link}\n${result.snippet}\n\n`;
        });
        api.sendMessage(message, event.threadID);
    } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while searching Chrome.", event.threadID);
    }
};


