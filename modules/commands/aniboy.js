module.exports.config = {
    name: "aniboy",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Spiritエーアイ",
    description: "random dp",
    commandCategory: "anime",
    usePrefix: false,
    usages: "",
    cooldowns: 5,
    dependencies: {
        "request": "",
        "fs-extra": "",
        "axios": ""
    }
};

module.exports.run = async ({ api, event, args, client, Users, Threads, __GLOBAL, Currencies }) => {
    const axios = global.nodemodule["axios"];
    const request = global.nodemodule["request"];
    const fs = global.nodemodule["fs-extra"];
    var ZiaRein = "Anime profile for you\nTag: anime boy";
    var ZiaReinImages = [
"https://i.imgur.com/x6Cc9n6.jpg",
"https://i.imgur.com/Jmb7V7h.jpg",
"https://i.imgur.com/5trZsRg.jpg",
"https://i.imgur.com/IzwQVwj.jpg",
"https://i.imgur.com/8AOyfUj.jpg",
"https://i.imgur.com/hJGZwyj.jpg",
"https://i.imgur.com/QU1MKQd.jpg",
"https://i.imgur.com/0frgNtL.jpg",
"https://i.imgur.com/6v29Hz8.jpg",
"https://i.imgur.com/RFwkQMI.jpg",
"https://i.imgur.com/5QnAGFH.jpg",
"https://i.imgur.com/G7SGPWI.jpg",
"https://i.imgur.com/NuEQzfl.jpg",
"https://i.imgur.com/zw53mfy.jpg",
"https://i.imgur.com/GjG1tBz.jpg",
"https://i.imgur.com/Mu8Y0vR.jpg",
"https://i.imgur.com/VxEFxz6.jpg",
"https://i.imgur.com/s8lysbe.jpg",
"https://i.imgur.com/UqDJlIu.png",
"https://i.imgur.com/PxiKaff.jpg",
"https://i.imgur.com/SpW8Eq0.jpg",
"https://i.imgur.com/vQ104Wa.jpg",
"https://i.imgur.com/S1vyler.jpg",
"https://i.imgur.com/UvHNwPB.jpg",
"https://i.imgur.com/DKUxCGa.jpg",
    ];

    var ZiaReinImage = ZiaReinImages[Math.floor(Math.random() * ZiaReinImages.length)];

    var ZiaRein2 = () => api.sendMessage({ body: ZiaRein, attachment: fs.createReadStream(__dirname + "/cache/ZiaRein1.jpg") }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/ZiaRein1.jpg"), event.messageID);

    return request(encodeURI(ZiaReinImage)).pipe(fs.createWriteStream(__dirname + "/cache/ZiaRein1.jpg")).on("close", () => ZiaRein2());
};
