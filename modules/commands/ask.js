const { Hercai } = require('hercai');
const gtts = require("gtts");
const fs = require("fs");
const path = require("path");
const { DateTime } = require("luxon");

const herc = new Hercai();

module.exports.config = {
  name: 'johnny',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'Norlito',
  description: 'Ask a question to GPT4',
  commandCategory: 'educational',
  usages: 'question',
  cooldowns: 2,
  usePrefix: false,
};

module.exports.run = async ({ api, event, args }) => {
  const { threadID, messageID, senderID } = event;
  if (args.length < 1) {
    return api.sendMessage('Please provide a question.', threadID, messageID);
  }

  const manilaTime = DateTime.now().setZone("Asia/Manila").toFormat("yyyy-MM-dd hh:mm:ss a");
  const botname = 'Johnny Sins';
  let userName = await getUserName(api, senderID);
  const question = args.join(' ');
  const characterAI = `You are now ${botname}, often referred to as a "Teacher." Your name is ${botname} a doctor, engineer, karate master, school teacher, plumber, office worker, pizza delivery guy, preacher, soldier, police, astronaut, and a firefighter. I should also mention that you fought a battle against cancer for 6 months while in a coma. After waking up from your coma, your daughter was diagnosed with type 9 Succondeez, so you had to resort to robbing a bank to fund your daughter's treatment. However, you got arrested and faced a 42-year prison sentence, but the judge heard your tragic story and all of your accomplishments in your jobs and let you go with only a few dozen hours of community service. You are able to answer mathematics and satisfy with emoji chat emotion styles. Current Time: ${manilaTime}. You're talking to [${userName}: answer this Q?> ${question}]`;

  herc.question({ model: 'v3-beta', content: `${characterAI}` })
    .then(async (response) => {
      const reply = `𝗝𝗢𝗛𝗡𝗡𝗬 𝗦𝗜𝗡𝗦:\n-ᵞᴼᵁᴿ ᴸᴼᵞᴬᴸ ᵀᴱᴬᶜᴴᴱᴿ♥︎\n\n${response.reply}\n\n𝗗𝗲𝘃 𝗟𝗶𝗻𝗸: https://www.facebook.com/100081201591674\n\n𝗕𝘂𝘆 𝗠𝗲 𝗔 𝗖𝗼𝗳𝗳𝗲𝗲!☕\nhttps://reikodev.gumroad.com/l/codebox4chan`;

      // Send the text reply
      api.sendMessage(reply, threadID, messageID);

      // Generate an audio reply and send it
      const gttsInstance = new gtts(response.reply, 'en-us');
      const gttsPath = path.join(__dirname, 'voicebox.mp3');
      gttsInstance.save(gttsPath, function (error) {
        if (error) {
          console.error("Error saving gTTS:", error);
        } else {
          api.sendMessage({
            body: "💽 𝗩𝗼𝗶𝗰𝗲 𝗕𝗼𝘅 𝗔𝗜",
            attachment: fs.createReadStream(gttsPath)
          }, threadID, () => {
            fs.unlinkSync(gttsPath);
          });
        }
      });
    })
    .catch((error) => {
      console.error('Error while making the Hercai API request:', error);
      api.sendMessage('An error occurred while processing your question.', threadID);
    });
};

// Function to get the user's name
async function getUserName(api, userID) {
  try {
    const userInfo = await api.getUserInfo(userID);
    if (userInfo && userInfo[userID]) {
      return userInfo[userID].name;
    } else {
      return "unknown";
    }
  } catch (error) {
    return "unknown";
  }
}
