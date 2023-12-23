module.exports.config = {
  name: "genpw",
  version: "1.0.0",
  credits: "August Quinn",
  description: "Generate secure passwords.",
  commandCategory: "tools",
  usePrefix: false,
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
 
  const passwordLength = 12;
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#";
  
  let password = '';
  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }
  
  api.sendMessage(`Hey ${userName}! "${password}" is your generated secure password.`, event.threadID, event.messageID);
};
    