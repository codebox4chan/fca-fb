          const axios = require('axios');
          const fs = require('fs');
          const path = require('path');
          const { DateTime } = require('luxon');

          module.exports.config = {
            name: 'palm',
            version: '4.0.0',
            hasPermssion: 0,
            credits: 'reiko dev',
            description: 'Talk to Palm AI',
            commandCategory: 'educational',
            usages: '[ask]',
            cooldowns: 4,
            usePrefix: false,
          };

          module.exports.run = async ({ api, event, args }) => {
            const { threadID, messageID, senderID } = event;
            if (args.length < 1) {
              return api.sendMessage('Please provide a question.', threadID, messageID);
            }

            const input = args.join(' ');
            const manilaTime = DateTime.now().setZone('Asia/Manila').toFormat('yyyy-MM-dd hh:mm:ss a');

            api.setMessageReaction("🕣", messageID, () => {}, true);
            api.sendMessage("🕣 | 𝘈𝘯𝘴𝘸𝘦𝘳𝘪𝘯𝘨....", threadID, messageID);

            let userName = await getUserName(api, senderID);
      
            const response = await axios.get(`https://replhome.codebox4chan.repl.co/api/palm?prompt=${encodeURIComponent(input)}&apiKey=y7jvrnh8yms071n9f5ruox8`);
            const sagot = response.data.reply || 'No Response Server is Down';

            api.sendMessage(`🌴𝗣𝗔𝗟𝗠 𝗔𝗜🥥:\n\n${sagot}\n\n𝗗𝗲𝘃 𝗟𝗶𝗻𝗸: https://www.facebook.com/100081201591674\n\n𝗕𝘂𝘆 𝗠𝗲 𝗔 𝗖𝗼𝗳𝗳𝗲𝗲!☕\nhttps://reikodev.gumroad.com/l/codebox4chan\n\n${manilaTime}`, threadID);

            // MrBeast API for voice
            const beastUrl = 'https://www.api.vyturex.com/beast';
            try {
              const beastResponse = await axios.get(`${beastUrl}?query=${encodeURIComponent(sagot)}`);
              if (beastResponse.data && beastResponse.data.audio) {
                const audioURL = beastResponse.data.audio;
                const fileName = "mrbeast_voice.mp3";
                const filePath = path.resolve(__dirname, 'cache', fileName);

                await global.utils.downloadFile(audioURL, filePath);

                api.sendMessage({
                  body: '💽𝗩𝗼𝗶𝗰𝗲 𝗕𝗼𝘅',
                  attachment: fs.createReadStream(filePath),
                }, threadID, async (voiceError) => {
                  if (voiceError) {
                    console.error('Error sending voice response:', voiceError);
                  }

                  fs.unlinkSync(filePath); // Remove the temporary voice file
                });
              } else {
                console.error("Failed to fetch Beast API response.");
              }
            } catch (beastError) {
              console.error('Error during Beast API request:', beastError);
            }
          };

          async function getUserName(api, userID) {
            try {
              const userInfo = await api.getUserInfo(userID);
              return userInfo && userInfo[userID] ? userInfo[userID].name : "unknown";
            } catch (error) {
              console.error('Error getting user name:', error);
              return "unknown";
            }
          }
