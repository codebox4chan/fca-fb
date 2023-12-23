module.exports.config = {
  name: "agecalc",
  version: "1.0.0",
  credits: "August Quinn",
  description: "Calculate your age or someone's age based on birthdate.",
  commandCategory: "tools",
  usePrefix: true,
  usage: "[birthdate]",
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
    api.sendMessage(`Hello ${userName}. Kindly provide a birthdate in the format YYYY-MM-DD.`, event.threadID, event.messageID);
    return;
  }
 
  const birthdateString = args[0];
  const birthdate = new Date(birthdateString);
 
  if (isNaN(birthdate.getTime())) {
    api.sendMessage(`Hey ${userName}, that's an invalid birthdate format. Please use the format YYYY-MM-DD.`, event.threadID, event.messageID);
    return;
  }
 
  const now = new Date();
  const ageInMilliseconds = now - birthdate;
  const ageInYears = ageInMilliseconds / (365 * 24 * 60 * 60 * 1000);
 
  const formattedAge = ageInYears.toFixed(2);
 
  api.sendMessage(`Hi ${userName}, the calculated age based on the birthdate ${birthdateString} is approximately ${formattedAge} years.`, event.threadID, event.messageID);
};