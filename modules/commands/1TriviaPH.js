const axios = require('axios');

module.exports.config = {
  name: 'triviaph',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'August Quinn',
  description: 'Generate random trivia about the Philippines.',
  commandCategory: 'educational',
  usePrefix: false,
  usages: '',
  cooldowns: 5,
};

module.exports.run = async function ({ api, event }) {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/Augustquinn/JSONify/main/randomPHtrivia.json');
    const triviaList = response.data.trivias;

    if (triviaList.length === 0) {
      return api.sendMessage('No trivia available, please try again later.', event.threadID, event.messageID);
    }

    const randomIndex = Math.floor(Math.random() * triviaList.length);
    const randomTrivia = triviaList[randomIndex];

    const message = `🇵🇭 𝗧𝗥𝗜𝗩𝗜𝗔 𝗔𝗕𝗢𝗨𝗧 𝗧𝗛𝗘 𝗣𝗛𝗜𝗟𝗜𝗣𝗣𝗜𝗡𝗘𝗦\n\n ▣ 𝗤𝗨𝗘𝗦𝗧𝗜𝗢𝗡: ${randomTrivia.question}\n\n ▣ 𝗔𝗡𝗦𝗪𝗘𝗥: ${randomTrivia.answer}`;

    api.sendMessage(message, event.threadID, event.messageID);
  } catch (error) {
    console.error(error);
    api.sendMessage('An error occurred while fetching trivia. Please try again later.', event.threadID, event.messageID);
  }
};
