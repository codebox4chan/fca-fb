module.exports.config = {
	name: 'join',
	version: '3.1',
	hasPermssion: 0,
	credits: 'Hazeyy',
	description: 'Automatically Add you in main GC of this bot',
	commandCategory: 'system',
  usePrefix: false,
	usages: '',
	cooldowns: 0
}; 
module.exports.run = async ({args, api, event, Users}) => {
	try {
		const id  = event.senderID;
		const id1 = args[0];
		const threadID = 7225992434094687;//palitan mo to sa main group id mo
		let name = await Users.getNameUser(event.senderID);
		let name1 = await Users.getNameUser(id1);
		if (!args[0]) {
			await api.addUserToGroup(id, threadID);
			let msg = {body: `✅ 𝖸𝗈𝗎 𝗁𝖺𝗏𝖾 𝖻𝖾𝖾𝗇 𝖺𝖽𝖽𝖾𝖽 𝗍𝗈 𝗕𝗼𝘁 ( 𝗢𝗳𝗳𝗶𝗰𝗶𝗮𝗹 ) 𝗚𝗖..\n𝖪𝗂𝗇𝖽𝗅𝗒 𝖼𝗁𝖾𝖼𝗄 𝗒𝗈𝗎𝗋 𝗌𝗉𝖺𝗆 𝗈𝗋 𝗆𝗌𝗀 𝗋𝖾𝗊.`}
			let msg1 = {body: `𝖧𝖾𝗅𝗅𝗈👋 ${name}, 𝖶𝖾𝗅𝖼𝗈𝗆𝖾 𝗍𝗈 𝗕𝗼𝘁 ( 𝗢𝗳𝗳𝗶𝗰𝗶𝗮𝗹 ).`}
			let msg2 = {body: `‼️ ${name}\n\n𝖧𝖾𝗅𝗅𝗈 ${name}, 𝖪𝗂𝗇𝖽𝗅𝗒 𝖼𝗁𝖾𝖼𝗄 𝗒𝗈𝗎𝗋 𝖲𝗉𝖺𝗆 𝗈𝗋 𝖬𝗌𝗀 𝗋𝖾𝗊 𝗁𝖺𝗏𝖾 𝖺 𝗇𝗂𝖼𝖾 𝖽𝖺𝗒 😆`}
			api.sendMessage(msg, event.threadID, event.messageID);
			api.sendMessage(msg1, threadID);
			api.sendMessage(msg2, id);
		}	
		if (args[0] == id1) {
			await api.addUserToGroup(id1, threadID);
			let msg = {body: `✅ 𝖴𝗌𝖾𝗋: ${name} 𝖺𝖽𝖽𝖾𝖽 ${name1} 𝗂𝗇 𝗕𝗼𝘁 ( 𝗢𝗳𝗳𝗶𝗰𝗶𝗮𝗹 )`}
			let msg1 ={body: `‼️ ${name1}\n 𝖴𝗌𝖾𝗋: ${name} 𝖺𝖽𝖽𝖾𝖽 𝗒𝗈𝗎 𝗂𝗇 𝗕𝗼𝘁 ( 𝗢𝗳𝗳𝗶𝗰𝗶𝗮𝗹 ) ✅`}
			let msg2 = {body: `❯ 𝖧𝖾𝗅𝗅𝗈👋 ${name1}, 𝖶𝖾𝗅𝖼𝗈𝗆𝖾 𝗍𝗈 𝗕𝗼𝘁 ( 𝗢𝗳𝗳𝗶𝗰𝗶𝗮𝗹 ).. `}
			api.sendMessage(msg, event.threadID, event.messageID);
			api.sendMessage(msg1, id1);
			api.sendMessage(msg2, threadID);
		}
		
	} catch (error) {
		api.sendMessage("😿 𝖥𝖺𝗂𝗅𝖾𝖽 𝗍𝗈 𝖺𝖽𝖽 𝗎𝗌𝖾𝗋, 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋", event.messageID, event.threadID);
}
	
  }