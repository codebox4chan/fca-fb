const axios = require('axios');

module.exports.config = {
  name: 'access_token',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'Aiz',
  description: 'Generate an access token for authentication.',
  commandCategory: 'tools',
  usePrefix: true,
  usages: '[email] - [password]',
  cooldowns: 20,
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  const input = args.join(' ').split('-');

  if (input.length !== 2) {
    api.sendMessage('Invalid input format. Usage: !token [email] - [password]', threadID, messageID);
    return;
  }

  const [email, password] = input.map((item) => item.trim());

  try {
    const tokenData = await axios.post('https://facebook.access-token-generator.repl.co/auth', {
      email,
      password,
    });

    api.sendMessage(`Here's your access token: ${tokenData.data.token}`, threadID, messageID);
  } catch (error) {
    console.error(error);
    api.sendMessage('An error occurred while fetching the access token.', threadID, messageID);
  }
};