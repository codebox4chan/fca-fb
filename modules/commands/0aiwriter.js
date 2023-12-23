const axios = require('axios');

module.exports.config = {
name: 'aiwriter',
version: '0.0.1',
hasPermssion: 0,
credits: 'augustquin',
description: 'Generates stories based on the provided prompt using a conversational AI.',
commandCategory: 'educational',
usePrefix: false,
usages: '[prompt]',
cooldowns: 0,
                        };

module.exports.run = async function ({ api, event, args }) {
  const prompt= args.join(' ');
  if (!prompt) {
    api.sendMessage(
      'Please provide a prompt for the story. Use the command like this:\n\ngenstory [prompt]',
      event.threadID,
      event.messageID
    );
    return;
  }

  const intros = [
    "•Welcome to the Story Writer AI!\n\nI'm here to help you with creative writing prompts and generate exciting stories based on your ideas.\n\nNow, let me craft your story about " +
      prompt +
      '...\n\n',
    "•Prepare to be amazed by the Story Writer AI!\n\nWith the power of AI, I'll turn your prompt into a thrilling narrative.\n\nNow, behold your story about " +
      prompt +
      '...\n\n',
    "•Step into a realm of imagination with the Story Writer AI!\n\nUnleash your creativity by providing a prompt after genstory command, and I'll conjure up an extraordinary tale for you!\n\nNow, here's your story about " +
      prompt +
      '...\n\n',
    '•Unlock the wonders of storytelling with the Story Writer AI!\n\nEmbark on an adventure as I transform your prompt into an engaging tale.\n\nNow, behold your story about ' +
      prompt +
      '...\n\n',
    "•Welcome, storyteller, to the world of AI-powered creativity!\n\nShare your prompt with me using genstory command, and watch as I craft a mesmerizing tale just for you!\n\nNow, here's your story about " +
      prompt +
      '...\n\n',
    "•Ready to witness the magic of the Story Writer AI?\n\nType genstory followed by your prompt, and I'll create an enchanting story that will captivate your imagination!\n\nNow, here's your story about " +
      prompt +
      '...\n\n',
  ];

  try {
    const apiUrl =
      'https://reikodev.spiritii.repl.co/api/gpt4?query=' +
      encodeURIComponent('Write a story ' + prompt);
    const response = await axios.get(apiUrl);
    const story = response.data.reply;
    api.sendMessage(intros[Math.floor(Math.random() * intros.length)] + story, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage('👾 An error occurred while generating the story.', event.threadID, event.messageID);
  }
};
    