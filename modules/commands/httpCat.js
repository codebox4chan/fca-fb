const axios = require('axios');
const fs = require('fs');

module.exports.config = {
  name: "httpcat",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "August Quinn",
  description: "Get HTTP status cat images",
  commandCategory: "tools",
  usePrefix: false,
  usages: "",
  cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  try {
    if (!args[0]) {
      api.sendMessage("Provide an HTTP status code to get a cat image!", event.threadID, event.messageID);
      return;
    }

    const statusCode = args[0];
    const catImageURL = `https://http.cat/${statusCode}.jpg`;

    const catImage = await axios.get(catImageURL, { responseType: 'arraybuffer' });

    fs.writeFileSync('cat.jpg', Buffer.from(catImage.data));
    api.sendMessage(
      {
        attachment: fs.createReadStream('cat.jpg'),
        body: `🐱 HTTP Status Cat for ${statusCode}`
      },
      event.threadID, event.messageID
    );

    fs.unlinkSync('cat.jpg');
  } catch (error) {
    console.error("Error fetching HTTP status cat image:", error);
    api.sendMessage("Error fetching HTTP status cat image. Check the status code and try again.", event.threadID, event.messageID);
  }
};