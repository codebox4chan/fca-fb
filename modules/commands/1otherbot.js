module.exports.config = {
  name: "otherbot",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Anne ÷ and Blue", // Remodeled
  description: "Kick otherbot",
  usePrefix: true,
  commandCategory: "system",
  cooldowns: 0
};

module.exports.handleEvent = async ({
  event: o,
  api: t,
  Users: n
}) => {
  var {
    threadID: e,
    messageID: a,
    body: b,
    senderID: s,
    reason: d
  } = o;
  const i = require("moment-timezone").tz("Asia/Manila").format("HH:mm:ss L");
  if (s == t.getCurrentUserID()) return;
  let c = await n.getNameUser(o.senderID);
  ["Other Bot"].forEach((a => {
    const haha = o.body;
    if (haha.includes("your keyboard level has reached level") || haha.includes("Command not found") || haha.includes("The command you used") || haha.includes("Uy may lumipad") || haha.includes("Unsend this message") || haha.includes("You are unable to use bot") || haha.includes("»» NOTICE «« Update user nicknames") || haha.includes("just removed 1 Attachments") || haha.includes("message removedcontent") || haha.includes("The current preset is") || haha.includes("Here Is My Prefix") || haha.includes("just removed 1 attachment.") || haha.includes("Unable to re-add members")) {
      modules = "[ BOT KICK ]", console.log(c, modules, a);
      const o = n.getData(s).data || {};
      n.setData(s, {
        data: o
      });
      t.removeUserFromGroup(s, e).then(() => {
        const groupName = t.getThreadInfo(e).threadName;
        const adminList = t.getThreadInfo(e).participantIDs.filter(id => t.getUserInfo(id).isAdmin);
        adminList.forEach(adminID => {
          t.sendMessage(`> ${c} < WAS KICKED FROM GROUP ${groupName}\n\nPlease make sure this user is a bot.`, adminID);
        });
      }).catch(err => {
        console.error(err);
      });
    }
  }));
};

module.exports.run = async ({
  event: o,
  api: t
}) => t.sendMessage("『 This command is used to detect other bots and kick them immediately to avoid spamming 』", o.threadID);