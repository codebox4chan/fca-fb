const axios = require('axios');
const path = require('path');
const fs = require('fs');

module.exports.config = {
  name: "wiki",
  version: "5.0.5",
  hasPermssion: 0,
  credits: "reiko dev",
  description: "search through wikipedia and gather information",
  commandCategory: "educational",
  usages: "[en]",
  cooldowns: 1,
  usePrefix: false,
  dependencies: {
    "wikijs": ""
  }
};

module.exports.run = async ({ event, args, api, getText }) => {
  const wiki = (global.nodemodule["wikijs"]).default;
  let content = args.join(" ");
  let url = 'https://en.wikipedia.org/w/api.php';

  if (args[0] == "en") {
    url = 'https://en.wikipedia.org/w/api.php';
    content = args.slice(1, args.length);
  }

  if (!content) return api.sendMessage(getText("missingInput"), event.threadID, event.messageID);

  try {
    const page = await wiki({ apiUrl: url }).page(content);
    const summary = await page.summary();
    const images = await page.images();

    if (images.length > 0) {
      const imageUrl = images[0]; // You can modify this to select a different image if needed

      // Download the image
      const imageStream = await axios.get(imageUrl, { responseType: 'stream' });
      const imagePath = path.join(__dirname, '/cache/wiki_image.jpg');
      const imageWriter = fs.createWriteStream(imagePath);

      imageStream.data.pipe(imageWriter);

      imageWriter.on('finish', () => {
        // Send both summary and image
        api.sendMessage({
          body: summary,
          attachment: fs.createReadStream(imagePath)
        }, event.threadID, event.messageID);
      });

      imageWriter.on('error', (error) => {
        console.error(error);
        // If there's an error downloading the image, send only the summary
        api.sendMessage(summary, event.threadID, event.messageID);
      });
    } else {
      // If no images found, send only the summary
      api.sendMessage(summary, event.threadID, event.messageID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage(getText("returnNotFound", content), event.threadID, event.messageID);
  }
};
