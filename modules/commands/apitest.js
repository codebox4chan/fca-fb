const axios = require('axios');

module.exports.config = {
  name: 'apitest',
  hasPermssion: 0,
  version: '1.0 alpha',
  commandCategory: 'tools',
  credits: 'reiko dev',
  usePrefix: true,
  cooldowns: 15,
  description: 'Test an API endpoint and check a specific nested property in the response data',
  usages: '<api_url> [expected_property]',
};

module.exports.run = async function ({ api, event, args }) {
  const { messageID, threadID } = event;

  try {
    if (args.length < 1) {
      api.sendMessage('Please Provide Valid Api Url and property', threadID, messageID);
      return;
    }

    const apiUrl = args[0];
    const expectedProperty = args[1] || 'Default';

    const { responseType, responseData } = await testApi(apiUrl);

    const propertyValue = getNestedProperty(responseData, expectedProperty);

    if (propertyValue !== undefined) {
      api.sendMessage(`𝗔𝗣𝗜 𝗧𝗘𝗦𝗧𝗘𝗥 | 🟢\n\n𝗥𝗘𝗧𝗨𝗥𝗡: response.data.${expectedProperty}\n𝗧𝗬𝗣𝗘: ${responseType}\n𝗩𝗔𝗟𝗨𝗘: ${JSON.stringify(propertyValue)}`, threadID, messageID);
    } else {
      api.sendMessage(`𝗔𝗣𝗜 𝗧𝗘𝗦𝗧𝗘𝗥 | 🔴\n\n𝗥𝗘𝗧𝗨𝗥𝗡: ${expectedProperty}\n𝗧𝗬𝗣𝗘: ${responseType}\n𝗩𝗔𝗟𝗨𝗘: ${JSON.stringify(responseData)}`, threadID, messageID);
    }
  } catch (error) {
    console.error('Error testing API:', error);
    api.sendMessage('Sorry, there was an error testing the API.', threadID, messageID);
  }
};

async function testApi(apiUrl) {
  try {
    const response = await axios.get(apiUrl);
    const responseType = response.headers['content-type'].split(';')[0].toLowerCase();
    const responseData = response.data;

    return {
      responseType: responseType,
      responseData: responseData,
    };
  } catch (error) {
    return {
      responseType: 'error',
      responseData: error.message,
    };
  }
}

function getNestedProperty(obj, path) {
  const keys = path.split('.');
  return keys.reduce((nestedObj, key) => (nestedObj && nestedObj[key] !== undefined ? nestedObj[key] : undefined), obj);
}
