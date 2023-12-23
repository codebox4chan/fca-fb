const axios = require("axios");
const fs = require("fs-extra");

module.exports.config = {
  name: "hdwallpaper",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Kim Joseph DG Bien",
  description: "HD Wallpaper",
  commandCategory: "image",
  usePrefix: true,
  usages: "<name of wallpaper> - <amount>",
  cooldowns: 8,
};

module.exports.run = async function ({ api, event, args }) {
  const { messageID, threadID } = event;
  const apiUrl = "https://hiroshi.kimjosephdgbien.repl.co/wallpaper/hd";

  const [name, amountStr] = args.join(" ").split(" - ");
  const amount = parseInt(amountStr);

  if (!name || isNaN(amount)) {
    return api.sendMessage(
      "Invalid usage format.\nUsage: /hdwall <name of wallpaper> - <amount 10 limit>",
      threadID,
      messageID
    );
  }

  if (amount > 10) {
    return api.sendMessage(
      "Image limit exceeded. Maximum allowed: 10",
      threadID,
      messageID
    );
  }

  const loadingMessage = await api.sendMessage(
    "searching please wait... 🔍",
    threadID
  );

  try {
    const response = await axios.get(apiUrl, {
      params: {
        search: name,
        amount,
        apikey: "hiroshikey-478",
      },
    });

    if (response.data.message === "Success") {
      const imgURLs = response.data.images;
      const pathImgs = [];

      for (let i = 0; i < imgURLs.length; i++) {
        const imgURL = imgURLs[i];
        const pathImg = __dirname + `/cache/wallpaper_${i}.jpg`;
        const imgData = await axios.get(imgURL, { responseType: "arraybuffer" });
        fs.writeFileSync(pathImg, imgData.data);
        pathImgs.push(pathImg);
      }

      const attachments = pathImgs.map((pathImg) =>
        fs.createReadStream(pathImg)
      );

      api.sendMessage({ attachment: attachments }, threadID, () => {
        pathImgs.forEach((pathImg) => fs.unlinkSync(pathImg));
      }, messageID);

      api.unsendMessage(loadingMessage.messageID);
    } else {
      api.sendMessage(
        "No images found for the given search query",
        threadID,
        messageID
      );
    }
  } catch (error) {
    console.error(error);
    api.sendMessage(
      "We're sorry, but we couldn't find any images for your wallpaper choice",
      threadID,
      messageID
    );
  }
};