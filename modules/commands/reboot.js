module.exports.config = {
	name: "reboot",
	version: "1.0.0",
	hasPermssion: 0,
	credits: 'yolo guy',
	description: "Restart the Bot",
	commandCategory: "system",
	usages: "",
  usePrefix: false,
	cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
	const { threadID, messageID } = event;
	return api.sendMessage(`Rebooting!`, threadID, () => process.exit(1));
}