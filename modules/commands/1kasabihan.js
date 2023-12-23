const axios = require('axios');

module.exports.config = {
  name: 'kasabihan',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'August Quinn',
  description: 'Get a random Tagalog quote.',
  commandCategory: 'fun',
  usages: '',
  usePrefix: false,
  cooldowns: 5,
};

module.exports.run = async function ({ api, event }) {
  try {
    const englishQuoteAPI = 'https://api.quotable.io/random?language=en';

    const quote = await axios.get(englishQuoteAPI);

    const quoteText = quote.data.content;

    const translationAPI = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=tl&dt=t&q=' + encodeURIComponent(quoteText);
    const translationResponse = await axios.get(translationAPI);

    const tagalogQuote = translationResponse.data[0][0][0];

    const author = quote.data.author;

    const message = `💬 𝗞𝗔𝗦𝗔𝗕𝗜𝗛𝗔𝗡\n\n"${tagalogQuote}" - ${author || 'Unknown'}`;
    api.sendMessage(message, event.threadID, event.messageID);
  } catch (error) {
    console.error('Error fetching Tagalog quote:', error);
    api.sendMessage('Error fetching Tagalog quote. Please try again.', event.threadID, event.messageID);
  }
};
