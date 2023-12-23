const axios = require("axios");
const fs = require('fs');
const path = require('path');

module.exports.config = {
    name: "pixel",
    usePrefix: false,
    credits: "1SOY DEV", // Converted by Cyril Matt O. Encenso 
    usage: "pixel <query>",
    description: "Search for an image on PixelBay",
    cooldowns: 3,
    commandCategory: "image",
    version: "1.0.1",
    hasPermssion: 0,
};

module.exports.run = async function ({ api, event, args }) {
    const query = args.join(" ");

    async function performImageSearch() {
        try {
            const response = await axios.get(`https://api.easy0.repl.co/v1/pixel?q=${query}&api=ISOYXD`);
            const imgResults = response.data.result;

            if (imgResults.length === 0) {
                api.sendMessage(`No image results found for "${query}"`, event.threadID, event.messageID);
                return;
            }

            const randomImages = getRandomElements(imgResults, Math.min(10, imgResults.length));
            const attachments = [];

            for (let i = 0; i < randomImages.length; i++) {
                const { largeImageURL } = randomImages[i];

                try {
                    const imageResponse = await axios.get(largeImageURL, { responseType: "arraybuffer" });

                    // Generate a unique filename for each image
                    const imagePath = path.join(__dirname, 'cache', `pixel_${i}.png`);
                    fs.writeFileSync(imagePath, imageResponse.data);
                    attachments.push(fs.createReadStream(imagePath));
                } catch (error) {
                    console.error(error);
                    api.sendMessage(`Error fetching image: ${error.message}`, event.threadID, event.messageID);
                }
            }

            api.sendMessage({
                body: `Here are 10 random image results (out of ${imgResults.length}):`,
                attachment: attachments,
            }, event.threadID, event.messageID);

        } catch (error) {
            console.error(error);
            api.sendMessage('Error during image search', event.threadID, event.messageID);
        }
    }

    if (!query) {
        return api.sendMessage("Please provide a query...", event.threadID, event.messageID);
    }

    api.sendMessage("Searching Image 🔍, Please Wait...", event.threadID, event.messageID);
    performImageSearch();
};

function getRandomElements(array, count) {
    const shuffledArray = array.sort(() => Math.random() - 0.5);
    return shuffledArray.slice(0, count);
        }