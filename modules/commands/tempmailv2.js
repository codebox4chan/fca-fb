const axios = require("axios");

module.exports.config = {
	name: "tempmailv2",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Hazeyy",
	description: "( 𝙏𝙚𝙢𝙥𝙢𝙖𝙞𝙡𝙫2 )",
	commandCategory: "tools",
  usePrefix: true,
  usages: "( Gen Random Email address ) ",
	cooldowns: 3
};

module.exports.run = async ({ api, event, args }) => {

	if (args[0] === "gen") {
		try {
			const response = await axios.get("https://hazeyy-api-tempmailv2.kyrinwu.repl.co/get");
			const responseData = JSON.stringify(response.data, null, 2);
			api.sendMessage(`[] 𝙏𝙚𝙢𝙥𝙢𝙖𝙞𝙡 ✉️ []\n\n ${responseData} `, event.threadID);
		} catch (error) {
			console.error("🔴 𝖤𝗋𝗋𝗈𝗋", error);
			api.sendMessage("🔴 𝖴𝗇𝖾𝗑𝗉𝖾𝖼𝗍𝖾𝖽 𝖤𝗋𝗋𝗈𝗋, 𝖶𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝖾𝗆𝖺𝗂𝗅 𝖺𝖽𝖽𝗋𝖾𝗌𝗌...", event.threadID);
		}
	} else if (args[0].toLowerCase() === "inbox" && args.length === 2) {
		const email = args[1];
		try {
			const response = await axios.get(`https://hazeyy-api-tempmailv2.kyrinwu.repl.co/get/${email}`);
			const inboxMessages = response.data;
			api.sendMessage(`[] 𝙏𝙚𝙢𝙥𝙢𝙖𝙞𝙡 𝙄𝙣𝙗𝙤𝙭 📩 []\n\n${JSON.stringify(inboxMessages, null, 2)}`, event.threadID);
		} catch (error) {
			console.error("🔴 𝖤𝗋𝗋𝗈𝗋", error);
			api.sendMessage("🔴 𝖴𝗇𝖾𝗑𝗉𝖾𝖼𝗍𝖾𝖽 𝖤𝗋𝗋𝗈𝗋, 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋...", event.threadID);
		}
	} else {
		api.sendMessage("🔴 𝖨𝗇𝗏𝖺𝗅𝗂𝖽 𝖢𝗈𝗆𝗆𝖺𝗇𝖽, 𝖯𝗅𝖾𝖺𝗌𝖾 𝗎𝗌𝖾 '𝗀𝖾𝗇𝗆𝖺𝗂𝗅𝗏2 𝗀𝖾𝗇' 𝗍𝗈 𝗀𝖾𝗇𝖾𝗋𝖺𝗍𝖾 𝖺 𝗋𝖺𝗇𝖽𝗈𝗆 𝗍𝖾𝗆𝗉𝗈𝗋𝖺𝗋𝗒 𝖾𝗆𝖺𝗂𝗅 𝖺𝖽𝖉𝗋𝖾𝗌𝗌 𝗈𝗋 '𝗀𝖾𝗇𝗆𝖺𝗂𝗅 𝗂𝗇𝖻𝗈𝗑 (𝗂𝗇𝖻𝗈𝗑)' 𝗍𝗈 𝗏𝗂𝖾𝗐 𝗍𝗁𝖾 𝗂𝗇𝖻𝗈𝗑 𝗆𝖾𝗌𝗌𝖺𝗀𝖾𝗌...", event.threadID);
	}
};
      