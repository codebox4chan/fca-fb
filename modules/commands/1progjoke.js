const axios = require('axios');

module.exports.config = {
  name: 'progjoke',
  hasPermssion: 0,
  version: '1.0 alpha',
  commandCategory: 'fun',
  credits: 'reiko dev',
  usePrefix: true,
  cooldowns: 15,
  description: 'Get a random programming joke',
  usages: '<language>',
};

module.exports.run = async function ({ api, event, args }) {
  const { messageID, threadID } = event;

  // Check if the user provided a programming language, default to 'programming' if not
  const language = args.length > 0 ? args.join(' ') : 'programming';

  try {
    const apiUrl = `https://icanhazdadjoke.com/search?term=${encodeURIComponent(language)}`;
    const headers = {
      'Accept': 'application/json',
    };

    const response = await axios.get(apiUrl, { headers });
    const jokes = response.data.results;

    if (jokes.length > 0) {
      const randomJoke = jokes[Math.floor(Math.random() * jokes.length)].joke;
      api.sendMessage(`Random ${language} Joke:\n\n${randomJoke}`, threadID, messageID);
    } else {
      api.sendMessage(`No jokes found for ${language}. Try another programming language!`, threadID, messageID);
    }
  } catch (error) {
    console.error('Error fetching a random programming joke:', error);
    api.sendMessage('Sorry, there was an error fetching a programming joke.', threadID, messageID);
  }
};
