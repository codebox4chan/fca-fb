module.exports.config = {
  name: "midoriya",
  version: "1.0.0",
  hasPermssion: 0,
  description: "Harold bot that can download facebook videos, sing, search image, search lyrics and more..",
  usePrefix: false,
  credits: "Deku and Modified by Jonell Magallanes(botpack)",
  usages: "[help]",
  commandCategory: "educational",
  cooldowns: 10,
};
const axios = require("axios"),
  fs = require("fs"),
  fbvid = __dirname+"/cache/fbvid.mp4",
  fbimg = __dirname+"/cache/fbimg.png",
  fbmp3 = __dirname+'/cache/fbmp3.mp3',
  audio = __dirname+"/cache/audio.mp3",
  tikvid = __dirname+"/cache/tikvid.mp4";
const getFBInfo = require("@xaviabot/fb-downloader");
const usetube = require('usetube');
const ytdl = require('ytdl-core');
const google = require("googlethis");
const cloudscraper = require("cloudscraper");
const cheerio = require("cheerio");
const request = require("request");
module.exports.run = async function ({ api, args, event }){
let txt = args[0] === "ai" ? args.slice(1).join(" ") : args.join(" ");
const { threadID, messageID, body } = event;
  const rand = ["Hi user if you don't know how to use me just type <harold help>","Hey There user I'm Harold Hutchins Bot how can I assist you today? 😊", "Hello there user can I sing for you? 🥰", "Hello There user did you know that I can sing, download facebook videos, search image and more...", "Hello There user I'm Harold Hutchins Bot Modified By Jonell Magallanes and the owner is Deku."];
  const rand1 = rand[Math.floor(Math.random() * rand.length)];
  if (txt.toLowerCase() == "help"){
    const message = `•——[HAROLD HUTCHINS BOT]——•
THESE ARE THE THINGS I CAN DO AS A BOT.

•HAROLD HUTCHINS CAN SING SONGS.

Just type <harold can you sing (title of song)> or <midoriya sing (title of song)> as long as there is the word sing and the title of the song, it can automatically detect it


•HAROLD CAN DOWNLOAD FACEBOOK VIDEOS.

Just type <harold can you download this facebook video (fb video url)> or <harold download this facebook video (fb video url)> as long as there is the word ‘facebook video’ or ‘download’ and the fb video url, it can automatically detect it.


•HAROLD CAN SEARCH IMAGES.

Just type <harold can you search an image of (your search)> or <harold image of (your search)> as long as there is the word ‘image’ or ‘image of’ and your search, it can automatically detect it.


•HAROLD CAN SEARCH VIDEO FROM YOUTUBE.

Just type <harold can you send a video of (your search)> or <harold video of (your search)> and more... as long as there's the word ‘video of’ and you search, it will automatically send a video

•HAROLD CAN TALK.

Just type <harold say (message)>.

•HAROLD CAN SEND A LYRICS.

Just type <harold can you give me the lyrics of (song name)> or <harold give me a lyrics of (song name)> as long as there's a word ‘lyrics of’ and the song name it will be automatically detected.

•HAROLD CAN DOWNLOAD TIKTOK VIDEOS USING LINK

Just type <harold can you download this tiktok link (and tiktok your link)> or <midoriya download this tiktok link (your tiktok link)>

•HAROLD CAN SEND A TIKTOK VIDEO

Just type <harold send the tiktok video of (your search)> or <harold send the tiktok video of (your search)> or <midoriya send a tiktok video of (your search)>

Do you have any questions? just contact the admin of bot type <(prefix)admin list> to view the list of admin.`;
    return api.sendMessage(message, event.threadID, event.messageID)
  }
if (!txt) return api.sendMessage(rand1, threadID, messageID);
 if (txt.toLowerCase().startsWith("thank you") || txt.toLowerCase().startsWith("thank")) return api.sendMessage("You're welcome user 🤗", threadID, messageID);
  if (txt.toLowerCase() == "hi" || txt.toLowerCase() == "hello" || txt.toLowerCase() == "hey" || txt.toLowerCase() == "yo" || txt.toLowerCase() == "hai") return api.sendMessage(rand1, threadID, messageID);
  if (txt.toLowerCase().includes("who created you") || txt.toLowerCase().includes("who's your master") || txt.toLowerCase().includes("who create you") || txt.toLowerCase().includes("who's your creator")) return api.sendMessage("I'm Harold Hutchins Modified by Jonell Magallanes and original this code by Deku.", event.threadID, event.messageID);
  if (txt.toLowerCase().includes("who is Jonell Magallanes") || txt.toLowerCase().includes("who is Jonell")) return api.sendMessage("My Bot Admin", threadID, messageID);
if (txt.startsWith("can you download this facebook video") || txt.includes("facebook video") || txt.includes("https://facebook.com") || txt.includes("https://www.facebook.com/") || txt.toLowerCase().includes("fb video")){
  api.sendMessage("Sure user give me a second to download the video 😊.", threadID, messageID);
  const regex = /https:\/\/www\.facebook\.com\/\S+/;
const match = txt.match(regex);
const url = match ? match[0] : null;
  if (!match) return api.sendMessage("Master please provide a valid URL", threadID, messageID)
  try {
  const result = await getFBInfo(url)
    //api.sendMessage(encodeURI(result.sd), threadID, messageID);
  let vid = (await axios.get(encodeURI(result.sd),{ responseType:'arraybuffer'} )).data;
  fs.writeFileSync(fbvid, Buffer.from(vid, "utf-8"));
  return api.sendMessage({body: "Here's your video user.", attachment: fs.createReadStream(fbvid)}, event.threadID, () => fs.unlinkSync(fbvid), event.messageID)
  } catch (e){
    return api.sendMessage("Oh I'm Sorry Unfortunately I can't download that video 😔", threadID, messageID)
    }
  }
if (txt.toLowerCase().startsWith("can you sing") || txt.toLowerCase().includes("sing") || txt.toLowerCase().startsWith("sing")){
  const path = `${__dirname}/cache/song.mp3`;
const regex = /sing\s(.+)/;
var msg = ""
const match = txt.match(regex);
const wordsAfterSing = match ? match[1].split(" ") : [];
for (let i of wordsAfterSing){
  msg += i+" "
}
  if (match){
  try {
      const random = Math.floor(Math.random() * 3) + 1;
  const rest = await usetube.searchVideo(msg);
var ok = rest.videos[random]
  const stream = ytdl("https://www.youtube.com/watch?v="+ok.id, { filter: 'audioonly' });
    api.sendMessage("Yep yep Sure just please wait...", event.threadID, event.messageID);
    const res = await axios.get('https://lyrist.vercel.app/api/'+msg);
const { lyrics, artist, title } = res.data;
stream.pipe(fs.createWriteStream(path)).on('finish', () => {
        api.sendMessage({body: `Here's your request user, sing with me!😊\n\nHere's the lyrics of ${title} by ${artist}\n\n${lyrics}`, attachment: fs.createReadStream(path)}, event.threadID, () => fs.unlinkSync(path), event.messageID);
      });
} catch (e){
    return api.sendMessage("Oh I'm Sorry  I think I forgot the lyrics 😅", event.threadID, event.messageID)
   } 
  }
}
if (txt.toLowerCase().startsWith("can you send a video of") || txt.toLowerCase().includes("send a video of") || txt.toLowerCase().startsWith("video of") || txt.toLowerCase().startsWith("can you send me a video of")){
const regex = /of\s(.+)/i;
var msg = " "
const match = txt.match(regex);
const wordsAfterSing = match ? match[1].split(" ") : [];
  if (match){
for (let i of wordsAfterSing){
  msg += i+" "
}
  try {
      const random = Math.floor(Math.random() * 3) + 1;
  const res = await usetube.searchVideo(msg);
var ok = res.videos[random]
  const stream = ytdl("https://www.youtube.com/watch?v="+ok.id, { filter: 'audioandvideo',
  quality: 'highestvideo',
  format: 'mp4', });
    api.sendMessage("Okay Noted User Just Please Wait 😘...", event.threadID, event.messageID);
      const path = `${__dirname}/cache/song.mp4`; stream.pipe(fs.createWriteStream(path)).on('finish', () => {
        api.sendMessage({body: "Here's your request! User the title of that video is ["+ok.title+"]\nEnjoy wathing 🥰", attachment: fs.createReadStream(path)}, event.threadID, () => fs.unlinkSync(path), event.messageID);
      });
} catch (e){
    return api.sendMessage("Sorry master sorry but I think I forgot the lyrics 😅", event.threadID, event.messageID)
    }
  }
} else if (txt.toLowerCase().startsWith("send an image of") || txt.toLowerCase().includes("image of") || txt.toLowerCase().startsWith("image")){
const regex = /of\s(.+)/;
var msg = ""
const match = txt.match(regex);
const wordsAfterSing = match ? match[1].split(" ") : [];
for (let i of wordsAfterSing){
  msg += i+" "
}
  if (match){
    api.sendMessage("Sure no problem just wait....", event.threadID, event.messageID)
  let result = await google.image(txt, {safe: false});
  if(result.length === 0) {
    api.sendMessage(`Oh I'm sorry but I can't find the image you want to search.`, event.threadID, event.messageID)
    return;
  }
  let streams = [];
  let counter = 0;
  console.log(result)
    for(let image of result) {
    // Only show 6 images
    if(counter >= 6)
      break;

    console.log(`${counter} : ${image.url}`);

    // Ignore urls that does not ends with .jpg or .png
    let url = image.url;
    if(!url.endsWith(".jpg") && !url.endsWith(".png"))
      continue;

   let path = __dirname + `/cache/search-image-${counter}.jpg`;
    let hasError = false;
    await cloudscraper.get({uri: url, encoding: null})
      .then((buffer) => fs.writeFileSync(path, buffer))
      .catch((error) => {
        console.log(error)
        hasError = true;
      });

    if(hasError)
      continue;

    console.log(`Pushed to streams : ${path}`) ;
    streams.push(fs.createReadStream(path).on("end", async () => {
      if(fs.existsSync(path)) {
        fs.unlink(path, (err) => {
          if(err) return console.log(err);

          console.log(`Deleted file : ${path}`);
        });
      }
    }));

    counter += 1;
  }

  api.sendMessage("Finding the image...", event.threadID, event.messageID)

  let msg = {
    body: `Hello There User here it is 🫡.`,
    attachment: streams
  };

  api.sendMessage(msg, event.threadID, event.messageID);
   }
} if (txt.toLowerCase().startsWith("say")){
  const phrase = txt.replace(/\bsay\b/, "");
  if (phrase){
    const vm = (await axios.get(`https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(phrase)}&tl=tl&client=tw-ob`, {
  responseType: "arraybuffer"
})
).data
fs.writeFileSync(audio, Buffer.from(vm, "utf-8"));
  return api.sendMessage({attachment: fs.createReadStream(audio)}, event.threadID, event.messageID)
 }
} 
if (txt.toLowerCase().startsWith("can you give me a lyrics of") || txt.toLowerCase().includes("lyrics of") || txt.toLowerCase().startsWith("lyrics") || txt.toLowerCase().includes("lyric")){
const regex = /of\s(.+)/;
const match = txt.match(regex);
  if (match){
    try {
const wordsAfterOf = match ? match[1] : " ";
    api.sendMessage("Yep Noted just please wait a second :) ...", threadID, messageID);
    const res = await axios.get('https://lyrist.vercel.app/api/'+wordAfterOf);
const { image, lyrics, artist, title } = res.data;
    let ly = __dirname+"/cache/lyrics.png";
    let ly1 = (await axios.get(image, {
    responseType: "arraybuffer"
  })).data;
  fs.writeFileSync(ly, Buffer.from(ly, "utf-8"));
    return api.sendMessage({body: `Here's your request User 😊\n\nLyrics of ${title} by ${artist}\n\n${lyrics}`, attachment: fs.createReadStream(ly)}, threadID, () => fs.unlinkSync(ly), messageID)
  } catch (e){
      console.log(e)
          return api.sendMessage("Can't find lyrics", threadID, messageID)
  }
  }
} 
  if(txt.toLowerCase().startsWith("can you download this tiktok link") || txt.toLowerCase().startsWith("download this tiktok link")){
const matchResult = txt.match(/link(.*)/);
    if (!matchResult) return api.sendMessage("Invalid syntax", threadID, messageID);

if (matchResult && matchResult.length > 1) {
const url = matchResult[1].trim();
   api.sendMessage("Okay Noted Just please wait...", threadID, messageID);
// console.log(textAfterTikTok);
  try {
    const rest = await axios.get("https://free-api.ainz-sama101.repl.co/tiktok/tiktokdl?link="+url);
    var vid = rest.data.wmplay
    var title = rest.data.title
      const re = (await axios.get(encodeURI(vid), {responseType: "arraybuffer"}));
      fs.writeFileSync(tikvid, Buffer.from(re, "utf-8"));
return api.sendMessage({body: "Here's your request user 😊\nTitle: "+title, attachment: fs.createReadStream(tikvid)}, threadID, messageID)
  } catch (tikerr){
 api.sendMessage("Sorry I cant :(", threadID, messageID);
    return api.sendMessage(tikerr.message, threadID)
  }
}
  }
  if (txt.toLowerCase().startsWith("can you send a tiktok video of") || txt.toLowerCase().startsWith("send a tiktok video of") || txt.toLowerCase().includes("tiktok video of")){
    const matchResult = txt.match(/of(.*)/);
    if (!matchResult) return api.sendMessage("Invalid syntax", threadID, messageID);

if (matchResult && matchResult.length > 1) {
const search = matchResult[1].trim();
   api.sendMessage("Yep noted just please wait...", threadID, messageID);
// console.log(textAfterTikTok);
  try {
    const rest = await axios.get(" https://free-api.ainz-sama101.repl.co/tiktok/tiksearch?q="+search)
    var vid = rest.data.play
    var title = rest.data.title
      const re = (await axios.get(encodeURI(vid), {responseType: "arraybuffer"})).data;
      fs.writeFileSync(tikvid, Buffer.from(re, "utf-8"));
return api.sendMessage({body: "Here's your request user 😊\nTitle: "+title, attachment: fs.createReadStream(tikvid)}, threadID, messageID)
  } catch (tikerr){
 api.sendMessage("Sorry I cant :(", threadID, messageID);
    return api.sendMessage(tikerr.message, threadID)
  }
}
  }
  if (txt.toLowerCase().startsWith("what is the meaning of") || txt.toLowerCase().startsWith("meaning of") || txt.toLowerCase().includes('meaning of')){
    var c = 0
    const match = txt.match(/of(.*)/)
    if (!match) return api.sendMessage("Invalid syntax", threadID, messageID);
    try {
      const wordsAfterOf = match ? match[1] : "";
    const response = await google.search('Meaning of '+wordsAfterOf);
var ok = ""
for (let i of response.dictionary.definitions){
  c += 1
ok += c+". "+i+"\n"
}

/*console.log(response.dictionary)
console.log(`Word: ${response.dictionary.word}\nDefinition: ${ok}`);*/
   return api.sendMessage(`📃𝚆𝙾𝚁𝙳: “${response.dictionary.word}”\n\n📄𝙳𝙴𝙵𝙸𝙽𝙸𝚃𝙸𝙾𝙽:\n\n${ok}`, threadID, messageID);
     api.sendMessage({attachment: fs.createReadStream(audio)}, threadID, () => fs.unlinkSync(audio), messageID)
  } catch (e){
      console.log(e.message)
      api.sendMessage("Oh I'm Sorry I can't find the meaning.", threadID)// of\s(.+)/;
  }
  }
 }