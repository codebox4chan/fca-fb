module.exports.config = {
	name: "info",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "kennethpanio",
	description: "",
	commandCategory: "info",
  usePrefix: false,
	usages: "",
	cooldowns: 4,
	dependencies: {
		"request": "",
		"fs": ""
	}
};

module.exports.run = async ({ api, event, args, Threads }) => {
	const fs = global.nodemodule["fs-extra"];
	const request = global.nodemodule["request"];
	// Get Prefix
	const threadSetting = (await Threads.getData(String(event.threadID))).data || {};
	const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

	if (args.length == 0) {
		return api.sendMessage(`You can use:\n\n${prefix}${this.config.name} user => It will get your information.\n\n${prefix}${this.config.name} user @[Tag] => It will get information of the tagged user.\n\n${prefix}${this.config.name} box => It will get information about this box (number of members, admins, etc.)\n\n${prefix}${this.config.name} user box [uid || tid]`, event.threadID, event.messageID);
	}

	if (args[0] == "box") {
		if (args[1]) {
			let threadInfo = await api.getThreadInfo(args[1]);
			let imgg = threadInfo.imageSrc;
			var gendernam = [];
			var gendernu = [];
			for (let z in threadInfo.userInfo) {
				var gioitinhone = threadInfo.userInfo[z].gender;
				if (gioitinhone == "MALE") {
					gendernam.push(gioitinhone);
				} else {
					gendernu.push(gioitinhone);
				}
			}
			var nam = gendernam.length;
			var nu = gendernu.length;
			let sex = threadInfo.approvalMode;
			var pd = sex == false ? "off" : sex == true ? "on" : "Unknown";
			if (!imgg) {
				api.sendMessage(`🍁 Group Information 🍁\n👀 Name: ${threadInfo.threadName}\n🐧 TID: ${args[1]}\n🦋 Approval: ${pd}\n🐤 Emoji: ${threadInfo.emoji}\n☺️ Information: \n» ${threadInfo.participantIDs.length} members and ${threadInfo.adminIDs.length} admins.\n» Including ${nam} male and ${nu} female.\n» Total messages: ${threadInfo.messageCount}.`, event.threadID, event.messageID);
			} else {
				var callback = () => api.sendMessage({
					body: `🍁 Group Information 🍁\n👀 Name: ${threadInfo.threadName}\n🐧 TID: ${args[1]}\n🦋 Approval: ${pd}\n🐤 Emoji: ${threadInfo.emoji}\n☺️ Information: \n» ${threadInfo.participantIDs.length} members and ${threadInfo.adminIDs.length} admins.\n» Including ${nam} male and ${nu} female.\n» Total messages: ${threadInfo.messageCount}.`,
					attachment: fs.createReadStream(__dirname + "/cache/1.png")
				}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"), event.messageID);
				return request(encodeURI(`${threadInfo.imageSrc}`)).pipe(fs.createWriteStream(__dirname + '/cache/1.png')).on('close', () => callback());
			}
		}
	}

	else if (args[0] == "admin") {
		var callback = () => api.sendMessage({
			body: `✘ ADMIN INFORMATION ✘
👀 Name: Kenneth Panio
💮 Nickname: Ken-Kun / Rei_wu /Sereiko Dev
❎ Date of Birth: 10/29/2004
👤 Gender: Male
💫 Height & Weight: 1m70 x 59kg
💘 Relationship: Single
🌎 Hometown: Galaxy
🏰 Living in: Mars
👫 Type: Short hair
🌸 Personality: Introverted
🌀 Hobbies: Playing games, watching movies, eating, sleeping
💻 Contact 💻
☎ Phone: 911
🌐 Facebook: https://www.facebook.com/100081201591674
    - TikTok: https://www.tiktok.com/@rei_wu24
✉️ Email: lkpanio25@gmail.com`,
			attachment: fs.createReadStream(__dirname + "/cache/1.png")
		}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"));

		return request(encodeURI(`https://graph.facebook.com/${100072447776739}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(
			fs.createWriteStream(__dirname + '/cache/1.png')).on('close', () => callback());
	}

	else if (args[0] == "user") {
		if (!args[1]) {
			let id;
			if (event.type == "message_reply") id = event.messageReply.senderID;
			else id = event.senderID;
			let data = await api.getUserInfo(id);
			let url = data[id].profileUrl;
			let b = data[id].isFriend == false ? "No!" : data[id].isFriend == true ? "Yes!" : "No data";
			let sn = data[id].vanity;
			let name = await data[id].name;
			var sex = await data[id].gender;
			var gender = sex == 2 ? "Male" : sex == 1 ? "Female" : "Unknown";
			var callback = () => api.sendMessage({
				body: `🍁 User Information 🍁\n😚 Name: ${name}` + `\n🏝 Profile URL: ${url}` + `\n💦 Username: ${sn}\n🐧 UID: ${id}\n🦋 Gender: ${gender}\n❄️ Bot friend: ${b}`,
				attachment: fs.createReadStream(__dirname + "/cache/1.png")
			}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"), event.messageID);
			return request(encodeURI(`https://graph.facebook.com/${id}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(fs.createWriteStream(__dirname + '/cache/1.png')).on('close', () => callback());
		} else {
			if (args.join().indexOf('@') !== -1) {
				var mentions = Object.keys(event.mentions);
				let data = await api.getUserInfo(mentions);
				let url = data[mentions].profileUrl;
				let b = data[mentions].isFriend == false ? "No!" : data[mentions].isFriend == true ? "Yes!" : "No data";
				let sn = data[mentions].vanity;
				let name = await data[mentions].name;
				var sex = await data[mentions].gender;
				var gender = sex == 2 ? "Male" : sex == 1 ? "Female" : "Unknown";
				var callback = () => api.sendMessage({
					body: `🍁 User Information 🍁\n😚 Name: ${name}` + `\n🏝 Profile URL: ${url}` + `\n💦 Username: ${sn}\n🐧 UID: ${mentions}\n🦋 Gender: ${gender}\n❄️ Bot friend: ${b}`,
					attachment: fs.createReadStream(__dirname + "/cache/1.png")
				}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"), event.messageID);
				return request(encodeURI(`https://graph.facebook.com/${mentions}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(fs.createWriteStream(__dirname + '/cache/1.png')).on('close', () => callback());
			} else {
				let data = await api.getUserInfo(args[1]);
				let url = data[args[1]].profileUrl;
				let b = data[args[1]].isFriend == false ? "No!" : data[args[1]].isFriend == true ? "Yes!" : "No data";
				let sn = data[args[1]].vanity;
				let name = await data[args[1]].name;
				var sex = await data[args[1]].gender;
				var gender = sex == 2 ? "Male" : sex == 1 ? "Female" : "Unknown";
				var callback = () => api.sendMessage({
					body: `🍁 User Information 🍁\n😚 Name: ${name}` + `\n🏝 Profile URL: ${url}` + `\n💦 Username: ${sn}\n🐧 UID: ${args[1]}\n🦋 Gender: ${gender}\n❄️ Bot friend: ${b}`,
					attachment: fs.createReadStream(__dirname + "/cache/1.png")
				}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"), event.messageID);
				return request(encodeURI(`https://graph.facebook.com/${args[1]}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(fs.createWriteStream(__dirname + '/cache/1.png')).on('close', () => callback());
			}
		}
	}
}
