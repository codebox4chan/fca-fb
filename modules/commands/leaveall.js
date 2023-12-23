module.exports.config = {
  name: "leaveall",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "kennethpanio",
  description: "tell the bot to Leave all groups",
  usePrefix: true,
  commandCategory: "admin",
  usages: "",
  cooldowns: 10,
};

module.exports.run = async function({ api, event, args }) {
  const threadList = await api.getThreadList(100, null, ["INBOX"]); // Fetches the list of threads
  const leavePromises = [];

  for (const thread of threadList) {
    if (thread.isGroup) {
      leavePromises.push(api.removeUserFromGroup(api.getCurrentUserID(), thread.threadID).catch(() => null)); // Leave each group and catch any errors
    }
  }

  try {
    await Promise.all(leavePromises);
    api.sendMessage("Successfully left all groups!.", event.threadID);
  } catch (error) {
    console.error(error);
    api.sendMessage("An error occurred while leaving groups.", event.threadID);
  }
};
