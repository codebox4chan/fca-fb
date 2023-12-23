module.exports.config = {
    name: "birthday",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "yukihira soma",
    description: "Check whose birthday it is in the group today.",
    commandCategory: "group",
    usePrefix: false,
    usages: "Whose birthday is it today?",
    cooldowns: 10
};

const birthdayPath = __dirname + '/cache/birthday.json';
const fs = require('fs');

module.exports.onLoad = () => {
    if (!fs.existsSync(birthdayPath)) fs.writeFileSync(birthdayPath, JSON.stringify({}));
}

module.exports.handleEvent = async function ({ event, api }) {
    var { threadID, senderID } = event;
    let birthdayData = JSON.parse(fs.readFileSync(birthdayPath));
    if (!(senderID in birthdayData)) birthdayData[senderID] = { happyBirthday: false, time: Date.now() };
    if (birthdayData[senderID].happyBirthday && (Date.now() - birthdayData[senderID].time > 31556952000)) birthdayData[senderID].happyBirthday = false;
    var userInfo = (await api.getUserInfo(senderID))[senderID] || "";
    if (!userInfo || userInfo.isBirthday == false || userInfo.isBirthday == true && birthdayData[senderID].happyBirthday == true) return;
    else {
        var msg = `🎂🎉Happy Birthday ${userInfo.name}!\n\nWishing you deep love and happiness\nWishing you good health\nWishing you a safe and fortunate life🍀\n\n`;
        userInfo.gender == "Male" ? msg += `Wishing you prosperity\nThousands of happiness, abundance of love\nEnding the poem with one wish\nWishing you luck and success 🥰` : msg += `Wishing you prosperity\nJoy and happiness growing day by day\nWishing you a warm family\nIn this age, find the fortune of life.`;
        birthdayData[senderID] = {
            happyBirthday: true,
            time: Date.now()
        };
        fs.writeFileSync(birthdayPath, JSON.stringify(birthdayData, null, 4));
        var tag = {
            tag: userInfo.name,
            id: senderID
        }
        api.sendMessage({ body: msg, mentions: tag }, threadID);
    }
    return;
}

module.exports.run = async function ({ api, event, Users, Threads }) {
    var { threadID } = event;
    var threadData = await api.getThreadInfo(threadID) || "", tag = [], msg = "Today is the birthday of:\n\n", birthday = "", num = 0;
    if (!threadData) return api.sendMessage("Missing data to execute this command.", threadID);
    var members = threadData.userInfo;
    for (var i of members) {
        if (i.isBirthday == false) continue;
        if (i.isBirthday == true) {
            num++;
            birthday += `${num}. ${i.name}\n`;
            tag.push({
                tag: i.name,
                id: i.id
            });
        }
    }
    birthday ? msg += `${birthday}\nEveryone, come and celebrate the birthday of ${tag.length < 2 ? "him/her" : "them"}.` : msg = "Today is not the birthday of any member.";
    return tag.length > 0 ? api.sendMessage({ body: msg, mentions: tag }, threadID) : api.sendMessage(msg, threadID);
}
