const fs = require("fs");
const axios = require("fs");

module.exports.config = {
    name: "prefix",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "jenk",
    description: "shows bot prefix",
    commandCategory: "info",
    usePrefix: false,
    usages: "",
    cooldowns: 1,
};

module.exports.handleEvent = function ({ api, event, client, __GLOBAL }) {
    var { threadID, messageID, senderID } = event;
    var senderName = "";
    api.getUserInfo(senderID, (err, result) => {
        if (err) {
            console.error(err);
            senderName = "there";
        } else {
            senderName = result[senderID].name;
        }
        if (
            event.body.indexOf("prefix") == 0 ||
            event.body.indexOf("Prefix") == 0 ||
            event.body.indexOf("PREFIX") == 0 ||
            event.body.indexOf("prefi") == 0
        ) {
            // Replace "DIRECT_IMAGE_URL_HERE" with the actual Imgur image URL
            const imgurImageUrl = "https://i.imgur.com/AUQVM6H.gif";

            // Download the image using Axios
            axios({
                url: imgurImageUrl,
                responseType: "stream",
            }).then((response) => {
                // Define the path to save the downloaded image
                const imagePath = __dirname + "/downloaded_image.jpg";

                // Pipe the image stream to a file
                response.data.pipe(fs.createWriteStream(imagePath));

                // When the download is complete, send the image as an attachment
                response.data.on("end", () => {
                    // Send the downloaded image as an attachment
                    api.sendMessage(
                        {
                            body: ` ✿ ${senderName}👋, 𝖬𝗒 𝗉𝗋𝖾𝖿𝗂𝗑 𝗂𝗌 𝗂𝗇 𝗍𝗁𝖾 𝖦𝗂𝖿 ✿ `,
                            attachment: fs.createReadStream(imagePath),
                        },
                        threadID,
                        messageID
                    );

                    // Remove the downloaded image file
                    fs.unlinkSync(imagePath);

                    api.setMessageReaction("🤖", event.messageID, (err) => {}, true);
                });
            });
        }
    });
};

module.exports.run = function ({ api, event, client, __GLOBAL }) {};
