const axios = require('axios');

const tBold = {
    A: "𝗔", B: "𝗕", C: "𝗖", D: "𝗗", E: "𝗘", F: "𝗙", G: "𝗚", H: "𝗛", I: "𝗜",
    J: "𝗝", K: "𝗞", L: "𝗟", M: "𝗠", N: "𝗡", O: "𝗢", P: "𝗣", Q: "𝗤", R: "𝗥",
    S: "𝗦", T: "𝗧", U: "𝗨", V: "𝗩", W: "𝗪", X: "𝗫", Y: "𝗬", Z: "𝗭", a: "𝗔", b: "𝗕", c: "𝗖", d: "𝗗", e: "𝗘", f: "𝗙", g: "𝗚", h: "𝗛", i: "𝗜",
    j: "𝗝", k: "𝗞", l: "𝗟", m: "𝗠", n: "𝗡", o: "𝗢", p: "𝗣", q: "𝗤", r: "𝗥",
    s: "𝗦", t: "𝗧", u: "𝗨", v: "𝗩", w: "𝗪", x: "𝗫", y: "𝗬", z: "𝗭",
    " ": " "
};

const typewriter = {
    a: "𝚊", b: "𝚋", c: "𝚌", d: "𝚍", e: "𝚎", f: "𝚏", g: "𝚐", h: "𝚑", i: "𝚒",
    j: "𝚓", k: "𝚔", l: "𝚕", m: "𝚖", n: "𝚗", o: "𝚘", p: "𝚙", q: "𝚚", r: "𝚛",
    s: "𝚜", t: "𝚝", u: "𝚞", v: "𝚟", w: "𝚠", x: "𝚡", y: "𝚢", z: "𝚣",
    A: "𝙰", B: "𝙱", C: "𝙲", D: "𝙳", E: "𝙴", F: "𝙵", G: "𝙶", H: "𝙷", I: "𝙸",
    J: "𝙹", K: "𝙺", L: "𝙻", M: "𝙼", N: "𝙽", O: "𝙾", P: "𝙿", Q: "𝚀", R: "𝚁",
    S: "𝚂", T: "𝚃", U: "𝚄", V: "𝚅", W: "𝚆", X: "𝚇", Y: "𝚈", Z: "𝚉",
    " ": " "
};

module.exports.config = {
  name: 'verse',
  version: '1.0.0',
  credits: 'August Quinn',
  hasPermssion: 0,
  description: 'Get a random inspirational Bible verse.',
  commandCategory: 'fun',
  usePrefix: false,
  usages: '',
  cooldowns: 5,
};

module.exports.run = async function ({ api, event }) {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/Augustquinn/JSONify/main/verse.json');
    const verses = response.data.verses;

    if (verses.length === 0) {
      return api.sendMessage('An error occured. Try again later.', event.threadID, event.messageID);
    }

    const randomIndex = Math.floor(Math.random() * verses.length);
    const { text, reference } = verses[randomIndex];

    const formattedText = text.split('').map(char => typewriter[char] || char).join('');
    const formattedReference = reference.split('').map(char => tBold[char] || char).join('');

    const message = `📖 𝗕𝗜𝗕𝗟𝗘 𝗩𝗘𝗥𝗦𝗘 𝗙𝗥𝗢𝗠 ${formattedReference}\n\n  – ${formattedText}`;
    api.sendMessage(message, event.threadID, event.messageID);
  } catch (error) {
    console.error(error);
    api.sendMessage('An error occurred while fetching data.', event.threadID, event.messageID);
  }
};