module.exports.config = {
  name: 'animeme',
  hasPermission: 0,
  credits: 'Reiko Dev',
  version: '1.0.0',
  commandCategory: 'fun',
  cooldowns: 5,
  description: 'send a random animeme',
  usePrefix: true,
  usages: '',
};

module.exports.run = async function ({ event, api, args }) {
  const request = require('request');
  const fs = require('fs-extra');
  const axios = require('axios');

  try {
    const response = await axios.get('https://www.reddit.com/r/anime_irl+animemes+Animemes+Memes_Of_The_Dank+awwnime/top.json?sort=top&t=week&limit=100');
    const posts = response.data.data.children;
    const post = posts[Math.floor(Math.random() * posts.length)].data;

    const title = post.title;
    const cachePath = __dirname + '/cache/animeme';  // Adjusted cache directory

    let mediaUrl;
    if (post.media) {
      // If post has media information, check if it's a video
      const media = post.media;
      if (media.reddit_video) {
        mediaUrl = media.reddit_video.fallback_url;
        cachePath += '.mp4';
      }
    } else {
      // If post doesn't have media information, assume it's an image
      mediaUrl = post.url;
      cachePath += '.png';
    }

    const callback = () => {
      api.sendMessage({
        body: `Title: ${title}`,
        attachment: fs.createReadStream(cachePath),
      }, event.threadID, () => fs.unlinkSync(cachePath), event.messageID);
    };

    const mediaStream = fs.createWriteStream(cachePath);
    request(encodeURI(mediaUrl)).pipe(mediaStream).on('close', callback);
  } catch (error) {
    console.error(error);
    await api.sendMessage('Error occurred while fetching an anime meme!', event.threadID);
  }
};
