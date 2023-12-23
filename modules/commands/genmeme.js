const axios = require('axios');
const fs = require('fs');

module.exports.config = {
  name: "genmeme",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "August Quinn",
  description: "Generate memes with various templates and custom text",
  commandCategory: "fun",
  usePrefix: false,
  usages: "[type] [toptext] [bottomtext] or [list]",
  cooldowns: 5
};

const memeTemplates = {
  "harrypotter": "Harry-Potter-Ok",
  "10guy": "10-Guy",
  "1950s": "1950s-Middle-Finger",
  "1990s": "1990s-First-World-Problems",
  "2ndtermobama": "2nd-Term-Obama",
  "afraidtoaskandy": "Afraid-To-Ask-Andy",
  "alienmeeting": "Alien-Meeting-Suggestion",
  "amitheonlyone": "Am-I-The-Only-One-Around-Here",
  "anristares": "Anri-Stares",
  "babycry": "Baby-Cry",
  "blackgirlwat": "Black-Girl-Wat",
  "bitchplease": "Bitch-Please",
  "buddychrist": "Buddy-Christ",
  "computerguy": "Computer-Guy",
  "clown": "Clown-Applying-Makeup",
  "confusedgranddad": "Confused-Granddad",
  "cutecat": "Cute-Cat",
  "dadjoke": "Dad-Joke",
  "disastergirl": "Disaster-Girl",
  "doge": "Doge-2",
  "epicuristkid": "Epicurist-Kid",
  "evilcown": "Evil-Cows",
  "expandingbrain": "Expanding-Brain",
  "woman&cat": "Woman-Yelling-At-Cat",
  "batman&robin": "Batman-Slapping-Robin",
  "changemymind": "Change-My-Mind",
  "burnkitty": "Burn-Kitty",
  "chubbybubbles": "Chubby-Bubbles-Girl",
  "distractedboyfriend": "Distracted-Boyfriend",
  "drake": "Drake-Bad-Good",
  "god": "God",
  "gollum": "Gollum",
  "goodfellas": "Good-Fellas-Hilarious",
  "otherwomen": "I-Bet-Hes-Thinking-About-Other-Women",
  "kevinhart": "Kevin-Hart",
  "leonardodicaprio": "Leonardo-Dicaprio-Cheers",
  "metaljesus": "Metal-Jesus",
  "monkeypuppet": "Monkey-Puppet",
  "omgcat": "OMG-Cat",
  "rollsafe": "Roll-Safe-Think-About-It",
  "sadpablo": "Sad-Pablo-Escobar",
  "smilingjesus": "Smiling-Jesus",
  "zuckerberg": "Zuckerberg",
  "askandy": "Afraid-To-Ask-Andy",
  // Add more templates as needed, paki-visit lang nitong website "https://apimeme.com"
};

module.exports.run = async ({ api, event, args }) => {
  try {
    if (!args[0]) {
      api.sendMessage("Kindly provide a meme type or use 'Memegenerator list' to see available templates!", event.threadID, event.messageID);
      return;
    }

    const memeType = args[0].toLowerCase();

    if (memeType === "list") {
      const templateList = Object.keys(memeTemplates).map((template) => `- ${template}`).join("\n");
      api.sendMessage(`📜 Available meme templates:\n\n${templateList}`, event.threadID, event.messageID);
      return;
    }

    if (!memeTemplates[memeType]) {
      api.sendMessage("Invalid meme type. Use 'Memegenerator list' to see available templates.", event.threadID, event.messageID);
      return;
    }

    const topText = encodeURIComponent(args[1] || "");
    const bottomText = encodeURIComponent(args[2] || "");

    const memeURL = `https://apimeme.com/meme?meme=${memeTemplates[memeType]}&top=${topText}&bottom=${bottomText}`;

    const memeImage = await axios.get(memeURL, { responseType: 'arraybuffer' });

    fs.writeFileSync('meme.jpg', Buffer.from(memeImage.data));

    api.sendMessage(
      {
        attachment: fs.createReadStream('meme.jpg'),
        body: `🎉 Here's your custom ${memeType} meme!`
      },
      event.threadID, event.messageID
    );

    fs.unlinkSync('meme.jpg');
  } catch (error) {
    console.error("Error generating meme:", error);
    api.sendMessage("Error generating meme. Try again with different text or type!", event.threadID, event.messageID);
  }
};