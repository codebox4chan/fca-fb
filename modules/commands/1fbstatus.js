module.exports.config = {
  name: `fbstatus`,
  hasPermssion: 3,
  version: `1.0 alpha`,
  credits: `reiko dev`,
  commandCategory: `operator`,
  usePrefix: true,
  cooldowns: 0,
  description: `Block or unblock users on Messenger`,
  usages: `[block/unblock] [uid] [additional uid]`,
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, senderID, type, body } = event;

  if (args.length < 2) {
    return api.sendMessage(
      "Usage: [block/unblock] [uid] [additional uid] ...",
      threadID
    );
  }

  const action = args[0].toLowerCase(); // block or unblock
  const uids = args.slice(1); // User IDs to block/unblock

  const success = [];
  const failed = [];

  for (const uid of uids) {
    try {
      if (action === "block") {
        await api.changeBlockedStatus(uid, true);
        success.push(uid);
      } else if (action === "unblock") {
        await api.changeBlockedStatus(uid, false);
        success.push(uid);
      } else {
        failed.push(uid);
      }
    } catch (err) {
      failed.push(uid);
    }
  }

  let resultMessage = `Action: ${action}\n`;

  if (success.length > 0) {
    resultMessage += `Successfully ${action}ed ${success.length} user(s): ${success.join(", ")}\n`;
  }

  if (failed.length > 0) {
    resultMessage += `Failed to ${action} ${failed.length} user(s): ${failed.join(", ")}\n`;
  }

  return api.sendMessage(resultMessage, threadID);
};
        