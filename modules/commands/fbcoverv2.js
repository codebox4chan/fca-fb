module.exports.config = {
  name: "fbcoverv2",
  version: "1.0.",
  hasPermssion: 0,
  credits: "James Lim",///CREDITS CHARDS FOR THE API ԅ( ͒ ۝ ͒ )ᕤ
  description: "facebook cover/banner",
  commandCategory: "banner",
  usePrefix: false,
  usages: "name | birthday | relationship | location | hometown | followers | gender",
  cooldowns: 2,
};
module.exports.run = async ({ api, event, args }) => {
  const axios = require('axios');
  const fs = require('fs-extra');
  let { threadID, messageID, senderID } = event;
 let uid = event.senderID;
  let imgPath = __dirname + `/cache/coverfbv2.jpg`;
  const txt = args.join(" ").split("|").map(item => item = item.trim());
  let name = txt[0]
  let birthday = txt[1]
  let love = txt[2]
  let location = txt[3]
  let hometown = txt[4]
  let followers = txt[5]
  let gender = txt[6]
    
  if (!args[0]) { api.sendMessage(`𝗠𝗶𝘀𝘀𝗶𝗻𝗴 𝗶𝗻𝗽𝘂𝘁!!!\n\n𝙪𝙨𝙖𝙜𝙚: ${global.config.PREFIX}fbcoverv2 name | birthday | relationship | location | hometown | followers | gender`, threadID, messageID);
     return; 
  }
  api.sendMessage(`⏳ 𝗚𝗲𝗻𝗲𝗿𝗮𝘁𝗶𝗻𝗴, 𝗣𝗹𝗲𝗮𝘀𝗲 𝘄𝗮𝗶𝘁...\n\n𝗡𝗮𝗺𝗲: ${name}\n𝗕𝗶𝗿𝘁𝗵𝗱𝗮𝘆: ${birthday}\n𝗥𝗲𝗹𝗮𝘁𝗶𝗼𝗻𝘀𝗵𝗶𝗽: ${love}\n𝙇𝙤𝙘𝙖𝙩𝙞𝙤𝙣: ${location}\n𝙃𝙤𝙢𝙚𝙩𝙤𝙬𝙣: ${hometown}\n𝙁𝙤𝙡𝙡𝙤𝙬𝙚𝙧𝙨: ${followers}\n𝙂𝙚𝙣𝙙𝙚𝙧: ${gender}\n𝙐𝙄𝘿: ${uid}`, threadID, messageID);

try {
  const cover = (await axios.get(`https://chards-bot-api.richardretadao1.repl.co/api/canvas/fbcover3?name=${name}&birthday=${birthday}&love=${love}&location=${location}&hometown=${hometown}&follow=${followers}&gender=${gender}&uid=${uid}`, { responseType: "arraybuffer", })).data;
  
  fs.writeFileSync(imgPath, Buffer.from(cover, "utf-8"));

api.sendMessage({
  body: "𝗛𝗲𝗿𝗲'𝘀 𝘆𝗼𝘂𝗿 𝗳𝗯 𝗰𝗼𝘃𝗲𝗿 𝗽𝗵𝗼𝘁𝗼",
  attachment: fs.createReadStream(imgPath) }, threadID, () => fs.unlinkSync(imgPath), messageID);
    } catch (error) {
console.error("[ FBCOVERV2 ] ERROR!");
    api.sendMessage("𝗔𝗻 𝗲𝗿𝗿𝗼𝗿 𝗼𝗰𝗰𝘂𝗿𝗿𝗲𝗱 𝘄𝗵𝗶𝗹𝗲 𝗳𝗲𝘁𝗰𝗵𝗶𝗻𝗴 𝗙𝗕𝗖𝗢𝗩𝗘𝗥 𝗔𝗣𝗜", threadID, messageID);
  };
  };