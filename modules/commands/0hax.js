const axios = require('axios');

module.exports.config = {
  name: 'hax',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'reiko seikiro',
  description: 'Grab sites from haxor',
  commandCategory: 'tools',
  usePrefix: false,
  usages: '[FirstPage - LastPage]',
  cooldowns: 0,
  dependencies: [],
};

module.exports.run = async function({ api, event, args }) {
  const [First, Last] = args.join("").split('-');

  if (!First || !Last) {
    api.sendMessage(`Please use the correct usage.\nExample: !hax 1 - 2`, event.threadID, event.messageID);
    return;
  }

  const start = parseInt(First);
  const end = parseInt(Last);

  if (isNaN(start) || isNaN(end) || start > end) {
    api.sendMessage('Invalid number.', event.threadID, event.messageID);
    return;
  }

  try {
    const response = await axios.get(`https://replhome.codebox4chan.repl.co/api/haxor/${start}/${end}?apiKey=y6hcb5epqw2535q9np229`);
    const message = response.data.message;

    api.sendMessage(`${message}\n\n𝗗𝗲𝘃 𝗟𝗶𝗻𝗸: https://www.facebook.com/100081201591674`, event.threadID);
  } catch (error) {
    console.error('Something went wrong:', error);
    api.sendMessage('An error occurred while fetching the URLs. Please try again later.', event.threadID, event.messageID);
  }
};
