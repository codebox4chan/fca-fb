const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');
const ytdl = require('ytdl-core');

module.exports.config = {
    name: "youtube",
    version: "1.3.0",
    hasPermssion: 0,
    credits: "August Quinn",
    description: "Access YouTube",
    commandCategory: "Media",
    usePrefix: true,
    usages: "[video name]",
    cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
    const videoName = args.join(" ");

    if (!videoName) {
        return api.sendMessage("Please provide a search query for the YouTube video.", event.threadID, event.messageID);
    }

    try {
        const response = await axios.post('https://youtube.august-api.repl.co/searchVideo', {
            videoName: videoName,
        });

        const { title, description, duration, views, thumbnail, url, error } = response.data;

        if (error) {
            console.error('ERROR', error);
            return api.sendMessage(`An error occurred: ${error}`, event.threadID);
        }

        api.sendMessage(`Sending "${title}", please be patient...`, event.threadID, event.messageID);

        const videoStream = ytdl(url, { quality: 'highest', filter: 'audioandvideo' });

        const fileName = `${Date.now()}_${title}.mp4`;
        const filePath = path.join(__dirname, 'downloads', fileName); 

        const writeStream = fs.createWriteStream(filePath);

        videoStream.pipe(writeStream);

        writeStream.on('finish', () => {
            const message = {
                body: `🎞️ 𝗛𝗘𝗥𝗘'𝗦 𝗧𝗛𝗘 𝗥𝗘𝗦𝗨𝗟𝗧\n\n𝗧𝗜𝗧𝗟𝗘: ${title}\n𝗗𝗘𝗦𝗖𝗥𝗜𝗣𝗧𝗜𝗢𝗡: ${description}\n𝗗𝗨𝗥𝗔𝗧𝗜𝗢𝗡: ${duration}\n𝗩𝗜𝗘𝗪𝗦: ${views}\n𝗧𝗛𝗨𝗠𝗕𝗡𝗔𝗜𝗟: ${thumbnail}`,
                attachment: fs.createReadStream(filePath),
            };

            api.sendMessage(message, event.threadID, async () => {
                if (fs.existsSync(filePath)) {
                    await fs.unlink(filePath);
                }
            });
        });
    } catch (error) {
        console.error('ERROR', error);
        api.sendMessage('An error occurred while processing the command.', event.threadID);
    }
};