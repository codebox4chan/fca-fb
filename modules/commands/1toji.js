const axios = require('axios');

const fs = require('fs');
const ytdl = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube('AIzaSyBFNMIC7pTPGo2zBxE8JrF0oPpOpxV6KU8');

module.exports.config = {
 name: "toji",
 version: "1.0.0",
 hasPermssion: 0,
 credits: "Gry KJ",
 description: "Send Random Video",
 commandCategory: "fun",
 usePrefix: false,
 usages: "",
 cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
 const keyword = "Toji fushiguro edit";
 const limit = 40; // Get top 10 search results
 try {
  const results = await youtube.searchVideos(keyword, limit);
  // Choose a random video from the top 10 results
  const randomIndex = Math.floor(Math.random() * results.length);
  const videoID = results[randomIndex].id;
  const videoURL = `https://www.youtube.com/watch?v=${videoID}`;
  // Using 'highestaudio' and 'mp4' format to keep the sound
  const streamOptions = { quality: 'highestaudio', filter: 'audioandvideo', format: 'mp4' };
  const stream = ytdl(videoURL, streamOptions);
  const tempPath = `./temp-${videoID}.mp4`;

  stream.pipe(fs.createWriteStream(tempPath));
  stream.on('end', () => {
   api.sendMessage({
    body: `Edit: ${results[randomIndex].title}`,
    attachment: fs.createReadStream(tempPath)
   }, event.threadID, () => {
    fs.unlinkSync(tempPath); // Delete the temp file after sending the video with sound
   }, event.messageID);
  });
 } catch (err) {
  api.sendMessage("An error occurred while fetching the video.", event.threadID, event.messageID);
  console.error(err);
 }
};