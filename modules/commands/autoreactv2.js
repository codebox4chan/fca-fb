const fs = require("fs");

module.exports.config = {
    name: "autoreactv2",
    version: "2.0.0",
    hasPermission: 0,
    credits: "kennethpanio",
    usePrefix: true,
    usages: "",
    description: "Automated Reaction Bot",
    commandCategory: "system",
    cooldowns: 5,
};

module.exports.handleEvent = function ({ api, event }) {
    var { threadID, messageID } = event;
    let react = event.body.toLowerCase();
    if (
        (react >= 'a' && react <= 'z') ||
        react.includes("🍃") && event.senderID !== api.getCurrentUserID()
    ) {
        var msg = {
            body: "",
        };
        api.sendMessage(msg, threadID, messageID);

        // Adding error handling for setMessageReaction
        api.setMessageReaction("🥰", event.messageID, (err) => {
            if (err) {
                console.error("Error setting reaction:", err);
                // Handle the error as needed
            }
        }, true);
    }
};
