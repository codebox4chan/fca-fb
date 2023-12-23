module.exports.config = {
  name: "money",
  version: "1.1.1",
  hasPermssion: 3,
  credits: "Quất",
  description: "Perform money operations: add, subtract, multiply, divide, etc.",
  commandCategory: "tools",
  usages: "[ + , - , * , / , ++ , -- , +- , +% , -% ]",
  cooldowns: 0,
  usePrefix: false,
};

module.exports.run = async function ({ Currencies, api, event, args, Users, permission }) {
  const axios = require("axios");
  const { threadID, messageID, senderID, mentions, type, messageReply } = event;
  let targetID = senderID;

  if (type === 'message_reply') {
    targetID = messageReply.senderID;
  } else if (Object.keys(mentions).length > 0) {
    targetID = Object.keys(mentions)[0];
  }

  const name = (await Users.getNameUser(targetID));
  const i = (url) => axios.get(url, { responseType: "stream" }).then((r) => r.data);
  const link = /*[*/"https://i.imgur.com/slBlTky.jpg"/*,"https://i.imgur.com/FPHWPcg.jpg"]*/;
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Ho_Chi_Minh").format('HH:mm:ss || DD/MM/YYYY');
  const money = (await Currencies.getData(targetID)).money;
  const mon = args[1];

  try {
    switch (args[0]) {
      case "+": {
        if (permission < 2) return api.sendMessage("You do not have sufficient permission.", event.threadID);
        await Currencies.increaseMoney(targetID, parseInt(mon));
        return api.sendMessage({ body: `➩ ${name}'s money has been increased by ${mon}$\n➩ Current balance: ${money + parseInt(mon)}$\n➩ ${time}`, attachment: await i(link) }, event.threadID);
      }
      case "-": {
        if (permission < 2) return api.sendMessage("You do not have sufficient permission.", event.threadID);
        await Currencies.increaseMoney(targetID, parseInt(-mon));
        return api.sendMessage({ body: `➩ ${name}'s money has been decreased by ${mon}$\n➩ Current balance: ${money - mon}$\n➩ ${time}`, attachment: await i(link) }, event.threadID);
      }
      case "*": {
        if (permission < 2) return api.sendMessage("You do not have sufficient permission.", event.threadID);
        await Currencies.increaseMoney(targetID, parseInt(money * (args[1] - 1)));
        return api.sendMessage({ body: `➩ ${name}'s money has been multiplied by ${mon} times\n➩ Current balance: ${money * mon}$\n➩ ${time}`, attachment: await i(link) }, event.threadID);
      }
      case "/": {
        if (permission < 2) return api.sendMessage("You do not have sufficient permission.", event.threadID);
        await Currencies.increaseMoney(targetID, parseInt(-money + (money / mon)));
        return api.sendMessage({ body: `➩ ${name}'s money has been divided by ${args[1]} times\n➩ Current balance: ${money / mon}$\n➩ ${time}`, attachment: await i(link) }, event.threadID);
      }
      case "++": {
        if (permission < 2) return api.sendMessage("You do not have sufficient permission.", event.threadID);
        await Currencies.increaseMoney(targetID, Infinity);
        return api.sendMessage({ body: `➩ ${name}'s money has been set to infinite\n➩ Current balance: Infinity$\n➩ ${time}`, attachment: await i(link) }, event.threadID);
      }
      case "--": {
        if (permission < 2) return api.sendMessage("You do not have sufficient permission.", event.threadID);
        await Currencies.decreaseMoney(targetID, parseInt(money));
        return api.sendMessage({ body: `➩ ${name}'s money has been reset\n➩ Current balance: 0$\n➩ ${time}`, attachment: await i(link) }, event.threadID);
      }
      case "+-": {
        if (permission < 2) return api.sendMessage("You do not have sufficient permission.", event.threadID);
        await Currencies.decreaseMoney(targetID, parseInt(money));
        await Currencies.increaseMoney(targetID, parseInt(mon));
        return api.sendMessage({ body: `➩ ${name}'s money has been changed to ${mon}$\n➩ Current balance: ${mon}$\n➩ ${time}`, attachment: await i(link) }, event.threadID);
      }
      case "^": {
        if (permission < 2) return api.sendMessage("You do not have sufficient permission.", event.threadID);
        await Currencies.increaseMoney(targetID, parseInt(-money + Math.pow(money, mon)));
        return api.sendMessage({ body: `➩ ${name}'s money has been exponentiated to the power of ${mon}\n➩ Current balance: ${Math.pow(money, mon)}$\n➩ ${time}`, attachment: await i(link) }, event.threadID);
      }
      case "√": {
        if (permission < 2) return api.sendMessage("You do not have sufficient permission.", event.threadID);
        await Currencies.increaseMoney(targetID, parseInt(-money + Math.pow(money, 1/args[1])));
        return api.sendMessage({ body: `➩ ${name}'s money has been square rooted\n➩ Current balance: ${Math.pow(money, 1/args[1])}$\n➩ ${time}`, attachment: await i(link) }, event.threadID);
      }
      case "+%": {
        if (permission < 2) return api.sendMessage("You do not have sufficient permission.", event.threadID);
        await Currencies.increaseMoney(targetID, parseInt(money / (100 / args[1])));
        return api.sendMessage({ body: `➩ ${name}'s money has been increased by ${args[1]}%\n➩ Current balance: ${money + (money / (100 / args[1]))}$\n➩ ${time}`, attachment: await i(link) }, event.threadID);
      }
      case "-%": {
        if (permission < 2) return api.sendMessage("You do not have sufficient permission.", event.threadID);
        await Currencies.increaseMoney(targetID, parseInt(-(money / (100 / args[1]))));
        return api.sendMessage({ body: `➩ ${name}'s money has been decreased by ${args[1]}%\n➩ Current balance: ${money - (money / (100 / args[1]))}$\n➩ ${time}`, attachment: await i(link) }, event.threadID);
      }
      case "pay": {
        const money2 = (await Currencies.getData(event.senderID)).money;
        var bet = args[1] === 'all' ? money2 : args[1];
        if (money < 1) return api.sendMessage({ body: "You have less than 1$ or the amount is greater than your balance", attachment: await i(link) }, event.threadID);
        await Currencies.increaseMoney(event.senderID, parseInt(-bet));
        await Currencies.increaseMoney(targetID, parseInt(bet));
        return api.sendMessage(`Transferred ${bet}$ to ${name}`, event.threadID);
      }
      default: {
        if (money === Infinity) return api.sendMessage(`➩ ${name} has infinite money.`, event.threadID);
        if (money === null) return api.sendMessage(`➩ ${name} has 0$.`, event.threadID);
        if (!args[0] || !args[1]) return api.sendMessage(`${name} has ${money}$`, event.threadID);
      }
    }
  } catch (e) {
    console.log(e);
  }
};
