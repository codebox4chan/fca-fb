const axios = require('axios');
const moment = require("moment-timezone");
const fs = global.nodemodule["fs-extra"];
const request = global.nodemodule["request"];

module.exports.config = {
  name: "ids",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "Blue", // Special Thanks to Yukihira Soma aka Anjelo for the idea pero actually sya talaga gumawa crinedits lang sakin konte lang ambag ko dito
  description: "User and group id in one file",
  usePrefix: true,
  commandCategory: "info",
  usages: "(mention user)",
  cooldowns: 5,
  dependencies: '',
};

module.exports.run = async function ({ api, event }) {
  const tid = event.threadID;
  const uid = event.senderID;
  const userName = (await api.getUserInfo(uid))[uid].name;
  const userProfile = await api.getUserInfo(uid);
  const facebookLink = userProfile[uid].vanity || `https://www.facebook.com/${uid}`;
  const gio = moment.tz("Asia/Manila").format("HH:mm:ss || D/MM/YYYY");

  if (event.mentions && event.mentions.everyone && event.isGroup) {
    const allMembers = await api.getThreadInfo(tid);
    const memberInfo = allMembers.participantIDs.map((id) => {
      const memberName = allMembers.nicknames[id] || (allMembers.userInfo[id] ? allMembers.userInfo[id].name : "Unknown");
      const memberFBLink = allMembers.userInfo[id] && allMembers.userInfo[id].vanity ? `https://www.facebook.com/${allMembers.userInfo[id].vanity}` : `https://www.facebook.com/${id}`;
      return `${memberName} (uid: ${id})\nFacebook Uid: ${memberFBLink}`;
    });

    const message = `THIS AREA IS YOUR UID AND YOUR GROUP TID!\n\nThread ID (tid): ${tid}\nUser Name: ${userName}\nUser ID (uid): https://www.facebook.com/${uid}\nFacebook link: https://www.facebook.com/${facebookLink}\nFacebook Uid: ${uid}\n\nEVERYONE MENTIONED, HERE'S THE USER UID AND FBLINK\n\nMentioned Users:\n${memberInfo.join('\n')}`;
    return api.sendMessage(message, event.threadID);
  } else if (event.mentions && Object.keys(event.mentions).length > 0) {
    const mentionedUsers = Object.keys(event.mentions).map((id) => ({
      id,
      name: event.mentions[id],
    }));

    const message = `THIS AREA IS YOUR UID AND YOUR GROUP TID!\nThread ID (tid): ${tid}\nUser Name: ${userName}\nUser ID (uid): ${uid}\nFacebook link: https://www.facebook.com/${facebookLink}\nFacebook Uid: https://www.facebook.com/${uid}\n\nYOU MENTIONED THIS USER SO HERE'S THE USER UID AND FBLINK\n\nMentioned Users:\n`;
    const mentionedUsersInfo = mentionedUsers.map(
      async (user) => {
        const memberName = (await api.getUserInfo(user.id))[user.id].name;
        const memberFBLink = (await api.getUserInfo(user.id))[user.id].vanity || `https://www.facebook.com/${user.id}`;
        return `${memberName} (uid: ${user.id})\nFacebook Uid: ${memberFBLink}`;
      }
    );

    const infoList = await Promise.all(mentionedUsersInfo);
    return api.sendMessage(message + infoList.join('\n'), event.threadID);
  } else {
    const message = `┌────── •✧• ──────┐ WELCOME TO THREAD ID AND USER ID YOU CAN MENTION THE MEMBER THAT YOU WANT TO KNOW THERE UID.
 └────── •✧• ──────┘\n\n  ┌───── •✧• ─────┐\n            Thread ID (tid):\n        ${tid}\n└───── •✧• ─────┘\n  ┌───── •✧• ─────┐\n            User Name:\n       ${userName}\n└───── •✧• ─────┘\n┌───── •✧• ─────┐\n           User ID (uid):\n      ${uid}\n└───── •✧• ─────┘\nFacebook link: https://www.facebook.com/${facebookLink}\nFacebook Uid: https://www.facebook.com/${uid}\nTime (Asia/Manila):└───── •✧• ─────┘\n${gio}`;
    return api.sendMessage(message, event.threadID);
  }
};

