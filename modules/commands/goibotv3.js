module.exports.config = {
  name: "goibotv3",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "manhIT",
  description: "mamaw codings automated-response",
  commandCategory: "message",
  usages: "",
  cooldowns: 5,
  usePrefix: false
};

module.exports.handleEvent = async function ({ api, event, Users }) {
  var { threadID, messageID } = event;

  var tl = [ 
    "totoo yan",
    "sobra",
    "\nmamaw❌\npinakamamaw✅",
    "mamaw check!",
    "paturo kana sa kanya",
    "grabeh",
    "grabeh",
    "ebarg nayan",
    "sabihin mo paturo po lods!",
    "sabihin mo paturo master!",
    "pindot pindot lang yan",
    "magaling na yan sa codings kaya niya na mag ayos ng washing machine",
    "pro yan hinack nga niya 'NASA' gamit ang html",
    "grabeh yan hinack niya 'NASA' gamit html",
    "nako lagot isa siyang hakir! back na tayo back! initiate retreat!",
    "balita ko hinack niya daw ang NASA",
    "KATAWKOTS! Naman😱",
    "grabeh ang lupit niya!",
    "angas!",
    "kaya niya daw i hack ang facebook account ni MARK ZUCKERBERG😏",
    "mamaw sobra",
    "grabeh pano niya nagawa yon?😱",
    "batang hakir",
    "pano ba yan?",
    "pano maging mamaw?",
    "halimaw",
    "\nmamaw❌\nhalimaw✅"
  ];

  var rand = tl[Math.floor(Math.random() * tl.length)];
  let yan = event.body ? event.body.toLowerCase() : '';

  if (yan.indexOf("mamaw") === 0) {
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
    return api.setMessageReaction("😆", event.messageID, () => {}, true);
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
    return api.setMessageReaction("💗", event.messageID, () => {}, true);
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
    return api.setMessageReaction("🗿", event.messageID, () => {}, true);
  }
};
