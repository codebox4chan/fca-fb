const axios = require("axios");
const fs = require("fs");
const stream = require("stream");

module.exports.config = {
  name: "pexels",
  version: "1.0.6",
  hasPermssion: 0,
  credits: "August Quinn",
  description: "Search for images on Pexels",
  commandCategory: "image",
  usePrefix: false,
  usages: "[query]",
  cooldowns: 5,
};

const createReadStreamFromBuffer = (buffer) => {
  const readable = new stream.Readable();
  readable._read = () => {};
  readable.push(buffer);
  readable.push(null);
  return readable;
};

module.exports.run = async ({ api, event, args }) => {
  const { threadID, senderID } = event;

  const getUserInfo = async (api, userID) => {
    try {
      const userInfo = await api.getUserInfo(userID);
      return userInfo[userID].name;
    } catch (error) {
      console.error(`Error fetching user info: ${error}`);
      return "";
    }
  };

  const userName = await getUserInfo(api, senderID);

  try {
    const query = args.join(" ");
    if (!query) {
      return api.sendMessage("Please provide a search query.", threadID, event.messageID);
    }

    const apiUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}`;

    api.sendMessage(`⏳ ${userName}, I am currently processing your request. Please wait...`, threadID, event.messageID);

    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: "ZGKeJTcrcUFu5LeHuulKi7uyPqVkBxVp9dqaZtW2mFXUuFKBV1ljRMAL",
      },
    });

    if (response.data.photos && response.data.photos.length > 0) {
      const images = response.data.photos.slice(0, 10);

      const streams = [];

      for (const [index, photo] of images.entries()) {
        const url = photo.src.original;
        if (!url.endsWith(".jpeg")) continue;

        let hasError = false;

        const path = `./cache/search-image-${index}.jpeg`;

        try {
          const response = await axios.get(url, { responseType: "arraybuffer" });
          fs.writeFileSync(path, Buffer.from(response.data, "binary"));
        } catch (error) {
          console.error("Error downloading image:", error);
          hasError = true;
        }

        if (hasError) continue;

        streams.push(
          fs.createReadStream(path).on("end", () => {
            if (fs.existsSync(path)) {
              fs.unlinkSync(path, (err) => {
                if (err) return console.log(err);
                console.log(`Deleted file: ${path}`);
              });
            }
          })
        );
      }

      if (streams.length === 0) {
        api.sendMessage(`I apologize ${userName}, but there are no valid images found for the given query.`, threadID, event.messageID);
      } else {
        const message = `Here's what I found for "${query}":\n\n${images
          .map(
            (photo, index) =>
              `${index + 1}. Photo by ${photo.photographer}:\n ⌲  [Link to Download](${photo.src.original})`
          )
          .join("\n")}`;

        api.sendMessage({ attachment: streams, body: message }, threadID, event.messageID);
      }
    } else {
      api.sendMessage(`I apologize ${userName}, but no images were found for the given query. Please try again.`, threadID, event.messageID);
    }
  } catch (error) {
    console.error("Error fetching images from Pexels:", error);
    api.sendMessage("An error occurred while fetching images.", threadID, event.messageID);
  }
};