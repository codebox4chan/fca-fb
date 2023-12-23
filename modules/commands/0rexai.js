const axios = require('axios');

module.exports.config = {
    name: "rexai",
    version: "1.0.0",
    credits: "August Quinn",
    hasPermssion : 0,
    description: "Rexai (Reseach-Expert-AI)",
    commandCategory: "educational",
    usePrefix: false,
    usages: "[prompt]",
    cooldowns: 5,
};

module.exports.run = async ({ api, event, args }) => {
    const prompt = args.join(" ");

    if (!prompt) {
        return api.sendMessage("Provide a title to proceed.", event.threadID, event.messageID);
    }

    try {
        const response = await axios.post('https://rexai-reseach-expert-ai.august-api.repl.co/Title', { prompt });
        const responseData = response.data;

        api.sendMessage(`${responseData.google.generated_text}`, event.threadID, event.messageID);
    } catch (error) {
        console.error('ERROR', error.response?.data || error.message);
        api.sendMessage('An error occurred while processing the command.', event.threadID);
    }
};