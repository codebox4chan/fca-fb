module.exports.config = {
  name: "generate",
  version: "beta",
  usePrefix: false,
  credits: "billy api credits to samir",
  description: "generates images provided idea by users",
  usages: "(prompt)",
  hasPermssion: 0,
  commandCategory: 'image',
  cooldowns: 2,
  dependencies: {
    "fs-extra": "",
    "path": ""
  }
}

module.exports.run = async function({api, args, event}) {
  const [ prompt, style, ratio ] = args.join(" ").split("|").map(part => part.trim());
  const { sendMessage, unsendMessage } = api;
  const { messageID, threadID, senderID } = event;
  if (!prompt) {
    return sendMessage('please provide a prompt ideas', threadID, messageID);
  }
  let image = `https://api.samirthakuri.repl.co/api/generatev3?prompt=${encodeURIComponent(prompt)}`;
  if (style) {
    image += `&style=${encodeURIComponent(style)}`;
  }
  if (ratio) {
    image += `&ratio=${encodeURIComponent(ratio)}`;
  }
  try {
    const { createReadStream, unlinkSync } = require('fs-extra');
    const { resolve } = require('path');
    const imagePath = resolve(__dirname, 'cache', `${threadID}-${senderID}.png`);
    await global.utils.downloadFile(image, imagePath);
    return sendMessage({
      body: `Here's your generated image based on idea you provided!`,
      attachment: createReadStream(imagePath)
    }, threadID, () => unlinkSync(imagePath), messageID);
  } catch (error) {
    return sendMessage(`having some unexpected error : ${error}`);
  }
      }