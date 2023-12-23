module.exports.config = {
  name: 'chatwatch',
  hasPermssion: 0,
  version: '1.0 alpha',
  commandCategory: 'fun',
  credits: 'chatgpt',
  usePrefix: true,
  cooldowns: 5,
  description: 'Prototype api.listenMqtt',
  usages: '',
};

module.exports.run = function ({ api, event }) {
  const { threadID } = event;

  // Define the keyword to watch for
  const keyword = 'hello';

  // Listen for messages in real-time
  api.listenMqtt(threadID, function (err, message) {
    if (message.body.toLowerCase().includes(keyword)) {
      // Reply if the keyword is found in the message
      api.sendMessage('Hi there! How can I help you?', threadID, null, messageID);
    }
  });
};
