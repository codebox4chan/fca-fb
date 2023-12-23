const axios = require('axios');

module.exports.config = {
  name: "gptdm",
  version: "30.0.0",
  hasPermssion: 0,
  credits: "Choru Tiktokers",
  description: "Gptdm bot",
  commandCategory: "educational",
  usePrefix: false,
  usages: "[question]",
  cooldowns: 3,
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;

  if (!args[0]) {
    api.sendMessage("Please provide a question first.", threadID, messageID);
    return;
  }

  const query = args.join(" ");
  api.setMessageReaction("🗿", event.messageID, (err) => {}, true);
  api.sendMessage("Processing your request on Gptdm, please wait...", threadID, messageID);

  const url = 'https://gptdm.maxx-official.repl.co/gptdm?text=' + encodeURIComponent(query);

  try {
    const response = await axios.get(url, {
      headers: {
        'x-api-key': 'nw-cho-ru-90a7886b3e3aad6e2c302cef4e5850'
      }
    });

    if (response.status === 200 && response.data && response.data.message) {
      const answer = response.data.message;
      api.sendMessage(`${answer}`, threadID, messageID);
    } else {
      api.sendMessage("Sorry, I couldn't find an answer for your asking me.", threadID, messageID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage("An error occurred while searching with Gptdm.", threadID, messageID);
  }
};
                    