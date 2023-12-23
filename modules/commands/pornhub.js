module.exports.config = {
  name: "pornhub",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Spermlord",
  description: "pornhub.com videos",
  commandCategory: "nsfw",
  usePrefix: true,
  usages: "[boobs, cum, bj, feet, ass, sex, pussy, teen, bdsm, asian, pornstar, gay(?)]",
  cooldowns: 10,
};
 module.exports.run = function ({ api, event, args }) {
   try {
    const cheerio = require('cheerio');
    const ffmpeg = require("fluent-ffmpeg");
    const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
    ffmpeg.setFfmpegPath(ffmpegPath);
    var content = args.join(" ");
    var args = {
      'asian': "9057591",
      'ass': "2830292",
      'bdsm': "17510771",
      'bj': "3478991",
      'boobs': "15467902",
      'cum': "1036491",
      'feet': "852341",
      'gay': "19446301",
      'pornstar': "20404671",
      'pussy': "1940602",
      'sex': "2132332",
      'teen': "17887331"
    };
        const html = response.data;
        const $ = cheerio.load(html);
        var result = [];
        let list = $('ul.photosAlbumsListing li.photoAlbumListContainer div.photoAlbumListBlock');
        list.map(index => {
          let item = list.eq(index);
          if (!item.length) return;
          let photo = ${item.find('a').attr('href')};
          result.push(photo);
        });
        let getURL = "https://www.pornhub.com" + result[Math.floor(Math.random() * result.length)];
        axios.get(getURL).then((response) => {
          if (response.status == 200) {
            const html = response.data;
            const $ = cheerio.load(html);
            if (content == 'sex') {
              let video = $('video.centerImageVid');
              let mp4URL = video.find('source').attr('cache');
              let ext = mp4URL.substring(mp4URL.lastIndexOf('.') + 1);
              request(mp4URL).pipe(fs.createWriteStream(__dirname + /cache/porn.${ext})).on('close', () => {
                ffmpeg().input(__dirname + /cache/porn.${ext}).toFormat("gif").pipe(fs.createWriteStream(__dirname + "/cache/porn.gif")).on("close", () => {
                  return api.sendMessage({
                    attachment: fs.createReadStream(__dirname + /cache/porn.gif)
                  }, event.threadID, () => {
                    fs.unlinkSync(__dirname + /cache/porn.gif);
                    fs.unlinkSync(__dirname + /cache/porn.${ext});
                  }, event.messageID);
                });
              });
 } else {
              let image = $('div#photoWrapper');
              let imgURL = image.find('img').attr('cache');
              let ext = imgURL.substring(imgURL.lastIndexOf('.') + 1);
              return request(imgURL).pipe(fs.createWriteStream(__dirname + /cache/porn.${ext})).on('close', () => api.sendMessage({
                attachment: fs.createReadStream(__dirname + /cache/porn.${ext})
              }, event.threadID, () => fs.unlinkSync(__dirname + /cache/porn.${ext}), event.messageID));
            }
          }
        }, (error) => console.log(error));
      } return api.sendMessage("Error! Nagkaroon ng error. Pakisubukang muli sa ibang pagkakataon!", event.threadID, event.messageID);
    }, (error) => console.log(error);
  });
}