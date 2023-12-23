module.exports.config = {
    name: "yearlybox",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Draffodils",
    usePrefix: true,
    description: "Get a yearly reward of $50,000,000,000!",
    commandCategory: "system",
    cooldowns: 5,
    envConfig: {
        cooldownTime: 31536000000, // 1 year in milliseconds
        rewardCoin: 50000000000
    }
};

module.exports.languages = {
    "en": {
        "cooldown": "You received this year's reward, please come back after: %1 years %2 months %3 days.",
        "rewarded": "You received 🪙50,000,000,000, to continue to receive, please try again after 1 year"
    }
};

module.exports.run = async ({ event, api, Currencies, getText }) => {
    const { yearlybox } = global.configModule,
        cooldownTime = yearlybox.cooldownTime,
        rewardCoin = yearlybox.rewardCoin;

    var { senderID, threadID, messageID } = event;

    let data = (await Currencies.getData(senderID)).data || {};
    if (typeof data !== "undefined" && cooldownTime - (Date.now() - (data.yearlyCoolDown || 0)) > 0) {
        var time = cooldownTime - (Date.now() - data.yearlyCoolDown),
            days = Math.floor(time / (1000 * 60 * 60 * 24)),
            months = Math.floor(days / 30),
            years = Math.floor(months / 12);

        return api.sendMessage(getText("cooldown", years, months % 12, days % 30), threadID, messageID);
    } else {
        return api.sendMessage(getText("rewarded", rewardCoin), threadID, async () => {
            await Currencies.increaseMoney(senderID, rewardCoin);
            data.yearlyCoolDown = Date.now();
            await Currencies.setData(senderID, { data });
            return;
        }, messageID);
    }
};
