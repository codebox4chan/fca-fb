const axios = require("axios");
const fs = require("fs");

module.exports.config = {
  name: "deepmind",
  version: "1",
  hasPermssion: 0,
  credits: "Grey, Daniel",
  description: "best ai tool powered by Alphacode also known as alphago capable of search image and finding source of information such as news",
  commandCategory: "educational",
  usages: "[ask]",
  usePrefix: false,
  cooldowns: 5, 
};

module.exports.run = async function({ api, event }) {
  const { threadID, messageID } = event;
  const cookies = "Zwg4SQZ1jP97HQBhSybMAoq20niVLr52MLkyx0SmjEa4mtc7q9wXzKo4eVC59MCXcdiAsg.";
  const response = event.body.slice(5).trim();

  if (response === "My Response:") {
    // Prompt the user for input
    api.sendMessage("Please provide a question or query", threadID, messageID);
    return;
  }

  if (!response) {
    api.sendMessage("Please provide a question or query", threadID, messageID);
    return;
  }
  const characterName = "Google Deep Mind"; // Specify the character's name here
  const fromWhat = "DeepMind Technologies Limited,[4] doing business as Google DeepMind, is a British-American artificial intelligence research laboratory which serves as a subsidiary of Google. Founded in the UK in 2010, it was acquired by Google in 2014,[5] becoming a wholly owned subsidiary of Google parent company Alphabet Inc. after Google's corporate restructuring in 2015. The company is based in London, with research centres in Canada,[6] France,[7] and the United States.";
  const characterPrompt = `You're now Acting AI name ${characterName}, ${fromWhat},and USER response: ${response}`;

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
        // Font mappings
      };

      const formattedResponse = message
        .toLowerCase()
        .split("")
        .map(char => fontMapping[char] || char)
        .join("");

      api.sendMessage(
        {
          attachment: photoAttachments,
          body: `${characterName}:\n\n${formattedResponse} 🛰️`,
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
