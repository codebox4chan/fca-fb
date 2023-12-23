const fs = require('fs');
const request = require('request');

module.exports.config = {
    name: "notigroup",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "August Quinn",
    description: "This command is a versatile feature that allows administrators to send notifications or announcements to all existing group chats where the bot is present. With just a simple command, administrators can quickly and efficiently broadcast important messages to all members across various group chats, ensuring that everyone receives the necessary information. This tool is especially useful for conveying important updates, event invitations, or policy changes to a large audience in a timely manner. Instead of manually sending messages to each group chat individually, administrators can use this command to save time and effort, making it a valuable tool for managing communication across multiple groups. Moreover, this tool offers customization options, allowing administrators to format their messages with different styles, emojis, or attachments. This flexibility ensures that the announcements are engaging and attention-grabbing, increasing the likelihood that members will read and respond to the messages.",
    commandCategory: "admins",
    usePrefix: true,
    usages: "[message | announcement]",
    cooldowns: 5,
}

let atmDir = [];

const getAtm = (atm, body) => new Promise(async (resolve) => {
    let msg = {}, attachment = [];
    msg.body = body;
    for(let eachAtm of atm) {
        await new Promise(async (resolve) => {
            try {
                let response =  await request.get(eachAtm.url),
                    pathName = response.uri.pathname,
                    ext = pathName.substring(pathName.lastIndexOf(".") + 1),
                    path = __dirname + `/cache/${eachAtm.filename}.${ext}`
                response
                    .pipe(fs.createWriteStream(path))
                    .on("close", () => {
                        attachment.push(fs.createReadStream(path));
                        atmDir.push(path);
                        resolve();
                    })
            } catch(e) { console.log(e); }
        })
    }
    msg.attachment = attachment;
    resolve(msg);
})

module.exports.handleReply = async function ({ api, event, handleReply, Users, Threads }) {
    const moment = require("moment-timezone");
    var gio = moment.tz("Asia/Manila").format("DD/MM/YYYY - HH:mm:s");
    const { threadID, messageID, senderID, body } = event;
    let name = await Users.getNameUser(senderID);
    switch (handleReply.type) {
        case "notifygroup": {
            let text = `𝗔 𝗨𝗦𝗘𝗥 𝗛𝗔𝗦 𝗥𝗘𝗣𝗟𝗜𝗘𝗗 𝗧𝗢 𝗬𝗢𝗨𝗥 𝗠𝗘𝗦𝗦𝗔𝗚𝗘\n\n𝗖𝗢𝗡𝗧𝗘𝗡𝗧: ${body}\n\n𝗨𝗦𝗘𝗥𝗡𝗔𝗠𝗘: ${name}\n\n 𝗚𝗥𝗢𝗨𝗣: ${(await Threads.getInfo(threadID)).threadName || "Unknown"}`;
            if(event.attachments.length > 0) text = await getAtm(event.attachments, `💬 𝗔 𝗨𝗦𝗘𝗥 𝗛𝗔𝗦 𝗥𝗘𝗣𝗟𝗜𝗘𝗗 𝗧𝗢 𝗬𝗢𝗨𝗥 𝗠𝗘𝗦𝗦𝗔𝗚𝗘\n\n𝗖𝗢𝗡𝗧𝗘𝗡𝗧: ${body}\n\n𝗨𝗦𝗘𝗥𝗡𝗔𝗠𝗘: ${name}\n\n 𝗚𝗥𝗢𝗨𝗣: ${(await Threads.getInfo(threadID)).threadName || "Unknown"}`);
            api.sendMessage(text, handleReply.threadID, (err, info) => {
                atmDir.forEach(each => fs.unlinkSync(each))
                atmDir = [];
                global.client.handleReply.push({
                    name: this.config.name,
                    type: "reply",
                    messageID: info.messageID,
                    messID: messageID,
                    threadID
                })
            });
            break;
        }
        case "reply": {
            let text = `💬 𝗔𝗡 𝗔𝗗𝗠𝗜𝗡 𝗛𝗔𝗦 𝗥𝗘𝗣𝗟𝗜𝗘𝗗 𝗧𝗢 𝗬𝗢𝗨𝗥 𝗠𝗘𝗦𝗦𝗔𝗚𝗘\n\n𝗖𝗢𝗡𝗧𝗘𝗡𝗧:\n${body}\n\n𝗔𝗗𝗠𝗜𝗡 𝗡𝗔𝗠𝗘: ${name}\n\n𝖱𝖾𝗉𝗅𝗒 𝗍𝗈 𝗍𝗁𝗂𝗌 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗂𝖿 𝗒𝗈𝗎 𝗐𝗂𝗌𝗁 𝗍𝗈 𝗋𝖾𝗌𝗉𝗈𝗇𝖽 𝗍𝗈 𝗍𝗁𝗂𝗌 𝖺𝗇𝗇𝗈𝗎𝗇𝖼𝖾𝗆𝖾𝗇𝗍. 𝖸𝗈𝗎𝗋 𝖿𝖾𝖾𝖽𝖻𝖺𝖼𝗄 𝖺𝗇𝖽 𝗂𝗇𝗉𝗎𝗍 𝖺𝗋𝖾 𝗀𝗋𝖾𝖺𝗍𝗅𝗒 𝖺𝗉𝗉𝗋𝖾𝖼𝗂𝖺𝗍𝖾𝖽. 𝖫𝖾𝗍 𝗎𝗌 𝗄𝗇𝗈𝗐 𝗒𝗈𝗎𝗋 𝗍𝗁𝗈𝗎𝗀𝗁𝗍𝗌, 𝗊𝗎𝖾𝗌𝗍𝗂𝗈𝗇𝗌, 𝗈𝗋 𝗌𝗎𝗀𝗀𝖾𝗌𝗍𝗂𝗈𝗇𝗌 𝖻𝗒 𝗋𝖾𝗉𝗅𝗒𝗂𝗇𝗀 𝗍𝗈 𝗍𝗁𝗂𝗌 𝗆𝖾𝗌𝗌𝖺𝗀𝖾. 𝖶𝖾 𝗏𝖺𝗅𝗎𝖾 𝗒𝗈𝗎𝗋 𝗉𝖺𝗋𝗍𝗂𝖼𝗂𝗉𝖺𝗍𝗂𝗈𝗇 𝖺𝗇𝖽 𝗅𝗈𝗈𝗄 𝖿𝗈𝗋𝗐𝖺𝗋𝖽 𝗍𝗈 𝗁𝖾𝖺𝗋𝗂𝗇𝗀 𝖿𝗋𝗈𝗆 𝗒𝗈𝗎.`;
            if(event.attachments.length > 0) text = await getAtm(event.attachments, `𝗠𝗘𝗦𝗦𝗔𝗚𝗘 𝗙𝗥𝗢𝗠 𝗔𝗗𝗠𝗜𝗡\n\n𝗖𝗢𝗡𝗧𝗘𝗡𝗧:\n${body} \n\n𝗔𝗗𝗠𝗜𝗡 𝗡𝗔𝗠𝗘: ${name}\n\n𝖱𝖾𝗉𝗅𝗒 𝗍𝗈 𝗍𝗁𝗂𝗌 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗂𝖿 𝗒𝗈𝗎 𝗐𝗂𝗌𝗁 𝗍𝗈 𝗋𝖾𝗌𝗉𝗈𝗇𝖽 𝗍𝗈 𝗍𝗁𝗂𝗌 𝖺𝗇𝗇𝗈𝗎𝗇𝖼𝖾𝗆𝖾𝗇𝗍. 𝖸𝗈𝗎𝗋 𝖿𝖾𝖾𝖽𝖻𝖺𝖼𝗄 𝖺𝗇𝖽 𝗂𝗇𝗉𝗎𝗍 𝖺𝗋𝖾 𝗀𝗋𝖾𝖺𝗍𝗅𝗒 𝖺𝗉𝗉𝗋𝖾𝖼𝗂𝖺𝗍𝖾𝖽. 𝖫𝖾𝗍 𝗎𝗌 𝗄𝗇𝗈𝗐 𝗒𝗈𝗎𝗋 𝗍𝗁𝗈𝗎𝗀𝗁𝗍𝗌, 𝗊𝗎𝖾𝗌𝗍𝗂𝗈𝗇𝗌, 𝗈𝗋 𝗌𝗎𝗀𝗀𝖾𝗌𝗍𝗂𝗈𝗇𝗌 𝖻𝗒 𝗋𝖾𝗉𝗅𝗒𝗂𝗇𝗀 𝗍𝗈 𝗍𝗁𝗂𝗌 𝗆𝖾𝗌𝗌𝖺𝗀𝖾. 𝖶𝖾 𝗏𝖺𝗅𝗎𝖾 𝗒𝗈𝗎𝗋 𝗉𝖺𝗋𝗍𝗂𝖼𝗂𝗉𝖺𝗍𝗂𝗈𝗇 𝖺𝗇𝖽 𝗅𝗈𝗈𝗄 𝖿𝗈𝗋𝗐𝖺𝗋𝖽 𝗍𝗈 𝗁𝖾𝖺𝗋𝗂𝗇𝗀 𝖿𝗋𝗈𝗆 𝗒𝗈𝗎.`);
            api.sendMessage(text, handleReply.threadID, (err, info) => {
                atmDir.forEach(each => fs.unlinkSync(each))
                atmDir = [];
                global.client.handleReply.push({
                    name: this.config.name,
                    type: "sendnoti",
                    messageID: info.messageID,
                    threadID
                })
            }, handleReply.messID);
            break;
        }
    }
}

module.exports.run = async function ({ api, event, args, Users }) {
    const moment = require("moment-timezone");
    var gio = moment.tz("Asia/Manila").format("DD/MM/YYYY - HH:mm:s");
    const { threadID, messageID, senderID, messageReply } = event;
    if (!args[0]) return api.sendMessage("Please input message", threadID);
    let allThread = global.data.allThreadID || [];
    let can = 0, canNot = 0;
    let text = `𝗠𝗘𝗦𝗦𝗔𝗚𝗘 𝗙𝗥𝗢𝗠 𝗔𝗗𝗠𝗜𝗡\n\n ${args.join(" ")}\n\n—${await Users.getNameUser(senderID)}`;
    if(event.type == "message_reply") text = await getAtm(messageReply.attachments, `𝗠𝗘𝗦𝗦𝗔𝗚𝗘 𝗙𝗥𝗢𝗠 𝗔𝗗𝗠𝗜𝗡\n\n${args.join(" ")}\n\n—${await Users.getNameUser(senderID)}`);
    await new Promise(resolve => {
        allThread.forEach((each) => {
            try {
                api.sendMessage(text, each, (err, info) => {
                    if(err) { canNot++; }
                    else {
                        can++;
                        atmDir.forEach(each => fs.unlinkSync(each))
                        atmDir = [];
                        global.client.handleReply.push({
                            name: this.config.name,
                            type: "notifygroup",
                            messageID: info.messageID,
                            messID: messageID,
                            threadID
                        })
                        resolve();
                    }
                })
            } catch(e) { console.log(e) }
        })
    })
    api.sendMessage(`𝖲𝖾𝗇𝗍 𝗍𝗈 ${can} 𝗍𝗁𝗋𝖾𝖺𝖽(𝗌), 𝗇𝗈𝗍 𝗌𝖾𝗇𝗍 𝗍𝗈 ${canNot} 𝗍𝗁𝗋𝖾𝖺𝖽(𝗌).`, threadID);
              }