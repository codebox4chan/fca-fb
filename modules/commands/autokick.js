const stringSimilarity = require('string-similarity');

module.exports.config = {
  name: "autokick",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "araxy", //don't change the credits:) //modified kennethpanio
  description: "",
  usePrefix: false,
  commandCategory: "system",
  usages: "",
  cooldowns: 5
};

module.exports.handleEvent = async ({ event, api, Users }) => {
  const fs = global.nodemodule["fs-extra"];
  var { threadID, messageID, body, senderID } = event;

  if (typeof threadID["kick"] !== "undefined" && threadID["kick"] == false) return;
  let name = await Users.getNameUser(event.senderID);

  try {
    // Define the list of banned words in lowercase
    const bannedWords = [
      "pakyu", "fake bot", "gago", "gongong", "siraulo", "hakdog", "hampaslupa",
      "palamunin", "ukitnam", "biot", "bakla", "pangit ng bot", "landi",
      "pakyu", "fuck", "landi mo", "bulok", "biot", "bakla si bot", "landi", "t2nga", "fuck you",
      "bobo kang bot ka", "bobo", "amp", "bobo", "tikol", "jakol", "pornhub", "porn",
      "malandi", "gago", "gsgo", "chó", "baho", "tangina", "Landi ng bot",
      "Tangina mo bot", "Tanga naman ng bot nyo", "walang kang kwenta bot", "bobo", "bugok",
      "walang kwentang bot", "pin nudes", "pin porn", "pin pussy", "childporn",
      "imagesearch porn", "imagesearch fuck", "imagesearch nudes", "naked",
      "imagesearch childporn", "pakyu bot", "tanginang bot", "magpakamatay kana",
      "fuck you bot", "suck my dick", "wala kang silbi bot", "bulok bot", "patay na si bot", "sira na bot mo", "patayin kita bot", "patayin ko owner mo bot", "sino owner mo", "kaninong bot yan!", "pangit ng bot mo", "kick nyo si bot", "useless", "useless bot", "kick spirit", "who is the owner of this bot?", "pussy", "how to murder", "i murder you", "kawawang bot", "shit", "bullshit", "stupid bot", "dumb bot", "fuck the owner", "search hentai images", "broken bot", "umalis kana bot", "leave kana bot", "leave kana", "nude girls", "show me porn pictures", "somebody kill this guy", "somebody kill this boy", "fuck you admin", "fuck you owner", "orochi better", "orochi", "go fuck yourself", "fuck yourself", "the one who made this bot is stupid", "arabo ako", "puke", "puday", "who ever made this bot must die", "can somebody kill this bot", "remove bot", "fuck this bot", "fuck me", "my bot is better than that", "i have another bot", "this bot is useless", "why are you not responding?", "response", "🖕", "kill bot owner", "spirit is useless", "spirit fuck you", "latestporn", "hentaigasm", "nhentai.net", "beeg.com", "pornhub.com", "gay bot", "gayporn", "can somebody kick this bot", "owshit", "your black nigga", "fuck you Filipinos", "we india strong", "fuck you Philippines", "my bot is better", "bulok admin", "bulok owner", "fuck lgbt", "fucking gay", "why is the bot not responding", "pangit ng bot", "pangit ng admin", "feeling coder", "fuck admins", "pakamatay kana", "kick me", "kick moko", "pakick ako", "pa kick ako", "dagay.com", "xxx.com", "live.gore", "kick mo ko", "kick mo ako", "alis na ako", "leave nako", "leave ako", "noob", "bugok", "dati kabang tanga?", "oo na bot na kinginamo ka", "ikaw dapat kinikick eh wala ka namang dulot sa pinas putanginamo di ka mahal ng magulang mo bobo ka"
    ].map(word => word.toLowerCase());

    const incomingMessage = event.body.toLowerCase();
    const similarWords = stringSimilarity.findBestMatch(incomingMessage, bannedWords);
    const bestMatch = similarWords.bestMatch;

    if (bestMatch.rating > 0.9) { // You can adjust the similarity threshold as needed (0.7 means 70% similarity)
      setTimeout(() => {
        api.removeUserFromGroup(senderID, threadID);
      }, 3000);

      api.setMessageReaction("🖕", event.messageID, (err) => { }, true);
      api.sendMessage(`Fly High! My Nigga!`, event.threadID, event.messageID);
    }
  } catch (err) {
    console.log(err);
  }
};
