const axios = require("axios");
const fs = require("fs-extra");

module.exports.config = {
  name: "nikke",
  version: "0.0.1",
  hasPermssion: 0,
  credits: "reiko",
  description: "Get a random picture of Nikke or upload a specified URL.",
  commandCategory: "image",
  usePrefix: false,
  usages: "[upload] [url optional]",
  cooldowns: 10,
  dependencies: {
    "axios": "",
    "fs-extra": ""
  }
};

module.exports.run = async ({ api, event }) => {
  try {
    const response = await axios.get("https://replhome.codebox4chan.repl.co/api/nikke");

    if (response.status === 200 && response.data.imageURL) {
      const imageUrl = response.data.imageURL;

      const imageResponse = await axios.get(imageUrl, { responseType: "arraybuffer" });
      const fileExtension = imageUrl.split(".").pop();
      const fileName = `${Date.now()}.${fileExtension}`;
      await fs.writeFile(__dirname + "/cache/" + fileName, imageResponse.data);
      await api.sendMessage(
        {
          body: "Nikke Picture",
          attachment: fs.createReadStream(__dirname + "/cache/" + fileName),
        },
        event.threadID
      );
      await fs.unlink(__dirname + "/cache/" + fileName);
    } else {
      api.sendMessage("Failed to fetch a random Nikke picture from the API.", event.threadID);
    }
  } catch (error) {
    console.error("Error occurred:", error);
    api.sendMessage("An error occurred while processing the request.", event.threadID);
  }
};
