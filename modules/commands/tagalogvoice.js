module.exports.config = {
  name: "tag",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Spiritエーアイ",
  description: "Make the bot return google's audio file via tagalog",
  commandCategory: "tools",
  usePrefix: false,
  usages: "[text]",
  cooldowns: 5,
  dependencies: {
    "path": "",
    "fs-extra": ""
  }
};

module.exports.run = async function({ api, event, args }) {
  try {
    const { createReadStream, unlinkSync } = global.nodemodule["fs-extra"];
    const { resolve } = global.nodemodule["path"];

    var content = (event.type == "message_reply") ? event.messageReply.body : args.join(" ");
    var languageToSay = "";
    var supportedLanguages = ["tl", "en"];

    // Check if the first argument is a supported language code
    for (let lang of supportedLanguages) {
      if (content.indexOf(lang) == 0) {
        languageToSay = lang;
        content = content.slice(languageToSay.length + 1); // Remove the language code from the content
        break;
      }
    }

    // If no language code is provided, use English ("en") as the default language
    if (!languageToSay) {
      languageToSay = "tl";
    }

    const path = resolve(__dirname, 'cache', `${event.threadID}_${event.senderID}.mp3`);
    await global.utils.downloadFile(`https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(content)}&tl=${languageToSay}&client=tw-ob`, path);
    return api.sendMessage({ attachment: createReadStream(path) }, event.threadID, () => unlinkSync(path), event.messageID);
  } catch (e) {
    return console.log(e);
  }
};
