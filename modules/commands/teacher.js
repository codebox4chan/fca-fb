const axios = require("axios");
const fs = require("fs");

module.exports.config = {
  name: "teacher",
  version: "1",
  hasPermssion: 0,
  credits: "Grey, Daniel",
  description: "Ask",
  commandCategory: "educational",
  usages: "<ask>",
  usePrefix: false,
  cooldowns: 5, 
};

module.exports.run = async function({ api, event }) {
  let { threadID, messageID } = event;
  const cookies = "Zwg4SQZ1jP97HQBhSybMAoq20niVLr52MLkyx0SmjEa4mtc7q9wXzKo4eVC59MCXcdiAsg."; // place your cookie here
  const response = event.body.slice(5).trim();

  if (!response) {
    api.sendMessage("Please provide a question or query", threadID, messageID);
    return;
  }

  try {
  const res = await axios.get(`https://gptgotest.lazygreyzz.repl.co/ask?cookies=${cookies}&question=${response}`);
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

      const fontMapping = {
            a: "𝖺",
            b: "𝖻",
            c: "𝖼",
            d: "𝖽",
            e: "𝖾",
            f: "𝖿",
            g: "𝗀",
            h: "𝗁",
            i: "𝗂",
            j: "𝗃",
            k: "𝗄",
            l: "𝗅",
            m: "𝗆",
            n: "𝗇",
            o: "𝗈",
            p: "𝗉",
            q: "𝗊",
            r: "𝗋",
            s: "𝗌",
            t: "𝗍",
            u: "𝗎",
            v: "𝗏",
            w: "𝗐",
            x: "𝗑",
            y: "𝗒",
            z: "𝗓",
            A: "𝖠",
            B: "𝖡",
            C: "𝖢",
            D: "𝖣",
            E: "𝖤",
            F: "𝖥",
            G: "𝖦",
            H: "𝖧",
            I: "𝖨",
            J: "𝖩",
            K: "𝖪",
            L: "𝖫",
            M: "𝖬",
            N: "𝖭",
            O: "𝖮",
            P: "𝖯",
            Q: "𝖰",
            R: "𝖱",
            S: "𝖲",
            T: "𝖳",
            U: "𝖴",
            V: "𝖵",
            W: "𝖶",
            X: "𝖷",
            Y: "𝖸",
        // Add more mappings as needed
      };

      const formattedResponse = message
        .toLowerCase()
        .split("")
        .map(char => fontMapping[char] || char)
        .join("");

      api.sendMessage(
      {
        attachment: photoAttachments,
        body: `Teacher:\n\n${formattedResponse} 👨‍🏫`,
      },
      threadID,
      messageID
    );
  } else {
    api.sendMessage(message, threadID, messageID);
  }
} catch (error) {
  console.error("Error occurred while fetching data from the Bard API:", error);
  api.sendMessage("An error occurred while processing your request.", threadID, messageID);
  }
};