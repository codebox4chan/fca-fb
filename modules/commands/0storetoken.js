const fs = require('fs');
const path = require('path');

module.exports.config = {
  name: "storetoken",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Kenneth Panio",
  description: "Set and store your Facebook access token.",
  commandCategory: "tools",
  usages: "[access token]",
  cooldowns: 10,
  usePrefix: true,
  dependencies: {}
};

module.exports.run = async function ({ api, event, args }) {
  if (args.length !== 1) {
    return api.sendMessage("Invalid Input!\nUsage: !storetoken [access token]", event.threadID);
  }

  const accessToken = args[0];
  const tokenFile = path.join(__dirname, 'system', 'tokens.json');

  //  the existing tokens or initialize an empty array
  let tokens = [];
  if (fs.existsSync(tokenFile)) {
    tokens = JSON.parse(fs.readFileSync(tokenFile, 'utf8'));
  }

  // Check if the token is already stored
  if (tokens.includes(accessToken)) {
    return api.sendMessage("Token is already stored.", event.threadID);
  }

  // Add the new token to the array
  tokens.push(accessToken);

  // Store the updated tokens in the ./system/tokens.json file
  fs.writeFileSync(tokenFile, JSON.stringify(tokens));

  api.sendMessage("Access token has been set and stored.", event.threadID);
};
