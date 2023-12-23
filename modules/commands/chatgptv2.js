const axios = require('axios');
const qs = require('querystring');

module.exports.config = {
  name: "chatgptv2",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ninjatech", 
  description: "chatgpt educational chatbot",
  usePrefix: false,
  commandCategory: "educational",
  usages: "",
  cooldowns: 5,
};

module.exports.run = async function({ api, event, args }){
   const msg = args.join("");
   if (!args[0]) return api.sendMessage("hello how can i help you", threadID, messageID);
  try {
  const API ='https://shiki-new-api.hayih59124.repl.co/api/chatgpt?content=';
  const prompt ='act like my bestie';
   const response = await axios.get(`${API}${encodeURI(prompt)}${encodeURI(msg)}`);
   const ai = response.data.reply;
   const headers = "bes\n";
   const ans = headers + ai;
   api.sendMessage(ai, event.threadID, event.messageID);
    api.setMessageReaction("✅", 
                      event.messageID, (err) => {}, true);
  }catch (error) {
    console.error('Something went wrong:', error);
    api.sendMessage('grabe may error maya mo nalang gamitin ulit mwuaps ', event.threadID, event.messageID);
    api.setMessageReaction("❌", 
                      event.messageID, (err) => {}, true);
    }
};