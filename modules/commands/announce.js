const fs = require('fs');
const axios = require('axios');
const moment = require('moment-timezone');
const { createReadStream, unlinkSync } = global.nodemodule['fs-extra'];
const { resolve } = global.nodemodule['path'];

module.exports.config = {
  name: 'announce',
  version: '1.0.0',
  hasPermssion: 2,
  credits: 'Arjhil',
  description: 'Announce a message with optional audio',
  commandCategory: 'admin',
  usePrefix: true,
  usages: '[Text]',
  cooldowns: 5,
};

module.exports.languages = {
  en: {
    sendSuccess: 'Sent message to %1 thread!',
    sendFail: '[!] Can\'t send message to %1 thread',
  },
};

module.exports.run = async ({ api, event, args, getText, Users }) => {
  const name = await Users.getNameUser(event.senderID);
  const currentTime = moment.tz('Asia/Manila').format('DD/MM/YYYY || HH:mm:ss');

  let content = args.join(' ');
  let languageToSay = global.config.language;

  if (content.startsWith('[en] ')) {
    languageToSay = 'en';
    content = content.substring('[en] '.length);
  }

  const header = '❰❰ 𝗔𝗡𝗡𝗢𝗨𝗡𝗖𝗘𝗠𝗘𝗡𝗧 ❱❱\n\n'; // Bold header text

  try {
    const allThread = global.data.allThreadID || [];
    const cantSend = [];

    for (const idThread of allThread) {
      if (isNaN(parseInt(idThread)) || idThread == event.threadID) continue;

      const audioPath = await generateAudio(content, languageToSay, idThread, event.senderID);

      const messageOptions = {
        body: `${header}${content}\n\n❰❰ 𝐅𝐑𝐎𝐌 𝐀𝐃𝐌𝐈𝐍 ❱❱: ${name.toUpperCase()}`, // Uppercase name
        attachment: createReadStream(audioPath),
      };

      api.sendMessage(messageOptions, idThread, (error) => {
        if (error) cantSend.push(idThread);
      });

      await new Promise(resolve => setTimeout(resolve, 500));
    }

    return api.sendMessage(
      getText('sendSuccess', allThread.length - 1), // Exclude the current thread
      event.threadID,
      () => (cantSend.length > 0)
        ? api.sendMessage(getText('sendFail', cantSend.length), event.threadID, event.messageID)
        : '',
      event.messageID
    );
  } catch (error) {
    console.error('Error sending announcement:', error);
    return api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
  }
};

// Function to generate audio and return the path
async function generateAudio(text, language, threadID, senderID) {
  const msg = text.trim();
  const path = resolve(__dirname, 'cache', `${threadID}_${senderID}.mp3`);
  await global.utils.downloadFile(
    `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
      msg
    )}&tl=${language}&client=tw-ob`,
    path
  );
  return path;
}