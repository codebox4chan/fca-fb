const axios = require('axios');
const { createReadStream, unlinkSync } = require('fs-extra');
const { resolve } = require('path');
const fs = require('fs');

const jsonFilePath = resolve(__dirname, './system/sim.json');

let simResponses = {};

module.exports.config = {
   name: 'chat',
   version: '1.0.5',
   hasPermssion: 0,
   credits: 'kennethpanio',
   usePrefix: false,
   description: 'talk to simple cute loli voice chatbot or teach her',
   commandCategory: 'fun',
   usages: '[input] [teach <input> - <response> / <input>]',
   cooldowns: 3
};

module.exports.run = async ({ api, event, args }) => {
   const arg = args.join(' ').trim();

   if (!arg) {
      return api.sendMessage('Hi there', event.threadID);
   }

   if (arg.startsWith('teach ')) {
      const teachArgs = arg.slice(6).split(' - ');

      if (teachArgs.length === 2) {
         const input = teachArgs[0].trim().toLowerCase();
         const response = teachArgs[1].trim();

         if (!simResponses[input]) {
            simResponses[input] = [];
         }

         if (Array.isArray(simResponses[input])) {
            simResponses[input].push(response);
            saveSimResponses();

            const count = simResponses[input].length;
            const times = count === 1 ? 'time' : 'times';
            return api.sendMessage(`I learned how to respond to "${input}" with "${response}" for ${count} ${times}.`, event.threadID);
         } else {
            return api.sendMessage('An error occurred while teaching Sim.', event.threadID);
         }
      }
   } else {
      const responseArray = simResponses[arg.toLowerCase()];
      if (responseArray && responseArray.length > 0) {
         const randomIndex = Math.floor(Math.random() * responseArray.length);
         const response = responseArray[randomIndex];

         const tranResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=ja&dt=t&q=${encodeURIComponent(response)}`);
         const translatedText = tranResponse.data[0][0][0];

         const audioPath = resolve(__dirname, 'cache', `${event.threadID}_${event.senderID}.wav`);
         const audioApi = await axios.get(`https://api.tts.quest/v3/voicevox/synthesis?text=${encodeURIComponent(translatedText)}&speaker=3&fbclid=IwAR01Y4UydrYh7kvt0wxmExdzoFTL30VkXsLZZ2HjXjDklJsYy2UR3b9uiHA`);
         const audioUrl = audioApi.data.mp3StreamingUrl;
         await downloadFile(audioUrl, audioPath);
         const att = createReadStream(audioPath);

         api.sendMessage(response, event.threadID);
         api.sendMessage({
            attachment: att
         }, event.threadID, () => unlinkSync(audioPath));
      } else {
         return api.sendMessage("I don't know how to respond to that. Please teach me.", event.threadID);
      }
   }
};

function saveSimResponses() {
   const data = {
      responses: simResponses
   };

   fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

function loadSimResponses() {
   try {
      const rawData = fs.readFileSync(jsonFilePath, 'utf-8');
      const data = JSON.parse(rawData);
      simResponses = data.responses || {};

      for (const input in simResponses) {
         if (typeof simResponses[input] === 'string') {
            simResponses[input] = [simResponses[input]];
         }
      }
   } catch (error) {
      // Handle error
   }
}

function downloadFile(url, filePath) {
   return new Promise((resolve, reject) => {
      axios({
         url,
         method: 'GET',
         responseType: 'stream'
      }).then(response => {
         const writer = fs.createWriteStream(filePath);
         response.data.pipe(writer);
         writer.on('finish', resolve);
         writer.on('error', reject);
      }).catch(error => {
         reject(error);
      });
   });
}

loadSimResponses();