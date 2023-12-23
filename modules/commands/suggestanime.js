const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

module.exports.config = {
  name: "anisauce",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Minn", // do not change please:(( ikaw nalang sana nagscrape/gumawa kung papalitan molang naman
  description: "Sends random anime/recommendation",
  usePrefix: false,
  commandCategory: "anime",
  usages: "",
  cooldowns: 3,
};

module.exports.run = async function ({ api, event }) {
  try {
    const getrandom = await axios.get('https://aniwatch.to/random');
    const html = getrandom.data;
    const $ = cheerio.load(html);
    const title = $('h2.film-name.dynamic-name').text();
    const description = $('.film-description.m-hide .text').text().trim();
    const aired = $('.item-title:contains("Aired:") .name').text();
    const premiered = $('.item-title:contains("Premiered:") .name').text();
    const duration = $('.item-title:contains("Duration:") .name').text();
    const status = $('.item-title:contains("Status:") .name').text();
    const malscore = $('.item-title:contains("MAL Score:") .name').text();
    const producers = $('.item-title:contains("Producers:") .name').text();
    const studios = $('.item-title:contains("Studios:") .name').text();
    const imgurl = $('.film-poster-img').attr('src');
    const getimg = await axios.get(imgurl, {responseType: 'arraybuffer'});
    const imgdata = Buffer.from(getimg.data);
    const watchlink = $('a.btn-play').attr('href');
    const baseurl = `https://aniwatch.to${watchlink}`;
    const imgpath = path.join(__dirname, `cache/anirecommend.${uuidv4()}.jpg`);
    fs.writeFileSync(imgpath, imgdata);
    const msg = `${title}\n${description}\n\nAired: ${aired}\nPremiered: ${premiered}\nDuration: ${duration}\nStatus: ${status}\nMAL Score: ${malscore}\nProducers: ${producers}\nStudios: ${studios}\n\nWatch and read more at ${baseurl}`;
    api.sendMessage({body:msg, attachment:fs.createReadStream(imgpath)}, event.threadID);
  } catch (error) {
    console.error(error);
    api.sendMessage('an error occurred.', event.threadID, event.messageID);
  }
};