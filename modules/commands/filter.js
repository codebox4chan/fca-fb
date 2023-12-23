module.exports.config = {
  name: "filter",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "NtKhang mod by: Spiritエーアイ",
  description: "E.g: When users send 'a', the BOT will reply 'b'. Add files, e.g: filter image + image link + file key",
  commandCategory: "admin",
  usePrefix: false,
  usages: "image/mp4/mp3/gif",
  cooldowns: 5
};

module.exports.handleEvent = ({ api, event, Users }) => {
  
const { existsSync } = require("fs-extra");
const fs = require("fs-extra");
const { body, messageID: m, threadID: t } = event, { sendMessage: n } = api;

const pathFilter = __dirname + "/cache/noprefix/filterNtKhang.json";

if (!body || !existsSync(pathFilter)) return;
const dataFilter = require(pathFilter);

for (let word of dataFilter) {
  if (body.toLowerCase().indexOf(word.key) != -1 && event.senderID != api.getCurrentUserID()) {
    let autorep = word.value[Math.floor(Math.random() * word.value.length)];
    return n({ body: autorep, attachment: fs.createReadStream(__dirname + `/noprefix/rep_${word.key}.mp4`) }, t, (error, info) => { 
      if (error) return n({ body: autorep, attachment: fs.createReadStream(__dirname + `/noprefix/rep_${word.key}.gif`) }, t, (error, info) => {
        if (error) return n({ body: autorep, attachment: fs.createReadStream(__dirname + `/noprefix/rep_${word.key}.png`) }, t, (error, info) => {
          if (error) return n({ body: autorep, attachment: fs.createReadStream(__dirname + `/noprefix/rep_${word.key}.mp3`) }, t, (error, info) => {
            if (error) return n(autorep, t, m);
          }, m);
        }, m);
      }, m);
    }, m);
  }
}
};

module.exports.run = async ({ api: a, event: e, args }) => {
  const { existsSync, writeFileSync } = require("fs-extra"), { threadID: t, messageID: m } = e, { sendMessage: n } = a;
  const fs = require("fs-extra");
  const request = require("request");
  const dirMaterial = __dirname + `/noprefix/`;

  if (!fs.existsSync(dirMaterial + "cache", "noprefix")) fs.mkdirSync(dirMaterial, { recursive: true });

  const pathFilter = __dirname + "/cache/noprefix/nam.json";
  if (!existsSync(pathFilter)) writeFileSync(pathFilter, "[]");
  const dataFilter = require(pathFilter);

  if (args[0] == "del") {
    const wordDelete = args.splice(1).join(" ");
    if (!wordDelete) return n("You haven't entered the word to delete", t, m); 
    const indexOfFilter = dataFilter.findIndex(item => item.value == wordDelete);
    dataFilter.splice(indexOfFilter, 1);
    n(`Deleted the filter word "${wordDelete}"`, t, m);
  }
  else if (args[0] == "image") {
    let texxt = args.splice(2).join(" ");
    if (!fs.existsSync(dirMaterial + `rep_${texxt}.png`)) request(args[1]).pipe(fs.createWriteStream(dirMaterial + `rep_${texxt}.png`));
    return n(`Added image file to keyword "${texxt}"`, t, m);
  }
  else if (args[0] == "gif") {
    let texxt = args.splice(2).join(" ");
    if (!fs.existsSync(dirMaterial + `rep_${texxt}.gif`)) request(args[1]).pipe(fs.createWriteStream(dirMaterial + `rep_${texxt}.gif`));
    return n(`Added gif file to keyword "${texxt}"`, t, m);
  }
  else if (args[0] == "mp4") {
    let texxt = args.splice(2).join(" ");
    if (!fs.existsSync(dirMaterial + `rep_${texxt}.mp4`)) request(args[1]).pipe(fs.createWriteStream(dirMaterial + `rep_${texxt}.mp4`));
    return n(`Added video file to keyword "${texxt}"`, t, m);
  }
  else if (args[0] == "mp3") {
    let texxt = args.splice(2).join(" ");
    if (!fs.existsSync(dirMaterial + `rep_${texxt}.mp3`)) request(args[1]).pipe(fs.createWriteStream(dirMaterial + `rep_${texxt}.mp3`));
    return n(`Added audio file to keyword "${texxt}"`, t, m);
  }
  else {
    if (!args[0] || !args.join(" ").includes("=>")) return global.utils.throwError("filter", t, m);
    const content = args.join(" ").split("=>");
    if (!content[0] || !content[1]) return global.utils.throwError("filter", t, m);
    const key = content[0].toLowerCase().trim();
    var value = content.slice(1).join("=>").split("|");
    value = value.map(item => item = item.trim());
    if (!dataFilter.some(item => item.key == key)) dataFilter.push({ key, value: [] });
    const data = dataFilter.find(item => item.key == key);
    data.value = [...data.value, ...value];
    const indexOfFilter = dataFilter.findIndex(item => item.value == value);
    dataFilter[indexOfFilter] = data;
    n(`Added keyword "${key}" with ${value.length > 1 ? "random" : ""} replies:\n- ${value.join("\n- ")}\nFile key: ${key}`, t, m);
  }

  writeFileSync(pathFilter, JSON.stringify(dataFilter, null, 2));
};
