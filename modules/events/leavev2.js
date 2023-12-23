module.exports.config = {
  name: "leavev2",
  eventType: ["log:unsubscribe"],
  version: "1.0.0",
  credits: "Kenlie",//kenneth pogi
  description: "pogi ko",
  dependencies: {
    "fs-extra": "",
    "path": "",
    "axios": ""
  }
};

module.exports.run = async function({ api, event, Users, Threads }) {
  const fs = require("fs");
  const axios = require("axios");

  if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;

  function reply(data) {
    api.sendMessage(data, event.threadID, event.messageID);
  }

  try {
    let { participantIDs } = await api.getThreadInfo(event.threadID);
    const type = (event.author == event.logMessageData.leftParticipantFbId) ? "left the group." : "kicked by Administrator";
    let name = (await api.getUserInfo(event.logMessageData.leftParticipantFbId))[event.logMessageData.leftParticipantFbId].name;

    const imageUrl = "https://i.imgur.com/FBbopjq.gif";

    const imageResponse = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const imageBuffer = Buffer.from(imageResponse.data, "binary");

    const imagePath = __dirname + "/cache/leave_image.gif";
    fs.writeFileSync(imagePath, imageBuffer);

    let msg = "Uy may umalis! Ge ganyan ka naman sanay ka na mang-iwan eh!\n\nName: {name}\nReason: {type}.\n\nIngat ka sa biyahe my genggeng!";

    msg = msg.replace(/\{name}/g, name).replace(/\{type}/g, type);

    reply({ body: msg, attachment: fs.createReadStream(imagePath) });
  } catch (err) {
    console.error("Error:", err);
  }
};