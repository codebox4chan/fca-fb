const axios = require('axios');

module.exports.config = {
  name: "impress",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Kshitiz",
  description: "use it to impress the girls",
  usePrefix: false,
  commandCategory: "fun",
  usages: "@mention",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  try {
    const mention = Object.keys(event.mentions);

    if (mention.length !== 1) {
      api.sendMessage('Please mention one girl to impress.', event.threadID, event.messageID);
      return;
    }

    const mentionName = event.mentions[mention[0]].replace('@', '');

    const response = await axios.get('https://vinuxd.vercel.app/api/pickup');

    if (response.status !== 200 || !response.data || !response.data.pickup) {
      throw new Error('Invalid or missing response from pickup line API');
    }

    const pickupLine = response.data.pickup.replace('{name}', mentionName); // Fixed variable name here
    const message = `${mentionName}, ${pickupLine} 💐`;

    const attachment = await api.sendMessage({
      body: message,
      mentions: [{
        tag: event.senderID,
        id: event.senderID,
        fromIndex: message.indexOf(mentionName),
        toIndex: message.indexOf(mentionName) + mentionName.length,
      }],
    }, event.threadID, event.messageID);

    if (!attachment || !attachment.messageID) {
      throw new Error('Failed to send message');
    }

    console.log(`Sent line as a reply with message ID ${attachment.messageID}`);
  } catch (error) {
    console.error(`Failed to send pickup line: ${error.message}`);
    api.sendMessage('Sorry, something went wrong while trying to tell a line. Please try again later.', event.threadID);
  }
};