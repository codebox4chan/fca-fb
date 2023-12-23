const fs = require("fs");

module.exports.config = {
  name: "sana",
  version: "0.0.1",
  hasPermssion: 0,
  credits: "AnthonyDacuya",
  description: "edi sana pina __________ mo",
  usePrefix: true,
  commandCategory: "system",
  cooldowns: 5,
};

module.exports.handleEvent = function ({ api, event, client_Global }) {
  var { threadID, messageID } = event;
  if (
    event.body.indexOf("sana") == 0 ||
    event.body.indexOf("Sanah") == 0 ||
    event.body.indexOf("sanah") == 0 ||
    event.body.indexOf("billboard") == 0
  ) {
    var msg = {
      body: "talaga ba? edi sana pina billboard, powerpoint, dineclimite, pinoster, inislogan, pinaprint, pina xerox, chinismis, pinalapida, pinabaranggay, pinapulis, pinarally, pinabroadcast, newspaper, newscast, tattoo, magazine, tarpaulin, lettering, calligraphy, winallpaper, nilockscreen, cinoverphoto mo yang mga pinagsasabi mo talaga ba? edi sana pina billboard, powerpoint, dineclimite, pinoster, inislogan, pinaprint, pina xerox, chinismis, pinalapida, pinabaranggay, pinapulis, pinarally, pinabroadcast, newspaper, newscast, tattoo, magazine, tarpaulin, lettering, calligraphy, winallpaper, nilockscreen, cinoverphoto mo yang mga pinagsasabi mo talaga ba? edi sana pina billboard, powerpoint, dineclimite, pinoster, inislogan, pinaprint, pina xerox, chinismis, pinalapida, pinabaranggay, pinapulis, pinarally, pinabroadcast, newspaper, newscast, tattoo, magazine, tarpaulin, lettering, calligraphy, winallpaper, nilockscreen, cinoverphoto, pina kmjs mo yang mga pinagsasabi mong ungoy ka"
    }
    api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😆", messageID, (err) => {}, true);
  }
};
module.exports.run = function ({ api, event, client_GLOBAL }) {
  
};
    