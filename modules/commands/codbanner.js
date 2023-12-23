var hiro = "Atsushi Nakajima";
const axios = require("axios");
const request = require("request");
const fs = require("fs-extra");

module.exports.config = {
  name: "codbanner",
  version: "1.0.0",
  hasPermssion: 0,
  credits: `Atsushi Nakajima`, // Credits to Grey for the banner I just putted all of them
  description: "Generate codm Banner",
  usePrefix: true,
  commandCategory: "image",
  usages: "[text]",
  cooldowns: 2,
};
module.exports.run = async function ({ api, event, args, Users }) {
  let { messageID, senderID, threadID } = event;

  if (args.length === 1 && args[0] === "list") {
    const bannerTypes = [
      "1", "2", "3"];
    return api.sendMessage(`All types of banner:\n\n${bannerTypes.join(", ")}`, threadID, messageID);
  }

  if (args.length < 2) {
    return api.sendMessage(`Invalid command format! Use: !codbanner <codm type> <name>\nTo show all codbanner: -codbanner list`, threadID, messageID);
  }

  let type = args[0].toLowerCase();
  let name = args[1];
  let name2 = args.slice(2).join(" ");
  let pathImg = __dirname + `/cache/${type}_${name}.png`;
  let apiUrl, message;

  switch (type) {
    case "1":
      apiUrl = `https://canvastest.heckerman06.repl.co/burat?name=${name}`;
      message = "Call of duty banner created:";
      break;
    case "2":
      apiUrl = `https://canvastest.heckerman06.repl.co/burat1?name=${name}`;
      message = "Call of duty banner created:";
      break;
    case "3":
      apiUrl = `https://canvastest.heckerman06.repl.co/burat3?name=${name}`;
      message = "Call of duty banner created:";
      break;
     default:
      return api.sendMessage(`Wrong banner Use: -codbanner list to show all banners`, threadID, messageID);
  }
  api.sendMessage("Creating Banner...⏳", threadID, messageID);
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