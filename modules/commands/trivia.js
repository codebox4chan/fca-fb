const axios = require('axios');

module.exports.config = {
  name: 'trivia',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'August Quinn',
  description: 'Get a random trivia question from Jeopardy.',
  commandCategory: 'fun',
  usePrefix: false,
  usages: '',
  cooldowns: 5,
};

module.exports.run = async function ({ api, event }) {
  const { threadID, messageID } = event;

  try {
    const response = await axios.get('http://jservice.io/api/random');

    if (response.status === 200 && response.data && Array.isArray(response.data) && response.data.length > 0) {
      const questionData = response.data[0];
      const category = questionData.category.title;
      const question = questionData.question;
      const answer = questionData.answer;

      api.sendMessage(`🧠 𝗥𝗔𝗡𝗗𝗢𝗠\n\n𝗖𝗔𝗧𝗘𝗚𝗢𝗥𝗬: ${category}\n𝗤𝗨𝗘𝗦𝗧𝗜𝗢𝗡: ${question}\n\n💡 𝗔𝗡𝗦𝗪𝗘𝗥: ${answer}`, threadID, messageID);
    } else {
      api.sendMessage('No trivia question available at the moment.', threadID, messageID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage('An error occurred while fetching trivia question.', threadID, messageID);
  }
};