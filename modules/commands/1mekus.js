const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "mekus",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "August Quinn",//goodmorning.js remodified into mekus mekus by Franz Anthony
  description: "Automatically responds with a randomly selected audio greeting when certain keywords are detected in the message.",
  commandCategory: "system",
  usePrefix: true,
  cooldowns: 20,
};

module.exports.run = async ({ event, api }) => {};

module.exports.handleEvent = async ({ event, api }) => {
  const message = event.body.toLowerCase();
  const senderID = event.senderID;

  const audioGreetings = {
    "mekus, mekus mekus, mekusmekus": [
      "https://drive.google.com/uc?export=download&id=16q_ZEHIn_I5CfIKMln9h4vd36UGQnyGM",
      "https://drive.google.com/uc?export=download&id=16q_ZEHIn_I5CfIKMln9h4vd36UGQnyGM",
      "https://drive.google.com/uc?export=download&id=16q_ZEHIn_I5CfIKMln9h4vd36UGQnyGM",    
    ],
  };

  for (const keywords in audioGreetings) {
    if (audioGreetings.hasOwnProperty(keywords)) {
      const keywordsToCheck = keywords.split(',').map(kw => kw.trim());

      for (const kw of keywordsToCheck) {
        if (message === kw) {
          const randomIndex = Math.floor(Math.random() * audioGreetings[keywords].length);
          const selectedAudioUrl = audioGreetings[keywords][randomIndex];

          try {
            const response = await axios.get(selectedAudioUrl, { responseType: "arraybuffer" });
            const audioBuffer = Buffer.from(response.data, "binary");

            const audioFilePath = path.join(__dirname, "cache", `${keywords}_${randomIndex}.mp3`);
            fs.writeFileSync(audioFilePath, audioBuffer);

            const attachment = fs.createReadStream(audioFilePath);

            api.sendMessage({ body: "Mekus Mekus ahh Tornado!!", attachment }, event.threadID, event.messageID);

            fs.unlinkSync(audioFilePath);
          } catch (error) {
            console.error(error);
          }

          break;
        }
      }
    }
  }
};

module.exports.listenGlobal = true;