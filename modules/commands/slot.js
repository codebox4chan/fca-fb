module.exports.config = {
  name: 'slot',
  version: '1.0.1',
  hasPermssion: 0,
  credits: 'kennethpanio',
  usePrefix: false,
  description: 'Slot Machine bot',
  commandCategory: 'fun',
  usages: '(amount)',
  cooldowns: 5,
};

module.exports.languages = {
  vi: {
    missingInput: 'The bet money must not be blank or a negative number.',
    moneyBetNotEnough: 'The money you betted is bigger than your balance.',
    limitBet: 'Your bet is too low, the minimum is 50 pesos.',
    returnWin: '💰 %1 | %2 | %3 💰\nYou won %4$',
    returnLose: '💰 %1 | %2 | %3 💰\nYou lost %4$',
  },
  en: {
    missingInput: 'The bet money must not be blank or a negative number.',
    moneyBetNotEnough: 'The money you betted is bigger than your balance.',
    limitBet: 'Your bet is too low, the minimum is 50 pesos.',
    returnWin: '%1 | %2 | %3\nYou won %4$',
    returnLose: '%1 | %2 | %3\nYou lost %4$',
  },
};

module.exports.run = async function ({ api, event, args, Currencies, getText }) {
  const { threadID, messageID, senderID } = event;
  const { getData, increaseMoney, decreaseMoney } = Currencies;
  const slotItems = [
    '🍍',
    '🍊',
    '🍌',
    '🍋',
    '🍎',
    '💩',
    '🎰',
    '🍒',
    '🥝',
    '🥑',
    '🍏',
  ];
  const moneyUser = (await getData(senderID)).money;
  var moneyBet = parseInt(args[0]);

  if (this.config.credits !== 'kennethpanio') {
    return api.sendMessage(
      `Having some unexpected error while using this command, don't change the credits.\n\nCredits was changed into "${this.config.credits}"\n\nNote: If you want this command to work again, replace the credits with "kennethpanio"`,
      event.threadID,
      event.messageID
    );
  }

  if (isNaN(moneyBet) || moneyBet <= 0) {
    return api.sendMessage(getText('missingInput'), threadID, messageID);
  }

  if (moneyBet > moneyUser) {
    return api.sendMessage(getText('moneyBetNotEnough'), threadID, messageID);
  }

  if (moneyBet < 50) {
    return api.sendMessage(getText('limitBet'), threadID, messageID);
  }

  var number = [],
    win = false;
  for (let i = 0; i < 3; i++) {
    number[i] = Math.floor(Math.random() * slotItems.length);
  }

  if (number[0] === number[1] && number[1] === number[2]) {
    moneyBet *= 9;
    win = true;
  } else {
    if (number[0] === number[1] || number[0] === number[2] || number[1] === number[2]) {
      moneyBet *= 2;
      win = true;
    }
  }

  switch (win) {
    case true: {
      api.sendMessage(
        getText(
          'returnWin',
          slotItems[number[0]],
          slotItems[number[1]],
          slotItems[number[2]],
          moneyBet
        ),
        threadID,
        messageID
      );
      await increaseMoney(senderID, moneyBet);
      break;
    }
    case false: {
      api.sendMessage(
        getText(
          'returnLose',
          slotItems[number[0]],
          slotItems[number[1]],
          slotItems[number[2]],
          moneyBet
        ),
        threadID,
        messageID
      );
      await decreaseMoney(senderID, moneyBet);
      break;
    }
  }
};