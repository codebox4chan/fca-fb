const axios = require('axios');
//

module.exports.config = {
	name: "apimarket",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Jonell Magallanes",
	description: "Search API endpoints via market command",
	commandCategory: "tools",
  usePrefix: true,
	cooldowns: 5,
	dependencies: {
		"axios": ""
	}
};

module.exports.run = async ({ api, event, args }) => {
	const query = args.join(" ");
	if (!query) return api.sendMessage("Please provide search keywords.", event.threadID);

	const apiUrl = `https://api-market-by-jonell-cc.hutchin.repl.co/market/?search=${encodeURIComponent(query)}`;

	try {
		const response = await axios.get(apiUrl);
		const searchResults = response.data;

		if (searchResults.length === 0) {
			return api.sendMessage("No results found for your search.", event.threadID);
		}

		let message = '🛒 Market Api Search Results:\n\n';
		searchResults.forEach((result, index) => {
			message += `${index + 1}. Name:${result.name}\n\nDescription:${result.description}\n\nEndpoint: ${result.link}\n\nApiOwner:${result.ApiOwner}\n\n==============================\n\n`;
		});

		api.sendMessage(message, event.threadID);
	} catch (error) {
		console.error(error);
		api.sendMessage("An error occurred while trying to search the market.", event.threadID);
	}
};