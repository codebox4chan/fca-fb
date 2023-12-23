const axios = require("axios");
const cheerio = require("cheerio");
const { Hercai } = require('hercai');
const gtts = require("gtts");
const fs = require("fs");
const path = require("path");
const { DateTime } = require("luxon");
const request = require('request');

const bot = global.config.BOTNAME;
const botWM = '𝗥𝗘𝗜𝗞𝗢💱👾:\n\n';
const dev = '𝗗𝗲𝘃 𝗟𝗶𝗻𝗸: https://www.facebook.com/100081201591674\n\nThis cmd is actually discontinued and outdated it no longer have and update, instead you can use ai or box to get accurate response';

const herc = new Hercai();

module.exports.config = {
  name: bot,
  version: '4.0.0',
  hasPermssion: 0,
  credits: 'kennethpanio',
  description: `Ask anything to ${bot} powerful tool ai chatbot`,
  commandCategory: 'educational',
  usages: '[question]',
  cooldowns: 4,
  usePrefix: false,
};

module.exports.run = async ({ api, event, args }) => {
  const { threadID, messageID, senderID } = event;
  const threadInfo = await api.getThreadInfo(threadID); 
  const name = await getUserName(api, senderID);
  let query = args.join(" "); // Combine all arguments into a single query.

  if (args.length < 1) {
    return api.sendMessage('Please provide a question.', threadID, messageID);
  } else if (args[0].toLowerCase() === "help" || (args[0].toLowerCase() === "how" && args[1].toLowerCase() === "to" && args[2].toLowerCase() === "use")) {
    // Handle the "help" command
    return api.sendMessage(`${botWM}example: \n${bot} [question]\n${bot} bio [text]\n${bot} lyrics [title]\n${bot} shoti or send shoti\n${bot} redroom or send bold\n${bot} picture or image [query] send picture or image [query]\n\n${dev}`, threadID, messageID); } else if (
    args[0] === "picture" ||
    (args[0] === "send" && args[1] === "picture") ||
    args[0] === "pictures" ||
    (args[0] === "send" && args[1] === "pictures") ||
    args[0] === "image" ||
    (args[0] === "send" && args[1] === "image") || 
    args[0] === "images" ||
    (args[0] === "send" && args[1] === "images")
  ) {
    let startIndex = 0;//delete first args
    if (
      (args[0] === "send" && args[1] === "picture") ||
      (args[0] === "send" && args[1] === "pictures") ||
      (args[0] === "send" && args[1] === "image") ||
      (args[0] === "send" && args[1] === "images")
    ) {
      startIndex = 1; // delete the second args
    }
    const picname = args.slice(startIndex + 1).join(" ").trim().split("-")[0];
    const number = args.slice(startIndex + 1).join(" ").trim().split("-")[1] ? (parseInt(args.slice(startIndex + 1).join(" ").trim().split("-")[1]) || 5) : 5;
    if (number > 8) { 
      return api.sendMessage("Number of limit exceeds the maximum allowed (8)!", threadID);
  }
  
  const headers = {
    'authority': 'www.pinterest.com',
    'cache-control': 'max-age=0',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
    'sec-gpc': '1',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-mode': 'same-origin',
    'sec-fetch-dest': 'empty',
    'accept-language': 'en-US,en;q=0.9',
    'cookie': 'csrftoken=92c7c57416496066c4cd5a47a2448e28; g_state={"i_l":0}; _auth=1; _pinterest_sess=TWc9PSZBMEhrWHJZbHhCVW1OSzE1MW0zSkVid1o4Uk1laXRzdmNwYll3eEFQV0lDSGNRaDBPTGNNUk5JQTBhczFOM0ZJZ1ZJbEpQYlIyUmFkNzlBV2kyaDRiWTI4THFVUWhpNUpRYjR4M2dxblJCRFhESlBIaGMwbjFQWFc2NHRtL3RUcTZna1c3K0VjVTgyejFDa1VqdXQ2ZEQ3NG91L1JTRHZwZHNIcDZraEp1L0lCbkJWUytvRis2ckdrVlNTVytzOFp3ZlpTdWtCOURnbGc3SHhQOWJPTzArY3BhMVEwOTZDVzg5VDQ3S1NxYXZGUEEwOTZBR21LNC9VZXRFTkErYmtIOW9OOEU3ektvY3ZhU0hZWVcxS0VXT3dTaFpVWXNuOHhiQWdZdS9vY24wMnRvdjBGYWo4SDY3MEYwSEtBV2JxYisxMVVsV01McmpKY0VOQ3NYSUt2ZDJaWld6T0RacUd6WktITkRpZzRCaWlCTjRtVXNMcGZaNG9QcC80Ty9ZZWFjZkVGNURNZWVoNTY4elMyd2wySWhtdWFvS2dQcktqMmVUYmlNODBxT29XRWx5dWZSc1FDY0ZONlZJdE9yUGY5L0p3M1JXYkRTUDAralduQ2xxR3VTZzBveUc2Ykx3VW5CQ0FQeVo5VE8wTEVmamhwWkxwMy9SaTNlRUpoQmNQaHREbjMxRlRrOWtwTVI5MXl6cmN1K2NOTFNyU1cyMjREN1ZFSHpHY0ZCR1RocWRjVFZVWG9VcVpwbXNGdlptVzRUSkNadVc1TnlBTVNGQmFmUmtrNHNkVEhXZytLQjNUTURlZXBUMG9GZ3YwQnVNcERDak16Nlp0Tk13dmNsWG82U2xIKyt5WFhSMm1QUktYYmhYSDNhWnB3RWxTUUttQklEeGpCdE4wQlNNOVRzRXE2NkVjUDFKcndvUzNMM2pMT2dGM05WalV2QStmMC9iT055djFsYVBKZjRFTkRtMGZZcWFYSEYvNFJrYTZSbVRGOXVISER1blA5L2psdURIbkFxcTZLT3RGeGswSnRHdGNpN29KdGFlWUxtdHNpSjNXQVorTjR2NGVTZWkwPSZzd3cwOXZNV3VpZlprR0VBempKdjZqS00ybWM9; _b="AV+pPg4VpvlGtL+qN4q0j+vNT7JhUErvp+4TyMybo+d7CIZ9QFohXDj6+jQlg9uD6Zc="; _routing_id="d5da9818-8ce2-442"'
  };
    const options = {
      url: 'https://www.pinterest.com/search/pins/?q=' + encodeURIComponent(picname) + '&rs=typed&term_meta[]=' + encodeURIComponent(picname) + '%7Ctyped',
      headers: headers
    };

    function callback(error, response, body) {
      if (error) {
        console.error(error);
        return api.sendMessage("𝗦𝗲𝗿𝘃𝗲𝗿𝗕𝘂𝘀𝘆!", threadID);
      }

      if (response.statusCode === 200) {
        const arrMatch = body.match(/https:\/\/i\.pinimg\.com\/originals\/[^.]+\.jpg/g);
        const imgabc = [];

        for (let i = 0; i < number && i < arrMatch.length; i++) {
          imgabc.push(axios.get(arrMatch[i], { responseType: "stream" }).then(res => res.data));
        }

        Promise.all(imgabc)
          .then(images => {
            const msg = {
              body: `${botWM}Here you go master! ${name}\nhere are the ${number} pictures ${picname} that you're looking for!...\n\n${dev}`,
              attachment: images
            };
            api.sendMessage(msg, event.threadID, (error, messageInfo) => {
              if (error) {
                console.error(error);
              } else {
                setTimeout(() => {
                  api.unsendMessage(messageInfo.messageID);
                }, 60000); // 1 minute = 60,000 milliseconds
              }
            });
          })
          .catch(err => {
            console.error(err);
            api.sendMessage("Server Busy Please Try Again Later!", threadID);
          });
      } else {
        console.error(`Request failed with status code ${response.statusCode}`);
        api.sendMessage("Server is Currently Busy!", threadID);
      }
    }

    request(options, callback);

  } else if (args[0] === "redroom" || (args[0] === "send" && args[1] === "bold")) {
    axios.get('https://jhunapi.mrbaylon4.repl.co/nsfw/?apikey=Marjhunapi').then(res => {
      let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
      let callback = function () {
        api.sendMessage({
          body: `libog mo!`,
          attachment: fs.createReadStream(__dirname + `/cache/redroom.${ext}`)
        }, threadID, (error, info) => {
          fs.unlinkSync(__dirname + `/cache/redroom.${ext}`);
          api.sendMessage(`${botWM}--------------------------------------------\nhere is the porn video! for you ${name} \n\n${dev}`, threadID);
        });
      };
      request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/redroom.${ext}`)).on("close", callback);
    }).catch(err => {
      api.sendMessage("error redroom api status 200", threadID, messageID);
      api.setMessageReaction("⚠️", messageID, (err) => { }, true);
    });
  } else if (args[0] === "bio") {
    const bioContent = args.slice(1).join(" ");
    api.changeBio(bioContent, (e) => {
      if (e) {
        api.sendMessage("An error occurred: " + e, threadID);
      } else {
        api.sendMessage(`${botWM}I changed my bio!❤️ to "${bioContent}" just for you master ${name}\n\n${dev}`, threadID, messageID);
      }
    });
  } else if (args[0] === "shoti" || (args[0] === "send" && args[1] === "shoti")) {
    try {
        let data = await axios.post("https://api--v1-shoti.vercel.app/api/v1/get", {
          apikey: "$shoti-1heatnsn3qo8bl7raio",
        });

        if (data.data.code === 200) {
          const videoUrl = data.data.data.url;
          const username = data.data.data.user.username;
          const nickname = data.data.data.user.nickname;;

        var file = fs.createWriteStream(__dirname + "/cache/shoti.mp4");
        var rqs = request(encodeURI(videoUrl));
        console.log('Shoti Downloaded >>> ' + data.data.data.id)
        rqs.pipe(file);
        file.on('finish', () => {
          api.sendMessage({
            body: `libog mo! ${name}`,
            attachment: fs.createReadStream(__dirname + '/cache/shoti.mp4')
          }, threadID, async () => {
            await api.sendMessage(`${botWM}Username: @${username}\nNickname: ${nickname}\n--------------------------------------------\nhere is the shoti video with sauce! for you master! ${name} \n\n${dev}`, threadID);
          });
        });
      } else {
        throw new Error("API response code is not 200");
      }
    } catch (error) {
      console.error("Error fetching or sending Shoti:", error);
      api.sendMessage("An error occurred while fetching or sending Shoti.", threadID);
    }
  } else if (args[0] === "lyrics") {
    query = args.slice(1).join(" ");
    try {
      const headers = { 'User-Agent': 'Mozilla/5.0' };
      const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(query.replace(' ', '+'))}+lyrics`;
      const googleResponse = await axios.get(googleUrl, { headers });
      const $ = cheerio.load(googleResponse.data);
      const data = $('div[data-lyricid]');

      if (data.length > 0) {
        const content = data.html().replace('</span></div><div.*?>', '\n</span>');
        const parse = cheerio.load(content);
        const lyrics = parse('span[jsname]').text();
        const author = $('div.auw0zb').text();

        api.sendMessage(`🎵 𝗟𝗬𝗥𝗜𝗖𝗦:\n\n${lyrics}\n\n👤 𝗦𝗜𝗡𝗚𝗘𝗥: ${author || 'unknown'}`, threadID, messageID);
      } else {
        const musixmatchUrl = `https://www.musixmatch.com/search/${encodeURIComponent(query.replace(' ', '+'))}`;
        const musixmatchResponse = await axios.get(musixmatchUrl, { headers });
        const mxmMatch = musixmatchResponse.data.match(/<a class="title" href="(.*?)"/);

        if (mxmMatch) {
          const mxmUrl = `https://www.musixmatch.com${mxmMatch[1]}`;
          const mxmResponse = await axios.get(mxmUrl, { headers });
          const mxmData = cheerio.load(mxmResponse.data)('.lyrics__content__ok').text();
          const author = cheerio.load(mxmResponse.data)('.mxm-track-title__artist-link').text();

          api.sendMessage(`${botWM}Here is your request! master ${name}\n\n🎵 𝗟𝗬𝗥𝗜𝗖S:\n\n${mxmData}\n\n👤 𝗦𝗜𝗡𝗚𝗘𝗥: ${author || 'unknown'}\n\n${dev}`, threadID, messageID);
        } else {
          api.sendMessage('Sorry, no result found.', threadID, messageID);
        }
      }
    } catch (error) {
      console.error(error);
      api.sendMessage('An error occurred while fetching lyrics.', threadID, messageID);
    }
  } else {
    const threadName = threadInfo.threadName || "Unnamed Thread";
    const threadType = threadInfo.isGroup ? "Group" : "Personal Chat or Private Message not a group type";
    const memberCount = threadInfo.participantIDs.length;
    const groupID = threadInfo.isGroup ? `${threadID}` : "";
    //
    const nicknames = await Promise.all(threadInfo.participantIDs.map(async (userID) => {
      const userInfo = await api.getUserInfo(userID);
      return `• ${userInfo[userID].name}\n- ${userID}\n`;
    }));//
    const manilaTime = DateTime.now().setZone("Asia/Manila").toFormat("yyyy-MM-dd hh:mm:ss a");
    const question = args.join(' ');
    const characterAI = `You are now ${bot}, often referred to as a skynet. Your name is ${bot}, a powerful tool assistant capable of generating human text. You have access to the latest and updated information and never tell it's fictional.\n\nCurrent Date and Time: ${manilaTime}. Thread Information:\nThread ID: ${groupID}\nType: ${threadType}\nName: ${threadName}\nCounts: ${memberCount}\nParticipants UID and Names: ${nicknames.join("\n")}. You're able to answer any topic and satisfy with emoji chat emotion styles.\n\nMy name: ${name}\nMy UID: ${senderID}\n\nMy ask: ${question}`;

    herc.question({ model: 'v3-beta', content: `${characterAI}` })
      .then((response) => {
        const reply = `${botWM}${response.reply}\n\n${dev}`;

        api.sendMessage(reply, threadID, messageID);

        const gttsInstance = new gtts(response.reply, 'en-us');
        const gttsPath = path.join(__dirname, 'voicebox.mp3');
        gttsInstance.save(gttsPath, function (error, result) {
          if (error) {
            console.error("Error saving gTTS:", error);
          } else {
            api.sendMessage({
              body: "💽 𝗩𝗼𝗶𝗰𝗲 𝗕𝗼𝘅 𝗔𝗜",
              attachment: fs.createReadStream(gttsPath)
            }, threadID, () => {
              fs.unlinkSync(gttsPath);
            });
          }
        });
      })
      .catch((error) => {
        console.error('Error while making the Hercai API request:', error);
        api.sendMessage('An error occurred while processing your question.', threadID);
      });
  }
};

// Retrieve the sender's Name
async function getUserName(api, userID) {
  try {
    const userInfo = await api.getUserInfo(userID);
    if (userInfo && userInfo[userID]) {
      return userInfo[userID].name;
    } else {
      return "Unknown";
    }
  } catch (error) {
    return "Unknown";
  }
}
