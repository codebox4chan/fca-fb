let PastebinAPI = require('pastebin-js');
let fs = require('fs');
let path = require('path');

let pastebin = new PastebinAPI({
  api_dev_key: 'm44A-baM9eiIb1Na_XP2qLLAi9s0sKy3', // Replace with your API key
  api_user_key: 'm44A-baM9eiIb1Na_XP2qLLAi9s0sKy3' // Replace with your API key
});

module.exports.config = {
  name: "paste",
  version: "1.0",
  credits: "OtinXSandip",
  cooldowns: 5,
  hasPermssion: 3,
  usePrefix: true,
  description: "This command allows you to upload files and text to pastebin and send the link to the file.",
  commandCategory: "operator",
  usages: "file <name> or text <text>."
};

module.exports.run = async function (params) {
  let { api, event, args } = params;
  let { threadID, messageID, senderID } = event;

  let permission = ["61550873742628", ""]; // Update with valid sender IDs
  if (!permission.includes(senderID)) {
    return api.sendMessage("fuck you nigga!", threadID, messageID);
  }

  if (!args[0]) {
    return api.sendMessage(`Please learn how to use ${global.config.PREFIX}${this.config.name} text (words) or paste file (filename)`, threadID);
  }

  if (args[0] === "text") {
    let text = args.slice(1).join(" ");
    try {
      let paste = await pastebin.createPaste({
        text: text,
        title: "Text Paste",
        format: null,
        privacy: 1,
      });

      let rawPaste = paste.replace("pastebin.com", "pastebin.com/raw");

      api.sendMessage(`Text created ✅ \n🔗 Text Link: ${rawPaste}`, threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage('An error occurred while pasting the text.', threadID);
    }
  } else if (args[0] === "file") {
    let fileName = args[1];
    let filePathWithoutExtension = path.join(__dirname, '..', 'commands', fileName);
    let filePathWithExtension = path.join(__dirname, '..', 'commands', fileName + '.js');

    if (!fs.existsSync(filePathWithoutExtension) && !fs.existsSync(filePathWithExtension)) {
      return api.sendMessage('File not found!', threadID);
    }

    let filePath = fs.existsSync(filePathWithoutExtension) ? filePathWithoutExtension : filePathWithExtension;

    fs.readFile(filePath, 'utf8', async (err, data) => {
      if (err) throw err;

      try {
        let paste = await pastebin.createPaste({
          text: data,
          title: fileName,
          format: null,
          privacy: 1,
        });

        let rawPaste = paste.replace("pastebin.com", "pastebin.com/raw");

        api.sendMessage(`
File created ✅\nfile name: ${fileName}.js\n🔗 Link: ${rawPaste}`, threadID);
      } catch (error) {
        console.error(error);
        api.sendMessage('An error occurred while pasting the file.', threadID);
      }
    });
  } else {
    api.sendMessage('Please learn how to use $paste text (words) or paste file (filename)', threadID);
  }
};