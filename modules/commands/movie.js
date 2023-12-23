module.exports.config = {
  name: 'movie',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'Joshua Sy',
  description: 'Search movie info',
  usePrefix: false,
  usages: '[title]',
  commandCategory: 'search', // The value for this key is missing in the provided code
  cooldowns: 5,
};

module.exports.run = async ({ api, event, args }) => {
  const axios = global.nodemodule.axios; // Importing the 'axios' library
  let movieTitle = args.join(' '); // Joining the elements in the 'args' array into a single string
  const response = await axios.get('https://api.popcat.xyz/imdb?q=' + movieTitle); // Sending a GET request to the specified URL
  var title = response.data.title,
    releasedDate = response.data.released,
    actors = response.data.actors,
    plot = response.data.plot;
  return api.sendMessage(
    'Title: ' +
      title +
      '\n\nReleased Date: ' +
      releasedDate +
      '\n\nActors: ' +
      actors +
      '\n\nPlot: ' +
      plot,
    event.threadID,
    event.messageID
  );
};
