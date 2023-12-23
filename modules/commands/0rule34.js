module.exports.config = {
	name:"r34",
	version: "1",
	hasPermssion: 0,
	credits: "Kenneth Panio",
	description: "Send rule34 image",
usePrefix: false,
	commandCategory: "nsfw",
	cooldowns: 10
};

const axios = require('axios');
const fs = require('fs');
const request = require('request');
const xml2js = require('xml2js');

module.exports.run = async ({ api, event,}) => {
    const parser = new xml2js.Parser();
    const response = await      axios.get(`https://rule34.xxx/index.php?page=dapi&s=post&q=index`);
    api.sendMessage("📪 | Sending Please Wait...", event.threadID); 
  parser.parseStringPromise(response.data).then((result) => {
        const posts = result.posts.post;
        const randomPost = posts[Math.floor(Math.random() * posts.length)];
        
        let callback = function () {
            api.sendMessage({ body: `🍑 | Random Image from rule34`,
                attachment: fs.createReadStream(__dirname + `/cache/rule34.jpg`)
            }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/rule34.jpg`), event.messageID);
        };
        
        request(randomPost.$.file_url).pipe(fs.createWriteStream(__dirname + `/cache/rule34.jpg`)).on("close", callback);
        
    }).catch(err => {
        api.sendMessage("⚙️ | Error Api Of Rule34 command, please try again later", event.threadID, event.messageID);
        api.setMessageReaction("❌", event.messageID, (err) => {}, true);
    });
}