const axios = require('axios');

module.exports.config = {
    name: "llama",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "August Quinn",
    description: "Get a llama response.",
    commandCategory: "educational",
    usePrefix: false,
    usages: "[prompt]",
    cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
    const prompt = args.join(" ");

    if (!prompt) {
        return api.sendMessage("Please provide a prompt for the llama.", event.threadID, event.messageID);
    }

    try {
        const response = await axios.get(`https://llama.august-api.repl.co/llama?prompt=${encodeURI(prompt)}`);
        const llamaResponse = response.data.response;

        const message = {
            body: `🦙 𝗟𝗟𝗔𝗠𝗔 𝗥𝗘𝗦𝗣𝗢𝗡𝗦𝗘:\n\n${llamaResponse}`,
        };

        api.sendMessage(message, event.threadID, event.messageID);
    } catch (error) {
        console.error('[ERROR]', error);
        api.sendMessage('An error occurred while processing the command.', event.threadID);
    }
};