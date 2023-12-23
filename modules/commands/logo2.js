var hiro = "Kim Joseph DG Bien, James Lim";
const axios = require("axios");
const request = require("request");
const fs = require("fs-extra");

module.exports.config = {
  name: "logov2",
  version: "1.0",
  hasPermssion: 0,
  credits: `${hiro}`, 
  description: "Logo maker Api credit: richard",
  commandCategory: "image",
  usePrefix: true,
  usages: "<type> <name>",
  cooldowns: 2,
};
//CREDITS CHARDS FOR THE API :)
module.exports.run = async function ({ api, event, args, Users }) {
  let { messageID, senderID, threadID } = event;
  if (args.length < 2) {
    return api.sendMessage(`Invalid command format! Use: logo <type> <name>\n\nLogo Type:\n\ntransformer\n\nflowerlogo\n\nharry\n\ngraffiti\n\norange\n\nmagma\n\nberry`, threadID, messageID);
  }
  let type = args[0].toLowerCase();
  let name = args.slice(1).join(" ");
  let pathImg = __dirname + `/cache/${type}_${name}.png`;
  let apiUrl, message;
  
  switch (type) {
    case "transformer":
      apiUrl = `https://chards-bot-api.richardretadao1.repl.co/api/textpro/transformer?text=${name}`;
      message = "[TRANSFORMER] Logo created:";
      break;
    case "flowerlogo":
      apiUrl = `https://chards-bot-api.richardretadao1.repl.co/api/photooxy/flower-typography?text=${name}`;
      message = "› Logo created:";
      break;
    case "harry":
      apiUrl = `https://chards-bot-api.richardretadao1.repl.co/api/photooxy/harry-potter?text=${name}`;
      message = "[HARRY POTTER] Logo created:";
      break;
    case "orange":
      apiUrl = `https://chards-bot-api.richardretadao1.repl.co/api/textpro/3d-orange-juice?text=${name}`;
      message = "[ORANGE] Logo Created:";
      break;
    
     case "berry":
        apiUrl = `https://chards-bot-api.richardretadao1.repl.co/api/textpro/berry?text=${name}`;
        message = "[BERRY] - Logo Created:";
       break;
       case "magma":
         apiUrl = `https://chards-bot-api.richardretadao1.repl.co/api/textpro/magma?text=${name}`;
         message = "[MAGMA] Logo Created:";
         break;
      case "graffiti":
      apiUrl = `https://chards-bot-api.richardretadao1.repl.co/api/textpro/graffiti1?text=${name}`;
      message = "[GRAFFITI] Logo created:";
      break;
    default:
      return api.sendMessage(`Invalid logo type!`, threadID, messageID);
  }

  api.sendMessage("Please wait...", threadID, messageID);
  let response = await axios.get(apiUrl, { responseType: "arraybuffer" });
  let logo = response.data;
  fs.writeFileSync(pathImg, Buffer.from(logo, "utf-8"));
  return api.sendMessage(
    {
      body: message,
      attachment: fs.createReadStream(pathImg),
    },
    threadID,
    () => fs.unlinkSync(pathImg),
    messageID
  );
};