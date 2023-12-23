const axios = require('axios');
const fs = require('fs');

module.exports.config = {
  name: 'itunes',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'Joshua Sy',
  description: 'Search iTunes content and send audio/video as an attachment',
  commandCategory: 'fun',
  usePrefix: false,
  usages: '[searchTerm]',
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID } = event;
  const searchTerm = args.join(' ');

  if (!searchTerm) {
    return api.sendMessage('Please provide a search term to find content on iTunes.', threadID, event.messageID);
  }

  try {
    const response = await axios.get(`https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}`);
    const data = response.data.results[0];

    if (data) {
      const {
        collectionName,
        artistName,
        collectionPrice,
        collectionExplicitness,
        trackCount,
        copyright,
        country,
        currency,
        releaseDate,
        primaryGenreName,
        previewUrl,
      } = data;

      const audioResponse = await axios.get(previewUrl, { responseType: 'stream' });
      const audioStream = audioResponse.data;

      api.sendMessage(
        {
          body: `Title: ${collectionName}\nArtist: ${artistName}\nPrice: ${currency} ${collectionPrice}\nExplicit: ${collectionExplicitness}\nTrack Count: ${trackCount}\nCopyright: ${copyright}\nCountry: ${country}\nRelease Date: ${releaseDate}\nGenre: ${primaryGenreName}`,
          attachment: audioStream,
        },
        threadID
      );
    } else {
      return api.sendMessage('No iTunes content found for the given search term.', threadID, event.messageID);
    }
  } catch (error) {
    console.error(error);
    return api.sendMessage('An error occurred while fetching iTunes content. Please try again later.', threadID, event.messageID);
  }
};