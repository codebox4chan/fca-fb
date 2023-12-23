const axios = require("axios");
module.exports.config = {
    name: "convertmoney",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Prince Sanel",
    description: "Convert a money.\n ex. /convert PHP USD 100",
    usePrefix: true,
    commandCategory: "tools",
    usages: "[Country to convert with] [Country] [Amount]",
    cooldowns: 0,
};
module.exports.run = async function({ api, event, args }) {
	var { threadID, messageID } = event;
	try {
		if (!args[0]) return api.sendMessage("[!] Need an country. like PHP", threadID, messageID);
		if (!args[1]) return api.sendMessage("[!] Need an country to convert with.", threadID, messageID);
		if (!args[2]) return api.sendMessage("[!] Need an amount to convert.", threadID, messageID);
		const res = await axios(`https://sensui-useless-apis.codersensui.repl.co/api/tools/ce?base=${args[0]}&target=${args[1]}&amount=${args[2]}`);
		api.sendMessage(`❯ Converted Amount:\n\n» Base Amount: ${res.data.amount}\n» Base: ${res.data.base}\n» Target: ${res.data.target}\n» Rate: ${res.data.rate}\n» Converted Amount: ${res.data.convertedAmount}`, threadID, messageID);
	} catch (error) {
		api.sendMessage("[!] An error occured while fetching the api.", threadID, messageID);
	}
}