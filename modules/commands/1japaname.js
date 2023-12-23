const axios = require('axios');

module.exports.config = {
    name: 'japaname',
    version: '1',
    hasPermssion: 0,
    credits: 'August Quinn',
    description: 'Convert a name into Japanese',
    usages: '[name]',
    usePrefix: false,
    commandCategory: 'fun',
    cooldowns: 5,
};

module.exports.run = async ({ api, event, args }) => {
    try {
        const name = args.join(' ');

        if (!name) {
            return api.sendMessage('Please provide a name to convert.', event.threadID, event.messageID);
        }

        const apiUrl = `https://japanese-name-converter.august-api.repl.co/convertName?name=${encodeURIComponent(name)}`;
        const response = await axios.get(apiUrl);

        if (response.data.convertedName) {
            api.sendMessage(`✅ "${name}" converted successfully:\n\n${response.data.convertedName}`, event.threadID, event.messageID);
        } else {
            api.sendMessage('Error converting name. Please try again later.', event.threadID, event.messageID);
        }
    } catch (error) {
        console.error('An error occurred:', error);
        api.sendMessage('Error converting name. Please try again later.', event.threadID, event.messageID);
    }
};