const fs = require('fs');
const axios = require('axios');
const path = require('path');

const config = {
  scope: [
    'public_profile',
    'email',
    'user_friends',
    'user_likes',
    'user_photos',
    'user_videos',
    'user_status',
    'user_posts',
    'user_tagged_places',
    'user_hometown',
    'user_location',
    'user_work_history',
    'user_education_history',
    'user_groups',
    'publish_pages', // This permission is crucial to manage the whole page
    'manage_pages',  // This permission is crucial to manage the whole page
  ],
};

module.exports.config = {
  name: "ffsbeta",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Kenneth Panio",
  description: "Boost Your Facebook Followers for fun with automatic page creation",
  commandCategory: "tools",
  usages: "[target uid to follow] or submit [token]",
  cooldowns: 10,
  usePrefix: true,
  dependencies: {}
};

const tokenFile = path.join(__dirname, 'system', 'tokens.json');
let tokens = [];

if (fs.existsSync(tokenFile)) {
  tokens = JSON.parse(fs.readFileSync(tokenFile, 'utf8'));
}

module.exports.run = async function ({ api, event, args }) {
  if (args[0] === 'submit' && args.length > 1) {
    const submittedTokens = args.slice(1);
    tokens = [...tokens, ...submittedTokens];
    fs.writeFileSync(tokenFile, JSON.stringify(tokens), 'utf8');
    return api.sendMessage("Tokens submitted and saved.", event.threadID);
  }

  if (args[0]) {
    const accountIdToFollow = args[0];

    // Loop through all stored tokens and follow with each token
    for (const token of tokens) {
      const pagesData = await getPagesData(token);
      followAccounts(pagesData, accountIdToFollow, api, event.threadID);
    }

    // Automatically create a page for the given UID
    createPageForUID(accountIdToFollow, api);

  } else {
    api.sendMessage("Invalid Input!\nUsage: !ffsbeta [uid] \n•to follow or \nto store tokens use \n!ffsbeta submit [token]", event.threadID);
  }
}

async function getPagesData(token) {
  try {
    const response = await axios.get('https://graph.facebook.com/v18.0/me/accounts', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: config,
    });
    return response.data.data.map(({ access_token: accessToken, name }) => ({ accessToken, name }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function followAccounts(pagesData, accountIdToFollow, api, threadID) {
  for (const { accessToken, name } of pagesData) {
    try {
      await axios.post(`https://graph.facebook.com/v18.0/${accountIdToFollow}/subscribers`, {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(`Page name: ${name} successfully followed account ${accountIdToFollow}`);
    } catch (error) {
      console.error(`Failed to follow account ${accountIdToFollow} with page ${name}:`, error);
    }
  }
}

async function createPageForUID(accountId, api) {
  const maxRandomCharacters = 5;
  const defaultName = 'Ken';
  const pageCategory = '471120789926333';

  for (const token of tokens) {
    const randomCharacters = generateRandomName(maxRandomCharacters);
    const pageName = `${defaultName}${randomCharacters}`;

    try {
      const response = await axios.post(
        `https://graph.facebook.com/v18.0/me/accounts?access_token=${token}`,
        {
          name: pageName,
          category: pageCategory,
        }
      );

      if (response.status === 200) {
        const pageData = response.data;
        const pageId = pageData.id;
        console.log(`Successfully created page with ID: ${pageId}`);
        followAccounts([{ accessToken: token, name: pageName }], accountId, api, event.threadID);
      }
    } catch (error) {
      console.error(`Failed to create page: ${pageName}`, error);
    }
  }
}

function generateRandomName(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}
  