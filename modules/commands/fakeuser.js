const axios = require("axios");

module.exports.config = {
  name: "randomuser",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "August Quinn",
  description: "Get information about a random fake user",
  commandCategory: "info",
  usePrefix: true,
  usages: "",
  cooldowns: 5
};

const apiEndpoint = "https://randomuser.me/api/";

module.exports.run = async function({ api, event }) {
  try {
    const response = await axios.get(apiEndpoint);
    const user = response.data.results[0];

    const userInfo = `
𝗡𝗔𝗠𝗘: ${user.name.title} ${user.name.first} ${user.name.last}
𝗚𝗘𝗡𝗗𝗘𝗥: ${user.gender}
𝗟𝗢𝗖𝗔𝗧𝗜𝗢𝗡: ${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}, ${user.location.postcode}
𝗘𝗠𝗔𝗜𝗟: ${user.email}
𝗨𝗦𝗘𝗥𝗡𝗔𝗠𝗘: ${user.login.username}
𝗗𝗔𝗧𝗘 𝗢𝗙 𝗕𝗜𝗥𝗧𝗛: ${user.dob.date} (Age: ${user.dob.age})
𝗣𝗛𝗢𝗡𝗘: ${user.phone}
𝗖𝗘𝗟𝗟: ${user.cell}
𝗡𝗔𝗧𝗜𝗢𝗡𝗔𝗟𝗜𝗧𝗬: ${user.nat}
    `;

    api.sendMessage(userInfo, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage("An error occurred while fetching random user information. Please try again later.", event.threadID, event.messageID);
    console.error("RandomUser API Error:", error.message);
  }
};