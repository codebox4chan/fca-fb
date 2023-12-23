const axios = require('axios');

module.exports.config = {
    name: "buddy",
    version: "2.1.0",
    hasPermssion: 0,
    credits: "August Quinn",
    usePrefix: false,
    description: "An AI Chat Buddy, your ultimate companion.",
    commandCategory: "educational",
    usages: "[prompt]",
    cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
    const { threadID, senderID } = event;
    const prompt = args.join(" ");

    if (!prompt) {
        api.sendMessage("Kamusta, ano ang maitutulong ko sa'yo ngayon?", threadID, event.messageID);
        return;
    }

    try {
        const userName = await getUserName(api, senderID);
        const buddyAPI = "https://ai-buddy.august-quinn-api.repl.co/prompt";
        const response = await axios.post(buddyAPI, { prompt, userName });

        if (response.data && response.data.openai && response.data.openai.generated_text) {
            const generatedText = response.data.openai.generated_text;
            api.sendMessage(generatedText, threadID, event.messageID);
        } else {
            api.sendMessage("Error processing the prompt. Please try again later.", threadID, event.messageID);
        }
    } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        api.sendMessage("Error processing the prompt. Please try again later.", threadID, event.messageID);
    }
};

async function getUserName(api, userID) {
    try {
        const name = await api.getUserInfo(userID);
        return name[userID]?.firstName || "Friend";
    } catch (error) {
        console.error("Error getting user name:", error);
        return "Friend";
    }
}