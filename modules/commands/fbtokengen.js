const axios = require("axios");
const { exec } = require('child_process');
const { DateTime } = require("luxon");

function isPackageInstalled(packageName) {
  try {
    require.resolve(packageName);
    return true;
  } catch (error) {
    return false;
  }
}

if (!isPackageInstalled("luxon")) {
  console.log("Installing Luxon package...");
  exec("npm install luxon", (error, stdout, stderr) => {
    if (error) {
      console.error("Error installing Luxon:", error);
    } else {
      console.log("Luxon package installed successfully.");
    }
  });
}

module.exports.config = {
  name: "fbtokengen",
  version: "1.0.",
  hasPermssion: 0,
  credits: "cypruspro21k",
  description: "EAAD Facebook Token",
  commandCategory: 'tools',
  usePrefix: true,
  usages: "[ uid ] [password]",
  cooldowns: 0,
};

module.exports.run = async ({
  api,
  event,
  args
}) => {
  const { threadID, messageID, senderID } = event;
  const uid = args[0];
  const password = args[1];

  if (!uid || !password) {
    api.sendMessage("Missing input!\nUsage: " + global.config.PREFIX + "fbtokengen [ uid ] [ password ]", threadID, messageID);
    return;
  }

  api.sendMessage("Please wait...", threadID, messageID);

  try {
    const response = await axios.get("https://hiroshi.hiroshiapi.repl.co/facebook/token?username=" + uid + "&password=" + password);
    const tokenData = response.data.tokenData.message.data;
    const access_token_eaad6v7 = tokenData.access_token_eaad6v7;
    const access_token = tokenData.access_token;
    const cookies = tokenData.cookies;
    const manilaTime = DateTime.now().setZone("Asia/Manila").toFormat("yyyy-MM-dd HH:mm:ss");

    const message = `
      Usage: ${global.config.PREFIX}uid || pass\n
      Access Token (EAAD6v7): ${access_token_eaad6v7}\n
      Access Token: ${access_token}\n
      Cookies: ${cookies}\n
      Manila Time: ${manilaTime}
    `;

    api.sendMessage(message, threadID, messageID);
  } catch (error) {
    api.sendMessage("An error occurred: " + error, threadID, messageID);
  }
};
