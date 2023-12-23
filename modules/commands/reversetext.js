module.exports.config = {
  name: "reversetext",
  version: "1.1.0",
  hasPermssion: 0,
  credits: "August Quinn",
  description: "Reverses the order of characters in the input text. Use '/Reversetext [undo] [text]' to undo or reverse.",
  commandCategory: "fun",
  usePrefix: true,
  usages: "[text]",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID, type, messageReply, senderID } = event;

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

  if (args.length === 0) {
    api.sendMessage(`Hey ${userName}, please provide some text to reverse.`, threadID, messageID);
    return;
  }

  const undoMode = args[0] && args[0].toLowerCase() === "undo";
  const textToReverse = undoMode ? args.slice(1).join(" ") : args.join(" ");
  
  if (undoMode) {
    const originalText = textToReverse.split("").reverse().join("");
    api.sendMessage(`🔄 𝗨𝗡𝗗𝗢 𝗥𝗘𝗩𝗘𝗥𝗦𝗘𝗗 𝗧𝗘𝗫𝗧\n\n${originalText}`, threadID, messageID);
  } else {
    const reversedText = textToReverse.split("").reverse().join("");
    api.sendMessage(`🔄 𝗥𝗘𝗩𝗘𝗥𝗦𝗘𝗗 𝗧𝗘𝗫𝗧\n\n${reversedText}\n\n✉️ 𝗡𝗢𝗧𝗘\nHello ${userName}, to reverse the altered text back to its original form, just type "/ReverseText [undo] [reversed text]"`, threadID, messageID);
  }
};
