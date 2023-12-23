module.exports.config = {
  name: "cleargc",
  version: "0.1.5",
  hasPermssion: 2,
  credits: "kennethpanio",
  description: "Remove Everyone in Group Automatically",
  commandCategory: "tools",
  usages: "",
  cooldowns: 5,
  usePrefix: false
};

module.exports.run = async function({ api, event, args }) {
  const botID = api.getCurrentUserID();
  const ownerID = global.config.OWNERID; // Replace with your owner's ID
  var threadInfo = await api.getThreadInfo(event.threadID);
  var id = threadInfo.participantIDs;
  const user = args.join(" ");

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  api.sendMessage("Hello everyone! 👋 It seems like it's time for a fresh start. Let's kick off some members in this group with renewed energy and excitement! 💪😊", event.threadID);

  for (let participantID of id) {
    if (participantID === botID || participantID === ownerID) {
      // Skip removing the bot and the owner
      continue;
    }

    await delay(5000);
    api.removeUserFromGroup(participantID, event.threadID, participantID);
  }
};
