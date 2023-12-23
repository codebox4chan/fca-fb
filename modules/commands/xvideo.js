const axios = require("axios");

const fs = require("fs");

module.exports.config = {

  name: "xvideo",

  version: "1.0.0",

  hasPermssion: 0,

  credits: "Lux", //Please don’t change this.

  usePrefix: true,

  description: "18+ not for kids",

  commandCategory: "nsfw",

  usages: "[tag]+[tag]+[tag]",

  cooldowns: 0,

};

module.exports.run = async function ({ api, event, args }) {

  const query = args.join(" ");

  if (!query) {

    return api.sendMessage(

      `Please include tag/s of the video. \n\nEx. solo+milf (add more tags if needed).`,

      event.threadID,

      event.messageID

    );

  }

  api.setMessageReaction("⏳", event.messageID, (err) => {}, true);

  try {

    const response = await axios.get(`https://api-lux.luxannareyes.repl.co/xfetch?q=${encodeURIComponent(query)}`);

    const data = response.data;

    if (!data || !data.video) {

      return api.sendMessage(

        `No video found for "${query}"`,

        event.threadID,

        event.messageID

      );

    }

    const videoUrl = data.video;

    const videoName = `${query}_video.mp4`;

    const videoFilePath = `./${videoName}`;

    const writer = fs.createWriteStream(videoFilePath);

    const responseStream = await axios.get(videoUrl, { responseType: 'stream' });

    responseStream.data.pipe(writer);

    writer.on('finish', () => {

      api.sendMessage(

        {

          attachment: fs.createReadStream(videoFilePath),

          body: `✅ Done\nVideo result for "${query}"`,

        },

        event.threadID,

        (error, info) => {

          fs.unlinkSync(videoFilePath);

        }

      );

    });

    api.setMessageReaction("✅", event.messageID, (err) => {}, true);

  } catch (error) {

    console.error(error);

    api.sendMessage(

      "An error occurred while fetching videos.",

      event.threadID,

      event.messageID

    );

    api.setMessageReaction("❌", event.messageID, (err) => {}, true);

  }

};


