module.exports.config = {
  name: "palindrome",
  version: "1.0.0",
  description: "August Quinn",
  description: "Check if a word or phrase is a palindrome.",
  commandCategory: "educational",
  usePrefix: true,
  usage: "[text paragraph]",
  cooldowns: 5
};
 
module.exports.run = async ({ api, event, args }) => {
  const { threadID, senderID } = event;
 
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
 
  if (!args[0]) {
    api.sendMessage(`Hey ${userName}! Please provide a text paragraph to check for palindromes.`, event.threadID, event.messageID);
    return;
  }
 
  const text = args.join(" ").toLowerCase();
  const words = text.split(/\W+/).filter(word => word.length > 1);
 
  const isPalindrome = word => {
    return word === word.split('').reverse().join('');
  };
 
  const palindromes = words.filter(isPalindrome);
 
  let response = `Hey ${userName}! Here's the result:\n\n`;
  response += `𝗡𝗨𝗠𝗕𝗘𝗥 𝗢𝗙 𝗣𝗔𝗟𝗜𝗡𝗗𝗥𝗢𝗠𝗘𝗦: ${palindromes.length}\n\n`;
 
  if (palindromes.length > 0) {
    response += "𝗟𝗜𝗦𝗧 𝗢𝗙 𝗣𝗔𝗟𝗜𝗡𝗗𝗥𝗢𝗠𝗘𝗦\n";
    for (const palindrome of palindromes) {
      const formattedPalindrome = palindrome.charAt(0).toUpperCase() + palindrome.slice(1);
      response += `   ⌲ ${formattedPalindrome}\n`;
    }
  } else {
    response += "No palindromes found in the provided text.";
  }
 
  api.sendMessage(response, event.threadID, event.messageID);
};
      