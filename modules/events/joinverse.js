const axios = require("axios");
const { createCanvas, loadImage, registerFont } = require("canvas");
const fs = require("fs-extra");
const path = require("path");
const jimp = require("jimp");

let backgrounds = [
  "https://i.imgur.com/IEyYKzn.jpeg",
  "https://i.imgur.com/En3e5AJ.jpg",
  "https://i.imgur.com/iGSJ1SK.jpg",
  "https://i.imgur.com/7UiYEWh.jpg",
  "https://i.imgur.com/QtbGfTV.jpg",
  "https://i.ibb.co/6mr4bDj/images-12.jpg",
  "https://i.ibb.co/3rgBH19/images-11.jpg",
  "https://i.ibb.co/tps3TBD/images-8.jpg"
];

module.exports.config = {
  name: "biblejoin",
  eventType: ["log:subscribe"],
  version: "1.0.0",
  credits: "Blue",//credits  api and image owner
  description: "Welcomes new users with a Bible verse with  an image.",
  dependencies: {
    "fs-extra": "",
    "path": ""
  }
};

module.exports.run = async function ({ api, event, Users, Threads }) {
  const joinedParticipantFbId = event.logMessageData.addedParticipants[0].userFbId;
  const name = global.data.userName.get(joinedParticipantFbId) || (await Users.getNameUser(joinedParticipantFbId)).replace(/\s+/g, ''); // Remove spaces from name
  const randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];
  const randomVerse = await getBibleVerse();

  let fontPath = path.join(__dirname, "cache", "font.ttf");
  let font = (await axios.get("https://drive.google.com/u/0/uc?id=1ZwFqYB-x6S9MjPfYm3t3SP1joohGl4iw&export=download", { responseType: "arraybuffer" })).data;
  fs.writeFileSync(fontPath, font);
  registerFont(fontPath, { family: "CustomFont" });

  let background = await loadImage(randomBackground);

  const canvas = createCanvas(1280, 720);
  const ctx = canvas.getContext("2d");

  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.font = "40px CustomFont";
  ctx.fillStyle = "#FFF";
  ctx.textAlign = "center";

  // Wrap  verse text 
  const MAX_WIDTH = 1000;
  const lineHeight = 50;
  const words = randomVerse.split(" ");
  let line = "";
  let lines = [];
  for (let word of words) {
    let testLine = line + word + " ";
    let testWidth = ctx.measureText(testLine).width;
    if (testWidth > MAX_WIDTH) {
      lines.push(line);
      line = word + " ";
    } else {
      line = testLine;
    }
  }
  lines.push(line);

  let verseY = canvas.height / 2 - lines.length * lineHeight / 2;
  for (let line of lines) {
    ctx.fillText(line, canvas.width / 2, verseY);
    verseY += lineHeight;
  }

  let finalImage = canvas.toBuffer();
  fs.writeFileSync(path.join(__dirname, "cache", "biblejoin.png"), finalImage);

  const formPush = {
    body: `📖 Welcome, ${name}! Here's a Bible verse for you: ${randomVerse}`,
    attachment: fs.createReadStream(path.join(__dirname, "cache", "biblejoin.png"))
  };

  return api.sendMessage(formPush, event.threadID);
};

async function getBibleVerse() {
  try {
    const response = await axios.get("https://labs.bible.org/api/?passage=random&type=json");
    return response.data[0].text;
  } catch (error) {
    console.error("Error fetching Bible verse:", error);
    return "For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope. - Jeremiah 29:11";
  }
}