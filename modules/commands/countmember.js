module.exports.config = {
    name: "countmember",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "kennethpanio",
    usePrefix: true,
    description: "Count the number of members in the group.",
    commandCategory: "info",
    cooldowns: 2,
};
module.exports.run = async function ({ api, event }) {
    const groupInfo = await api.getThreadInfo(event.threadID);
    const memberCount = groupInfo.participantIDs.length;

    const replyMessage = `Total members in this group: ${memberCount}`;
    api.sendMessage(replyMessage, event.threadID);
}