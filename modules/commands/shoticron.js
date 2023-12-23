const cron = require('node-cron');
const axios = require("axios");
const request = require('request');
const fs = require("fs");

const activeThreads = {};

module.exports.config = {
  name: "shoticron",
  version: "1.0.0",
  credits: "Kim Joseph DG Bien api by: libyzxy0",
  description: "Generate random tiktok girl videos with cron for automatic sending video",
  hasPermssion: 2,
  commandCategory: "fun",
  usage: "[on/off]",
  cooldowns: 5,
  dependencies: [],
  usePrefix: true
};

module.exports.run = async function({ api, event }) {
  const args = event.body.split(" ");
  const threadID = event.threadID;

  if (args[1] === "on") {
    if (!activeThreads[threadID]) {
      activeThreads[threadID] = true;
      api.sendMessage("Automatic sending of videos is now ON.", threadID);
      
      cron.schedule('*/10 * * * *', async () => {
        try {
          if (activeThreads[threadID]) { 
            let data = await axios.post("https://api--v1-shoti.vercel.app/api/v1/get", {
              apikey: "$shoti-1hea201h70g1ms5cgh8",
            });
            var file = fs.createWriteStream(__dirname + "/cache/shoti.mp4");
            var rqs = request(encodeURI(data.data.data.url));
            console.log('Shoti Downloaded >>> ' + data.data.data.id);
            rqs.pipe(file);
            file.on('finish', () => {
              api.sendMessage({
                body: "🔥🔥",
                attachment: fs.createReadStream(__dirname + '/cache/shoti.mp4')
              }, threadID, (error, info) => {
                if (!error) {
                  fs.unlinkSync(__dirname + '/cache/shoti.mp4');
                }
              });
            });
          }
        } catch (error) {
          console.error('Error:', error);
        }
      });
    } else {
      api.sendMessage("Automatic sending of videos is already ON in this thread.", threadID);
    }
  } else if (args[1] === "off") {
    if (activeThreads[threadID]) {
      activeThreads[threadID] = false;
      api.sendMessage("Automatic sending of videos is now OFF.", threadID);
    } else {
      api.sendMessage("Automatic sending of videos is already OFF in this thread.", threadID);
    }
  }
};