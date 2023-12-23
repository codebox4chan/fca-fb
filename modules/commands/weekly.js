module.exports.config = {
    name: "weeklybox",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Draffodils",
    description: "Get a weekly reward of $14,000!",
    usePrefix: true,
    commandCategory: "system",
    cooldowns: 5,
    envConfig: {
        cooldownTime: 604800000, // 1 week in milliseconds
        rewardCoin: 14000
    }
};

module.exports.languages = {
    "en": {
        "cooldown": "You received this week's reward, please come back after: %1 days %2 hours %3 minutes %4 seconds.",
        "rewarded": "You received 🪙14,000, to continue to receive, please try again after 1 week"
    }
};

module.exports.run = async ({ event, api, Currencies, getText }) => {
    const { weeklybox } = global.configModule,
        cooldownTime = weeklybox.cooldownTime,
        rewardCoin = weeklybox.rewardCoin;

    var { senderID, threadID, messageID } = event;

    let data = (await Currencies.getData(senderID)).data || {};
    if (typeof data !== "undefined" && cooldownTime - (Date.now() - (data.weeklyCoolDown || 0)) > 0) {
        var time = cooldownTime - (Date.now() - data.weeklyCoolDown),
            seconds = Math.floor((time / 1000) % 60),
            minutes = Math.floor((time / 1000 / 60) % 60),
            hours = Math.floor((time / (1000 * 60 * 60)) % 24),
            days = Math.floor(time / (1000 * 60 * 60 * 24));

        return api.sendMessage(getText("cooldown", days, hours, minutes, seconds), threadID, messageID);
    } else {
        return api.sendMessage(getText("rewarded", rewardCoin), threadID, async () => {
            await Currencies.increaseMoney(senderID, rewardCoin);
            data.weeklyCoolDown = Date.now();
            await Currencies.setData(senderID, { data });
            return;
        }, messageID);
    }
};