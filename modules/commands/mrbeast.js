module.exports.config = {
    name: "beast",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "kenneth panio", // Updated credits
    description: "Convert text to voice using the Beast API",
    usePrefix: false, // Updated to false
    commandCategory: "fun",
    usages: "[text]",
    cooldowns: 5,
    dependencies: {
        "axios": "",
        "path": "",
        "fs-extra": ""
    }
};

const axios = require("axios");
const { createReadStream, unlinkSync } = global.nodemodule["fs-extra"];
const { resolve } = global.nodemodule["path"];

module.exports.run = async function ({ api, event, args }) {
      if (args.length < 1) {
      return api.sendMessage('No TTS!', event.threadID, event.messageID);
  }
    try {
        const query = encodeURIComponent(args.join(" "));
        const response = await axios.get(`https://www.api.vyturex.com/beast?query=${query}`);

        if (response.data && response.data.audio) {
            const audioURL = response.data.audio;
            const fileName = "mrbeast!.mp3";
            const filePath = resolve(__dirname, "cache", fileName);

            await global.utils.downloadFile(audioURL, filePath);

            return api.sendMessage({
                body: response.data.txt,
                attachment: createReadStream(filePath)
            }, event.threadID, () => unlinkSync(filePath), event.messageID);
        } else {
            return api.sendMessage("Failed to fetch Beast API response.", event.threadID, event.messageID);
        }
    } catch (error) {
        console.error(error);
        return api.sendMessage("An error occurred while processing the command.", event.threadID, event.messageID);
    }
};
