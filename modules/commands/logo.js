module.exports.config = {
	name: "cheaplogo",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Prince Sanel",
	description: "Logo Maker",
	commandCategory: "image",
	usages: "[Text]",
  usePrefix: true,
	cooldowns: 1,
	
	}; // Credits fot the api:Sensui
			
module.exports.run = async ({ api, event, args }) => {
	const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
	const req = args[0];
	if (!args[0]) return api.sendMessage("[!] Need a text to proceed.", event.threadID, event.messageID);
	axios.get(`https://logo-maker-api.codersensui.repl.co/create?theme=https://textpro.me/create-3d-liquid-metal-text-effect-1112.html&text=${encodeURI(req)}`).then(res => {
	let callback = function () {
					api.sendMessage({
						body: `»» Logo Created:`,
						attachment: fs.createReadStream(__dirname + `/cache/logo.jpg`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/logo.jpg`), event.messageID);
				};
				request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/logo.jpg`)).on("close", callback);
			})
    }