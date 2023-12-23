const cron = require('node-cron');
const botprefixbio = Array.from(global.config.PREFIX).join('');
const additionalBios = [
    "Feeling chatty today! 🗣️",
    "Ready to assist you! 💬",
    "Exploring the virtual world! 🌐",
    "Coding my way through life! 💻",
    "Learning new tricks! 🧠"
];
let currentIndex = 0;

module.exports.config = {
    name: "biocron",
    version: "2.0.0",
    hasPermssion: 3,
    credits: "Kenneth Panio",
    description: "Change bot's bio automatically using cron schedule",
    usePrefix: true,
    commandCategory: "fun",
    usages: "",
    cooldowns: 5
}

module.exports.run = async ({ api, event }) => {
    api.changeBio(getRandomBio(), (e) => {
        if (e) api.sendMessage("An error occurred" + e, event.threadID);
    });

    cron.schedule('*/60 * * * *', () => {
        api.changeBio(getRandomBio(), (e) => {
            if (e) console.error("An error occurred while changing bio:", e);
        });
    });
}

function getRandomBio() {
    const randomBio = additionalBios[currentIndex];
    currentIndex = (currentIndex + 1) % additionalBios.length;
    return `Bot Prefix: ["${botprefixbio}"]\nhow to use?\nget started with command ${botprefixbio}help\n${randomBio}`;
}
