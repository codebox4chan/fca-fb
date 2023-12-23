module.exports.config = {
    name: "time",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "August Quinn",//mod by kenneth
    description: "Get the current date and time in the Philippines",
    commandCategory: "info",
    usePrefix: false,
    cooldowns: 5,
};

const moment = require("moment-timezone");

module.exports.run = async function({ api, event }) {
    const philippinesTimezone = "Asia/Manila";
    const time = moment().tz(philippinesTimezone).format("YYYY-MM-DD | hh:mm:ss A");

    const lowerCaseBody = event.body.toLowerCase();

    if (lowerCaseBody === "unsay oras" || lowerCaseBody === "oras" || lowerCaseBody === "ano oras") {
        api.sendMessage(time, event.threadID, event.messageID);
    } else {
        const message = `📅⏰ Current Date and Time in the Philippines (GMT+8):\n${time}`;
        api.sendMessage(message, event.threadID, event.messageID);
    }
};
