const axios = require('axios');

module.exports.config = {
  name: 'numberfact',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'August Quinn',
  description: 'Get interesting facts about numbers.',
  commandCategory: 'fun',
  usePrefix: true,
  usages: '[number] [type]',
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;

  let number = 'random';
  let type = 'trivia';

  if (args.length >= 1) {
    number = args[0];
  }

  if (args.length === 2) {
    type = args[1].toLowerCase();
  }

  const baseUrl = `http://numbersapi.com/${number}/${type}`;

  try {
    const response = await axios.get(baseUrl);

    if (response.data) {
      const fact = response.data;
      api.sendMessage(fact, threadID, messageID);
    } else {
      api.sendMessage('No fact found for the given input.', threadID, messageID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage('An error occurred while fetching the fact. Please try again later.', threadID, messageID);
  }
};