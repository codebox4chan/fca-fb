module.exports.config = {
  name: "currency",
  version: "1.1.0",
  hasPermssion: 0,
  credits: "August Quinn",
  description: "Currency converter",
  commandCategory: "tools",
  usePrefix: true,
  usages: "[amount] [source_currency] [target_currency]",
  cooldowns: 5,
};

const exchangeRates = {
    "USD": 1,
    "EUR": 0.85,
    "GBP": 0.73,
    "JPY": 109,
    "AUD": 1.36,
    "CAD": 1.26,
    "CHF": 0.92,
    "CNY": 6.47,
    "SEK": 8.67,
    "NZD": 1.46, 
    "KRW": 1191,
    "SGD": 1.34,
    "HKD": 7.77,
    "NOK": 10.15,
    "MXN": 20.05,
    "INR": 73.50,
    "BRL": 5.26, 
    "RUB": 73.30,
    "ZAR": 15.05,
    "TRY": 8.53,
    "PHP": 50.54,
// add more kung gusto mo...
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID, senderID } = event;

  const getUserInfo = async (api, userID) => {
    try {
      const userInfo = await api.getUserInfo(userID);
      return userInfo[userID].name;
    } catch (error) {
      console.error(`Error fetching user info: ${error}`);
      return "";
    }
  };

  const userName = await getUserInfo(api, senderID);

  if (args.length !== 3) {
    api.sendMessage(`Hey ${userName}, I wanted to provide you with information regarding the usage of a specific command. This command, named 'currency,' serves a particular purpose. To utilize it effectively, you need to follow a specific format. You should input the command followed by the desired parameters in brackets. The parameters include the [amount] of currency you want to convert, the [source_currency] which represents the currency you're starting with, and the [target_currency] which is the currency you intend to convert to. By adhering to this format, you can seamlessly perform currency conversions with precision and accuracy.`, threadID, messageID);
    return;
  }

  const amount = parseFloat(args[0]);
  const sourceCurrency = args[1].toUpperCase();
  const targetCurrency = args[2].toUpperCase();

  if (isNaN(amount) || !exchangeRates[sourceCurrency] || !exchangeRates[targetCurrency]) {
    api.sendMessage(`Well well well ${userName}, the input provided is invalid or corresponds to an incorrect currency code`, threadID, messageID);
    return;
  }

  const convertedAmount = (amount * exchangeRates[targetCurrency]) / exchangeRates[sourceCurrency];

  const message = `🧾 𝗖𝗨𝗥𝗥𝗘𝗡𝗖𝗬 𝗖𝗢𝗡𝗩𝗘𝗥𝗦𝗜𝗢𝗡\n\n${userName}, here's the result.\n\n𝗦𝗢𝗨𝗥𝗖𝗘 𝗖𝗨𝗥𝗥𝗘𝗡𝗖𝗬: ${sourceCurrency}\n𝗔𝗠𝗢𝗨𝗡𝗧: ${amount} ${sourceCurrency}\n𝗧𝗔𝗥𝗚𝗘𝗧 𝗖𝗨𝗥𝗥𝗘𝗡𝗖𝗬: ${targetCurrency}\n𝗔𝗠𝗢𝗨𝗡𝗧: ${convertedAmount.toFixed(2)} ${targetCurrency}\n`;

  api.sendMessage(message, threadID, messageID);
};
        