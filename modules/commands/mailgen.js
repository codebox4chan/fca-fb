const axios = require("axios");

module.exports.config = {
	name: "mail",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "imtiaz",
	description: "( 𝙏𝙚𝙢𝙥𝙢𝙖𝙞𝙡 )",
	commandCategory: "tools",
  usages: "( Gen Random Email address ) ",
  usePrefix: false,
	cooldowns: 3
};

module.exports.run = async ({ api, event, args }) => {

	if (args[0] === "gen") {
		try {
			const response = await axios.get("https://imtiaz.x-sakibin.repl.co/get");
			const responseData = JSON.stringify(response.data, null, 2);
			api.sendMessage(`[] 𝙏𝙚𝙢𝙥𝙢𝙖𝙞𝙡 ✉️ []\n\n ${responseData} `, event.threadID);
		} catch (error) {
			console.error("🔴 𝖤𝗋𝗋𝗈𝗋", error);
			api.sendMessage("🔴 𝖴𝗇𝖾𝗑𝗉𝖾𝖼𝗍𝖾𝖽 𝖤𝗋𝗋𝗈𝗋, 𝖶𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝖾𝗆𝖺𝗂𝗅 𝖺𝖽𝖽𝗋𝖾𝗌𝗌...", event.threadID);
		}
	} else if (args[0].toLowerCase() === "inbox" && args.length === 2) {
		const email = args[1];
		try {
			const response = await axios.get(`https://imtiaz.x-sakibin.repl.co/inbox/${email}`);
			const inboxMessages = response.data;
			api.sendMessage(`[] 𝙏𝙚𝙢𝙥𝙢𝙖𝙞𝙡 𝙄𝙣𝙗𝙤𝙭 📩 []\n\n${JSON.stringify(inboxMessages, null, 2)}`, event.threadID);
		} catch (error) {
			console.error("🔴 𝖤𝗋𝗋𝗈𝗋", error);
			api.sendMessage("🔴 𝖴𝗇𝖾𝗑𝗉𝖾𝖼𝗍𝖾𝖽 𝖤𝗋𝗋𝗈𝗋, 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋...", event.threadID);
		}
	} else {
		api.sendMessage("🔴 𝖨𝗇𝗏𝖺𝗅𝗂𝖽 𝖢𝗈𝗆𝗆𝖺𝗇𝖽, 𝖯𝗅𝖾𝖺𝗌𝖾 𝗎𝗌𝖾 'imtumail 𝗀𝖾𝗇' 𝗍𝗈 𝗀𝖾𝗇𝖾𝗋𝖺𝗍𝖾 𝖺 𝗋𝖺𝗇𝖽𝗈𝗆 𝗍𝖾𝗆𝗉𝗈𝗋𝖺𝗋𝗒 𝖾𝗆𝖺𝗂𝗅 𝖺𝖽𝖉𝗋𝖾𝗌𝗌 𝗈𝗋 'imtumail 𝗂𝗇𝖻𝗈𝗑 (𝗂𝗇𝖻𝗈𝗑)' 𝗍𝗈 𝗏𝗂𝖾𝗐 𝗍𝗁𝖾 𝗂𝗇𝖻𝗈𝗑 𝗆𝖾𝗌𝗌𝖺𝗀𝖾𝗌...", event.threadID);
	}
};
      