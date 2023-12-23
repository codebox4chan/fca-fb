const axios = require("axios");
const fs = require("fs");

module.exports.config = {
  name: "microlink",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "August Quinn",
  description: "Retrieve metadata from any URL.",
  commandCategory: "info",
  usePrefix: false,
  usages: "[URL]",
  cooldowns: 5,
};

module.exports.run = async ({ api, event, args }) => {
  try {
    const url = args[0];

    if (!url) {
      api.sendMessage("Please provide a valid URL to retrieve information from.", event.threadID, event.messageID);
      return;
    }

    const apiUrl = `https://api.microlink.io/?url=${encodeURIComponent(url)}`;
    const response = await axios.get(apiUrl);

    if (response.status === 200) {
      const data = response.data.data;
      const title = data.title || "N/A";
      const description = data.description || "N/A";
      const lang = data.lang || "N/A";
      const publisher = data.publisher || "N/A";
      const imageUrl = data.image?.url || "N/A";
      const imageType = data.image?.type || "N/A";
      const imageSize = data.image?.size_pretty || "N/A";
      const date = data.date || "N/A";
      const siteUrl = data.url || "N/A";
      const logoUrl = data.logo?.url || "N/A";
      const logoType = data.logo?.type || "N/A";
      const logoSize = data.logo?.size_pretty || "N/A";

      let path = __dirname + "/cache/logo.jpg";
      let hasError = false;

      try {
        let imageResponse = await axios.get(imageUrl, { responseType: "arraybuffer" });
        fs.writeFileSync(path, Buffer.from(imageResponse.data, "binary"));
      } catch (error) {
        console.error(error);
        hasError = true;
      }

      const message = `🌐 Here is the information for the URL "${url}":\n\n` +
        `📜 Title: ${title}\n` +
        `📝 Description: ${description}\n` +
        `🗣 Language: ${lang}\n` +
        `📢 Publisher: ${publisher}\n` +
        `🖼️ Image URL: ${imageUrl}\n` +
        `🖼️ Image Type: ${imageType}\n` +
        `📏 Image Size: ${imageSize}\n` +
        `📅 Date: ${date}\n` +
        `🌐 Site URL: ${siteUrl}\n` +
        `🖼️ Logo:\n${logoUrl}\n` +
        `🖼️ Logo Type: ${logoType}\n` +
        `📏 Logo Size: ${logoSize}\n` +
        "\nPlease note that the retrieved data may not be accurate due to the nature of external sources.";

      if (!hasError) {
        api.sendMessage({
          body: message,
          attachment: fs.createReadStream(path),
        }, event.threadID, event.messageID);
      } else {
        api.sendMessage(message, event.threadID, event.messageID);
      }
    } else {
      api.sendMessage("Sorry, I couldn't retrieve information from the provided URL. Please make sure it's a valid URL.", event.threadID, event.messageID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage("An unexpected error occurred while fetching information. Please try again later.", event.threadID, event.messageID);
  }
};