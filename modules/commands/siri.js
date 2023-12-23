const axios = require("axios");

const config = {
  name: "yukihira",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Yukihira soma",
  description: "OpenAI official AI with no prefix",
  commandCategory: "educational",
  usages: "[ask]",
  cooldowns: 0
};

const handleEvent = async function ({ api, event, client, __GLOBAL }) {

  if (event.body.indexOf("siri") === 0 || event.body.indexOf("siri") === 0) {
    const { threadID, messageID } = event;
    const input = event.body;
    const message = input.split(" ");

    if (message.length < 2) {
      api.sendMessage("hello, yes I am Siri 5.6. What can I do for you?", event.threadID);
    } else {
      try {
        api.sendMessage(`🖇️Preparing please wait for a minute...`, event.threadID);
        const ris = await axios.get(`https://official-anjelo-api.anjelopogialways.repl.co/siri?ask=${message.slice(1).join(" ")}&apikey=${global.config.siri}`);
        const result = ris.data.result;
        api.sendMessage(`𝐀𝐍𝐒𝐖𝐄𝐑 𝐅𝐎𝐔𝐍𝐃:${result}`, event.threadID);
      } catch (err) {
        console.error(err);
        api.sendMessage("The API link you provided is not working. Please contact Anjelo to fix this error.", event.threadID);
      }
    }
  }
};

const run = function ({ api, event, client, __GLOBAL }) {
};

module.exports = { config, handleEvent, run };