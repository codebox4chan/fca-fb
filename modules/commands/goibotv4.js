module.exports.config = {
  name: "goibotv4",
  version: "4.0.0",
  hasPermssion: 0,
  credits: "junmar dilao",
  description: "Automated message response to detected words related to hacking",
  commandCategory: "message",
  usages: [],
  cooldowns: 5,
  usePrefix: false
};

module.exports.handleEvent = async function ({ api, event, Users }) {
  var { threadID, messageID } = event;

  var tl = [ 
    "boy gusto mo hack ka namen ha?? wag ka mag mayabang sa internet... meron akong kasama mga hacker kame... nahack na namen yung gobyerno pati marunong kami ng cross fire wall hack 2.0 wag mo kami niloloko ha.. hindi mo alam kung cno katapat mo boi... marami rin kami world wide organisations rn kame... mga naka masks kami pre.... ayaw namen sa mga CORRUPT government. lalo na si P-NOY PANOT!. ayaw din namen sa mga ILLUMINATI... pti alam namen i.p. address mo ha pede namen ikaw potolan internet haup k........ pumili ka ng kakalabanen mo boi ha.... we are legion we are forgot we are anonymous... signing out.....\n\n-junmar dilao"
  ];

  var rand = tl[Math.floor(Math.random() * tl.length)];
  let yan = event.body ? event.body.toLowerCase() : '';

  if (yan.indexOf("hacker") === 0) {
    api.setMessageReaction("☺️", event.messageID, (err) => {});
  } else if (yan.indexOf("hack") === 0) {
    api.setMessageReaction("😲", event.messageID, (err) => {});
  } else if (yan.indexOf("hakir") === 0) {
    api.setMessageReaction("😱", event.messageID, (err) => {});
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
    yan.includes("mawmaw") ||
    yan.includes("pro") ||
    yan.includes("procoder") ||
    yan.includes("kenneth") ||
    yan.includes("kenlie") ||
    yan.includes("boss") ||
    yan.includes("ssob") ||
    yan.includes(",") ||
    yan.includes("+") ||
    yan.includes("-") ||
    yan.includes("/") ||
    yan.includes(".") ||
    yan.includes("?")
  ) {
    return api.setMessageReaction("😆", event.messageID, (err) => {});
  } 

  if (
    yan.includes("sobra") ||
    yan.includes("ew") ||
    yan.includes("ewws") ||
    yan.includes("ewws") ||
    yan.includes("ai") ||
    yan.includes("child") ||
    yan.includes("heart") ||
    yan.includes("mawmaw") ||
    yan.includes("bot") ||
    yan.includes("creator") ||
    yan.includes("owner") ||
    yan.includes("panio") ||
    yan.includes("kenneth")
  ) {
    return api.setMessageReaction("💗", event.messageID, (err) => {});
  } 
  
  if (
    yan.includes("turoan") ||
    yan.includes("hanas") ||
    yan.includes("paturo") ||
    yan.includes("master") ||
    yan.includes("teacher") ||
    yan.includes("pano") ||
    yan.includes("galing")
  ) {
    return api.setMessageReaction("🗿", event.messageID, (err) => {});
  }
};

module.exports.run = async function ({ api, event, __GLOBAL }) {};
