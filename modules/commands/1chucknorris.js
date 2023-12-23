const axios = require('axios');

module.exports.config = {
  name: 'chucknorris',
  hasPermssion: 0,
  version: '1.0 alpha',
  commandCategory: 'fun',
  credits: 'reiko dev',
  usePrefix: true,
  cooldowns: 15,
  description: 'Get a random Chuck Norris joke',
  usages: '',
};

module.exports.run = async function ({ api, event }) {
  const { messageID, threadID } = event;

  try {
    const apiUrl = 'https://api.chucknorris.io/jokes/random';
    const response = await axios.get(apiUrl);
    const chuckNorrisJoke = response.data.value;

    api.sendMessage(`Chuck Norris Joke:\n\n${chuckNorrisJoke}`, threadID, messageID);
  } catch (error) {
    console.error('Error fetching a random Chuck Norris joke:', error);
    api.sendMessage('Sorry, there was an error fetching a Chuck Norris joke.', threadID, messageID);
  }
};
