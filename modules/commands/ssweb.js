const apikey = 'N08RNN0-J1BM84Y-GQ4ABGC-EH9BT7X';

module.exports.config = {
  name: "ssweb",
  version: "1.0.",
  hasPermssion: 2,
  credits: "James",
  description: "screenshot website",
  commandCategory: "admin",
  usages: "<vid/img> <url>",
  cooldowns: 5,
  usePrefix: false,
};

module.exports.run = async({ api, event, args }) => {
  const ax = require('axios');
  const f = require('fs-extra');
  const { threadID, messageID } = event;
  let url = args[1];
  if(!args[0] || !args[1]) {
   api.sendMessage(`wrong format\n\nexample: ${global.config.PREFIX}ssweb <vid or img> <url>\n${global.config.PREFIX}ssweb vid github(.)com`, threadID, messageID);
  }
else if(args[0] == 'vid') {
    const g1 = await ax.get(`https://shot.screenshotapi.net/screenshot?token=${apikey}&url=${url}&output=json&file_type=webm&wait_for_event=load&scrolling_screenshot=true`);
    let path = __dirname + `/cache/web.mp4`;
    const giff = (await ax.get(g1.data.screenshot, { responseType: "arraybuffer", })).data;
    
    f.writeFileSync(path, Buffer.from(giff, 'utf-8'));
    
    return api.sendMessage({
      body: "Success!!",
      attachment: f.createReadStream(path)
    }, threadID, () => f.unlinkSync(path), messageID);
    
  }
  else if(args[0] == "img") {
    const g2 = await ax.get(`https://shot.screenshotapi.net/screenshot?token=${apikey}&url=${url}`);
    let path2 = __dirname + `/cache/web.png`;
    const img = (await ax.get(g2.data.screenshot, { responseType: "arraybuffer", })).data;
    
    f.writeFileSync(path2, Buffer.from(img, 'utf-8'));
    
    return api.sendMessage({
      body: "Success!!",
      attachment: f.createReadStream(path2)
    }, threadID, () => f.unlinkSync(path2), messageID);
  }
};