const fs = require("fs-extra");
const config = require("../../kennethpanio.json");
module.exports.config = {
    name: "autoleave",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "jenk",
    description: "Bot will automatically leave if the gc has a member 1-4 only",
    commandCategory: "Admin",
    usePrefix: false,
    usages: "[number of member]",
    cooldowns: 0
};

module.exports.onLoad = () => {
    if(!config["leave"]) config["leave"] = {};
    if(!config["leave"]["status"]) config["leave"]["status"] = false;
    if(!config["leave"]["number"]) config["leave"]["number"] = 0;
    fs.writeFileSync("../../kennethpanio.json", JSON.stringify(config, null, 4));
}

module.exports.run = async ({ api, event, args }) => {
    const { threadID, messageID } = event;
    if(args[0]) number = parseInt(args[0]);
    config.leave = { status: config.leave.status == true ? false : true, number: number || config.leave.number}
    fs.writeFileSync("../../kennethpanio.json", JSON.stringify(config, null, 4));
    return api.sendMessage(`Satisfied ${config["leave"]["status"] == true ? "turn on" : "turn off"} function to automatically leave the group when the group has a smaller number of members ${config["leave"]["number"]} member.`, threadID, messageID);
}

module.exports.handleEvent = async ({ api, event }) => {
    const { threadID, messageID, participantIDs } = event;
    if (config["leave"]["status"] && participantIDs.length <= config["leave"]["number"] && event.isGroup && event.senderID != api.getCurrentUserID() && !config.ADMINBOT.includes(event.senderID)) {
       await api.sendMessage(`Bot will automatically leave if the gc has a member 1-4 only`, threadID);
        return api.removeUserFromGroup(api.getCurrentUserID(), threadID);
    }
}