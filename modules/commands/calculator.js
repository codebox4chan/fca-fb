module.exports.config = {
  name: "calculator",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "August Quinn",
  description: "Perform basic scientific calculations and unit conversions",
  commandCategory: "educational",
  usePrefix: true,
  usages: "[operation] [arguments]",
  cooldowns: 5,
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

  if (args.length < 2) {
    api.sendMessage(`Hey ${userName}, the correct usage is: /Calculator [operation] [arguments]`, threadID, messageID);
    return;
  }

  const operation = args[0].toLowerCase();
  const arguments = args.slice(1).map(arg => parseFloat(arg));

  let result = null;

  switch (operation) {
    case "add":
      result = arguments.reduce((acc, val) => acc + val, 0);
      break;
    case "subtract":
      result = arguments.reduce((acc, val) => acc - val);
      break;
    case "multiply":
      result = arguments.reduce((acc, val) => acc * val, 1);
      break;
    case "divide":
      result = arguments.reduce((acc, val) => acc / val);
      break;
    case "power":
      result = Math.pow(arguments[0], arguments[1]);
      break;
    case "mass":
      // ito ay kilograms to pounds
      result = arguments[0] * 2.20462;
      break;
    case "temperature":
      // celsius to fahrenheit
      result = (arguments[0] * 9/5) + 32;
      break;
    case "time":
      // seconds to minutes
      result = arguments[0] / 60;
      break;
    case "speed":
      // meters per second to kilometers per hour
      result = arguments[0] * 3.6;
      break;
    default:
      api.sendMessage(`Hey ${userName}, the provided operation is not supported.\n\n𝗔𝗩𝗔𝗜𝗟𝗔𝗕𝗟𝗘 𝗢𝗣𝗘𝗥𝗔𝗧𝗜𝗢𝗡:\n   ⓵ Add\n   ⓶ Subtract\n   ➂ Multiply\n   ➃ Divide\n   ➄ Power\n   ➅ Mass\n   ➆ Temperature\n   ➇ Time\n   ➈ Speed`, threadID, messageID);
      return;
  }

  const message = `🧮 𝗖𝗔𝗟𝗖𝗨𝗟𝗔𝗧𝗢𝗥\n\n${userName}, the result of the ${operation} operation is: ${result}`;

  api.sendMessage(message, threadID, messageID);
};
  