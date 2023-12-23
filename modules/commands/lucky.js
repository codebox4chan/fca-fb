module.exports.config = {
    name: "lucky",
    version: "0.0.1",
    hasPermssion: 0,
    credits: "HungCho / Translated and Adjusted by Draffodils",
    description: "Take a shot at guessing a lucky number in different difficulty modes!",
    commandCategory: "fun",
    usePrefix: true,
    usages: "mode 5",
    cooldowns: 5,
    dependencies: [],
};

module.exports.run = async ({ event, api, Currencies, args }) => {
    const getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const userData = await Currencies.getData(event.senderID);
    const money = userData.money;
    const betAmount = 70;
    
    const difficulty = args[0]?.toLowerCase();
    const difficultyRanges = {
        easy: [0, 10],
        medium: [0, 30],
        hard: [0, 80],
        extreme: [0, 300],
        insane: [0, 900],
        "extremely insane": [0, 2000],
        godly: [0, 4000]
    };
    
    const rewardBonuses = {
        easy: 0.012,
        medium: 0.02,
        hard: 0.1,
        extreme: 0.14,
        insane: 0.25,
        "extremely insane": 0.75,
        godly: 0.90 
    };

    const guessedNumber = parseInt(args[1]);
    const randomNumber = getRandomInt(difficultyRanges[difficulty][0], difficultyRanges[difficulty][1]);

    if (!difficulty || !difficultyRanges[difficulty]) {
        api.sendMessage("🥮Please choose a valid difficulty mode. Available modes: easy, medium, hard, extreme, insane, extremely insane, godly. Example: easy 5 🏮", event.threadID, event.messageID);
        return;
    }

    if (money < betAmount) {
        api.sendMessage("🥮You're too broke to play, save your fortune cookies! 🏮", event.threadID, event.messageID);
    } else {
        if (!guessedNumber || isNaN(guessedNumber)) {
            api.sendMessage("🥮You didn't predict any number, fortune favors the bold! 🏮", event.threadID, event.messageID);
        } else {
            if (guessedNumber < difficultyRanges[difficulty][0] || guessedNumber > difficultyRanges[difficulty][1]) {
                api.sendMessage(`🥮Predicting a number outside the ${difficulty} range is like trying to find a polar bear in the desert 🐻‍❄️, stick to the right range! 🏮`, event.threadID, event.messageID);
            } else {
                if (guessedNumber === randomNumber) {
                    const bonusPercentage = rewardBonuses[difficulty];
                    const bonusReward = Math.floor(betAmount * (1 + bonusPercentage));
                    api.sendMessage(`${guessedNumber} 🥮That's the lucky number! You just scored ${bonusReward} fortune cookies! 🏮`, event.threadID, () => Currencies.setData(event.senderID, { money: money + bonusReward }), event.messageID);
                } else {
                    const penaltyAmount = 9000;
                    api.sendMessage(`🥮The lucky number was ${randomNumber}, better luck next time! You lost ${penaltyAmount} fortune cookies. 🏮\n==Important Note==\n🥮Incorrect guess, you've been fined $${penaltyAmount}. Correct guess awards you with a chance to win a bonus in ${difficulty} mode! 🏮`, event.threadID, () => Currencies.setData(event.senderID, { money: money - penaltyAmount }), event.messageID);
                }
            }
        }
    }
      }
      