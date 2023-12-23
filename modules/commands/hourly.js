module.exports.config = {
    name: "hourly",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Draffodils",
    description: "Get a reward of $2,700 every hour!",
    commandCategory: "system",
    usePrefix: true,
    cooldowns: 5,
    envConfig: {
        cooldownTime: 3600000, // 1 hour in milliseconds
        rewardCoin: 2700
    }
};

module.exports.languages = {
    "en": {
        "cooldown": "You received your hourly reward, please come back after: %1 hours %2 minutes %3 seconds.",
        "rewarded": "You received $2,700, to continue to receive, please try again after 1 hour"
    }
};

module.exports.run = async ({ event, api, Currencies, getText }) => {
    const { hourly } = global.configModule,
        cooldownTime = hourly.cooldownTime,
        rewardCoin = hourly.rewardCoin;

    var { senderID, threadID, messageID } = event;

    let data = (await Currencies.getData(senderID)).data || {};
    if (typeof data !== "undefined" && cooldownTime - (Date.now() - (data.hourlyCoolDown || 0)) > 0) {
        var time = cooldownTime - (Date.now() - data.hourlyCoolDown),
            seconds = Math.floor((time / 1000) % 60),
            minutes = Math.floor((time / 1000 / 60) % 60),
            hours = Math.floor((time / (1000 * 60 * 60)) % 24);

        return api.sendMessage(getText("cooldown", hours, minutes, seconds), threadID, messageID);
    } else {
        return api.sendMessage(getText("rewarded", rewardCoin), threadID, async () => {
            await Currencies.increaseMoney(senderID, rewardCoin);
            data.hourlyCoolDown = Date.now();
            await Currencies.setData(senderID, { data });
            return;
        }, messageID);
    }
};