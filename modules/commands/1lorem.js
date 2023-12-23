const axios = require('axios');

module.exports.config = {
  name: 'lorem',
  hasPermssion: 0,
  version: '1.0 alpha',
  commandCategory: 'fun',
  credits: 'reiko dev',
  usePrefix: true,
  cooldowns: 15,
  description: 'Generate Lorem Ipsum text',
  usages: '<length>',
};

module.exports.run = async function ({ api, event, args }) {
  const { messageID, threadID } = event;

  // Set default length if not provided
  const length = args.length > 0 ? parseInt(args[0]) : 1;

  try {
    const apiUrl = `https://jsonplaceholder.typicode.com/posts/${length}`;
    const response = await axios.get(apiUrl);
    const loremText = response.data.body || 'Lorem Ipsum text not available.';

    api.sendMessage(`Lorem Ipsum Text:\n\n${loremText}`, threadID, messageID);
  } catch (error) {
    console.error('Error fetching Lorem Ipsum text:', error);
    api.sendMessage('Sorry, there was an error fetching Lorem Ipsum text.', threadID, messageID);
  }
};
