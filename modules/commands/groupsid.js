module.exports.config = {
	name: "gid",	
  version: "1.0.0", 
	hasPermssion: 0,
	credits: "kennethpanio",
	description: "group id", 
	usePrefix: false,
	commandCategory: "info",
	usages: "groupid",
	cooldowns: 5, 
	dependencies: '',
};

module.exports.run = async function({ api, event }) {
  api.sendMessage("group id : "+event.threadID, event.threadID, event.messageID);
};