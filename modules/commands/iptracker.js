const axios = require("axios");

module.exports.config = {
  name: "iptracker",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "Arjhil",
  description: "Check IP information",
  commandCategory: "info",
  usages: "[ip_address]",
  usePrefix: true,
  cooldowns: 5,
  dependencies: "",
};

const adminName = "Kenneth Panio"; // Replace with your admin's name
const adminUID = "100081201591674"; // Replace with your admin's UID
const adminLink = "https://www.facebook.com/photo.php?fbid=299968956053155&set=a.111742334875819&type=3&app=fbl"; // Replace with your admin's profile link

module.exports.run = async function ({ api, args, event, __GLOBAL }) {
  const axios = require("axios");

  // Check if an IP address is provided
  if (!args[0]) {
    return api.sendMessage("Please enter an IP address to check.", event.threadID, event.messageID);
  }

  const ipAddress = args[0];

  try {
    const response = await axios.get(`http://ip-api.com/json/${ipAddress}?fields=66846719`);
    const infoip = response.data;

    if (infoip.status === "fail") {
      return api.sendMessage(`Error! An error occurred. Please try again later: ${infoip.message}`, event.threadID, event.messageID);
    }

    const geolocationInfo = `Internet Protocol Adress Information:\n
🌍 Location: ${infoip.city}, ${infoip.regionName}, ${infoip.country}
🌐 Continent: ${infoip.continent}
🏁 Country Code: ${infoip.countryCode}
🌆 Region/State: ${infoip.regionName}
🏙️ City: ${infoip.city}
🌏 District: ${infoip.district}
📮 ZIP code: ${infoip.zip}
🌐 Latitude: ${infoip.lat}
🌐 Longitude: ${infoip.lon}
⏰ Timezone: ${infoip.timezone}
🏢 Organization: ${infoip.org}
💰 Currency: ${infoip.currency}

Admin Information:
👤 Admin Name: ${adminName}
🆔 Admin UID: ${adminUID}
🔗 Admin Profile: ${adminLink}

Location Map:
🗺️ [View on Map](https://www.google.com/maps?q=${infoip.lat},${infoip.lon})
`;

    return api.sendMessage(geolocationInfo, event.threadID, event.messageID);
  } catch (error) {
    console.error(error);
    return api.sendMessage("An error occurred while processing the request.", event.threadID, event.messageID);
  }
};