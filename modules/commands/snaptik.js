module.exports.config = {
  name: "snaptik",
  version: "1.0.0", 
  hasPermssion: 0,
  credits: "Prince Sanel and blue",
  description: "Tiktok Video downloader",
  usePrefix: false,
  commandCategory: "tools",
  usages: "[tiktoklink]",
  cooldowns: 1,
};

module.exports.run = async ({ api, event, args, Users }) => {
  const axios = require("axios");
  const request = require("request");
  const fs = require("fs");
  let link = args[0];
  if (!args[0])
    return api.sendMessage(
      "[!] Need a tiktok link to proceed.\nUse " +
        global.config.PREFIX +
        this.config.name +
        " [tiktok link]",
      event.threadID,
      event.messageID
    );

  // Fetch user data to get the user's name
  const senderInfo = await Users.getData(event.senderID);
  const senderName = senderInfo.name;

  // Send initial message
  api.sendMessage(
    `🕟 | 𝘋𝘰𝘸𝘯𝘭𝘰𝘢𝘥𝘪𝘯𝘨.... (Requested by ${senderName})`,
    event.threadID,
    event.messageID
  );

  axios.get(`https://mainapi.princemc166.repl.co/api/tiktokdown?link=${link}`)
    .then((res) => {
      let callback = function () {
        api.sendMessage(
          `Here's the Tiktok Video you want me to download, ${senderName}:`,
          event.threadID
        );

        api.sendMessage(
          {
            body: `Snaptik:\nYou can download it in chrome:\n Link: ${res.data.ssstik.url}\n Session: ${res.data.ssstik.session}\n\n Video info\nAuthor: ${res.data.ssstik.authorNickname}\nAuthorUniqueID: ${res.data.ssstik.authorUniqueId}\nVideoTitle: ${res.data.ssstik.videoTitle}\nPlayed by: ${res.data.ssstik.play}\nLiked by: ${res.data.ssstik.digg}\nDuration: ${res.data.ssstik.duration}\n\nTikwn:\n No Watermark Link: ${res.data.tikwn.nowm}\n With watermark link: ${res.data.tikwn.wm}\n Music link: ${res.data.tikwn.music}\n\nVideo Info\nSession: ${res.data.tikwn.session}\n\n Video info\nAuthor: ${res.data.tikwn.authorNickname}\nAuthorUniqueID: ${res.data.tikwn.authorUniqueId}\nVideoTitle: ${res.data.tikwn.videoTitle}\nPlayed by: ${res.data.tikwn.play}\nLiked by: ${res.data.tikwn.digg}\nDuration: ${res.data.tikwn.duration}\n\n> Without Watermark:`,
            attachment: fs.createReadStream(__dirname + `/cache/nowm.mp4`),
          },
          event.threadID,
          () => fs.unlinkSync(__dirname + `/cache/nowm.mp4`)
        );
      };
      request(res.data.tikwn.nowm)
        .pipe(fs.createWriteStream(__dirname + `/cache/nowm.mp4`))
        .on("close", callback);
    });
};

//Re edited by Blue😀