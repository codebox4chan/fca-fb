module.exports.config = {
	name: "picsum",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Prince Sanel",
	description: "randompic from picsum",
	commandCategory: "image",
  usePrefix: false,
	usages: "",
	cooldowns: 1,
	
	}; // credit for api: sensui
			
module.exports.run = async ({ api, event, args }) => {
	const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
	axios.get(`https://sensui-useless-apis.codersensui.repl.co/api/tools/lorem-picsum`).then(res => {
	let callback = function () {
					api.sendMessage({
						body: `❯ Random Picsum:`,
						attachment: fs.createReadStream(__dirname + `/cache/picsum.jpg`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/picsum.jpg`), event.messageID);
				};
				request(res.data.imageUrl).pipe(fs.createWriteStream(__dirname + `/cache/picsum.jpg`)).on("close", callback);
			})
    }