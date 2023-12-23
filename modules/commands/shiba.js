const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "shiba",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "credits",
  description: "get a random shiba image",
  commandCategory: "anime",
  usePrefix: false,
  cooldowns: 0
};

module.exports.run = async function({ api, event }) {
  try {
    const response = await axios.get("https://shibe.online/api/shibes");
    const shibaData = response.data;
    const imgUrl = shibaData[0];
    const imgFile = path.basename(imgUrl);
    const imgPath = path.join(__dirname, "../cache", imgFile);
    const writer = fs.createWriteStream(imgPath);
    const imageResponse = await axios.get(imgUrl, { responseType: "stream" });
    imageResponse.data.pipe(writer);

    writer.on("finish", () => {
      api.sendMessage(
        {
          attachment: fs.createReadStream(imgPath)
        },
        event.threadID,
        (err) => {
          if (err) {
            console.error("Something went wrong:", err);
            return;
          }
          fs.unlinkSync(imgPath);
        }
      );
    });

    writer.on("error", (err) => {
      console.error("Something went wrong:", err);
      api.sendMessage("An error occurred. Please try again later.", event.threadID);
    });
  } catch (error) {
    console.error("Something went wrong:", error);
    api.sendMessage("An error occurred. Please try again later.", event.threadID);
  }
};