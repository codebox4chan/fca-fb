module.exports.config = {
    name: "monthly",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Draffodils",
    description: "Get a reward of $30,000 every month!",
    usePrefix: true,
    commandCategory: "system",
    cooldowns: 5,
    envConfig: {
        cooldownTime: 2592000000, // 30 days in milliseconds
        rewardCoin: 30000
    }
};

module.exports.languages = {
    "en": {
        "cooldown": "You received your monthly reward, please come back after: %1 days %2 hours %3 minutes %4 seconds.",
        "rewarded": "You received $30,000, to continue to receive, please try again after 30 days"
    }
};

module.exports.run = async ({ event, api, Currencies, getText }) => {
    const { monthly } = global.configModule,
        cooldownTime = monthly.cooldownTime,
        rewardCoin = monthly.rewardCoin;

    var { senderID, threadID, messageID } = event;

    let data = (await Currencies.getData(senderID)).data || {};
    if (typeof data !== "undefined" && cooldownTime - (Date.now() - (data.monthlyCoolDown || 0)) > 0) {
        var time = cooldownTime - (Date.now() - data.monthlyCoolDown),
            seconds = Math.floor((time / 1000) % 60),
            minutes = Math.floor((time / 1000 / 60) % 60),
            hours = Math.floor((time / (1000 * 60 * 60)) % 24),
            days = Math.floor(time / (1000 * 60 * 60 * 24));

        return api.sendMessage(getText("cooldown", days, hours, minutes, seconds), threadID, messageID);
    } else {
        return api.sendMessage(getText("rewarded", rewardCoin), threadID, async () => {
            await Currencies.increaseMoney(senderID, rewardCoin);
            data.monthlyCoolDown = Date.now();
            await Currencies.setData(senderID, { data });
            return;
        }, messageID);
    }
};