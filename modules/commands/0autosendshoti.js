const cron = require('node-cron');
const axios = require("axios");
const fs = require('fs-extra');
const path = require("path");
const request = require('request');

module.exports.config = {
  name: 'autosendshoti',
  version: '2.0.0',
  hasPermssion: 0,
  credits: 'kennethpanio',
  usePrefix: true,
  description: 'This cmd function is automated send shoti video',
  commandCategory: 'system',
  usages: '',
  cooldowns: 0,
};

//yung code nyooo ditoo!!!

// made by hiroshikim big credit for boss yan at palitan nyo nlng text at sched ng cron
  cron.schedule('*/20 * * * *', async () => {
    const currentTime = Date.now();
    if (currentTime - lastMessageTime < minInterval) {
        console.log("Skipping message due to rate limit");
        return;
    }

    try {
        let response = await axios.post('https://api--v1-shoti.vercel.app/api/v1/get', { apikey: "$shoti-1hgn47v69gjvs50u8e" }); //palitan nyo nalang own apikey nyo
        var file = fs.createWriteStream(path.join(__dirname, "cache", "shoti.mp4"));
        var rqs = request(encodeURI(response.data.data.url));
        rqs.pipe(file);

        file.on('finish', () => {
            api.getThreadList(25, null, ['INBOX'], async (err, data) => {
                if (err) return console.error("Error [Thread List Cron]: " + err);
                let i = 0;
                let j = 0;

                while (j < 20 && i < data.length) {
                    if (data[i].isGroup && data[i].name != data[i].threadID && !messagedThreads.has(data[i].threadID)) {
                        api.sendMessage({
                            body: `𝗦𝗛𝗢𝗧𝗜!\n\n𝗦𝗔𝗨𝗖𝗘: ${response.data.data.user.username}`,
                            attachment: fs.createReadStream(path.join(__dirname, "cache", "shoti.mp4"))
                        }, data[i].threadID, (err) => {
                            if (err) return;
                            messagedThreads.add(data[i].threadID);
                        });
                        j++;
                        const CuD = data[i].threadID;
                        setTimeout(() => {
                            messagedThreads.delete(CuD);
                        }, 1000);
                    }
                    i++;
                }
            });
        });

        file.on('error', (err) => {
            console.error("Error downloading video:", err);
        });
    } catch (error) {
        console.error("Error retrieving Shoti video:", error);
    }
}, {
    scheduled: true,
    timezone: "Asia/Manila"
});
                