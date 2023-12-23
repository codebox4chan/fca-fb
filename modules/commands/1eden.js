const axios = require('axios');

module.exports.config = {
    name: "eden",
    version: "1.0.0",
    credits: "kennethpanio",
    hasPermssion: 0,
    description: "Get a response from Eden AI",
    commandCategory: "educational",
    usages: "[prompt]",
    usePrefix: false,
    cooldowns: 8,
};

module.exports.run = async ({ api, event, args }) => {
    const prompt = args.join(" ");

    if (!prompt) {
        return api.sendMessage("Hello there, how can I assist you today?", event.threadID, event.messageID);
    }

    try {
        const response = await axios.get(`https://replhome.codebox4chan.repl.co/api/eden?prompt=${encodeURIComponent(prompt)}&apiKey=codebox4chan`);
        const responseData = response.data;

        api.sendMessage(`𝗘𝗗𝗘𝗡 𝗔𝗜🍎:\n\n${responseData.reply}`, event.threadID, event.messageID);
    } catch (error) {
        console.error('ERROR', error.response?.data || error.message);
        api.sendMessage('An error occurred while processing the command.', event.threadID);
    }
};





