//idea by Adrestia Croimoux
module.exports.config = {
	name: "dictionary",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "DungUwU",
	description: "Search meaning for words",
  	usages: "[word]",
	commandCategory: "educational",
  	cooldowns: 5,
  usePrefix: false,
}

module.exports.run = function({api,event,args}) {
  const { threadID, messageID } = event;
  const fs = require('fs');
  if (args[0]) {
    return require('axios').get(encodeURI(`https://api.dictionaryapi.dev/api/v2/entries/en/${args.join(" ").trim().toLowerCase()}`)).then(res => {
      let data = res.data[0];
      let example = data.meanings[0].definitions.example;
      let phonetics = data.phonetics;
      let meanings = data.meanings
      msg_meanings = "";
      meanings.forEach(items => {
        example = items.definitions[0].example?`\n*𝗲𝘅𝗮𝗺𝗽𝗹𝗲:\n \"${items.definitions[0].example[0].toUpperCase() + items.definitions[0].example.slice(1)}\"`:'';
        msg_meanings += `\n• ${items.partOfSpeech}\n ${items.definitions[0].definition[0].toUpperCase() + items.definitions[0].definition.slice(1) + example}`
      });
      msg_phonetics = '';
      phonetics.forEach(items => {
        text = items.text?`\n    /${items.text}/`:'';
        msg_phonetics += text;
      })
      var msg = `❰ ❝ ${data.word} ❞ ❱` +
                msg_phonetics +
                msg_meanings;
      return api.sendMessage(msg, threadID, messageID);
    }).catch(err => {
      if (err.response.status === 404) {
        return api.sendMessage('𝗡𝗼 𝗗𝗲𝗳𝗶𝗻𝗶𝘁𝗶𝗼𝗻𝘀 𝗙𝗼𝘂𝗻𝗱', threadID, messageID);
      }
    })
  } else api.sendMessage('𝗠𝗶𝘀𝘀𝗶𝗻𝗴 𝗜𝗻𝗽𝘂𝘁! 𝗲𝘅𝗮𝗺𝗽𝗹𝗲: 𝗱𝗶𝗰𝘁𝗶𝗼𝗻𝗮𝗿𝘆 <𝘄𝗼𝗿𝗱>', threadID, messageID);
}