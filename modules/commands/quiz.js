module.exports.config = {
	name: "quiz",
	version: "1.0.0",
	credits: "Zia_Rein",
	hasPermssion: 0,
	description: "answer quiz for fun",
	commandCategory: "educational",
	cooldowns: 0,
  usePrefix: false,
  usages: "",
	dependencies: {
		"axios": ""
	}
};

module.exports.handleReaction = ({ api, event, handleReaction }) => {
	if (!event.userID == handleReaction.author) return;
	let response = "";
	if (event.reaction != "😆" && event.reaction != "😢") return;
	if (event.reaction == "😆") response = "True"
	else if (event.reaction == "😢") response = "False";
	if (response == handleReaction.answer) api.sendMessage(`𝗖𝗼𝗻𝗴𝗿𝗮𝘁𝘂𝗹𝗮𝘁𝗶𝗼𝗻\n\n𝘆𝗼𝘂 𝗴𝗼𝘁 𝘁𝗵𝗲 𝗮𝗻𝘀𝘄𝗲𝗿 𝗿𝗶𝗴𝗵𝘁!`, event.threadID, () => {
					
					setTimeout(function(){ api.unsendMessage(handleReaction.messageID); }, 5000);
				});

	else api.sendMessage(`𝗪𝗿𝗼𝗻𝗴 𝗔𝗻𝘀𝘄𝗲𝗿!\n\n𝗕𝗲𝘁𝘁𝗲𝗿 𝗹𝘂𝗰𝗸! 𝗻𝗲𝘅𝘁 𝘁𝗶𝗺𝗲...`, event.threadID);
	const indexOfHandle = client.handleReaction.findIndex(e => e.messageID == handleReaction.messageID);
	global.client.handleReaction.splice(indexOfHandle, 1);
	handleReaction.answerYet = 1;
	return global.client.handleReaction.push(handleReaction);
}

module.exports.run = async ({  api, event, args }) => {
	const axios = global.nodemodule["axios"];
	const request = global.nodemodule["request"];	
	let difficulties = ["easy", "medium", "hard"];
	let difficulty = args[0];
	(difficulties.some(item => difficulty == item)) ? "" : difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
	let fetch = await axios(`https://opentdb.com/api.php?amount=1&encode=url3986&type=boolean&difficulty=${difficulty}`);
	if (!fetch.data) return api.sendMessage("𝗦𝗲𝗿𝘃𝗲𝗿 𝗕𝘂𝘀𝘆!\n\n𝗣𝗹𝗲𝗮𝘀𝗲 𝗰𝗼𝗻𝘁𝗮𝗰𝘁 𝗱𝗲𝘃𝗲𝗹𝗼𝗽𝗲𝗿 𝘁𝗼 𝗳𝗶𝘅 𝘁𝗵𝗶𝘀 𝗶𝘀𝘀𝘂𝗲\n\nhttps://www.facebook.com/100081201591674", event.threadID, event.messageID);
	let decode = decodeURIComponent(fetch.data.results[0].question);
	return request(encodeURI(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${decode}`),(err, response, body) => {
	if (err) return api.sendMessage("An error has occurred", event.threadID, event.messageID);
	var retrieve = JSON.parse(body);
	var text = '';
	retrieve[0].forEach(item => (item[0]) ? text += item[0] : '');
	var fromLang = (retrieve[2] === retrieve[8][0][0]) ? retrieve[2] : retrieve[8][0][0]
	return api.sendMessage(`|✦:       𝗤𝗨𝗜𝗭          ✦|\n\n${text}\n\n|✦😆: 𝗧𝗿𝘂𝗲     😢: 𝗙𝗮𝗹𝘀𝗲✦|`, event.threadID, async (err, info) => {
		global.client.handleReaction.push({
			name: "quiz",
			messageID: info.messageID,
			author: event.senderID,
			answer: fetch.data.results[0].correct_answer,
			answerYet: 0
		});
		await new Promise(resolve => setTimeout(resolve, 20 * 1000));
		const indexOfHandle = global.client.handleReaction.findIndex(e => e.messageID == info.messageID);
		let data = global.client.handleReaction[indexOfHandle];
		if (data.answerYet !== 1) {
			api.sendMessage(`‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎     ‎‎‎‎‎‎‎‎‎‎‎‎‎‎❒ 𝗧𝗶𝗺𝗲 𝗢𝘂𝘁 ❒\n𝗧𝗵𝗲 𝗖𝗼𝗿𝗿𝗲𝗰𝘁 𝗔𝗻𝘀𝘄𝗲𝗿 𝗶𝘀:\n\n➫${fetch.data.results[0].correct_answer}`, event.threadID, info.messageID);
			return global.client.handleReaction.splice(indexOfHandle, 1);
		}
		else return;
	});
})
    }