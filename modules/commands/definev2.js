const axios = require("axios");
const { resolve } = require("path");
const { createReadStream, unlinkSync } = require("fs");
const { downloadFile } = global.utils;

module.exports.config = {
  name: "definev2",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ʙʟᴜᴇ",
  description: "Defines a word using an online dictionary.",
  usePrefix: false,
  commandCategory: "educational",
  cooldowns: 5,
  usages: "[word]",
};

module.exports.run = async function ({ api, event, args }) {
  const word = args.join(" ");
  if (!word) {
    api.sendMessage("Please provide a word to define.", event.threadID);
    return;
  }

  try {
    const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const definition = response.data[0]?.meanings[0]?.definitions[0]?.definition;
    if (definition) {
      api.sendMessage(`Definition of ${word}: ${definition}`, event.threadID);
    } else {
      api.sendMessage(`No definition found for ${word}.`, event.threadID);
    }
    
    const content = `The definition of ${word} is ${definition}`;
    const languageToSay = "tl";
    const pathFemale = resolve(__dirname, "cache", `${event.threadID}_female.mp3`);

    downloadFile(
      `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
        content
      )}&tl=${languageToSay}&client=tw-ob&idx=1`,
      pathFemale
    ).then(() => {
      api.sendMessage(
        { attachment: createReadStream(pathFemale) },
        event.threadID,
        () => unlinkSync(pathFemale)
      );
    }).catch(error => {
      console.error("Error sending a message:", error);
      api.sendMessage("An error occurred while making the API request.", event.threadID, event.messageID);
    });
  } catch (error) {
    console.error("Error fetching definition:", error);
    api.sendMessage("An error occurred while fetching the definition.", event.threadID);
  }
};