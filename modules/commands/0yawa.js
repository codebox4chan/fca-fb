module.exports.config = {
  name: 'yawa',
  hasPermssion: 0,
  version: '1.0 alpha',
  commandCategory: 'fun',
  usePrefix: false,
  cooldowns: 0,
  description: 'yawa kaayo ka',
  usages: 'pisteng yawa!',
};

module.exports.run = async function ({ api, event, args }) {
  const { messageID, threadID } = event;
  
  if (args.length === 0) { 
    api.sendMessage('ka!', threadID, messageID);
  } else {
    api.sendMessage(`mas yawa ka!`, threadID, messageID);
  }
};