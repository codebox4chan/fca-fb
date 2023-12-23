const axios = require("axios");
const token = "YOUR_FACEBOOK_ACCESS_TOKEN"; // Thay YOUR_FACEBOOK_ACCESS_TOKEN bằng access token thật của bạn. Dạng EAAD6V7

module.exports.config = {
  name: "fbinfo",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "NLam182 (Zeid_Team)",
  description: "Xem thông tin của facebook qua uid",
  commandCategory: "info",
  usePrefix: true,
  usages: `[uid]`,
  cooldowns: 0
};

module.exports.run = async ({ api, event, args }) => {
  let { threadID, senderID, messageID } = event;
  let uid;
  if (!args[0]) {
    uid = event.senderID;
  } else {
    if (args[0].startsWith('https://')) {
      const link = args[0];
      try {
        const response = await axios.get(`https://api.zeidbot.site/timuid?link=${encodeURIComponent(link)}`);
        uid = response.data.id;
      } catch (error) {
        return api.sendMessage('Không thể lấy được UID từ liên kết.', threadID, messageID);
      }
    } else {
      uid = args[0];
    }
  }

  if (event.type === "message_reply") {
    uid = event.messageReply.senderID;
  }

  if (args.join().indexOf("@") !== -1) {
    uid = Object.keys(event.mentions)[0];
  }
  try {
    const apiUrl = `https://api.zeidbot.site/in4fb?token=${token}&uid=${uid}`;

   // const apiUrl = `https://api.zeidbot.site/in4fbv2?token=${token}&uid=${uid}`; //V2 sẽ có phần lấy tiểu sử fb nên sẽ mất nhiều thời gian hơn
    
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (data.error) {
      return api.sendMessage(data.error, event.threadID);
    } else {
      return api.sendMessage(`Thông tin của UID ${uid}:\n${JSON.stringify(data, null, 2)}`, event.threadID); //Lười làm quá, ai dùng thì về edit lại nhé =))
    }
  } catch (error) {
    console.error(error);
    return api.sendMessage("Đã xảy ra lỗi khi lấy thông tin của người dùng", event.threadID);
  }
};
