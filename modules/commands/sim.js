const axios = require("axios");
const { createReadStream, unlinkSync } = global.nodemodule["fs-extra"];
const { resolve } = global.nodemodule["path"];

module.exports.config = {
   name: "sim",
   version: "1",
   hasPermssion: 0,
   credits: "Grey and modified by kenneth panio added loli voice thanks to ethan for sharing tts api",
   description: "Simsimi",
   usePrefix: false,
   usages: "[message]",
   commandCategory: "fun",
   cooldowns: 0
};

module.exports.run = async ({ api, event, args }) => {
   try {
      let message = args.join(" ");
      if (!message) {
         return api.sendMessage(`Please put Message`, event.threadID, event.messageID);
      }

      const response = await axios.get(`https://api.heckerman06.repl.co/api/other/simsimi?message=${message}&lang=ph`);
      const botResponse = `${response.data.message}`;

      const japaneseResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=ja&dt=t&q=${encodeURIComponent(botResponse)}`);
      const translatedText = japaneseResponse.data[0][0][0];

      const audioPath = resolve(__dirname, 'cache', `${event.threadID}_${event.senderID}.wav`);
      const audioApi = await axios.get(`https://api.tts.quest/v3/voicevox/synthesis?text=${encodeURIComponent(translatedText)}&speaker=3&fbclid=IwAR01Y4UydrYh7kvt0wxmExdzoFTL30VkXsLZZ2HjXjDklJsYy2UR3b9uiHA`);
      const audioUrl = audioApi.data.mp3StreamingUrl;
      await global.utils.downloadFile(audioUrl, audioPath);
      const att = createReadStream(audioPath);

      api.sendMessage(botResponse, event.threadID);
      api.sendMessage({
         attachment: att
      }, event.threadID, () => unlinkSync(audioPath));
   } catch (error) {
      console.error("An error occurred:", error);
      api.sendMessage("Oops! Something went wrong.", event.threadID, event.messageID);
   }
};