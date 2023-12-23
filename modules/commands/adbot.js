module.exports.config = {
  name: "adbot",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "spiritエーアイ",
  description: "Add friends using bot",
  commandCategory: "info",
  usages: "",
  usePrefix: true,
  cooldowns: 4,
  dependencies: {
    "request": "",
    "fs": ""
  }
};

module.exports.run = async ({ api, event, args }) => {
  try {
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
    const threadSetting = global.data.threadData.get(parseInt(event.threadID)) || {};
    const prefix = threadSetting.hasOwnProperty("PREFIX") ? threadSetting.PREFIX : global.config.PREFIX;

    if (args.length == 0)
      return api.sendMessage(
        `You can use:\n\n${prefix}${this.config.name} user => it will take your own information.\n\n${prefix}${this.config.name} user @[Tag] => it will get friend information tag.\n\n${prefix}${this.config.name} box => it will get your box information (number of members, djt each other,...)\n\n${prefix}${this.config.name} user box [uid || tid.:\n\n${prefix}${this.config.name} admin => Admin Bot's Personal Information]`,
        event.threadID,
        event.messageID
      );

    if (args[0] == "box") {
      if (args[1]) {
        let threadInfo = await api.getThreadInfo(args[1]);
        let imgg = threadInfo.imageSrc;
        var gendernam = [];
        var gendernu = [];
        for (let z in threadInfo.userInfo) {
          var gioitinhone = threadInfo.userInfo[z].gender;
          if (gioitinhone == "MALE") {
            gendernam.push(gioitinhone);
          } else {
            gendernu.push(gioitinhone);
          }
        }
        var nam = gendernam.length;
        var nu = gendernu.length;
        let sex = threadInfo.approvalMode;
        var pd = sex == false ? "Turn off" : sex == true ? "turn on" : "NS";

        if (!imgg) {
          api.sendMessage(
            `Group name: ${threadInfo.threadName}\nTID: ${args[1]}\nApproved: ${pd}\nEmoji: ${threadInfo.emoji}\nInformation: \n»${threadInfo.participantIDs.length} members and ${threadInfo.adminIDs.length} administrators.\n»Including ${nam} boy and ${nu} female.\n»Total number of messages: ${threadInfo.messageCount}.`,
            event.threadID,
            event.messageID
          );
        } else {
          var callback = () =>
            api.sendMessage(
              {
                body: `Group name: ${threadInfo.threadName}\nTID: ${args[1]}\nApproved: ${pd}\nEmoji: ${threadInfo.emoji}\nInformation: \n»${threadInfo.participantIDs.length} members and ${threadInfo.adminIDs.length}administrators.\n»Including ${nam} boy and ${nu} female.\n»Total number of messages: ${threadInfo.messageCount}.`,
                attachment: fs.createReadStream(__dirname + "/cache/1.png")
              },
              event.threadID,
              () => fs.unlinkSync(__dirname + "/cache/1.png"),
              event.messageID
            );
          request(encodeURI(`${threadInfo.imageSrc}`)).pipe(fs.createWriteStream(__dirname + "/cache/1.png")).on("close", () => callback());
        }
        return;
      }

      let threadInfo = await api.getThreadInfo(event.threadID);
      let img = threadInfo.imageSrc;
      var gendernam = [];
      var gendernu = [];
      for (let z in threadInfo.userInfo) {
        var gioitinhone = threadInfo.userInfo[z].gender;
        if (gioitinhone == "MALE") {
          gendernam.push(gioitinhone);
        } else {
          gendernu.push(gioitinhone);
        }
      }
      var nam = gendernam.length;
      var nu = gendernu.length;
      let sex = threadInfo.approvalMode;
      var pd = sex == false ? "Turn off" : sex == true ? "turn on" : "NS";

      if (!img) {
        api.sendMessage(
          `Group name: ${threadInfo.threadName}\nTID: ${event.threadID}\nApproved: ${pd}\nEmoji: ${threadInfo.emoji}\nInformation: \n»${threadInfo.participantIDs.length} members and ${threadInfo.adminIDs.length} administrators.\n»Including ${nam} boy and ${nu} nữ.\n»Total number of messages: ${threadInfo.messageCount}.`,
          event.threadID,
          event.messageID
        );
      } else {
        var callback = () =>
          api.sendMessage(
            {
              body: `Group name: ${threadInfo.threadName}\nTID: ${event.threadID}\nBrowser: ${pd}\nEmoji: ${threadInfo.emoji}\nInformation: \n»${threadInfo.participantIDs.length} members and ${threadInfo.adminIDs.length} administrators.\n»Including ${nam} boy and ${nu} female.\n»Total number of messages: ${threadInfo.messageCount}.`,
              attachment: fs.createReadStream(__dirname + "/cache/1.png")
            },
            event.threadID,
            () => fs.unlinkSync(__dirname + "/cache/1.png"),
            event.messageID
          );
        request(encodeURI(`${threadInfo.imageSrc}`)).pipe(fs.createWriteStream(__dirname + "/cache/1.png")).on("close", () => callback());
      }
      return;
    }

    if (args[0] == "admin") {
      var callback = () =>
        api.sendMessage(
          {
            body: `———»•🄾🅆🄽🄴🅁 🄱🄾🅃•«———\n•FBlink: https://www.facebook.com/100081201591674\n❯ •Thank you for using my ${global.config.BOTNAME} bot!🫂`,
            attachment: fs.createReadStream(__dirname + "/cache/1.png")
          },
          event.threadID,
          () => fs.unlinkSync(__dirname + "/cache/1.png")
        );
      request(encodeURI(`https://graph.facebook.com/281120231271361/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(fs.createWriteStream(__dirname + "/cache/1.png")).on("close", () => callback());

      return;
    }

    if (args[0] == "user") {
      if (!args[1]) {
        let id;
        if (event.type == "message_reply") id = event.messageReply.senderID;
        else id = event.senderID;
        let data = await api.getUserInfo(id);
        let url = data[id].profileUrl;
        let b = data[id].isFriend == false ? "no!" : data[id].isFriend == true ? "Yes !" : "Damn";
        let sn = data[id].vanity;
        let name = await data[id].name;
        var sex = await data[id].gender;
        var gender = sex == 2 ? "Male" : sex == 1 ? "Female" : "Tran Duc Bo";
        var callback = () =>
          api.sendMessage(
            {
              body: `Name: ${name}` + `\nUser url: ${url}` + `\nUser name: ${sn}\nUID: ${id}\nGender: ${gender}\nfriends with bot: ${b}`,
              attachment: fs.createReadStream(__dirname + "/cache/1.png")
            },
            event.threadID,
            () => fs.unlinkSync(__dirname + "/cache/1.png"),
            event.messageID
          );
        request(encodeURI(`https://graph.facebook.com/${id}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`))
          .pipe(fs.createWriteStream(__dirname + "/cache/1.png"))
          .on("close", () => callback());
      } else {
        if (args.join().indexOf("@") !== -1) {
          var mentions = Object.keys(event.mentions);
          let data = await api.getUserInfo(mentions);
          let url = data[mentions].profileUrl;
          let b = data[mentions].isFriend == false ? "no!" : data[mentions].isFriend == true ? "yes!" : "fuckn Yes!";
          let sn = data[mentions].vanity;
          let name = await data[mentions].name;
          var sex = await data[mentions].gender;
          var gender = sex == 2 ? "Male" : sex == 1 ? "Female" : "Tran Duc Bo";
          var callback = () =>
            api.sendMessage(
              {
                body: `Name: ${name}` + `\nPersonal URL: ${url}` + `\n💦User name: ${sn}\nUID: ${mentions}\nSex: ${gender}\nfriends with bot?: ${b}`,
                attachment: fs.createReadStream(__dirname + "/cache/1.png")
              },
              event.threadID,
              () => fs.unlinkSync(__dirname + "/cache/1.png"),
              event.messageID
            );
          request(encodeURI(`https://graph.facebook.com/${mentions}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`))
            .pipe(fs.createWriteStream(__dirname + "/cache/1.png"))
            .on("close", () => callback());
        } else {
          let data = await api.getUserInfo(args[1]);
          let url = data[args[1]].profileUrl;
          let b = data[args[1]].isFriend == false ? "no!" : data[args[1]].isFriend == true ? "yes!" : "btw, yes!";
          let sn = data[args[1]].vanity;
          let name = await data[args[1]].name;
          var sex = await data[args[1]].gender;
          var gender = sex == 2 ? "Name" : sex == 1 ? "Female" : "Tran Duc Bo";
          var callback = () =>
            api.sendMessage(
              {
                body: `Name: ${name}` + `\nPersonal URL: ${url}` + `\nUser name: ${sn}\nUID: ${args[1]}\nGender: ${gender}\nfriends with bot?: ${b}`,
                attachment: fs.createReadStream(__dirname + "/cache/1.png")
              },
              event.threadID,
              () => fs.unlinkSync(__dirname + "/cache/1.png"),
              event.messageID
            );
          request(encodeURI(`https://graph.facebook.com/${args[1]}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`))
            .pipe(fs.createWriteStream(__dirname + "/cache/1.png"))
            .on("close", () => callback());
        }
      }
    }
  } catch (err) {
    console.error(err);
    // Handle the error here, such as sending an error message
  }
};
