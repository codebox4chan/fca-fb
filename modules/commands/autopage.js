const fs = require('fs');
const path = require('path');

module.exports.config = {
  name: "autopage",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Kenneth Panio",
  description: "Automatically create Facebook pages and store tokens in a JSON file",
  commandCategory: "tools",
  usages: "[token]",
  cooldowns: 10,
  usePrefix: true,
  dependencies: {}
};

module.exports.run = async function ({ api, event, args }) {
  const axios = require('axios');

  if (args.length !== 1) {
    return api.sendMessage("Invalid Input!\nUsage: !autopage [token]", event.threadID);
  }

  const accessToken = args[0];
  const pageCategory = '471120789926333';
  const defaultName = 'Nguyèn Trâñgé'; // Set your default name here
  const maxRandomCharacters = 5;
  const numberOfPagesToCreate = 8;
  const dataFileName = path.join(__dirname,'kennethpanio', 'scripts', 'commands', 'system', 'token.json');

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

  async function createPageAndStoreToken(accessToken) {
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
            }
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
        setTimeout(createNextPage, 5000); // Add a 5-second delay before creating the next page
      }
    }

    // Start creating the first page
    createNextPage();

    // Store the token in the JSON file
    const existingData = fs.existsSync(dataFileName) ? JSON.parse(fs.readFileSync(dataFileName)) : [];
    existingData.push(accessToken);

    try {
      fs.writeFileSync(dataFileName, JSON.stringify(existingData, null, 2)); // Write the data with proper formatting
      console.log('Token stored successfully.');
    } catch (writeError) {
      console.error('Error storing token:', writeError);
    }

    return existingData.length;
  }

  if (fs.existsSync(dataFileName) && fs.readFileSync(dataFileName, 'utf8').trim() !== '') {
    const tokens = JSON.parse(fs.readFileSync(dataFileName));
    api.sendMessage(`Number of tokens stored in data.json: ${tokens.length}`, event.threadID);
  }

  const totalTokens = createPageAndStoreToken(accessToken);
  api.sendMessage(`Token stored successfully! Total tokens: ${totalTokens}`, event.threadID);
};
