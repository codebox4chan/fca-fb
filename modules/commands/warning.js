const axios = require("axios");
const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");
const { DateTime } = require("luxon");
const manilaTime = DateTime.now().setZone("Asia/Manila").toFormat("yyyy-MM-dd hh:mm:ss a");

module.exports.config = {
  name: "warning",
  version: "1.0.1",
  hasPermssion: 3,
  credits: "August Quinn",//improvised strict badwords detection by reiko dev
  description: "Automatically bans users when certain sensitive keywords are detected in the message.",
  commandCategory: "operator",
  usePrefix: true,
  cooldowns: 15
};

module.exports.run = async ({ event, args, api }) => {
  if (args[0] === "unban") {
    const userID = args[1];

    if (userID) {
      if (global.data.userBanned.delete(userID)) {
        saveBannedUsers();
        api.sendMessage(`✅ User with ID (${userID}) has been unbanned successfully.`, event.threadID, event.messageID);
      } else {
        api.sendMessage(`User with ID (${userID}) is not banned.`, event.threadID, event.messageID);
      }
    } else {
      api.sendMessage("Please provide a user ID to unban.", event.threadID, event.messageID);
    }
  } else if (args[0] === "ban") { 
    const userID = args[1];

    if (userID) {
      if (!global.data.userBanned.has(userID)) {
        saveBannedUsers();
        api.sendMessage(`🚫 User with ID (${userID}) has been banned successfully.`, event.threadID, event.messageID);
      } else {
        api.sendMessage(`This User with ID (${userID}) is already banned⚠️`, event.threadID, event.messageID);
      }
    } else {
      api.sendMessage("Please provide a user ID to ban.", event.threadID, event.messageID);
    }
  }
};

module.exports.handleEvent = async ({ event, api }) => {
  const message = event.body.toLowerCase();
  const senderID = event.senderID;

  if (global.data.userBanned.has(senderID)) {
    return;
  }

  const sensitiveKeywords = ["bot pakyu", "pakyu bot", "fake bot", "bot gago", "bot gongong", "bot siraulo",
      "bot hakdog", "hampaslupa", "bobot", "bot boang", "bot bulok", "pakyu", "palamunin",
      "ukitnam", "biot", "bakla", "pangit ng bot", "bot landi", "bot nigga", "bot pakyu",
      "fuck", "bot landi mo", "nigga", "bulok", "bot biot", "bakla si bot", "landi ng bot",
      "t2nga", "fuck you", "bot bakla", "pasend bold", "send bold", "hubad na babae",
      "sarap puki", "big cock", "big dick", "bobo kang bot ka", "bugok", "bot amp", "chupa ka",
      "bot how to hack", "bading", "search pornhub", "search porn", "search porn pictures",
      "bot search porn pictures", "bot malandi", "bot gago", "bot gsgo", "chó", "bot baho",
      "bot tangina", "Landi ng bot", "Tangina mo bot", "Tanga naman ng bot nyo",
      "walang kang kwenta bot", "bobo", "bugok", "wala kang kwentang bot",
      "bot wala kang kwenta", "pin nudes", "bot pin nudes", "pin porn", "bot pin porn",
      "pin pussy", "bot pin pussy", "bot childporn", "imagesearch porn", "imagesearch fuck",
      "imagesearch nudes", "naked", "imagesearch childporn", "pakyu bot", "tanginang bot",
      "magpakamatay kana", "bot fuck you", "bot suck my dick", "fuck you bot",
      "suck my dick", "wala kang silbi bot", "bulok bot", "patay na si bot",
      "sira na bot mo", "patayin kita bot", "patayin ko owner mo bot", "sino owner mo",
      "kaninong bot yan", "pangit ng bot mo", "kick nyo si bot", "kick niyo",
      "stupid dumbass", "useless bot", "kick bot", "bot owner is pussy", "pussy",
      "how to murder", "i murder you", "kawawang bot", "bullshit", "stupid bot",
      "dumb bot", "fuck the owner", "search hentai images", "broken bot", "umalis kana bot",
      "leave kana bot", "bot leave kana", "nude girls", "show me porn pictures",
      "somebody kill this guy", "somebody kill this bot", "fuck you admin", "fuck you owner",
      "orochi better", "orochi", "go fuck yourself", "fuck yourself",
      "the one who made this bot is stupid", "arabo ako", "puki", "puday",
      "who ever made this bot must die", "can somebody kill this bot", "remove bot",
      "fuck this bot", "fuck me", "my bot is better than that", "i have another bot",
      "this bot is useless", "why are you not responding?", "bot useless", "🖕",
      "kill bot owner", `${global.config.BOTNAME} is useless`, `${global.config.BOTNAME} fuck you`, "latestporn", "hentaigasm",
      "nhentai.net", "beeg.com", "pornhub.com", "gay bot", "gayporn",
      "can somebody kick this bot", "owshit", "your black nigga", "fuck you filipinos",
      "we india strong", "fuck you philippines", "my bot is better", "bulok admin",
      "bulok owner", "fuck lgbt", "fucking gay", "why is the bot not responding",
      "can someone kick this bot", "how to make bot?", "how to create bot", "bot fuck yourself", "dagay.com", "junmar dilao", "junmar", "bubu", "vovo", "walang utak", "di na makatabang", "kick bot", "kick ai", "kick box", "report bot", "report hacker", "pota", "bahug bilat", "abno", "iremove ninyo", "remove ng bot", "remove na yawa", "dili makatabang ng ai", "di na makatabang ng ai", "di na makatabang ng bot", "dili na makatabang ng bot", "patya nang bot", "patya ng bot", "bayot", "dick", "cock", "pussy", "no bra", "nsfw", "cheater", "tite", "gilobot", "lobta ko", "lubta ko", "gilubot", "pahawa nang bot", "pahawaa nang bot", "pahawaa ng bot", "pahawa ng bot", "pahawa nang bot", "ai boang", "bolok", "bolok ning ai", "bulok ning ai","useless maning ai", "kontol", "anjing", "penge appstate", "pahiram appstate", "bot is gone", "what happen to bot?", "gag0", "sira amp", "maban ka sana", "ma ban ka sana", "hina ng bot mo", "hina ng bot mo", "bobong bisakol", "dakog otin", "otin", "big otin", "gamayg otin", "blowjob", "kingdom cum", "cute pussy", "cute poosy", "laki bilat", "haha walang tatay", "darkhumor", "how to hack", "paturo manghack", "paturo mang hack", "pano maghack", "pano manghack", "pa fork", "fork ako", "forker",         "your keyboard level has reached level", "Command not found", "The command you used", "Uy may lumipad", "Unsend this message", "system prefix", "Your box chat prefix", "ang iyong Kadaldalan ay nag level up to", "send gore", "live.gore", "darkweb", "tor browser", "ddos niyo", "pa ddos", "i'm pedo", "im pedo", "i'm child predator", "im child predator", "im childpredator", "i'm childpredator", "i love children", "i'm hacker", "hakir ako", "im hacker", "haha walang tatay", "rip sayo", "rip sayu", "nasunog?", "alien", "yogesh", "bot biyae ng owner nimo", "bot biyae ng amo nimo", "𝗧𝗵𝗲 𝗯𝗼𝘁 𝗶𝘀 𝘂𝗻𝗱𝗲𝗿 𝗱𝗲𝘃𝗲𝗹𝗼𝗽𝗺𝗲𝗻𝘁 𝗯𝘆", "THIS BOT IS UNDER DEVELOPMENT OF", "nakaw ko", "magnanakaw ako", "use ask", "bulok bot mo", "bolok bot mo", "tae bot mo", "kawawa bot", "pangit bot mo", "pangit ng bot mo", "Please type a message...", "Please Provide Your Question", "tirador ng bata", "🤓", "The command you used doesn't exist, is that", "‎has been kicked out.", "Uy may lumipad like a butter fly si idol", "Unable to re-add members", "❰ 𝗮𝗻𝘁𝗶𝗼𝘂𝘁❱", "bot died", "bot dead", "1 message removedcontent:", "has been re-added to the group", "『 Enjoy Your Stay And Make Lots Of Friends 』", "Automatically ban users if spam 10 times/120s", "Done turn on successful antiout!", "Done Turn off successful antiout!", "send fork", "let me fork", "can i fork", "fork replit", "replit fork", "adc token", "adc autofollow", "adc fbfollow", "faketoken", "❯Reason: » Kicked by Administrator. «", "bot is running", "Type .help to see command list.", "obob", "fatherless", "motherfucker", "mf!", "stfu!", "pano yung phishing", "penge gcash", "i kill myself", "pa adc redroom", "fork lang alam ko", "fork + bio", "luna", "saì", "feeling coder", "credit changer ako", "change ko credits", "change ko author", "mukhang tae", "mukang tae", "ban moko", "iban moko", "ban mo ako", "ban me", "bobo si kenneth"];

  for (const keyword of sensitiveKeywords) {
    if (message.includes(keyword)) {
      if (!global.data.userBanned.has(senderID)) {
        global.data.userBanned.set(senderID, Date.now());
        saveBannedUsers();
        api.sendTypingIndicator(event.threadID);

        try {
          const userInfo = await api.getUserInfo([senderID]);
          const userName = userInfo[senderID].name;
    
          const userAvatarUrl = `https://graph.facebook.com/${senderID}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
    
          const response = await axios.get(userAvatarUrl, { responseType: "arraybuffer" });
          fs.writeFileSync(__dirname + "/cache/avt.png", Buffer.from(response.data, "utf-8"));
    
          const img = await loadImage(__dirname + "/cache/avt.png");
          const canvas = createCanvas(img.width, img.height);
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
          ctx.font = "bold 100px Arial";
          ctx.fillStyle = "red";
          ctx.textAlign = "center";
          ctx.fillText("BANNED", canvas.width / 2, canvas.height / 2);
    
          const outputStream = fs.createWriteStream(__dirname + "/cache/banned_avt.png");
          canvas.createPNGStream().pipe(outputStream);
          outputStream.on("finish", () => {
            const banMessage = `⛔️ 𝗕𝗔𝗡𝗡𝗘𝗗!\n\n${userName}, you have been automatically banned for using inappropriate language or threatening other users or you might have been detected as a bot.\n\n  ⦿ 𝗨𝗦𝗘𝗥: ${userName}\n  ⦿ 𝗜𝗗: ${senderID}\n  ⦿ 𝗞𝗘𝗬𝗪𝗢𝗥𝗗: ${keyword}\n  ⦿ 𝗢𝗣𝗘𝗥𝗔𝗧𝗢𝗥: ${global.config.OWNERLINK}\n\n  ⦿ Message the Operator to request for unban\n\n${manilaTime}`;
            api.sendMessage({ body: banMessage, attachment: fs.createReadStream(__dirname + "/cache/banned_avt.png") }, event.threadID, event.messageID);
            // Pakilagay nalang ng Id mo sa baba
            const ownerID = global.config.OWNERID;
            const ownerMessage = `⚠️ ${userName} has been automatically banned for using inappropriate language or threatening other users or might have been detected as a bot.\n\n  ⦿ 𝗨𝗦𝗘𝗥 𝗜𝗗: ${senderID}\n  ⦿ 𝗞𝗘𝗬𝗪𝗢𝗥𝗗: ${keyword}\n  ⦿ 𝗙𝗕𝗟𝗜𝗡𝗞: https://www.facebook.com/${senderID}\n\n${manilaTime}`;
            api.sendMessage( { body: ownerMessage, attachment: fs.createReadStream(__dirname + "/cache/banned_avt.png") }, ownerID);
          });
        } catch (error) {
          console.error(error);
        }
      }

      break;
    }
  }
};

module.exports.listenGlobal = true;

function saveBannedUsers() {
  const bannedUsers = Array.from(global.data.userBanned.keys());
  fs.writeFileSync(__dirname + "/system/banned_users.json", JSON.stringify(bannedUsers));
}

function loadBannedUsers() {
  try {
    const bannedUsers = JSON.parse(fs.readFileSync(__dirname + "/system/banned_users.json"));
    bannedUsers.forEach(userID => global.data.userBanned.set(userID, Date.now()));
  } catch (error) {
    console.error("Error loading banned users:", error);
  }
}

loadBannedUsers();
  