module.exports.config = {
    name: "blackbox",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "...",
    description: "AI powered by Blackbox",
    commandCategory: "educational",
    usePrefix: false,
    usages: "[ask]",
    cooldowns: 10
};

module.exports.run = async function({ api, event, args }) {
    const axios = require("axios");
    let { messageID, threadID, senderID, body } = event;
    let tid = threadID,
    mid = messageID;
    const content = encodeURIComponent(args.join(" "));
    if (!args[0]) return api.sendMessage("Please type a message...", tid, mid);
    try {
        api.setMessageReaction("🗿", event.messageID, (err) => {}, true);
        const res = await axios.get("https://free-api.chatbotcommunity.ltd/others/gpt?prompt="+content);
const result = res.data.result
return api.sendMessage(result, tid, mid)
   } catch(e){
  return api.sendMessage(e.message, tid, mid)
    }
};