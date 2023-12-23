module.exports.config = {
    name: "img18",
    version: "0.0.1",
    hasPermssion: 0,
    credits: "reiko dev",
    description: "View all nsfw images on the bot",
    commandCategory: "nsfw",
    usePrefix: true,
    usages: "",
    cooldowns: 0
};

module.exports.onLoad = () => {
    const fs = require("fs-extra");
    const request = require("request");
    const dirMaterial = __dirname + `/noprefix/`;
    if (!fs.existsSync(dirMaterial + "noprefix")) fs.mkdirSync(dirMaterial, { recursive: true });
    if (!fs.existsSync(dirMaterial + "a0.gif")) request("https://i.imgur.com/EbyXbRt.gif").pipe(fs.createWriteStream(dirMaterial + "a0.gif"));
};

module.exports.run = async function ({ event, api, args, Users, Threads }) {
    const fs = require("fs");
    let name1 = await Users.getNameUser(event.senderID);
    var name = ["Sexy", "Russian girl", "Ganyu", "Twitter", "???", "Loli", "Blackpink", "Slap", "Wallpaper", "Boy", "Jack", "Nude", "Instagram", "Kiss", "Breasts", "Meme", "Hentai", "Girl", "Buttocks", "Cosplay", "Kurumi", "Arena of Valor", "Lucy", "Sagiri", "Chitanda", "Rem", "Anime", "Naughty", "Wibu", "Beo", "Ausand", "Shiba", "Khanh Huyen", "Ngoc Trinh", "Linh Ngoc Dam", "Jimmy", "Le Bong", "Sex", "Do Mixi", "Couple", "Streamer Hanna", "Nobra", "Sexy Girl", "Beautiful Girl", "Handsome Boy", "Background 4K", "Hot Anime", "Japanese Girl", "Chinese Girl", "Hololive", "Hot Twitter", "Hot Instagram", "VSBG Girl", "Phan Tran Anh Tam Image", "Sexual Images 18+", "Japan", "VSBG Hot"];
    var b = name.length;
    var page = 1;
    page = parseInt(args[0]) || 1;
    page = page < 1 ? 1 : page;
    var limit = 100;
    var numPage = Math.ceil(b / limit);
    var msg = `▭▭▭▭ [ IMG 𝟏𝟖+ ] ▭▭▭▭\n━━━━━━━━━━━━━━━━━━\n`;
    var x = 1;
    for (var i = limit * (page - 1); i < limit * (page - 1) + limit; i++) {
        if (i >= b) break;
        msg += `${x}. ${name[i]}\n`;
        x++;
    }
    msg += `━━━━━━━━━━━━━━━━━━\n${name1} ✦Reply with the corresponding number to view the image you want (18+ only).\nList of images to choose from (enter the number you want): 1 to ${b}`;
    return api.sendMessage({ body: msg, attachment: fs.createReadStream(__dirname + `/noprefix/a0.gif`) }, event.threadID, (error, info) => {
        global.client.handleReply.push({
            name: this.config.name,
            messageID: info.messageID,
            author: event.senderID,
            type: "choose"
        });
    }, event.messageID);
};

module.exports.handleReply = async function ({ event, api, args, handleReply, Users }) {
    const axios = require("axios");

    switch (handleReply.type) {
        case "choose": {
            let { author, messageID } = handleReply;
            if (event.senderID != author) return api.sendMessage("→ You can't choose for others :))", event.threadID, event.messageID);
            api.unsendMessage(messageID);
            const selectedOption = parseInt(event.body);
            var url = "";
            if (selectedOption === 1) {
                url = "https://TPKTAO.last-namename.repl.co/image/nude";
} else if (event.body == "2") {
  url = "https://TPKTAO.last-namename.repl.co/image/du";
} else if (event.body == "3") {
  url = "https://TPKTAO.last-namename.repl.co/image/mong";
} else if (event.body == "4") {
  url = "https://TPKTAO.trankhuong2022.repl.co/image/nude";
} else if (event.body == "5") {
  url = ""; // Replace this with the URL for option 5
} else if (event.body == "6") {
  url = "https://nino-api.mhieu14012008.repl.co/images/sex";
} else if (event.body == "7") {
  url = "https://nino-api.mhieu14012008.repl.co/images/sex";
} else if (event.body == "8") {
  url = "https://TPKTAO.last-namename.repl.co/image/cu";
} else if (event.body == "9") {
  url = "https://TPKTA.trankhuong2022.repl.co/image/saumui";
} else if (event.body == "10") {
  url = "https://TPKTAO.trankhuong2022.repl.co/image/mong";
} else if (event.body == "11") {
  url = "https://TPKTAO.trankhuong2022.repl.co/image/du";
} else if (event.body == "12") {
  url = "https://TPKTAO.trankhuong2022.repl.co/image/nude";
} else if (event.body == "13") {
  url = "https://TPKTAO.trankhuong2022.repl.co/image/cu";
} else if (event.body == "14") {
  url = "https://TPKTAO.trankhuong2022.repl.co/image/nuaodai";
} else if (event.body == "15") {
  url = "https://TPKTAO.trankhuong2022.repl.co/image/hocsinh";
} else if (event.body == "16") {
  url = "https://TPKTAO.trankhuong2022.repl.co/image/duaconcuatt";
} else if (event.body == "17") {
  url = "https://TPKTAO.trankhuong2022.repl.co/image/chitanda";
} else if (event.body == "18") {
  url = "https://TPKTAO.trankhuong2022.repl.co/image/nino";
} else if (event.body == "19") {
  url = "https://TPKTAO.trankhuong2022.repl.co/image/itsuki";
} else if (event.body == "20") {
  url = "https://TPKTAO.trankhuong2022.repl.co/image/loli";
} else if (event.body == "21") {
  url = "https://TPKTAO.trankhuong2022.repl.co/image/kana";
} else if (event.body == "22") {
  url = "https://TPKTAO.trankhuong2022.repl.co/image/taktopdestiny";
} else if (event.body == "23") {
  url = "https://TPKTA.trankhuong2022.repl.co/image/anya";
} else if (event.body == "24") {
  url = "https://TPKTAO.trankhuong2022.repl.co/image/mirai";
} else if (event.body == "25") {
  url = "https://TPKTAO.trankhuong2022.repl.co/image/violet";
} else if (event.body == "26") {
  url = "https://TPKTAO.trankhuong2022.repl.co/image/gura";
} else if (event.body == "27") {
  url = "https://Api-TaoTPk.trankhuong2022.repl.co/image/rem";
} else if (event.body == "28") {
  url = "https://TPKTA.trankhuong2022.repl.co/image/yuulzumi";
} else if (event.body == "29") {
  url = "https://TPKTAO.trankhuong2022.repl.co/image/micchonshikimori";
} else if (event.body == "30") {
  url = "https://TPKTAO.trankhuong2022.repl.co/image/phongcanh";
} else if (event.body == "31") {
  url = "https://TPKTAO.trankhuong2022.repl.co/image/vdgai";
} else if (event.body == "32") {
  url = "https://TPKTAO.trankhuong2022.repl.co/image/vdtrai";
} else if (event.body == "33") {
  url = "https://TPKTAO.trankhuong2022.repl.co/image/vdsex";
} else if (event.body == "34") {
  url = "https://TPKTAO.trankhuong2022.repl.co/image/vdmschil";
} else if (event.body == "35") {
  url = "https://TPKTAO.trankhuong2022.repl.co/image/vdanime";
} else if (event.body == "36") {
  url = "https://TPKTAO.trankhuong2022.repl.co/image/vdbautroi";
} else if (event.body == "37") {
  url = "https://TPKTAO.trankhuong2022.repl.co/image/vdnuaodai";
} else if (event.body == "38") {
  url = "https://TPKTAO.trankhuong2022.repl.co/image/vddoraemon";
} else if (event.body == "39") {
  url = "https://TPKTAO.trankhuong2022.repl.co/image/t";
}

            if (url !== "") {
                const res = await axios.get(url);
                const fs = require("fs");
                let name = await Users.getNameUser(event.senderID);
                const data = res.data.url;
                const download = (await axios.get(data, {
                    responseType: "stream"
                })).data;
                return api.sendMessage({ body: `▭▭▭▭ [ 𝐒𝐞𝐱 𝟏𝟖+ ] ▭▭▭▭\n Your choice (${name})\nHere's the image you requested`, attachment: download }, event.threadID);
            } else {
                return api.sendMessage("Invalid option or image URL not available.", event.threadID);
            }
        }
    }
};