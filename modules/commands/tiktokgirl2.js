module.exports.config = {
  name: "tiktokgirl2",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "kennnnn", //wag change credits, wag bobo.
  description: "tiktok girls in vietnam",
  commandCategory: "fun",
  usePrefix: false,
  usages: "",
  cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");

  axios.get('https://apivideo.saikidesu-support.repl.co/tiktok?apikey=opa').then(res => {
    var image = res.data.url;
    let count = res.data.count;
    let callback = function () {
      api.sendMessage({
        body: "Enjoy this shoti video!",
        attachment: fs.createReadStream(__dirname + `/cache/video.mp4`)
      }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/video.mp4`), event.messageID);
    };
    request(image).pipe(fs.createWriteStream(__dirname + `/cache/video.mp4`)).on("close", callback);
  });
}
