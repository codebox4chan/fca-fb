const fs = require("fs");
const axios = require("axios");

module.exports.config = {
    name: "genimg",
    version: "2.8.1",
    hasPermssion: 0,
    credits: "Hazeyy",
    description: "( 𝙂𝙚𝙣-𝙄𝙢𝙖𝙜𝙚 𝙛𝙧𝙤𝙢 𝙄𝙣𝙜𝙖𝙡 )",
    commandCategory: "no prefix",
    usage: "( [ Prompt ] > [ Model ] )",
    usePrefix: false,
    cooldown: 5,
};

module.exports.handleEvent = async function ({ api, event }) {
    if (!(event.body.indexOf("genimg") === 0 || event.body.indexOf("Genimg") === 0)) return;
    const args = event.body.split(/\s+/);
    args.shift();

    let path = __dirname + "/cache/image.png";
    const tzt = args.join(" ").split(">").map(item => item.trim());
    let txt = tzt[0];
    let txt2 = tzt[1];

    let tid = event.threadID;
    let mid = event.messageID;

    if (!args[0] || !txt || !txt2) return api.sendMessage("🔴 𝖨𝗇𝗏𝖺𝗅𝗂𝖽 𝖼𝗈𝗆𝗆𝖺𝗇𝖽, 𝖯𝗅𝖾𝖺𝗌𝖾 𝗎𝗌𝖾 [ 𝖯𝗋𝗈𝗆𝗉𝗍 ] > [ 𝖬𝗈𝖽𝖾𝗅 ] 𝖢𝗁𝗈𝗈𝗌𝖾 (1-45)", tid, mid);

    try {
        api.sendMessage("🕣 | 𝘎𝘦𝘯𝘦𝘳𝘢𝘵𝘪𝘯𝘨...", tid, mid);

        let enctxt = encodeURI(txt);
        let url = `https://hazeyy-ingal-api.kyrinwu.repl.co/ingal/api?prompt=${enctxt}&model=${txt2}`;

        const response = await axios.get(url, { responseType: "arraybuffer" });
        
        if (response.status === 200) {
            fs.writeFileSync(path, Buffer.from(response.data, "utf-8"));
            api.sendMessage({ attachment: fs.createReadStream(path) }, tid, () => fs.unlinkSync(path), mid);
        } else {
            api.sendMessage("🔴 𝗜𝗺𝗮𝗴𝗲 𝗚𝗲𝗻𝗲𝗿𝗮𝘁𝗶𝗼𝗻 𝗙𝗮𝗶𝗹𝗲𝗱.", tid, mid);
        }
    } catch (e) {
        return api.sendMessage("🔴 𝗘𝗿𝗿𝗼𝗿 𝗶𝗻 𝗜𝗺𝗮𝗴𝗲 𝗚𝗲𝗻𝗲𝗿𝗮𝘁𝗶𝗼𝗻.", tid, mid);
    }
};

module.exports.run = async function({api, event}) {};