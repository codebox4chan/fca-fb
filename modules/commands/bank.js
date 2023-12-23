const axios = require("axios");
const { Currencies } = global.nodemodule;
const cooldownTime = 0; // 12 hours in milliseconds;
let baseBankSpace = 4300; // Initial bank space;
let bankNoteStock = 10430; // Initial bank note stock
let padlockStock = 300; // Initial padlock stock
const restockInterval = 360000; // 6 minutes in milliseconds
const padlockRestockInterval = 360000; // 6 minutes in milliseconds
const restockAmount = Math.floor(Math.random() * (9200 - 4700 + 1)) + 4700; // Randomized value between 4.7k and 9.2k
const padlockRestockAmount = Math.floor(Math.random() * (420 - 40 + 1)) + 40; // Randomized value between 40 and 420

// Restock bank notes and padlocks
setInterval(() => {
    bankNoteStock += restockAmount;
    padlockStock += padlockRestockAmount;
}, restockInterval);

// Restock padlocks
setInterval(() => {
    padlockStock += padlockRestockAmount;
}, padlockRestockInterval);

module.exports.config = {
    name: "bank",
    version: "1.3.0",
    hasPermssion: 0,
    credits: "draffodils",
    description: "Deposit, withdraw, use bank notes to extend bank spaces, use padlock to protect bank",
    commandCategory: "system",
    usePrefix: true,
    usages: "[deposit/withdraw/space/use/lock/bstock/pstock]",
    cooldowns: 5,
    envConfig: {
        cooldownTime: cooldownTime,
    }
};

module.exports.run = async function({ api, event, args, Currencies }) {
    const { threadID, senderID } = event;
    const data = (await Currencies.getData(senderID)).data || {};
    const [action, amount] = args;

    if (action === "deposit") {
        // Deposit money to the bank
        if (!amount || isNaN(amount) || parseInt(amount) <= 0) {
            return api.sendMessage("⚠️Invalid deposit amount. Please provide a valid positive number.", threadID);
        }

        if (data.bankAmount >= baseBankSpace) {
            return api.sendMessage("⚠️Your bank is full. You can't deposit more.", threadID);
        }

        const remainingSpace = baseBankSpace - data.bankAmount;
        const depositAmount = Math.min(parseInt(amount), remainingSpace);

        await Currencies.decreaseMoney(senderID, depositAmount);
        data.bankAmount = (data.bankAmount || 0) + depositAmount;
        await Currencies.setData(senderID, { data });

        return api.sendMessage(`You have successfully deposited ⏣ ${depositAmount} into your bank account.`, threadID);

    } else if (action === "withdraw") {
        // Withdraw money from the bank
        if (!amount || isNaN(amount) || parseInt(amount) <= 0) {
            return api.sendMessage("⚠️Invalid withdrawal amount. Please provide a valid positive number.", threadID);
        }

        if (!data.bankAmount || data.bankAmount < parseInt(amount)) {
            return api.sendMessage("⚠️You do not have enough money in your bank account for this withdrawal.", threadID);
        }

        const withdrawAmount = Math.min(parseInt(amount), data.bankAmount);

        await Currencies.increaseMoney(senderID, withdrawAmount);
        data.bankAmount -= withdrawAmount;
        await Currencies.setData(senderID, { data });

        return api.sendMessage(`You have successfully withdrawn ⏣ ${withdrawAmount} from your bank account.`, threadID);

    } else if (action === "space") {
        // Check available bank space
        const availableSpace = baseBankSpace - (data.bankAmount || 0);
        const spacePercentage = ((availableSpace / baseBankSpace) * 100).toFixed(2);

        return api.sendMessage(
            `🔐Padlock is Active ${data.cooldownLock && data.cooldownLock > Date.now() ? ` ${Math.ceil((data.cooldownLock - Date.now()) / 1000)}s` : "🔓Disabled"}\n` +
            `📜𝗕𝗮𝗻𝗸:\n⏣ ${data.bankAmount || 0}\n` +
            `🪤𝗕𝗮𝗻𝗸 𝗦𝗽𝗮𝗰𝗲:\n⏣ ${baseBankSpace} ( ${spacePercentage}% )`, 
            threadID
        );

    } else if (action === "use") {
        // Use bank notes to extend bank space
        if (bankNoteStock <= 0) {
            return api.sendMessage(`There are no bank notes available in stock.`, threadID);
        }

        if (!amount || isNaN(amount) || parseInt(amount) <= 0) {
            return api.sendMessage("Invalid number of bank notes to use. Please provide a valid positive number.", threadID);
        }

        const notesToUse = Math.min(parseInt(amount), bankNoteStock);

        bankNoteStock -= notesToUse;
        baseBankSpace += notesToUse * 80000; // Each bank note extends space by 80000

        await Currencies.setData(senderID, { data });

        const gifImage = (await axios.get("https://i.imgur.com/orzEsj1.png", {
            responseType: "stream"
        })).data;

        return api.sendMessage(
            `You have successfully used ${notesToUse} bank notes!\n` +
            `Your bank space is now ⏣ ${baseBankSpace}.\n` +
            `Remaining bank note stock: ${bankNoteStock}`,
            threadID,
            () => api.sendMessage({ attachment: gifImage }, threadID, () => {})
        );

    } else if (action === "lock") {
        // Use padlock to protect bank
        if (padlockStock <= 0) {
            return api.sendMessage(`There are no padlocks available in stock.`, threadID);
        }

        if (data.cooldownLock && data.cooldownLock > Date.now()) {
            const cooldownRemaining = Math.ceil((data.cooldownLock - Date.now()) / 1000);
            return api.sendMessage(`Your padlock is on cooldown. Please wait ${cooldownRemaining} seconds.`, threadID);
        }

        padlockStock--;
        data.cooldownLock = Date.now() + 86400000; // 24 hours in milliseconds
        await Currencies.setData(senderID, { data });

        return api.sendMessage(
            `You have successfully used a padlock to protect your bank.\n` +
            `Remaining padlock stock: ${padlockStock}`,
            threadID
        );
    } else if (action === "bstock") {
        // Check remaining bank note stock
        const bankRestockTimeRemaining = Math.ceil((restockInterval - (Date.now() % restockInterval)) / 1000);
        return api.sendMessage(`⚠️Remaining bank note stock: ${bankNoteStock}\nNext restock in: ${bankRestockTimeRemaining} seconds`, threadID);

    } else if (action === "pstock") {
        // Check remaining padlock stock
        const padlockRestockTimeRemaining = Math.ceil((padlockRestockInterval - (Date.now() % padlockRestockInterval)) / 1000);
        return api.sendMessage(`⚠️Remaining padlock stock: ${padlockStock}\nNext restock in: ${padlockRestockTimeRemaining} seconds`, threadID);
    }

        return api.sendMessage("⚠️𝐈𝐧𝐯𝐚𝐥𝐢𝐝 𝐛𝐚𝐧𝐤 𝐚𝐜𝐭𝐢𝐨𝐧. 𝐔𝐬𝐚𝐠𝐞: 𝐛𝐚𝐧𝐤 [𝐝𝐞𝐩𝐨𝐬𝐢𝐭/𝐰𝐢𝐭𝐡𝐝𝐫𝐚𝐰/𝐬𝐩𝐚𝐜𝐞/𝐮𝐬𝐞/𝐥𝐨𝐜𝐤/𝐛𝐬𝐭𝐨𝐜𝐤/𝐩𝐬𝐭𝐨𝐜𝐤]", threadID);
};

  