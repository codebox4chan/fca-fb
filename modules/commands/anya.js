module.exports.config = {
   name: "anya",
   version: "2.0.0",
   hasPermssion: 2,
   credits: "ethan", 
   description: "simple chatbot talk with Anya",
   commandCategory: "fun",
   usages: "[talk with anya]",
   usePrefix: false,
   cooldowns: 5,
};

module.exports.run = async function({
   api,
   event,
   args
}) {

   const getUserInfo = async (api, userID) => {
      try {
         const userInfo = await api.getUserInfo(userID);
         return userInfo[userID].firstName;
      } catch (error) {
         console.error(`Error fetching user info: ${error}`);
         return '';
      }
   };

   const {
      createReadStream,
      unlinkSync
   } = global.nodemodule["fs-extra"];

   const {
      resolve
   } = global.nodemodule["path"];

   const axios = require("axios");

   let {
      messageID,
      threadID,
      senderID
   } = event;

   const name = await getUserInfo(api, senderID);
   let ranGreetVar = [`Konichiwa ${name}`, "Konichiwa senpai", "Hora"];

   const ranGreet = ranGreetVar[Math.floor(Math.random() * ranGreetVar.length)];

   const chat = args.join(" ");

   if (!args[0]) return api.sendMessage(`${ranGreet}`, threadID, messageID);

   try {
      const userName = await getUserInfo(api, senderID); 
     //fixed by reiko dev
      const prompt = `Act like anya forger a cute anime girl from spy x family anime here is my reply ${userName}: ${chat}`; 
      const codereiko = await axios.get(`https://replhome.codebox4chan.repl.co/api/gpt4?question=${encodeURIComponent(prompt)}&apiKey=y7jvrnh8yms071n9f5ruox8`); 

      var simRes = codereiko.data.reply;

      const tranChat = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=ja&dt=t&q=${encodeURIComponent(simRes)}`);

      var text = tranChat.data[0][0][0];

      const audioPath = resolve(__dirname, 'cache', `${threadID}_${senderID}.wav`);

      const audioApi = await axios.get(`https://api.tts.quest/v3/voicevox/synthesis?text=${encodeURIComponent(text)}&speaker=3&fbclid=IwAR01Y4UydrYh7kvt0wxmExdzoFTL30VkXsLZZ2HjXjDklJsYy2UR3b9uiHA`);

      const audioUrl = audioApi.data.mp3StreamingUrl;

      await global.utils.downloadFile(audioUrl, audioPath);

      const att = createReadStream(audioPath);

      api.sendMessage(`${simRes}`, threadID);
      api.sendMessage({
         attachment: att
      }, threadID, () => unlinkSync(audioPath));

   } catch (error) {
      console.error(error);
      api.sendMessage("error", threadID, messageID);
   }
};
