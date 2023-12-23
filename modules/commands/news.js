const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports.config = {
  name: 'news',
  version: '4.0.0',
  hasPermssion: 0,
  credits: 'Kenneth Panio',
  description: 'search news articles',
  commandCategory: 'info',
  usePrefix: false,
  usages: '[topic]',
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  const apiKey = 'f21962c22cfc4f1db804bee6e09808b5';

  if (args.length === 0) {
    api.sendMessage('In order to find news articles on a specific topic, please specify it.', threadID, messageID);
    return;
  }

  const topic = args.join(' ');

    try {
    const baseUrl = 'https://newsapi.org/v2/everything';
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1); // Subtract current date with realtime update

    const formattedDate = currentDate.toISOString().split('T')[0];

    const response = await axios.get(baseUrl, {
      params: {
        q: topic,
        from: formattedDate,
        sortBy: 'publishedAt',
        apiKey: apiKey,
      },
    });

    if (response.data && response.data.articles && response.data.articles.length > 0) {
      const articles = response.data.articles;
      const randomIndex = Math.floor(Math.random() * articles.length);
      const article = articles[randomIndex];
      const imageUrl = article.urlToImage;
      const imageStream = await axios.get(imageUrl, { responseType: 'stream' });
      const imagePath = path.join(__dirname, '/cache/news.png');
      const imageWriter = fs.createWriteStream(imagePath);

      imageStream.data.pipe(imageWriter);

      imageWriter.on('finish', () => {
        const attachment = {
          body: `𝗡𝗘𝗪𝗦📰: ${article.source.name}\n𝗧𝗜𝗧𝗟𝗘: ${article.title}\n𝗗𝗘𝗦𝗖𝗥𝗜𝗣𝗧𝗜𝗢𝗡: ${article.description}\n𝗦𝗢𝗨𝗥𝗖𝗘: ${article.url || 'Trust Me Bro!'}\n𝗣𝗨𝗕𝗟𝗜𝗦𝗛𝗘𝗥: ${article.author || 'Kenneth Panio'}\n𝗗𝗔𝗧𝗘: ${article.publishedAt}`,
          attachment: fs.createReadStream(imagePath),
        };

        api.sendMessage(attachment, threadID, messageID);
      });

      imageWriter.on('error', (error) => {
        console.error(error);
        api.sendMessage('No Image To Attach!', threadID, messageID);
      });
    } else {
      api.sendMessage('No news articles found!', threadID, messageID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage('Server is Down, Try Again Later!', threadID, messageID);
  }
};
