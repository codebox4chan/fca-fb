module.exports.config = {
  name: "groupstats",
  version: "1.1.0",
  hasPermssion: 2,
  credits: "August Quinn",
  description: "Get information about the current group chat.",
  commandCategory: "admin",
  usePrefix: true,
  usages: "",
  cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
  try {
    const threadInfo = await api.getThreadInfo(event.threadID);
    const threadName = threadInfo.threadName || "Unnamed Thread";
    const threadType = threadInfo.isGroup ? "Group" : "Personal Chat";
    const participantCount = threadInfo.participantIDs.length;

    const groupID = threadInfo.isGroup ? `\n  ⦿ Group ID: ${event.threadID}` : "";
    const groupStatus = threadInfo.isGroup ? `\n  ⦿ Group Status: ${threadInfo.approvalMode ? "Approval Mode On" : "Approval Mode Off"}${threadInfo.restrictions ? `\n  ⦿ Group Issues: ${threadInfo.restrictions}` : ""}` : "";

    const adminIDs = threadInfo.adminIDs || [];
    const nicknames = await Promise.all(threadInfo.participantIDs.map(async (userID) => {
      const userInfo = await api.getUserInfo(userID);
      return `• ${userInfo[userID].name}\n- ${userID}\n`;
    }));

    const infoMessage = `👾 Hello ${threadName}\n\nℹ️ ${threadName}'s Information\n\n  ⦿ 𝗡𝗔𝗠𝗘: ${threadName}\n  ⦿ 𝗧𝗬𝗣𝗘: ${threadType}${groupID}${groupStatus}\n  ⦿ 𝗣𝗔𝗥𝗧𝗜𝗖𝗜𝗣𝗔𝗡𝗧𝗦: ${participantCount}\n  ⦿ 𝗣𝗔𝗥𝗧𝗜𝗖𝗜𝗣𝗔𝗡𝗧𝗦:\n ${nicknames.join("\n")}`;

    api.sendMessage(infoMessage, event.threadID, event.messageID);
  } catch (error) {
    console.error("Error fetching thread information:", error);
    api.sendMessage("❎ Error fetching thread information. Please try again later.", event.threadID, event.messageID);
  }
};