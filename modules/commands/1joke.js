const axios = require('axios');

module.exports.config = {
  name: 'joke',
  hasPermssion: 0,
  version: '1.0 alpha',
  commandCategory: 'fun',
  credits: 'reiko dev',
  usePrefix: true,
  cooldowns: 15,
  description: 'Get a random joke',
  usages: '',
};

module.exports.run = async function ({ api, event }) {
  const { messageID, threadID } = event;

  try {
    const apiUrl = 'https://v2.jokeapi.dev/joke/Any';
    const response = await axios.get(apiUrl);
    const jokeData = response.data;

    let jokeMessage;

    if (jokeData.type === 'twopart') {
      // If it's a two-part joke
      jokeMessage = `${jokeData.setup}\n\n${jokeData.delivery}`;
    } else {
      // If it's a single-part joke
      jokeMessage = jokeData.joke;
    }

    api.sendMessage(`Random Joke:\n\n${jokeMessage}`, threadID, messageID);
  } catch (error) {
    console.error('Error fetching a random joke:', error);
    api.sendMessage('Sorry, there was an error fetching a random joke.', threadID, messageID);
  }
};
