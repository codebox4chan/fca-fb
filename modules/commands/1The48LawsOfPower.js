const axios = require('axios');

module.exports.config = {
  name: '48-laws',
  hasPermssion: 0,
  version: '1.0 alpha',
  commandCategory: 'fun',
  credits: 'reiko dev',
  usePrefix: true,
  cooldowns: 20,
  description: 'Get a random 48 laws of power',
  usages: '',
};

module.exports.run = async function ({ api, event }) {
  const { messageID, threadID } = event;

  try {
    const response = await axios.get('https://replhome.codebox4chan.repl.co/api/random-law');
    const law = response.data.name;
    const title = response.data.title;
    const desc = response.data.desc;

    api.sendMessage(`${law} | ${title}\n\n${desc}\n\nAuthor: Robert Greene🎭`, threadID, messageID);
  } catch (error) {
    console.error('Error fetching random laws:', error);
    api.sendMessage('Sorry, there was an error fetching the random laws.', threadID, messageID);
  }
};
