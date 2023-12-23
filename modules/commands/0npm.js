const axios = require('axios');

module.exports.config = {
  name: "npm",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "August Quinn",
  description: "Get NPM package information.",
  commandCategory: "info",
  usePrefix: true,
  usages: "[package-name]",
  cooldowns: 5,
  requiredArgs: 1,
};

module.exports.run = async ({ api, event, args }) => {
  const packageName = args[0];

  try {
    const response = await axios.get(`http://npm.august-quinn-api.repl.co/${packageName}`);
    const packageInfo = response.data;

    if (packageInfo.error) {
      api.sendMessage(`Error: ${packageInfo.error}`, event.threadID, event.messageID);
    } else {
      let message = `NPM Package: ${packageInfo.name}\n`;

      if ('version' in packageInfo) {
        message += `Version: ${packageInfo.version}\n`;
        message += `Last Modified: ${packageInfo.modified || 'N/A'}\n`;
        message += `Dependencies: ${packageInfo.dependencies ? Object.keys(packageInfo.dependencies).join(', ') : 'N/A'}\n`;
        message += `Optional Dependencies: ${packageInfo.optionalDependencies ? Object.keys(packageInfo.optionalDependencies).join(', ') : 'N/A'}\n`;
      } else {
          message += `Latest Version: ${packageInfo['dist-tags'].latest}\n`;
          message += `Description: ${packageInfo.description || 'N/A'}\n`;
          message += `License: ${packageInfo.license || 'N/A'}\n`;
          message += `Author: ${packageInfo.author ? packageInfo.author.name || 'N/A' : 'N/A'}\n`;
          message += `Homepage: ${packageInfo.homepage || 'N/A'}\n`;
          message += `Keywords: ${packageInfo.keywords ? packageInfo.keywords.join(', ') : 'N/A'}\n`;
          message += `Maintainers: ${packageInfo.maintainers ? packageInfo.maintainers.map(m => m.name).join(', ') : 'N/A'}\n`;     
          message += `ReadmeFilename: ${packageInfo.readmeFilename || 'N/A'}\n`;
          message += `Repository: ${packageInfo.repository ? packageInfo.repository.url || 'N/A' : 'N/A'}\n`;
          message += `Bugs: ${packageInfo.bugs ? packageInfo.bugs.url || 'N/A' : 'N/A'}\n`;
      }

      api.sendMessage(message, event.threadID, event.messageID);
    }
  } catch (error) {
    console.error('[ERROR]', error);
    api.sendMessage("An error occurred while fetching NPM package information.", event.threadID, event.messageID);
  }
};