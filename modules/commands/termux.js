const termux = require("termux");

module.exports.config = {
    name: "termux",
    version: "1.0.0",
    hasPermssion: 3,
    credits: "kennethpanio",
    description: "Running Termux commands",
    commandCategory: "System",
    usePrefix: true,
    usages: "[command]",
    cooldowns: 0,
    dependencies: {
        "termux": "" // Make sure the correct module name is used
    }
};

module.exports.run = async function({ api, event, args }) {
    const command = args.join(" ");
    termux.exec(command, (error, stdout, stderr) => {
        if (error) {
            api.sendMessage(`Error:\n${error.message}`, event.threadID, event.messageID);
            return;
        }
        if (stderr) {
            api.sendMessage(`Stderr:\n${stderr}\n${stdout}`, event.threadID, event.messageID);
            return;
        }
        api.sendMessage(`Stdout:\n${stdout}`, event.threadID, event.messageID);
    });
};