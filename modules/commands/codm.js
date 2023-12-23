module.exports.config = {
	name:"codm",
	version: "1",
	hasPermssion: 0,
	credits: "zach", //call of duty eheh
	description: "Random codm highlights/attachments guns",
  usePrefix: false,
  usages: "",
	commandCategory: "fun",
	cooldowns: 10
};
module.exports.run = async ({ api, event,}) => {
	const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
 
  api.sendMessage(`⏱️ | video is sending please wait...`, event.threadID, event.messageID);
axios.get('https://apicod11.api11.repl.co/codm/?apikey=opa').then(res => {
	let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
	let callback = function () {
					api.sendMessage({
                                                body: `Call Of Duty Mobile`,
						attachment: fs.createReadStream(__dirname + `/cache/codm.${ext}`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/codm.${ext}`), event.messageID);
				};
				request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/codm.${ext}`)).on("close", callback);
			}) .catch(err => {
                     api.sendMessage("[ CODM ]\nApi error status: 200\nContact the owner to fix immediately", event.threadID, event.messageID);
    api.setMessageReaction("❌", event.messageID, (err) => {}, true);
                  })     
}