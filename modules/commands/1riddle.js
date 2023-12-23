const axios = require('axios');

module.exports.config = {
  name: 'riddle',
  hasPermssion: 0,
  version: '1.0 alpha',
  commandCategory: 'fun',
  credits: 'reiko dev',
  usePrefix: true,
  cooldowns: 15,
  description: 'Get a random riddle',
  usages: '',
};

module.exports.run = async function ({ api, event }) {
  const { messageID, threadID } = event;

  try {
    const apiUrl = 'https://opentdb.com/api.php?amount=1&category=9&type=multiple'; // Category 9 corresponds to General Knowledge
    const response = await axios.get(apiUrl);
    const riddleData = response.data.results[0];

    const riddle = riddleData.question;
    const correctAnswer = riddleData.correct_answer;
    const incorrectAnswers = riddleData.incorrect_answers;

    // Combine correct and incorrect answers for display
    const allAnswers = [correctAnswer, ...incorrectAnswers].sort(() => Math.random() - 0.5);

    api.sendMessage(`Random Riddle:\n\nQuestion: ${riddle}\n\nChoices: ${allAnswers.join(', ')}\n\nCorrect Answer: ${correctAnswer}`, threadID, messageID);
  } catch (error) {
    console.error('Error fetching a random riddle:', error);
    api.sendMessage('Sorry, there was an error fetching a riddle.', threadID, messageID);
  }
};
