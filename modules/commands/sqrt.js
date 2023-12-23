module.exports.config = {
  name: "sqrt",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "August Quinn",
  description: "Calculates the square root of a number.",
  commandCategory: "educational",
  usePrefix: false,
  usages: "[number]",
  cooldowns: 5,
  dependencies: '',
};
 
module.exports.run = async function ({ api, event, args }) {
  const uid = event.senderID;
  const userName = (await api.getUserInfo(uid))[uid].name;
  
  const number = parseFloat(args[0]);
 
  if (isNaN(number)) {
    return api.sendMessage("Please provide a valid number.", event.threadID, event.messageID);
  }
 
  if (number < 0) {
    return api.sendMessage("Cannot calculate square root of a negative number.", event.threadID, event.messageID);
  }
 
  const squareRoot = Math.sqrt(number);
 
  const response = `Hey ${userName}, the square root of ${number} is ${squareRoot.toFixed(2)}.`;
 
  return api.sendMessage(response, event.threadID, event.messageID);
};
