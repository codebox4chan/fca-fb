module.exports.config = {
  name: "allid",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "Blue", // Special Thanks to Yukihira Soma aka Anjelo for the idea
  description: "User and group id in one file",
  commandCategory: "info",
  usePrefix: false,
  usages: "allid (mention user)",
  cooldowns: 5,
  dependencies: '',
};

module.exports.run = async function ({ api, event }) {
  const tid = event.threadID;
  const uid = event.senderID;
  const userName = (await api.getUserInfo(uid))[uid].name;

  if (!event.mentions || Object.keys(event.mentions).length === 0) {
    
    const message = `HERE'S THE ALL ID THAT INCLUDE THE TID AND UID!\nThread ID (tid): ${tid}\nUser ID (uid): ${uid}\nUser Name: ${userName}`;
    return api.sendMessage(message, event.threadID);
  } else {
    
    const mentionedUsers = Object.keys(event.mentions).map((id) => ({
      id,
      name: event.mentions[id],
    }));

    const message = `Thread ID (tid): ${tid}\nUser ID (uid): ${uid}\nUser Name: ${userName}\n\nMentioned Users:\n`;
    const mentionedUsersInfo = mentionedUsers.map(
      (user) => `${user.name.replace('@', '')} (uid: ${user.id})`
    );

    return api.sendMessage(message + mentionedUsersInfo.join('\n'), event.threadID);
  }
};