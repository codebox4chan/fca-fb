const axios = require("axios");

const ACCESS_TOKENS = [
  "",
  // add more access tokens here
];

module.exports.config = {
  name: "share",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Grey",
  description: "Automatically share in groups using mdl?",
  commandCategory: "admin",
  usage: "[link] [count]",
  usePrefix: true,
  cooldowns: 2,
  dependencies: { axios: "^0.24.0" }, // Update the version accordingly
};

module.exports.run = async function ({ api, event, args }) {
  if (!args[0] || !args[1]) {
    return api.sendMessage("Please provide a link and count.", event.threadID, event.messageID);
  }

  const link = args[0];
  const count = parseInt(args[1]);

  async function myTimer(token) {
    try {
      const response = await axios.get(
        `https://graph.facebook.com/me/feed?method=post&access_token=${token}&link=${link}&privacy={"value":"SELF"}&published=0`
      );
      const data = response.data;
      console.log(`Shared post with ID: ${data.id}`);
    } catch (error) {
      console.log("An error occurred:", error.message);
    }
  }

  const tokenPromises = [];
  for (let i = 0; i < count; i++) {
    const randomToken = ACCESS_TOKENS[Math.floor(Math.random() * ACCESS_TOKENS.length)];
    tokenPromises.push(myTimer(randomToken));
  }

  await Promise.all(tokenPromises);
  console.log("Sharing process completed.");
};
