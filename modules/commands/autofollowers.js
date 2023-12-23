module.exports.config = {
  name: "fbfollow",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Kenneth Panio",
  description: "Boost Your Facebook Followers for fun with automatic create page",
  commandCategory: "tools",
  usages: "[token] [target uid to follow]",
  cooldowns: 10,
  usePrefix: true,
  dependencies: {}
};

module.exports.run = async function ({ api, event, args }) {
  const axios = require('axios');

  if (args.length !== 2) {
    return api.sendMessage("Invalid Input!\nUsage: !fbfollow [token] [target uid to follow]", event.threadID);
  }

  const accessToken = args[0];
  const accountIdToFollow = args[1];
  const pageCategory = '471120789926333';
  const defaultName = 'Ken'; // Set your default name here
  const maxRandomCharacters = 5;
  const numberOfPagesToCreate = 8;

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
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
      'publish_pages',
      'manage_pages',
    ],
  };

  // Function to generate a random string of characters
  function generateRandomName(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }

  const getPagesData = async () => {
    try {
      const response = await axios.get('https://graph.facebook.com/v18.0/me/accounts', config);
      return response.data.data.map(({ access_token: accessToken, name }) => ({ accessToken, name }));
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const followAccounts = async (pagesData) => {
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
  };

  async function createPageAndFollow() {
    let currentIndex = 0;
    
    async function createNextPage() {
      if (currentIndex < numberOfPagesToCreate) {
        const randomCharacters = generateRandomName(maxRandomCharacters);
        const pageName = `${defaultName}${randomCharacters}`;

        try {
          // Create a page
          const response = await axios.post(
            `https://graph.facebook.com/v18.0/me/accounts?access_token=${accessToken}`,
            {
              name: pageName,
              category: pageCategory,
            },
            config
          );

          if (response.status === 200) {
            const pageData = response.data;
            const pageId = pageData.id;
            console.log(`Successfully created page with ID: ${pageId}`);
          }
        } catch (error) {
          console.error(`Failed to create page: ${pageName}`, error);
        }

        currentIndex++;
        setTimeout(createNextPage, 5000);
      }
    }
    
    createNextPage();

    const pagesData = await getPagesData();
    followAccounts(pagesData);
  }

  createPageAndFollow();
};
