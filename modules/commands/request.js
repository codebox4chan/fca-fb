module.exports.config = {
  name: "request",
  version: "1.0.0",
  credits: "August Quinn",
  hasPermssion: 0,
  description: "Send a request to the admin and specified group chat (for administrators or for personal space)",
  usage: "[message]",
  usePrefix: true,
  commandCategory: "system",
  cooldowns: 10
};

module.exports.run = async ({ api, event, args }) => {
  const { threadID, senderID } = event;
  const requestMessage = args.join(" ");

  if (!requestMessage) {
    return api.sendMessage("Please provide a message with your request.", threadID);
  }

  const adminID = "100081201591674";
  const threadToReceiveID = "7225992434094687";

  const userInfo = await api.getUserInfo([senderID]);
  const senderName = userInfo[senderID].name;

  const groupName = (await api.getThreadInfo(threadID)).name || "Group Chat";
  const groupID = threadID;

  const messageToSend = `》》》 𝗡𝗘𝗪 𝗥𝗘𝗤𝗨𝗘𝗦𝗧\n\n𝗦𝗘𝗡𝗗𝗘𝗥 𝗡𝗔𝗠𝗘: ${senderName}\n𝗦𝗘𝗡𝗗𝗘𝗥 𝗜𝗗: ${senderID}\n𝗚𝗥𝗢𝗨𝗣 𝗡𝗔𝗠𝗘: ${groupName}\n𝗚𝗥𝗢𝗨𝗣 𝗜𝗗: ${groupID}\n𝗥𝗘𝗤𝗨𝗘𝗦𝗧 𝗠𝗘𝗦𝗦𝗔𝗚𝗘: ${requestMessage}`;

  api.sendMessage(messageToSend, adminID);
  api.sendMessage(messageToSend, threadToReceiveID);
  api.sendMessage("Upon submission of your request, please be advised that it has been sent to the pending section. I kindly ask for your patience during this period and request that you wait for the decision to be made by my owner. Your understanding in this regard is highly valued.", event.threadID, event.messageID);
};
                                          