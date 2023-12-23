const axios = require('axios');

module.exports.config = {
  name: 'scanpic',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'August Quinn',
  description: 'Analyze photos using Everypixel API.',
  commandCategory: 'tools',
  usePrefix: false,
  usages: '[URL]',
  cooldowns: 5,
};

module.exports.handlePhoto = async function ({ api, event }) {
  if (event.type === 'message_reply' && event.messageReply.attachments) {
    const attachment = event.messageReply.attachments[0];
    if (attachment.type === 'photo') {
      const image_url = attachment.url;
      analyzeMedia(api, event.threadID, event.messageID, image_url);
    }
  }
};

module.exports.run = async function ({ api, event, args }) {
  if (args.length === 0 && event.type !== 'message_reply') {
    api.sendMessage('Please provide a photo to analyze by replying to it or provide a URL.', event.threadID, event.messageID);
    return;
  }

  if (event.type === 'message_reply' && event.messageReply.attachments) {
    const attachment = event.messageReply.attachments[0];
    if (attachment.type === 'photo') {
      const image_url = attachment.url;
      analyzeMedia(api, event.threadID, event.messageID, image_url);
      return;
    }
  }

  if (args.length === 1) {
    const media_url = args[0];
    analyzeMedia(api, event.threadID, event.messageID, media_url);
  } else {
    api.sendMessage('Invalid command. Please provide a valid photo to analyze by replying to it or provide a URL.', event.threadID, event.messageID);
  }
};

async function analyzeMedia(api, threadID, messageID, media_url) {
  const clientId = 'EPAIo2g74tq9tmvwCQQsBspt';
  const clientSecret = 'x3sf61LiYsoyMgxGiuhXraB9iwjon6K6LPLOObjMt6It994I';

  try {
    const keywordsResponse = await axios.get(`https://api.everypixel.com/v1/keywords?url=${encodeURIComponent(media_url)}&num_keywords=10`, {
      auth: {
        username: clientId,
        password: clientSecret,
      },
    });

    const facesResponse = await axios.get(`https://api.everypixel.com/v1/faces?url=${encodeURIComponent(media_url)}`, {
      auth: {
        username: clientId,
        password: clientSecret,
      },
    });

    const qualityResponse = await axios.get(`https://api.everypixel.com/v1/quality?url=${encodeURIComponent(media_url)}`, {
      auth: {
        username: clientId,
        password: clientSecret,
      },
    });

    let resultMessage = '𝗔𝗡𝗔𝗟𝗬𝗦𝗜𝗦 𝗥𝗘𝗦𝗨𝗟𝗧𝗦:\n';

    if (keywordsResponse.data && keywordsResponse.data.keywords) {
      const keywords = keywordsResponse.data.keywords.map(keyword => `⌲ ${keyword.keyword} (${keyword.score.toFixed(2)})`).join('\n');
      resultMessage += `\n𝗞𝗘𝗬𝗪𝗢𝗥𝗗𝗦:\n${keywords}`;
    }

    if (facesResponse.data && facesResponse.data.faces) {
      const faces = facesResponse.data.faces.map(face => `⌲ Age: ${face.age.toFixed(2)}, Class: ${face.class}`).join('\n');
      resultMessage += `\n\n𝗙𝗔𝗖𝗘𝗦 𝗗𝗘𝗧𝗘𝗖𝗧𝗘𝗗:\n${faces}`;
    } else {
      resultMessage += '\nNo faces detected.';
    }

    if (qualityResponse.data && qualityResponse.data.quality) {
      resultMessage += `\n\n𝗤𝗨𝗔𝗟𝗜𝗧𝗬 𝗦𝗖𝗢𝗥𝗘: ${qualityResponse.data.quality.score.toFixed(2)}`;
    }

    api.sendMessage(resultMessage, threadID, messageID);
  } catch (error) {
    console.error(error);
    api.sendMessage('An error occurred while analyzing the media.', threadID, messageID);
  }
}