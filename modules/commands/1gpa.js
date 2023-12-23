const axios = require("axios");

module.exports.config = {
    name: "gpa",
    version: "1.0",
    hasPermssion: 0,
    credits: "August Quinn",
    description: "Calculate GPA",
    commandCategory: "educational",
    usePrefix: false,
    usages: "highschool or college [grade]",
    cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
    const type = args[0];
    const value = args[1];

    if (!type || !value) {
        return api.sendMessage("Invalid usage! An example would be: '/Gpa high school 98' or '/Gpa college 1.20'", event.threadID, event.messageID);
    }

    try {
        let response;
        let result;

        if (type.toLowerCase() === "highschool") {
            response = await axios.get(`http://gpa.august-api.repl.co/calculateHighSchoolGPA?percentage=${value}`);
            result = response.data;

            let message = `🏫 𝗛𝗜𝗚𝗛 𝗦𝗖𝗛𝗢𝗢𝗟 𝗚𝗣𝗔 𝗖𝗔𝗟𝗖𝗨𝗟𝗔𝗧𝗜𝗢𝗡\n\n`;
            message += `Percentage: ${value}%\n`;
            message += `Equivalent GPA: ${result.equivalentGPA}\n`;
            message += `Equivalent Range: ${result.equivalentRange}\n`;
            message += `Letter Equivalent: ${result.letterEquivalent}\n`;
            message += `Description: ${result.description || "No description available."}\n`;

            api.sendMessage(message, event.threadID, event.messageID);
        } else if (type.toLowerCase() === "college") {
            response = await axios.get(`http://gpa.august-api.repl.co/calculateCollegeGPA?grade=${parseFloat(value)}`);
            result = response.data;

            let message = `🎓 𝗖𝗢𝗟𝗟𝗘𝗚𝗘 𝗚𝗣𝗔 𝗖𝗔𝗟𝗖𝗨𝗟𝗔𝗧𝗜𝗢𝗡\n\n`;
            message += `Provided GPA: ${value}\n`;
            message += `Average GPA: ${result.averageGPA}\n`;
            message += `Equivalent Range: ${result.equivalentRange}\n`;
            message += `Letter Equivalent: ${result.letterEquivalent}\n`;
            message += `Description: ${result.description || "No description available."}\n`;

            api.sendMessage(message, event.threadID, event.messageID);
        } else {
            api.sendMessage("Invalid GPA type! Use 'highschool' or 'college'.", event.threadID, event.messageID);
        }
    } catch (error) {
        console.error("Error:", error);
        api.sendMessage(`Error calculating ${type === "highschool" ? "High School" : "College"} GPA`, event.threadID, event.messageID);
    }
};
              