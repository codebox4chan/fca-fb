const botName = "☆𝗚𝗣𝗧✦𝗚𝗢☆";

module.exports.config = {
    name: "gptgo",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "KENLIEPLAYS",
    description: "GPTGO by KENLIEPLAYS",
    commandCategory: "educational",
    usePrefix: false,
    usages: "[ask]",
    cooldowns: 2,
};

module.exports.run = async function({ api, event, args }) {
    const axios = require("axios");
    let { messageID, threadID } = event;
    let tid = threadID,
    mid = messageID;
    const content = encodeURIComponent(args.join(" "));
    if (!args[0]) return api.sendMessage("Please type a message...", tid, mid);
    api.setMessageReaction("🕣", event.messageID, () => {}, true);
    api.sendMessage("🕣 | 𝘈𝘯𝘴𝘸𝘦𝘳𝘪𝘯𝘨....", event.threadID,
event.messageID);
    try {
        const res = await axios.get(`https://api.kenliejugarap.com/ai/?text=${content}`);
        const respond = res.data.response;
        if (res.data.error) {
            api.sendMessage(`Error: ${res.data.error}`, tid, (error) => {
                if (error) {
                    console.error(error);
                }
            }, mid);
        } else {
            // Use the botName variable to set the bot's name in the response
           api.sendMessage(`${botName}:\n\n ${respond.replace(`Is this answer helpful to you? Kindly click the link below`, ``).replace(`https://click2donate.kenliejugarap.com
(Clicking the link and clicking any ads or button and wait for 30 seconds (3 times) everyday is a big donation and help to us to maintain the servers, last longer, and upgrade servers in the future)`, ``)}`, tid, (error) => {
                if (error) {
                    console.error(error);
                }
            }, mid);
        }
    } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while fetching the data.", tid, mid);
    }
};