const fs = require('fs');
const path = require('path');

module.exports.config = {
  name: `cmdlist`,
  version: "1.0",
  hasPermission: 0,
  credits: "RICKCIEL",
  usePrefix: true,
  description: "Lists all available commands.",
  commandCategory: "info",
  cooldowns: 5,
};

module.exports.run = async ({ api, event }) => {
  const commandsPath = path.join(__dirname, '..', 'commands');

  try {
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    if (commandFiles.length === 0) {
      api.sendMessage("There are no commands available.", event.threadID);
      return;
    }

    const commandList = commandFiles.map(file => {
      const commandName = path.basename(file, '.js');
      const filePath = path.join(commandsPath, file);
      const commandModule = require(filePath);
      const commandConfig = commandModule.config;
      return `[File:] ${commandName}.js\n[Name] ${commandConfig.name}`;
    }).join('\n\n');

    const message = `Available commands:\n\n${commandList}`;
    api.sendMessage(message, event.threadID);
  } catch (error) {
    console.error('Error listing commands:', error);
    api.sendMessage("An error occurred while listing commands.", event.threadID);
  }
};
