module.exports.config = {
  name: "goibot",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "manhIT",
  description: "Auto answer and react",
  commandCategory: "message",
  usages: "",
  cooldowns: 5,
  usePrefix: false
};

module.exports.handleEvent = async function ({ api, event, Users }) {
  var { threadID, messageID } = event;

  var tl = [ 
    "Yes???",
    "chat me.",
    "What??",
    "bla-bla.",
    "be quiet.",
    "how stupid you are.",
    "are you okay?",
    "wanna fight?",
    "uhuh?.",
    "ugh hahaha",
    "Yes? lo loadan mo ba ako?",
    "ano daw?",
    "boring👎",
    "wag kang maingay may nag titikol",
    "chat my owner https://www.facebook.com/100081201591674",
    "hahahaha",
    "try me! if you spam then gets ban award!"
  ];

  var rand = tl[Math.floor(Math.random() * tl.length)];
  let yan = event.body ? event.body.toLowerCase() : '';

  if (yan.indexOf("gwapo") === 0) {
    api.setMessageReaction("💗", event.messageID, () => {}, true);
    //api.sendTypingIndicator(event.threadID, true);

    let userH = event.senderID;
    const userInfo = global.data.userName.get(userH) || await Users.getUserInfo(userH);
    if (event.senderID == api.getCurrentUserID()) return;

    var msg = {
      body: "@" + userInfo + ", " + rand, 
      mentions: [{
        tag: "@" + userInfo,
        id: userH
      }]
    };

    setTimeout(function() {
      return api.sendMessage(msg, threadID, messageID);
    }, 2000);
  }

  if (
    yan.includes("haha") ||
    yan.includes("lmao") ||
    yan.includes("lol") ||
    yan.includes("yahoo") ||
    yan.includes("yahuu") ||
    yan.includes("agoy") ||
    yan.includes("aguy") ||
    yan.includes("😄") ||
    yan.includes("🤣") ||
    yan.includes("😆") ||
    yan.includes("😄") ||
    yan.includes("😅") ||
    yan.includes("xd")
  ) {
    return api.setMessageReaction("😆", event.messageID, () => {}, true);
  } 

  if (
    yan.includes("kawawa") ||
    yan.includes("sad") ||
    yan.includes("agoi") ||
    yan.includes("sakit") ||
    yan.includes("skit") ||
    yan.includes("pain") ||
    yan.includes("pighati")
  ) {
    return api.setMessageReaction("🥲", event.messageID, () => {}, true);
  }
};
