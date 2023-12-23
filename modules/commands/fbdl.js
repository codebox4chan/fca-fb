const fs = require('fs-extra');
const axios = require('axios');

module.exports.config = {
  name: "fbdl",
  version: "1.0.",
  hasPermssion: 0,
  credits: "shiki",
  description: "Fb Vid Downloader",
  commandCategory: "tools",
  usePrefix: false,
  usages: "[video link]",
  cooldowns: 2,
};

module.exports.run = async function ({ api, event, args }) {
  let link = args.join(" ");

  if (!args[0]) {
    api.sendMessage("please put a valid fb video link", event.threadID, event.messageID);
    return;
  }
// don't chnage credits or I'll of apis
  api.sendMessage("downloading video, please wait...", event.threadID, event.messageID);

  try {
    let path = __dirname + `/cache/`;


    await fs.ensureDir(path);

    path += 'fbVID.mp4';

    const aa = await axios.get(`https://facebookdl.hayih59124.repl.co/facebook?url=${encodeURI(link)}`);


    const videoUrl = aa.data.result.sd_q; 

    const vid = (await axios.get(videoUrl, { responseType: "arraybuffer", })).data;

    fs.writeFileSync(path, Buffer.from(vid, 'utf-8'));

    api.sendMessage({
      body: `downloaded!!!`,
      attachment: fs.createReadStream(path) }, event.threadID, () => fs.unlinkSync(path), event.messageID);

  } catch (e) {
    api.sendMessage(`${e}`, event.threadID, event.messageID);
  };
};