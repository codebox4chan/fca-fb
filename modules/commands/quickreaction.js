module.exports.config = {
    name: "quickreaction",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "August Quinn",
    description: "Change quick reaction emoji",
    usePrefix: true,
    commandCategory: "system",
    usages: '[emoji]',
    cooldowns: 0
};

module.exports.run = function({ api, event, args }) {
    const { threadID } = event;
    const emoji = args[0];

    if (!emoji) {
        api.sendMessage("Please provide an emoji to set as the quick reaction.", threadID);
        return;
    }

    api.changeThreadEmoji(emoji, threadID, (err) => {
        if (err) {
            console.error(err);
            api.sendMessage("An error occurred while setting the quick reaction emoji.", threadID);
        } else {
            api.sendMessage(`Quick reaction emoji set to ${emoji}!`, threadID);
        }
    });
};
  