module.exports.config = {
    name: "leave",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "reiko dev machina",
    description: "Tell the bot to leave the group or thread by ID",
    usePrefix: true,
    commandCategory: "admin",
    usages: "[threadID optional]",
    cooldowns: 10,
};

module.exports.run = async function({ api, event, args }) {
    const threadID = args[0] || event.threadID;
    
    if (!isNaN(threadID)) {
        api.removeUserFromGroup(api.getCurrentUserID(), threadID);
    }
}
