module.exports.config = {
    name: "imgur",
    version: "2.1.0",
    hasPermssion: 0,
    credits: "KENLIEPLAYS",
    description: "imgur upload",
    commandCategory: "image",
    usages: "[reply to image]",
    usePrefix: false,
    cooldowns: 5,
    dependencies: {
        "axios": ""
    }
};

module.exports.run = async ({ api, event }) => {
    const axios = global.nodemodule['axios'];  
    var kenliegwapokaayo = event.messageReply.attachments[0].url; 
    if (!kenliegwapokaayo) return api.sendMessage('Please reply to image.', event.threadID, event.messageID);
    
    const res = await axios.get(`https://api.kenliejugarap.com/imgur/?imageLink=${encodeURIComponent(kenliegwapokaayo)}`);
    
    if (res.data.error) {
        return api.sendMessage(res.data.error, event.threadID, event.messageID);
    }
    
    var imgur = res.data.link || 'Failed To Upload!';
    return api.sendMessage(`${imgur.replace(`Kindly click the link below
https://bit.ly/donate4ads2
(Clicking the link and wait for 30 seconds (3 times) everyday is a big donation and help to us to maintain the servers, last longer, and upgrade servers in the future)`, ``)}`, event.threadID, event.messageID);
};