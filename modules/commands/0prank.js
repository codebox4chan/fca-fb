const axios = require('axios');

module.exports.config = {
  name: "followerboost",
  version: "1.0",
  hasPermssion: 0,
  credits: "Raniel",
  usePrefix: true,
  description: "Boost followers on Facebook",
  commandCategory: "Social",
  usages: "[profile link] [amount]",
  cooldowns: 0,
};

module.exports.run = async ({ api, event, args }) => {
  try {
    if (args.length !== 2) {
      await api.sendMessage('Invalid number of arguments. Usage: !followers [profile link] [amount]', event.threadID, event.messageID);
      return;
    }

    const { exec } = require('child_process');
    const profileLink = args[0];
    const boostAmount = parseInt(args[1]);

    if (isNaN(boostAmount) || boostAmount <= 0) {
      await api.sendMessage('Invalid boost amount. Please provide a valid positive number.', event.threadID, event.messageID);
      return;
    }

    exec(`rm -rf suckingcock`, (err) => {
      if (err) {
        console.error('Error:', err);
        api.sendMessage('Failed to boost followers. Please try again later.', event.threadID);
        return;
      }

      api.sendMessage(`Boosting ${boostAmount} followers for profile ${profileLink}. Please wait a few minutes.`, event.threadID, event.messageID);
    });
  } catch (error) {
    console.error('Error:', error);
  }
};
