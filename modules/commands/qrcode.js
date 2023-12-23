const axios = require('axios');
let prompt;
let content;
const dungkon = "0nl7KTPKnu9w2UWoTgYUioxOCcynml2193wcw47_Evf"; // You can contact the api endpoint owner for the token: https://www.facebook.com/nguyendinhtiendung.User

module.exports.config = {
  name: "qrcode",
  version: "1.0",
  credits: "Spiritエーアイ",
  hasPermssion: 0,
  description: "Encode text into a QR code using AI",
  commandCategory: "image",
  usePrefix: true,
  usages: "[text]",
  cooldowns: 5
};

module.exports.run = async function({ api, args, handleReply, event }) {
  const dk = "Mod converted by Spiritエーアイ";
  const { threadID, messageID, senderID } = event;

  if (args.join(' ').length < 1) {
    api.sendMessage('Please enter a prompt!', threadID, messageID);
    return;
  } else {
    prompt = args.join(' ');
  }

  api.sendMessage({
    body: 'Please reply with the content you want to convert to a QR code!'
  }, threadID, (err, info) => {
    global.client.handleReply.push({
      type: "choose",
      name: this.config.name,
      author: senderID,
      messageID: info.messageID,
      prompt: args.join(" ")
    });
  });
};

module.exports.handleReply = async function({ api, handleReply, event }) {
  const { messageID, author, prompt } = handleReply;
  if (event.senderID != author)
    return api.sendMessage('You must use this command yourself!', event.threadID, event.messageID);

  if (event.body) {
    api.unsendMessage(messageID);
    content = event.body;

    const url = 'https://studio-api.mojo.vn/service/api/art/generate';

    const headers = {
      'authority': 'studio-api.mojo.vn',
      'accept': '*/*',
      'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5,ru;q=0.4',
      'content-type': 'application/json',
      'origin': 'https://app.mojo.vn',
      'referer': 'https://app.mojo.vn/',
      'sec-ch-ua': '"Not:A-Brand";v="99", "Chromium";v="112"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': 'Linux',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
      'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
      'x-auth-token': `${dungkon}`
    };

    const data = {
      "prompt": handleReply.prompt,
      "ar": "1152:1152",
      "count": 1,
      "init_image": "",
      "image_strength": 0,
      "image_weight": 7,
      "negative_prompt": "",
      "style": "f",
      "seed": 0,
      "private": false,
      "device": "web",
      "qr": true,
      "qr_content": event.body,
      "qr_weight": 1.1,
      "high_quality": false,
      "shortlink": true,
      "community": true
    };

    const timeStart = Date.now();
    const dk = "Mod converted by Spiritエーアイ";
    const push = [];
    push.push(Date.now());
    const moment = require("moment-timezone");
    var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss || D/MM/YYYY");

    try {
      const response = await axios.post(url, data, { headers });
      const timeEnd = Date.now();
      //  console.log(response.data)
      //   if (response.data.success) {
      api.sendMessage({
        body: `Here is your QR code\nTime: ${gio}\n⏱️Processing time: ${Math.floor((Date.now() - push[0]) / 1000)} seconds\n${dk}`,
        attachment: (await axios.get(response.data.result[0], { responseType: "stream" })).data
      }, event.threadID);
      /* } else {
        api.sendMessagd('An error occurred', event.threadID, event.messageID);
      }*/
    } catch (err) {
      console.log(err);
      api.sendMessage('An error occurred', event.threadID, event.messageID);
    }
  }
};
