const axios = require('axios');

const typewriterMapping = {
    a: "𝚊", b: "𝚋", c: "𝚌", d: "𝚍", e: "𝚎", f: "𝚏", g: "𝚐", h: "𝚑", i: "𝚒",
    j: "𝚓", k: "𝚔", l: "𝚕", m: "𝚖", n: "𝚗", o: "𝚘", p: "𝚙", q: "𝚚", r: "𝚛",
    s: "𝚜", t: "𝚝", u: "𝚞", v: "𝚟", w: "𝚠", x: "𝚡", y: "𝚢", z: "𝚣",
    A: "𝙰", B: "𝙱", C: "𝙲", D: "𝙳", E: "𝙴", F: "𝙵", G: "𝙶", H: "𝙷", I: "𝙸",
    J: "𝙹", K: "𝙺", L: "𝙻", M: "𝙼", N: "𝙽", O: "𝙾", P: "𝙿", Q: "𝚀", R: "𝚁",
    S: "𝚂", T: "𝚃", U: "𝚄", V: "𝚅", W: "𝚆", X: "𝚇", Y: "𝚈", Z: "𝚉",
    " ": " "
};

module.exports.config = {
    name: "aidan",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "August Quinn",
    description: "AIDAN - Artificial Intelligence Driven Dynamic Network",
    commandCategory: "educational",
    usePrefix: false,
    usages: "[prompt]",
    cooldowns: 5,
};

module.exports.run = async ({ api, event, args }) => {
    const prompt = args.join(" ");

    if (!prompt) {
        return api.sendMessage("𝙷𝚎𝚢, 𝚠𝚑𝚊𝚝'𝚜 𝚞𝚙 𝚑𝚞𝚖𝚊𝚗?", event.threadID, event.messageID);
    }

    try {
        const response = await axios.post('https://aidan.august-api.repl.co/prompt', { prompt });
        const responseData = response.data;

        const convertedText = responseData.openai.generated_text.split('').map(char => typewriterMapping[char] || char).join('');
        api.sendMessage(`${convertedText}`, event.threadID, event.messageID);
    } catch (error) {
        console.error('ERROR', error.response?.data || error.message);
        api.sendMessage('𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚙𝚛𝚘𝚌𝚎𝚜𝚜𝚒𝚗𝚐 𝚝𝚑𝚎 𝚛𝚎𝚜𝚙𝚘𝚗𝚜𝚎. 𝙿𝚕𝚎𝚊𝚜𝚎 𝚝𝚛𝚢 𝚊𝚐𝚊𝚒𝚗 𝚕𝚊𝚝𝚎𝚛.', event.threadID, event.messageID);
    }
};