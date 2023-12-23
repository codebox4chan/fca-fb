const randomUseragent = require('random-useragent');

module.exports.config = {
  name: 'gen-ua',
  hasPermssion: 0,
  version: '1.0 alpha',
  commandCategory: 'fun',
  credits: 'reiko dev',
  usePrefix: true,
  cooldowns: 15,
  description: 'Generate a random user agent string',
  usages: '',
};

module.exports.run = function ({ api, event }) {
  const { messageID, threadID } = event;

  try {
    const randomUserAgent = randomUseragent.getRandom();

    api.sendMessage(`${randomUserAgent}`, threadID, messageID);
  } catch (error) {
    console.error('Error generating a random user agent string:', error);
    api.sendMessage('Sorry, there was an error generating a user agent string.', threadID, messageID);
  }
};
