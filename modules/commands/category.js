const fs = require('fs');
const path = require('path');

module.exports.config = {
  name: "category",
  version: "1.0",
  hasPermssion: 0,
  credits: "RICKCIEL",
  usePrefix: true,
  description: "List available command categories or commands within a specific category.",
  commandCategory: "info",
  cooldowns: 5,
};

module.exports.run = async ({ api, event, args }) => {
  try {
    if (args.length === 0) {
      const categories = [...new Set(Object.values(require.cache)
        .filter(m => m.exports && m.exports.config && m.exports.config.commandCategory)
        .map(m => m.exports.config.commandCategory.toLowerCase()) 
      )];

      let message = "Available command categories:\n";
      categories.forEach(category => {
        message += `- ${category}\n`;
      });

      api.sendMessage(message, event.threadID);
      return;
    }

    const requestedCategory = args[0].toLowerCase();
    const commandsInCategory = Object.entries(require.cache)
      .filter(([_, m]) => m.exports && m.exports.config && m.exports.config.commandCategory && 
                        m.exports.config.commandCategory.toLowerCase() === requestedCategory) // Case-insensitive comparison
      .map(([file]) => path.basename(file, '.js'));

    if (commandsInCategory.length === 0) {
      api.sendMessage(`There are no commands in the "${requestedCategory}" category.`, event.threadID);
      return;
    }

    let message = `Commands in the "${requestedCategory}" category:\n`;
    commandsInCategory.forEach(command => {
      message += `- ${command}\n`;
    });

    api.sendMessage(message, event.threadID);
  } catch (error) {
    console.error('Error listing commands:', error);
    api.sendMessage("An error occurred while listing commands.", event.threadID);
  }
};