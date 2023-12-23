const axios = require('axios');

module.exports.config = {
  name: 'trivia-fact',
  hasPermssion: 0,
  version: '1.0 alpha',
  commandCategory: 'fun',
  credits: 'reiko dev',
  usePrefix: true,
  cooldowns: 15,
  description: 'Get a random trivia fact',
  usages: '',
};

module.exports.run = async function ({ api, event }) {
  const { messageID, threadID } = event;

  try {
    const apiUrl = 'https://opentdb.com/api.php?amount=1&type=multiple';
    const response = await axios.get(apiUrl);
    const triviaData = response.data.results[0];

    const question = triviaData.question;
    const correctAnswer = triviaData.correct_answer;
    const incorrectAnswers = triviaData.incorrect_answers;

    // Combine correct and incorrect answers for display
    const allAnswers = [correctAnswer, ...incorrectAnswers].sort(() => Math.random() - 0.5);

    api.sendMessage(`Random Trivia Fact:\n\nQuestion: ${question}\n\nChoices: ${allAnswers.join(', ')}`, threadID, messageID);
  } catch (error) {
    console.error('Error fetching a random trivia fact:', error);
    api.sendMessage('Sorry, there was an error fetching a trivia fact.', threadID, messageID);
  }
};
