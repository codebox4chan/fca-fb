const axios = require('axios');
const { createReadStream, unlinkSync } = global.nodemodule["fs-extra"];
const { resolve } = global.nodemodule["path"];

module.exports.config = {
   name: "talk",
   version: "1.1.0",
   hasPermission: 0,
   credits: "kennethpanio",
   description: "talk reply",
   usePrefix: false,
   commandCategory: "fun",
   usages: "[Message]",
   cooldowns: 0
};

module.exports.onLoad = function() {
    const { writeFileSync, existsSync } = global.nodemodule["fs-extra"];
    const { resolve } = global.nodemodule["path"];
    const log = require('../../kennethpanio/catalogs/kennethpanioc.js');
    const path = resolve(__dirname, 'system', 'system.json');
    if (!existsSync(path)) {
        const obj = {
            kennethpanio: {}
        };
        writeFileSync(path, JSON.stringify(obj, null, 4));
    } else {
        const data = require(path);
        if (!data.hasOwnProperty('kennethpanio')) data.kennethpanio = {};
        writeFileSync(path, JSON.stringify(data, null, 4));
    }
}

module.exports.handleEvent = async ({ api, event, args, Threads }) => {
    const { threadID, messageID } = event;
    const { resolve } = global.nodemodule["path"];
    const path = resolve(__dirname, '../commands', 'system', 'system.json');
    const { talk } = global.apikennethpanio;
    const { kennethpanio } = require(path);

    if (kennethpanio.hasOwnProperty(threadID) && kennethpanio[threadID] == true) {
      if (event.senderID !== api.getCurrentUserID()) {
      axios.get(encodeURI(`${talk}${event.body}`)).then(res => {
            if (res.data.reply == "null" || res.data.reply == "i didn't understand you, teach me.") {
                api.sendMessage("i didn't understand you, teach me.",threadID,messageID)
            } else {
                return api.sendMessage(res.data.reply, threadID, messageID);
            }
    })
    }  
    }
}

module.exports.run = async ({ api, event, args, permission }) => {
   const { writeFileSync } = global.nodemodule["fs-extra"];
   const { resolve } = global.nodemodule["path"];
   const path = resolve(__dirname, 'system', 'system.json');
   const { threadID, messageID } = event;
   const database = require(path);
   const { talk } = global.apikennethpanio;
   const { kennethpanio } = database;

   if (!args[0]) {
      api.sendMessage("Enter a message", threadID, messageID);
   } else {
      switch (args[0]) {
         case "on": {
            if (permission !== 1) return api.sendMessage('Only group admins can use this command', threadID, messageID);
            kennethpanio[threadID] = true;
            api.sendMessage("Successfully turned on talk.", threadID);
            break;
         }
         case "off": {
            if (permission !== 1) return api.sendMessage('Only group admins can use this command', threadID, messageID);
            kennethpanio[threadID] = false;
            api.sendMessage("Successfully turned off talk.", threadID);
            break;
         }
         default:
            axios.get(encodeURI(`${talk}${args.join(" ")}`)).then(async res => {
               if (res.data.reply == "null" || res.data.reply == "I didn't understand you, teach me.") {
                  api.sendMessage("I didn't understand you, teach me.", threadID, messageID);
               } else {
                  const tranResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=ja&dt=t&q=${encodeURIComponent(res.data.reply)}`);
                  const translatedText = tranResponse.data[0][0][0];

                  const audioPath = resolve(__dirname, 'cache', `${threadID}_${event.senderID}.wav`);
                  const audioApi = await axios.get(`https://api.tts.quest/v3/voicevox/synthesis?text=${encodeURIComponent(translatedText)}&speaker=3&fbclid=IwAR01Y4UydrYh7kvt0wxmExdzoFTL30VkXsLZZ2HjXjDklJsYy2UR3b9uiHA`);
                  const audioUrl = audioApi.data.mp3StreamingUrl;
                  await global.utils.downloadFile(audioUrl, audioPath);
                  const att = createReadStream(audioPath);

                  api.sendMessage(res.data.reply, threadID);
                  api.sendMessage({
                     attachment: att
                  }, threadID, () => unlinkSync(audioPath));
               }
            });
            break;
      }
      writeFileSync(path, JSON.stringify(database, null, 4));
   }
}