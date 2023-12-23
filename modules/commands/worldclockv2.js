module.exports.config = {
    name: "worldclockv2",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "August Quinn",
    description: "Get current date and time in several countries",
    commandCategory: "info",
    usePrefix: true,
    usages: "",
    cooldowns: 5,
};

const moment = require("moment-timezone");

module.exports.run = async function({ api, event }) {
    const countries = [
    { name: "Manila 🇵🇭", timezone: "Asia/Manila" },
    { name: "New York 🇺🇸", timezone: "America/New_York" },
    { name: "London 🇬🇧", timezone: "Europe/London" },
    { name: "Tokyo 🇯🇵", timezone: "Asia/Tokyo" },
    { name: "Sydney 🇦🇺", timezone: "Australia/Sydney" },
    { name: "Paris 🇫🇷", timezone: "Europe/Paris" },
    { name: "Beijing 🇨🇳", timezone: "Asia/Shanghai" },
    { name: "Moscow 🇷🇺", timezone: "Europe/Moscow" },
    { name: "Berlin 🇩🇪", timezone: "Europe/Berlin" },
    { name: "Toronto 🇨🇦", timezone: "America/Toronto" },
    { name: "Seoul 🇰🇷", timezone: "Asia/Seoul" },
    { name: "Mumbai 🇮🇳", timezone: "Asia/Kolkata" },
    { name: "Rome 🇮🇹", timezone: "Europe/Rome" },
    { name: "Istanbul 🇹🇷", timezone: "Europe/Istanbul" },
    { name: "Cairo 🇪🇬", timezone: "Africa/Cairo" },
    { name: "Mexico City 🇲🇽", timezone: "America/Mexico_City" },
    { name: "Sao Paulo 🇧🇷", timezone: "America/Sao_Paulo" },
    { name: "Jakarta 🇮🇩", timezone: "Asia/Jakarta" },
    { name: "Bangkok 🇹🇭", timezone: "Asia/Bangkok" },
    { name: "Kolkata 🇮🇳", timezone: "Asia/Kolkata" },
    { name: "Lagos 🇳🇬", timezone: "Africa/Lagos" },
    { name: "Hong Kong 🇭🇰", timezone: "Asia/Hong_Kong" },
    { name: "Vienna 🇦🇹", timezone: "Europe/Vienna" },
    { name: "Copenhagen 🇩🇰", timezone: "Europe/Copenhagen" },
    { name: "Athens 🇬🇷", timezone: "Europe/Athens" },
    { name: "Budapest 🇭🇺", timezone: "Europe/Budapest" },
    { name: "Warsaw 🇵🇱", timezone: "Europe/Warsaw" },
    { name: "Prague 🇨🇿", timezone: "Europe/Prague" },
    { name: "Lisbon 🇵🇹", timezone: "Europe/Lisbon" },
    { name: "Stockholm 🇸🇪", timezone: "Europe/Stockholm" },
    { name: "Dublin 🇮🇪", timezone: "Europe/Dublin" },
    { name: "Amsterdam 🇳🇱", timezone: "Europe/Amsterdam" },
    { name: "Brussels 🇧🇪", timezone: "Europe/Brussels" },
    { name: "Oslo 🇳🇴", timezone: "Europe/Oslo" },
    { name: "Zurich 🇨🇭", timezone: "Europe/Zurich" },
    { name: "Madrid 🇪🇸", timezone: "Europe/Madrid" },
    { name: "Riyadh 🇸🇦", timezone: "Asia/Riyadh" },
    { name: "Singapore 🇸🇬", timezone: "Asia/Singapore" },
    { name: "Dubai 🇦🇪", timezone: "Asia/Dubai" },
    { name: "Johannesburg 🇿🇦", timezone: "Africa/Johannesburg" },
    { name: "Auckland 🇳🇿", timezone: "Pacific/Auckland" },
    { name: "Vancouver 🇨🇦", timezone: "America/Vancouver" },
    { name: "Los Angeles 🇺🇸", timezone: "America/Los_Angeles" },
    { name: "Accra 🇬🇭", timezone: "Africa/Accra" },
    { name: "Dhaka 🇧🇩", timezone: "Asia/Dhaka" },
];


    let message = "📅⏰ 𝗖𝗨𝗥𝗥𝗘𝗡𝗧 𝗗𝗔𝗧𝗘 𝗔𝗡𝗗 𝗧𝗜𝗠𝗘 𝗜𝗡 𝗗𝗜𝗙𝗙𝗘𝗥𝗘𝗡𝗧 𝗖𝗢𝗨𝗡𝗧𝗥𝗜𝗘𝗦:\n\n";

    for (const country of countries) {
        const time = moment().tz(country.timezone).format("  ⦿ YYYY-MM-DD | HH:mm:ss");
        message += `${country.name}:\n${time}\n\n`;
    }

    api.sendMessage(message, event.threadID, event.messageID);
};
