module.exports.config = {
  name: "v2a",
  version: "1.0.",
  hasPermssion: 0,
  credits: "jameslim",
  description: "video to audio",
  commandCategory: "tools",
  usages: "[reply to a video]",
  usePrefix: false,
  cooldowns: 2,
};

module.exports.run = async ({ api, event, args }) => {
  const axios = require('axios');
  const fs = require('fs-extra');
  let pathie = __dirname + `/cache/v2a.mp3`;
  const { threadID, messageID } = event;
  
  var james = event.messageReply.attachments[0].url || args.join(" ");
  
  
  try {
     const mp3 = (await axios.get(`${james}`, { responseType: "arraybuffer"})).data;
     
     fs.writeFileSync(pathie, Buffer.from(mp3, 'utf-8'));
     
     api.sendMessage({
       attachment: fs.createReadStream(pathie)
     }, threadID, () => fs.unlinkSync(pathie), messageID);
     
     
       
  } catch (e) {
    return api.sendMessage(`error occurred:\n\n${e}`, threadID, messageID);
  };
  
};