const axios = require('axios');
const xml2js = require('xml2js');

module.exports.config = {
  name: 'article',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'August Quinn',
  description: 'Search for research articles on Arxiv.',
  commandCategory: 'educational',
  usages: '[query]',
  usePrefix: false,
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  const query = args.join(' ');

  if (!query) {
    api.sendMessage('Please provide a search query for Arxiv.', threadID, messageID);
    return;
  }

  try {
    const response = await axios.get(`http://export.arxiv.org/api/query?search_query=all:${encodeURIComponent(query)}`);
    const xmlData = response.data;

    const parser = new xml2js.Parser();
    parser.parseString(xmlData, (error, result) => {
      if (error) {
        api.sendMessage('An error occurred while parsing Arxiv data.', threadID, messageID);
        console.error(error);
        return;
      }

      const entries = result.feed.entry;

      if (!entries || entries.length === 0) {
        api.sendMessage('No research articles found on Arxiv for the given query.', threadID, messageID);
        return;
      }

      const article = entries[0];
      const title = article.title[0];
      const summary = article.summary[0];
      const authors = article.author.map((author) => author.name[0]);
      const published = article.published[0];

      const responseMessage = `📚 Arxiv Research Article\n\n📝 Title: ${title}\n\n👥 Authors: ${authors.join(', ')}\n\n🗓️ Published Date: ${published}\n\n📖 Summary: ${summary}`;

      api.sendMessage(responseMessage, threadID, messageID);
    });
  } catch (error) {
    console.error(error);
    api.sendMessage('An error occurred while fetching Arxiv data.', threadID, messageID);
  }
};