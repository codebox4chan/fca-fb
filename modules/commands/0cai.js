const axios = require('axios');

module.exports.config = {
  name: 'cai',
  version: '1.0',
  hasPermssion: 0,
  credits: 'Aliester Crowley',
  description: 'Interact with the cai for chat responses.',
  usePrefix: false,
  commandCategory: 'fun',
  usages: '[message]',
  cooldowns: 0,
};

module.exports.run = async function ({ api, event }) {
  try {
    const { messageID, threadID, senderID, body } = event;

    const userFullName = (await api.getUserInfo(senderID))[senderID].name;
    const userFirstName = userFullName.split(" ")[0];

    let message = body;

    if (event.messageReply) {
      message = `${userFirstName}: Regarding your message "${event.messageReply.body}", ${message}`;
    }

    if (!message) {
      return api.sendMessage('Please provide a message/question.\n\nUsage: ashley {message}', threadID);
    }

    const API_ENDPOINT = `https://cai.aliestercrowleymv.repl.co/api?char=zG7RNkQutpO9-uo8Q0A7CQKt_BHiDsJGBVu7Y3gmZGc&prompt=${userFirstName} to you: ${encodeURIComponent(message)}`;

    const response = await axios.get(API_ENDPOINT);

    if (response.data && response.data.text) {
      let caiResponse = response.data.text;
      caiResponse = caiResponse.replace(/Character\.AI/g, 'CrowAI');
      caiResponse = caiResponse.replace(/www.character.ai/g, 'aliestercrowley.com');

      caiResponse = `${caiResponse}`;

      api.sendMessage({ body: caiResponse, attachment: null }, threadID, messageID);
    } else {
      api.sendMessage('❌ An error occurred. Please try again later.', threadID, messageID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage('❌ An error occurred. Please try again later.', threadID, messageID);
  }
};