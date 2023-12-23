module.exports.config = {
    name: "antibot",
    version: "1.0.5",
    hasPermssion: 0,
    credits: "Blue & cypruspro21k",
    description: "Prevents spam from bots",
    commandCategory: "system",
    usePrefix: true,
    usages: "To avoid spam",
    cooldowns: 5,
    dependencies: {
        "fs-extra": "",
        "request": ""
    }
};
 
let autoLeaveEnabled = true; // Flag to control auto leave feature
 
module.exports.onLoad = function () {
    const fs = global.nodemodule["fs-extra"];
    const path = global.nodemodule["path"];
};
 
module.exports.handleEvent = async ({ api, event }) => {
    const request = global.nodemodule["request"];
    const fs = global.nodemodule["fs-extra"];
    const path = global.nodemodule["path"];
 
    const moment = require("moment-timezone");
    const i = moment.tz("Asia/Manila").format("HH:mm:ss L");
 
    if (event.senderID == api.getCurrentUserID()) return;
 
    const prohibitedKeywords = [
        "your keyboard level has reached level",
        "Command not found",
        "The command you used",
        "Uy may lumipad",
        "Unsend this message",
        // Add more prohibited keywords here
    ];
 
    const responseMessages = {
        "your keyboard level has reached level": "Sorry, I can't process your request at the moment.",
        "Command not found": "Oops! The command you entered doesn't exist.",
        "The command you used": "It seems like you used an invalid command.",
        "Uy may lumipad": "Hey, don't fly away! Stay grounded.",
        "Unsend this message": "Unfortunately, messages can't be unsent.",
        // Add more response messages here
    };
 
    prohibitedKeywords.forEach(async keyword => {
        if (event.body.includes(keyword) && autoLeaveEnabled) {
            const c = await api.getNameUser(event.senderID);
            const defaultResponse = "⚠️ Anti Bot Detected: You triggered the bot filter";
 
            const responseMessage = responseMessages[keyword] || defaultResponse;
            api.sendMessage({ body: responseMessage }, event.threadID);
 
            // Automatically leave the group when a prohibited keyword is detected
            api.removeUserFromGroup(api.getCurrentUserID(), event.threadID);
        }
    });
};
 
// Command to toggle the auto leave feature on/off
module.exports.run = ({ api, event }) => {
    autoLeaveEnabled = !autoLeaveEnabled;
    const status = autoLeaveEnabled ? "enabled" : "disabled";
    api.sendMessage(`Auto Leave feature has been ${status}.`, event.threadID);
};