module.exports.config = {
    name: "avatarv1",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Prince Sanel",
    description: `${global.config.PREFIX}avatar ID|TEXT|TEXT`,
    commandCategory: "image",
    usePrefix: false,
    cooldowns: 0,
    dependencies: {
        "fs-extra": "",
        "request": ""
    }
};
module.exports.run = async ({ api, event,args }) => {  {
    
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
	 const { threadID, messageID, senderID, body } = event;
	const content = args.join(" ").split("|").map(item => item = item.trim());
let text1= encodeURI(content[2])
let text = encodeURI(content[1])
let num = parseInt(content[0])
if (!text)
    return api.sendMessage("[!] Add text to proceed.", event.threadID, event.messageID);
    if (!text1)
    return api.sendMessage("[!] Add text to proceed.", event.threadID, event.messageID);
    if (!num)
    return api.sendMessage("[!] Add ID to proceed.", event.threadID, event.messageID);
    if (num > 882) return api.sendMessage("[!] Maximum ID is 882 only.", event.threadID, event.messageID);
    if (isNaN(num)) {
    return api.sendMessage("[!] Input in ID is not a Number!!! pleasee put a number", event.threadID, event.messageID);
    }
    api.sendMessage("[!] PROCESSING PLEASE WAIT..", event.threadID, event.messageID);
	 var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/cache/avt1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/avt1.png"),event.messageID);
	 return request(encodeURI(`https://sakibin.sinha-apiv2.repl.co/taoanhdep/avatarwibu?id=${num}&chu_nen=${text1}&chu_ky=${text}`)).pipe(fs.createWriteStream(__dirname+'/cache/avt1.png')).on('close',() => callback());     
}}