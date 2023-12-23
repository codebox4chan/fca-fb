const axios = require("axios");
const fs = require("fs");

module.exports.config = {
  name: "ein",
  version: "1",
  hasPermssion: 0,
  credits: "Økechukwu Nwaøzør",
  description: "best ai tool powered by Google also known as albert Einstein or einstein capable of searching images and finding the source of information such as news",
  commandCategory: "educational",
  usages: "[ask]",
  usePrefix: false,
  cooldowns: 5,
};

module.exports.run = async function ({ api, event }) {
  const { threadID, messageID } = event;
  const cookies = "Zwg4SQZ1jP97HQBhSybMAoq20niVLr52MLkyx0SmjEa4mtc7q9wXzKo4eVC59MCXcdiAsg.";
  const response = event.body.slice(5).trim();

  if (response === " ") {
    // Prompt the user for input
    api.sendMessage("Please provide a question or query", threadID, messageID);
    return;
  }

  if (!response) {
    api.sendMessage("Please provide a question or query", threadID, messageID);
    return;
  }

  const characterName = "Einstein"; // Specify the character's name here
  const fromWhat = "and can help Generate Articles and can't be detect by ai detector";
  const characterPrompt = `You're now Acting as person name ${characterName}, ${fromWhat}, and users response: ${response}`;
  //ctto of API Grey
  try {
    const res = await axios.get(`https://gptgotest.lazygreyzz.repl.co/ask?cookies=${cookies}&question=${characterPrompt}`);
    const responseData = JSON.parse(res.data.response);
    const message = responseData.response;
    const imageUrls = responseData.image;

    if (message && message.length > 0) {
      const photoUrls = imageUrls.map(url => url.replace(/\\(.)/mg, "$1"));
      const photoAttachments = [];

      if (!fs.existsSync("cache")) {
        fs.mkdirSync("cache");
      }

      for (let i = 0; i < photoUrls.length; i++) {
        const url = photoUrls[i];
        const photoPath = `cache/photo_${i + 1}.png`;

        try {
          const imageResponse = await axios.get(url, { responseType: "arraybuffer" });
          fs.writeFileSync(photoPath, imageResponse.data);

          photoAttachments.push(fs.createReadStream(photoPath));
        } catch (error) {
          console.error("Error occurred while downloading and saving the photo:", error);
        }
      }

      api.sendMessage(
        {
          attachment: photoAttachments,
          body: `${characterName}:\n\n${message} 🛰️`,
        },
        threadID,
        messageID
      );
    } else {
      api.sendMessage(message, threadID, messageID);
    }
  } catch (error) {
    console.error("Error occurred while fetching data from the OKEY-AI API:", error);
    api.sendMessage("An error occurred while processing your request.", threadID, messageID);
  }
};
