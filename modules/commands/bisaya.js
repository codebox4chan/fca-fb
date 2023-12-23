module.exports.config = {
  name: "bisaya",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "kennethpanio",
  description: "text translation",
  usePrefix: false,
  commandCategory: "tools",
  usages: `[fr,tl,en,ceb]`,
  cooldowns: 5,
  dependencies: {
    "request": ""
  }
};

module.exports.run = async ({ api, event, args }) => {
  const request = global.nodemodule["request"];
  const targetLanguage = args[0];
  const content = args.slice(1).join(" ");

  if (content.length === 0 && event.type !== "message_reply")
    return global.utils.throwError(this.config.name, event.threadID, event.messageID);

  let translateThis, lang;

if (event.type === "message_reply") {
  translateThis = event.messageReply.body;
  lang = targetLanguage || "ceb"; // Set "tl" as the default language if none provided
} else {
  translateThis = content;
  lang = targetLanguage || "ceb"; // Set "tl" as the default language if none provided
}

  return request(encodeURI(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${translateThis}`), (err, response, body) => {
    if (err)
      return api.sendMessage("an error has occurred.", event.threadID, event.messageID);

    const retrieve = JSON.parse(body);
    let text = '';
    retrieve[0].forEach(item => (item[0]) ? text += item[0] : '');
    const fromLang = (retrieve[2] === retrieve[8][0][0]) ? retrieve[2] : retrieve[8][0][0];

    api.sendMessage(`𝗧𝗥𝗔𝗡𝗦𝗟𝗔𝗧𝗜𝗢𝗡:\n\n${text}\n\ntranslated from ${fromLang} to ${lang} 🧑‍🏫`, event.threadID, event.messageID);
  });
};