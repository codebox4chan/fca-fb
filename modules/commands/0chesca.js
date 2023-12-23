const axios = require('axios');

module.exports = {
  config: {
    name: 'reika',
    hasPermssion: 0,
    version: '2.5',
    author: 'JV Barcenas && LiANE For ChescaAI', // do not change
    credits: 'JV Barcenas && LiANE For ChescaAI', // do not change
    role: 0,
    usePrefix: false,
    category: 'Ai - Chat',
    commandCategory: 'educational',
    descrption: 'Baliw na babaeng ai',
    usages: '[prompt]',
    shortDescription: {
      en: 'Baliw na babaeng ai',
    },
    longDescription: {
      en: 'Baliw na babaeng ai',
    },
    guide: {
      en: '{pn} [prompt]',
    },
  },
  onStart: async function (context) {
    const { api, event } = context;
    
    try {
      const prompt = event.body.trim();

      if (prompt) {
        

        const response = await axios.get(`https://school-project-lianefca.bene-edu-ph.repl.co/ask?query=${encodeURIComponent(prompt)}`);

        if (response.data) {
          const messageText = response.data.message.replace(/(?:chesca(?:\.|[^a-zA-Z0-9_])|francesca)/g, 'reika').replace('💬 𝗖𝗵𝗲𝘀𝗰𝗮', '💬 𝗥𝗲𝗶𝗸𝗮').replace(/(?:𝗖𝗵𝗲𝘀𝗰𝗮(?:\.|[^a-zA-Z0-9_]))/g, '𝗥𝗲𝗶𝗸𝗮 ');

          await api.sendMessage(messageText, event.threadID);
          
          console.log('Sent answer as a reply to the user');
        } else {
          throw new Error('Invalid or missing response from API');
        }
      }
    } catch (error) {
      console.error(`Failed to get an answer: ${error.message}`);
      api.sendMessage(
        `${error.message}.\n\nYou can try typing your question again or resending it, as there might be a bug from the server that's causing the problem. It might resolve the issue.`,
        event.threadID
      );
    }
  },
  run: async function (context) {
    module.exports.onStart(context);
  }
};











