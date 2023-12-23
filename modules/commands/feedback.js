const axios = require('axios');

module.exports.config = {
  name: "feedback",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Kim Joseph DG Bien",
  description: "Provide feedback through user messages",
  commandCategory: "message",
  usePrefix: false,
  cooldowns: 20,
  usages: "[message]",
};

module.exports.run = async ({ api, event, args }) => {
  const nglusername = 'kendev24'; // Predefined username
  const message = args.join(" "); // Combine arguments into the message

  if (!message) {
    return api.sendMessage("Invalid command format. Please use /feedback [message]", event.threadID);
  }

  try {
    const headers = {
      'referer': `https://ngl.link/${nglusername}`,
      'accept-language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7',
    };

    const data = {
      'username': nglusername,
      'question': message,
      'deviceId': 'ea356443-ab18-4a49-b590-bd8f96b994ee',
      'gameSlug': '',
      'referrer': '',
    };

    await axios.post('https://ngl.link/api/submit', data, {
      headers,
    });

    api.sendMessage(`Successfully sent feedback to ${nglusername} through ngl.link.`, event.threadID);
  } catch (error) {
    console.log(error);
    api.sendMessage("An error occurred while sending the feedback through ngl.link.", event.threadID);
  }
};
