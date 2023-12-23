const axios = require('axios');

module.exports.config = {
  name: 'university',
  hasPermssion: 0,
  version: '1.0 alpha',
  commandCategory: 'tools',
  credits: 'Samir Œ converted to mirai by reiko dev',
  usePrefix: true,
  cooldowns: 6,
  description: 'search university',
  usages: '[keyword]',
};

module.exports.run = async function ({ args, api, event }) {
  const { messageID, threadID, senderID } = event;
  
const text = args[0];
  
  try {
    const response = await axios.get(`http://universities.hipolabs.com/search?country=${text}`);
    const universities = response.data;
    const header = "𝗨𝗻𝗶𝘃𝗲𝗿𝘀𝗶𝘁𝘆 ";
    const shuffledUniversities = universities.sort(() => Math.random() - 0.5);
      const randomInfo = shuffledUniversities.slice(0, 5).map((university,index) => `${index + 1}. ${header}\n🎓 Name: ${university.name}\n🌎 Website: ${university.web_pages.join(', ')}`);

    api.sendMessage(`${randomInfo.join('\n\n')}`, threadID, messageID);
  } catch (error) {
    console.error('Error fetching universities', error);
    api.sendMessage('Sorry, there was an error fetching the Universities from api.', threadID, messageID);
  }
};
