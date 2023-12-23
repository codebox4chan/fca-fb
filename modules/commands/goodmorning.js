const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "goodmorning",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "August Quinn",
  description: "Automatically responds with a randomly selected audio greeting when certain keywords are detected in the message.",
  commandCategory: "system",
  usePrefix: false,
  cooldowns: 60,
};

module.exports.run = async ({ event, api }) => {};

module.exports.handleEvent = async ({ event, api }) => {
  const message = event.body.toLowerCase();
  const senderID = event.senderID;

  const audioGreetings = {
    "morning, good morning, goodmorning": [
      "https://drive.google.com/uc?export=download&id=1I8a1BaPIJcaDP4Xief27QDFZgItPniqB",
      "https://drive.google.com/uc?export=download&id=1IBULbg_AIvncTLdfv6cP_sXP-tMNoC4s",
      "https://drive.google.com/uc?export=download&id=1INuabM1ck_fOYbl51Xzr_79cwoHd6An8"
     /* "https://drive.google.com/uc?export=download&id=1IFRzsuMbqKZF5lTEm-R5vANIv5KMBpNj",
      "https://drive.google.com/uc?export=download&id=1IWL9W1Ws77rZr-A4ZC4y3FIr0XFguXoV",
      "https://drive.google.com/uc?export=download&id=1I6x5SfPTd898eCJXnGTQyuHt6uVEO-ZR",
      "https://drive.google.com/uc?export=download&id=1IIoocxESmqak8pNbC7XO6-aDvuAV0qOI", */
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

            api.sendMessage({ body: "Good Morning 🌄", attachment }, event.threadID, event.messageID);

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
  
