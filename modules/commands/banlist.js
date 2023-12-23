module.exports.config = {
	name: "banlist",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "NTKhang",
	description: "view the list of banned groups or users\nCredits: NTKhang",
	commandCategory: "admin",
	usages: "[thread], [user]",
  usePrefix: true,
	cooldowns: 5,
};
module.exports.run = async function({api, args, Users, event, Threads, client}) {

	if (args[0] == "user") {
		var list = client.allUser || [];
		var listuserbanned = [];
		for (var iduser of list) {
			const banned = (await Users.getData(iduser))
				.banned;
			if (banned == 1) {
				listuserbanned.push({
					id: iduser
				});
			}
		}
		var msg = "";
		for (let i = 0; i < listuserbanned.length; i++) {
			const name = (await Users.getData(listuserbanned[i].id))
				.name;
			msg += `${i+1}. Name: ${name}\nID: ${listuserbanned[i].id}\n`
		}
		msg == "" ? api.sendMessage("Currently, no user has been banned", event.threadID, event.messageID) : api.sendMessage("Users who have been banned from the bot system include:\n\n" + msg, event.threadID, event.messageID);
	}
	else if (args[0] == "thread") {
		var list = client.allThread || [];
		var listthreadbanned = [];
		for (var idthread of list) {
			const banned = (await Threads.getData(idthread))
				.banned;
			if (banned == 1) {
				listthreadbanned.push({
					id: idthread
				});
			}
		}
		var msg = "";
		for (let i = 0; i < listthreadbanned.length; i++) {
			let namethread = (await api.getThreadInfo(listthreadbanned[i].id))
				.threadName;
			msg += `${i+1}. Name: ${namethread}\nID: ${listthreadbanned[i].id}`;
		}
		msg.length == 0 ? api.sendMessage("There are currently no banned threads", event.threadID, event.messageID) : api.sendMessage("Threads that have been banned from the bot system include:\n\n" + msg, event.threadID, event.messageID);
	}
	else api.sendMessage("Syntax error", event.threadID, event.messageID);
}
