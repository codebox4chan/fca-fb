const fs = require('fs').promises;
const path = require('path');

module.exports.config = {
  name: "chcategory",
  version: "1.0",
  hasPermssion: 2,
  credits: "RICKCIEL",
  usePrefix: true,
  description: "Change the command category of a specific command",
  commandCategory: "admin",
  cooldowns: 0,
};

module.exports.run = async ({ api, event, args }) => {
  try {
    if (args.length < 2) {
      return api.sendMessage("Usage: !setcategory <command_file_name> <new_category> [<new_category_2>]", event.threadID);
    }

    const [commandName, newCategory1, newCategory2] = args;

    const commandPath = path.join(__dirname, '..', 'commands', `${commandName}.js`);
    console.log('Command Path:', commandPath);

    const commandContent = await fs.readFile(commandPath, 'utf-8');

    const updatedContent = commandContent.replace(
      /commandCategory: "([^"]+)"/g,
      `commandCategory: "${newCategory1}",\n  commandCategory: "${newCategory2 || newCategory1}"`
    );

    await fs.writeFile(commandPath, updatedContent, 'utf-8');

    api.sendMessage(`Command "${commandName}" categories updated to "${newCategory1}"${newCategory2 ? ` and "${newCategory2}"` : ''}.`, event.threadID);
  } catch (error) {
    console.error('Error updating command categories:', error);
    api.sendMessage("An error occurred while updating the command categories.", event.threadID);
  }
};
