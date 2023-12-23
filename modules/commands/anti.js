module.exports.config = {
  name: "anti",
  version: "4.1.5",
  hasPermssion: 1,
  credits: "kennethpanio",
  description: "ANTI BOX",
  commandCategory: "admin",
  usePrefix: true,
  usages: "[enable/disable]",
  cooldowns: 0,
  dependencies: {
    "fs-extra": "",
  },
};

const {
  readdirSync,
  readFileSync,
  writeFileSync,
  existsSync,
  unlinkSync,
} = require("fs");
const axios = require('axios')

module.exports.handleReply = async function ({
  api,
  event,
  args,
  handleReply,
}) {
  const { senderID, threadID, messageID, messageReply } = event;
  const { author, permssion } = handleReply;
  
  const pathData = global.anti;
  const dataAnti = JSON.parse(readFileSync(pathData, "utf8"));

  if (author !== senderID) return api.sendMessage("You are not authorized to use this command!", threadID)

  var number = event.args.filter(i => !isNaN(i))
  for (const num of number){
    switch (num) {
      case "1": {
        //---> ADMIN ONLY CODE <---//
        if (permission < 1)
          return api.sendMessage(
            "You are not authorized to use this command!",
            threadID,
            messageID
          );
        var NameBox = dataAnti.boxname;
        const antiImage = NameBox.find(
          (item) => item.threadID === threadID
        );
        if (antiImage) {
          dataAnti.boxname = dataAnti.boxname.filter((item) => item.threadID !== threadID);
          api.sendMessage(
            "✅ Successfully turned off ANTI group name change",
            threadID,
            messageID
          );
        } else {
          var threadName = (await api.getThreadInfo(event.threadID)).threadName;
          dataAnti.boxname.push({
            threadID,
            name: threadName
          })
          api.sendMessage(
            "✅ Successfully turned on ANTI group name change",
            threadID,
            messageID
          );
        }
        writeFileSync(pathData, JSON.stringify(dataAnti, null, 4));
        break;
      }
      case "2": {
        if (permission < 1)
          return api.sendMessage(
            "You are not authorized to use this command!",
            threadID,
            messageID
          );
        const antiImage = dataAnti.boximage.find(
          (item) => item.threadID === threadID
        );
        if (antiImage) {
          dataAnti.boximage = dataAnti.boximage.filter((item) => item.threadID !== threadID);
          api.sendMessage(
            "✅ Successfully turned off ANTI group image change",
            threadID,
            messageID
          );
        } else {
          var threadInfo = await api.getThreadInfo(event.threadID);
          var options = {
            method: "POST",
            url: "https://api.imgur.com/3/image",
            headers: {
              Authorization: "Client-ID fc9369e9aea767c",
            },
            data: {
              image: threadInfo.imageSrc,
            },
          };
          const res = await axios(options);

          var data = res.data.data;
          var img = data.link;
          dataAnti.boximage.push({
            threadID,
            url: img,
          });
          api.sendMessage(
            "✅ Successfully turned on ANTI group image change",
            threadID,
            messageID
          );
        }
        writeFileSync(pathData, JSON.stringify(dataAnti, null, 4));
        break;
      }
      case "3": {
        if (permission < 1)
          return api.sendMessage(
            "You are not authorized to use this command!",
            threadID,
            messageID
          );
        const NickName = dataAnti.antiNickname.find(
          (item) => item.threadID === threadID
        );
        
        if (NickName) {
          dataAnti.antiNickname = dataAnti.antiNickname.filter((item) => item.threadID !== threadID);
          api.sendMessage(
            "✅ Successfully turned off ANTI nickname change",
            threadID,
            messageID
          );
        } else {
          const nickName = (await api.getThreadInfo(event.threadID)).nicknames
          dataAnti.antiNickname.push({
            threadID,
            data: nickName
          });
          api.sendMessage(
            "✅ Successfully turned on ANTI nickname change",
            threadID,
            messageID
          );
        }
        writeFileSync(pathData, JSON.stringify(dataAnti, null, 4));
        break;
      }
      case "4": {
        if (permission < 1)
          return api.sendMessage(
            "You are not authorized to use this command!",
            threadID,
            messageID
          );
        const antiout = dataAnti.antiout;
        if (antiout[threadID] == true) {
          antiout[threadID] = false;
          api.sendMessage(
            "✅ Successfully turned off ANTI group exit!",
            threadID,
            messageID
          );
        } else {
          antiout[threadID] = true;
          api.sendMessage(
            "✅ Successfully turned on ANTI group exit!",
            threadID,
            messageID
          );
        }
        writeFileSync(pathData, JSON.stringify(dataAnti, null, 4));
        break;
      } 
      case "5": {
          const database = require('./cache/data.json');
          const { adminbox } = database
          if (permission < 1)
            return api.sendMessage(
              "MODE - Border Permission ",
              threadID,
              messageID
            );
          if (adminbox[threadID] == true) {
            adminbox[threadID] = false;
            api.sendMessage(
              "MODE - Successfully turned off Administrator mode, all members can use the Bot",
              threadID,
              messageID
            );
          } else {
            adminbox[threadID] = true;
            api.sendMessage(
              "MODE - Successfully turned on Administrator mode, only Administrators can use the Bot",
              threadID,
              messageID
            );
          }
          writeFileSync(__dirname + '/cache/data.json', JSON.stringify(database, null, 4));
          break;
        }
        case "6": {
          //---> ADMIN ONLY CODE <---//
          if (permission < 1)
            return api.sendMessage("⚡️ nịt nek lấy ko", threadID, messageID);
          var dataI = {
              adminonly: {},
            };
          if (!existsSync(__dirname + '/cache/dataAd.json')) writeFileSync(__dirname + '/cache/dataAd.json', JSON.stringify(dataI,null,4));
          const database = require('./cache/dataAd.json');
          const { adminonly } = database
          if (adminonly[threadID] == true) {
            adminonly[threadID] = false;
            api.sendMessage(
              "✅ Successfully turned off Administrator-only mode ",
              threadID,
              messageID
            );
          } else {
            adminonly[threadID] = true;
            api.sendMessage(
              "✅ Successfully turned on Administrator-only mode",
              threadID,
              messageID
            );
          }
          writeFileSync(__dirname + '/cache/dataAd.json', JSON.stringify(database, null, 4));
          break;
        }
      case "7": {
        const antiImage = dataAnti.boximage.find(
          (item) => item.threadID === threadID
        );
        const antiBoxname = dataAnti.boxname.find(
          (item) => item.threadID === threadID
        );
        const antiNickname = dataAnti.antiNickname.find(
          (item) => item.threadID === threadID
        );
        const qtvOnly = require('./cache/data.json')
        const adminOnly = require('./cache/dataAd.json')
        return api.sendMessage(
          `---- CHECK ANTI ----\n↪ ANTI AVT BOX: ${
            antiImage ? "true" : "false"
          }\n↪ ANTI NAME BOX: ${antiBoxname ? "true" : "false"}\n↪ ANTI NICK NAME: ${antiNickname ? "true" : "false"}\n↪ ANTI OUT: ${dataAnti.antiout[threadID] ? "true" : "false"}\n↪ QTV ONLY: ${qtvOnly.adminbox[event.threadID] ? true : false}\n↪ ADMIN ONLY: ${adminOnly.adminonly[event.threadID] ? true : false}`,
          threadID
        );
        break;
      }

      default: {
        return api.sendMessage(
          `The number you selected is not in the anti list!`,
          threadID
        );
      }
    }
  }
};

module.exports.run = async ({ api, event, args, permssion, Threads }) => {
  const { threadID, messageID, senderID } = event;
  const threadSetting = (await Threads.getData(String(threadID))).data || {};
  const prefix = threadSetting.hasOwnProperty("PREFIX")
    ? threadSetting.PREFIX
    : global.config.PREFIX;

  return api.sendMessage(
        `==== 『Anti 』 ====
┏━━━━━━━━━━━━━┓\n┣➤1.Anti namebox : Disable group name change\n┣➤2.Anti avtbox : Disable group image change\n┣➤3.Anti name : Disable nickname change\n┣➤4.Anti out: Disable group exit\n5 qtv only \n6 admin only\n┣➤7. check: Check group's anti settings\n┗━━━━━━━━━━━━━┛`,
        threadID, (error, info) => {
            if (error) {
              return api.sendMessage("An error occurred!", threadID);
            } else {
              global.client.handleReply.push({
                name: this.config.name,
                messageID: info.messageID,
                author: senderID,
                permssion
              });
            }
          });
};
  