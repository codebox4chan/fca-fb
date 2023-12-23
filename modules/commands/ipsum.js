const axios = require("axios");
module.exports.config = {
    name: "ipsum",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Prince Sanel",
    description: "Generate word by length.",
    usePrefix: true,
    commandCategory: "Random",
    usages: "[Word no.]",
    cooldowns: 3,
};
module.exports.run = async function({ api, event, args }) {
	var { threadID, messageID } = event;
	try {
		const req = args[0];
		if (!args[0]) return api.sendMessage("[!] Require a length of the word", threadID, messageID);
		const res = await axios(`https://sensui-useless-apis.codersensui.repl.co/api/tools/lorem-ipsum?length=${encodeURI(req)}`);
		api.sendMessage(`❯ ${req} word Ipsum:\n\n»» ${res.data.loremIpsum}`, threadID, messageID);
	} catch (error) {
		api.sendMessage("[!] An error occured while fetching ipsum api.", threadID, messageID);
	}
}