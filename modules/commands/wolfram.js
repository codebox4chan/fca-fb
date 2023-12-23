const axios = require('axios');

module.exports.config = {
  name: 'wolfram',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'August Quinn',
  description: 'Start a conversation with Wolfram Alpha.',
  commandCategory: 'educational',
  usePrefix: false,
  usages: '[query]',
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args, client }) {
  const { threadID, messageID } = event;
  const appId = 'WXYVVV-L72XPEQGPY';

  if (args.length === 0) {
    api.sendMessage('Please provide a query.', threadID, messageID);
    return;
  }

  const query = args.join(' ');

  try {
    const baseUrl = 'http://api.wolframalpha.com/v1/conversation.jsp';
    const response = await axios.get(baseUrl, {
      params: {
        appid: appId,
        i: query,
      },
    });

    if (response.data && response.data.result) {
      const result = response.data.result;
      api.sendMessage(`Wolfram Alpha Response: ${result}`, threadID, messageID);
    } else {
      api.sendMessage('No valid response received from Wolfram Alpha.', threadID, messageID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage('An error occurred while communicating with Wolfram Alpha. Please try again later.', threadID, messageID);
  }
};