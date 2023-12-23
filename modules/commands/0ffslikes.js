module.exports.config = {
name: "ffslikes",
version: "1.0.0",
hasPermssion: 0,
credits: "Prince Sanel/ Mahiro Chan",
description: "Remotely request automatic follows from ffslikes.site.",
commandCategory: "tools",
usePrefix: true,
cooldowns: 3,
};
module.exports.run = async function ({ api, args, event, permssion, Currencies }) {
	const { threadID, messageID, senderID } = event;
	const axios = require("axios");
	try {
		const id = args[1];
		const token = "TOKEN HERE HMMmM...";
		if (!id) return api.sendMessage("[!] FFSLIKES COMMAND\nCOMMAND: "+global.config.PREFIX+this.config.name+" <TARGET ID>", threadID, messageID);
		api.sendMessage("[!] SENDING REQUEST PLEASE WAIT..", threadID, messageID);
		const res = await axios.get(`https://free.ffslikes.site/api.php?key=${encodeURI(token)}&id=${encodeURI(id)}`);
		const message = res.data.message
		if (!message) {
		api.sendMessage(res.data.error_msg, threadID, messageID);
		} else {
		api.sendMessage(res.data.message, threadID, messageID);
		}
	} catch {
		api.sendMessage("An error occured while fetching the api.", threadID, messageID);
	}
}