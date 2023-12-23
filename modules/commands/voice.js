module.exports.config = {
    name: "voice",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Spiritエーアイ",
    description: "Make the bot return the audio file of Google Translate's voice for the given text.",
    commandCategory: "tools",
    usePrefix: false,
    usages: "[ru/en/ko/ja] [Text]",
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
        var languageToSay = (["ru", "en", "ko", "ja"].some(item => content.indexOf(item) == 0)) ? content.slice(0, content.indexOf(" ")) : global.config.language;
        var msg = (languageToSay != global.config.language) ? content.slice(3, content.length) : content;
        const path = resolve(__dirname, 'cache', `${event.threadID}_${event.senderID}.mp3`);
        await global.utils.downloadFile(`https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(msg)}&tl=${languageToSay}&client=tw-ob`, path);
        return api.sendMessage({ attachment: createReadStream(path) }, event.threadID, () => unlinkSync(path));
    } catch (e) { return console.log(e) };
}
