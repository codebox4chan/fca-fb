const axios = require('axios');

module.exports.config = {
  name: 'yan',
  version: '1.0.5',
  hasPermssion: 0,
  credits: 'Yan Maglinte',
  description: 'An AI powered with Image recognition!',
  usePrefix: false,
  commandCategory: 'educational',
  usages: '[prompt] | [reply_to_an_image]',
  cooldowns: 0,
};

module.exports.run = async function({ api, event, args }) {
  const prompt = args.join(' ');
  const res = await axios.post('https://main.yanmaglinte.repl.co/api');
  const data = res.data;
  const API = data.apis;
  api.setMessageReaction("⏱️", event.messageID, () => { }, true);

  let credits = this.config.credits;

  if (!prompt) {
    api.sendMessage('Hello 👋 How can I help you today?', event.threadID, event.messageID);
    api.setMessageReaction("", event.messageID, () => { }, true);
    return
  }

  if (event.type === 'message_reply' && event.messageReply.attachments) {
    const attachment = event.messageReply.attachments[0];
    if (attachment.type === 'photo') {
      const image_url = attachment.url;

      try {
        const response = await axios.post(API + '/ocr', {
          prompt: prompt,
          image_url: image_url,
          credits: credits
        });

        const data = response.data;
        const output = data.result;
        api.sendMessage(output, event.threadID, event.messageID);
        api.setMessageReaction("", event.messageID, () => { }, true);
      } catch (error) {
        api.sendMessage('⚠️ Something went wrong!', event.threadID, event.messageID);
        api.setMessageReaction("⚠️", event.messageID, () => { }, true);
      }
      return;
    }
  }

  try {
    const response = await axios.post(API + '/gpt', {
      prompt: prompt,
      credits: credits
    });

    const data = response.data;
    const output = data.result;
    api.sendMessage(output, event.threadID, event.messageID);
    api.setMessageReaction("", event.messageID, () => { }, true);
  } catch (error) {
    api.sendMessage('⚠️ Something went wrong!', event.threadID, event.messageID);
    api.setMessageReaction("⚠️", event.messageID, () => { }, true);
  }
};