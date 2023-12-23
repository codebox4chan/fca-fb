module.exports.config = {
  name: "clear",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "NAUGHTY", 
  description: "unsent the message sent by the bot",
  usePrefix: false,
  commandCategory: "tools",
  usages: "",
  cooldowns: 10,
};

module.exports.run = async function ({ api, event, args }) {
  var naughty = args.join(" ");
  if (!naughty) api.sendMessage("Please Enter Number How Many Messge You Want To Clear\n\nNote: The Unsended Message Is Not Clearly Equal To The Number You Enterd They Unsended Message May Be Less", event.threadID, event.messageID);

   // if (!NaN(naughty) api.sendMessage("PLEASE ENTER NUMBER ONLY", event.threadID, event.messageID);
  const unsendBotMessages = async () => {
    const threadID = event.threadID;
api.sendMessage("Cleared Appoximately " + naughty + " Messages",event.threadID, event.messageID);
    const botMessages = await api.getThreadHistory(threadID, naughty);
    const botSentMessages = botMessages.filter(message => message.senderID === api.getCurrentUserID());

    for (const message of botSentMessages) {
      await api.unsendMessage(message.messageID);
    }
  };

  await unsendBotMessages();
};