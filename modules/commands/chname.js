const fs = require('fs');
const path = require('path');

module.exports.config = {
  name: `chname`,
  version: "1.0",
  hasPermission: 0,
  credits: "RICKCIEL",
  usePrefix: true,
  description: "Change the name of a command file.",
  commandCategory: "Utility",
  cooldowns: 5,
};

module.exports.run = async ({ api, args, event }) => {
  if (args.length !== 2) {
    api.sendMessage("Please provide the old and new file names.", event.threadID);
    return;
  }

  const oldFileName = args[0] + ".js";
  const newFileName = args[1] + ".js";

  const commandsPath = path.join(__dirname, '..', 'commands');
  const oldFilePath = path.join(commandsPath, oldFileName);
  const newFilePath = path.join(commandsPath, newFileName);

  try {
    if (!fs.existsSync(oldFilePath)) {
      api.sendMessage(`File '${oldFileName}' does not exist.`, event.threadID);
      return;
    }

    fs.renameSync(oldFilePath, newFilePath);
    api.sendMessage(`File '${oldFileName}' has been renamed to '${newFileName}'.`, event.threadID);
  } catch (error) {
    console.error('Error changing file name:', error);
    api.sendMessage("An error occurred while changing the file name.", event.threadID);
  }
};
