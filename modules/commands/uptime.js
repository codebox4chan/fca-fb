module.exports.config = {
  name: 'uptime',
  version: '1.1.1',
  hasPermssion: 1,
  credits: 'Deku',
  description: 'uptime robot',
  usePrefix: true,
  commandCategory: 'admin',
  usages: '[https://valid-url]',
  cooldowns: 0,
};

module.exports.run = async function({ api, event, args }) {
const axios = require("axios"),
 url = args.join(" ");
if (!url.startsWith("https")) return api.sendMessage("𝗪𝗿𝗼𝗻𝗴 𝗜𝗻𝗽𝘂𝘁! 𝗲𝘅𝗮𝗺𝗽𝗹𝗲: 𝗵𝘁𝘁𝗽𝘀://<𝗨𝗥𝗟>", event.threadID, event.messageID)
	if(!url) return api.sendMessage('missing url!', event.threadID, event.messageID)
const upt = await axios.get(`https://sim.ainz-project.repl.co/others/uptimer?url=${url}`)
if (upt.data.status == "success"){
var msg = "𝗔𝗱𝗱𝗶𝗻𝗴 𝗺𝗼𝗻𝗶𝘁𝗼𝗿 𝘁𝗼 𝘆𝗼𝘂𝗿 𝗿𝗲𝗽𝗹!... 𝘀𝘂𝗰𝗰𝗲𝘀𝘀!";
} else {
var msg = upt.data.result
}
api.sendMessage(msg, event.threadID, event.messageID)
}