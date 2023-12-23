const fs = require('fs').promises;
const path = require('path');

module.exports.config = {
  name: "useprefix",
  version: "1.0",
  hasPermssion: 3,
  credits: "RICKCIEL",
  usePrefix: false,
  description: "Change the usePrefix property of a specific command",
  commandCategory: "system",
  cooldowns: 0,
};

module.exports.run = async ({ api, event, args }) => {
  try {
    if (args.length !== 2 || (args[1] !== 'true' && args[1] !== 'false')) {
      return api.sendMessage("Usage: setuseprefix <command_file_name> <true|false>", event.threadID);
    }

    const [commandName, newUsePrefix] = args;

    
    const commandPath = path.join(__dirname, '..', 'commands', `${commandName}.js`);
    console.log('Command Path:', commandPath);

    
    const commandContent = await fs.readFile(commandPath, 'utf-8');


    const updatedContent = commandContent.replace(
      /usePrefix: (true|false)/,
      `usePrefix: ${newUsePrefix}`
    );

  
    await fs.writeFile(commandPath, updatedContent, 'utf-8');

    api.sendMessage(`Command "${commandName}" usePrefix property updated to ${newUsePrefix}.`, event.threadID);
  } catch (error) {
    console.error('Error updating usePrefix property:', error);
    api.sendMessage("An error occurred while updating the usePrefix property.", event.threadID);
  }
};
