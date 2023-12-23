let activeCmd = false;

module.exports = function ({ api, models, Users, Threads, Currencies }) {
  const stringSimilarity = require('string-similarity'),
    escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    logger = require("../../utils/log.js");
  const axios = require('axios')
  const moment = require("moment-timezone");
  const cooldowns = new Map(); // Create a map to track cooldowns
  const requestCooldowns = new Map();
  const cooldownMessagesSent = new Map();

  return async function ({ event }) {
    if (activeCmd) {
      return;
    }

    const dateNow = Date.now()
    const time = moment.tz("Asia/Manila").format("HH:MM:ss DD/MM/YYYY");
    const { allowInbox, PREFIX, ADMINBOT, DeveloperMode, adminOnly, keyAdminOnly, OPERATOR, APPROVED, approval } = global.config;
    const { userBanned, threadBanned, threadInfo, threadData, commandBanned } = global.data;
    const { commands, cooldowns: clientCooldowns, developermode } = global.client;

    var { body, senderID, threadID, messageID } = event;
    senderID = String(senderID);
    threadID = String(threadID);
    const threadSetting = threadData.get(threadID) || {}
    const args = (body || '').trim().split(/ +/);
    const commandName = args.shift()?.toLowerCase();
    let command = commands.get(commandName);

    const replyAD = "You don't have permission to use bot only admins and bot operators are allowed!";
    const notApproved = `this box is not approved\n\nuse "${PREFIX}𝗿𝗲𝗾𝘂𝗲𝘀𝘁" to send an approval request to bot operators`;

    if (!APPROVED.includes(threadID) && !OPERATOR.includes(senderID) && !ADMINBOT.includes(senderID) && approval) {
      setTimeout(() => {
        api.removeUserFromGroup(api.getCurrentUserID(), event.threadID);
      }, 300 * 1000); // 60 seconds = 1 minute
    }

    if (typeof body === "string" && body.startsWith(`${PREFIX}request`) && approval) {
      if (APPROVED.includes(threadID)) {
        return api.sendMessage('This box is already approved', threadID, messageID);
      }

      // Check if the user has a cooldown for the "request" command
      const lastRequestTime = requestCooldowns.get(senderID);
      if (lastRequestTime && dateNow - lastRequestTime < 300000) { // 300000 milliseconds = 5 minutes
        if (!cooldownMessagesSent.has(senderID)) {
          api.sendMessage('You can request approval only once every 5 minutes.', threadID, messageID);
          cooldownMessagesSent.set(senderID, true);
        }
        return;
      } else {
        // Reset the cooldown message status for the user
        cooldownMessagesSent.delete(senderID);
      }

      // Update the last request time for the user
      requestCooldowns.set(senderID, dateNow);

      let kennethpaniodev;
      let request;
      try {
        const groupname = await global.data.threadInfo.get(threadID).threadName || "𝗧𝗛𝗘 𝗚𝗥𝗢𝗨𝗣 𝗗𝗢𝗘𝗦𝗡'𝗧 𝗛𝗔𝗩𝗘 𝗔 𝗡𝗔𝗠𝗘";
        kennethpaniodev = `𝗚𝗥𝗢𝗨𝗣 𝗡𝗔𝗠𝗘 : ${groupname}\n𝗧𝗛𝗥𝗘𝗔𝗗 𝗜𝗗 : ${threadID}`;
        request = `${groupname}\n\nGroup is requesting for approval!.`
      } catch (error) {
        const username = await Users.getNameUser(threadID) || "𝗨𝗡𝗞𝗡𝗢𝗪𝗡 𝗨𝗦𝗘𝗥";
        kennethpaniodev = `𝗨𝗦𝗘𝗥 𝗜𝗗 : ${threadID}`;
        request = `${username} is requesting for approval`;
      }
      return api.sendMessage(`${request}\n\n${kennethpaniodev}`, OPERATOR[0], () => {
        return api.sendMessage('Your approval request has been sent to bot operators.\n\nStay patient!', threadID, messageID);
      });
    }

    if (command && (command.config.name.toLowerCase() === commandName.toLowerCase()) && (!APPROVED.includes(threadID) && !OPERATOR.includes(senderID) && !ADMINBOT.includes(senderID) && approval)) {
      return api.sendMessage(notApproved, threadID, async (info) => {
        await new Promise(resolve => setTimeout(resolve, 5 * 1000));
        return api.unsendMessage(info.messageID);
      });
    }

    if (typeof body === 'string' && body.startsWith(PREFIX) && (!APPROVED.includes(threadID) && !OPERATOR.includes(senderID) && !ADMINBOT.includes(senderID) && approval)) {
      return api.sendMessage(notApproved, threadID, async (info) => {
        await new Promise(resolve => setTimeout(resolve, 5 * 1000));
        return api.unsendMessage(info.messageID);
      });
    }

    if (command && (command.config.name.toLowerCase() === commandName.toLowerCase()) && (!ADMINBOT.includes(senderID) && !OPERATOR.includes(senderID) && adminOnly && senderID !== api.getCurrentUserID())) {
      return api.sendMessage(replyAD, threadID, messageID);
    }

    if (typeof body === 'string' && body.startsWith(PREFIX) && (!ADMINBOT.includes(senderID) && adminOnly && senderID !== api.getCurrentUserID())) {
      return api.sendMessage(replyAD, threadID, messageID);
    }

    if (userBanned.has(senderID) || threadBanned.has(threadID) || allowInbox == ![] && senderID == threadID) {
      if (!ADMINBOT.includes(senderID.toString()) && !OPERATOR.includes(senderID.toString())) {
        if (userBanned.has(senderID)) {
          const { reason, dateAdded } = userBanned.get(senderID) || {};
          return api.setMessageReaction('⚠️', event.messageID, err => (err) ? logger('An error occurred while executing setMessageReaction', 2) : '', !![]);
        } else {
          if (threadBanned.has(threadID)) {
            const { reason, dateAdded } = threadBanned.get(threadID) || {};
            return api.sendMessage(global.getText("handleCommand", "threadBanned", reason, dateAdded), threadID, async (info) => {
              await new Promise(resolve => setTimeout(resolve, 5 * 1000));
              return api.unsendMessage(info.messageID);
            }, messageID);
          }
        }
      }
    }

    if (commandName.startsWith(PREFIX)) {
      if (!command) {
        const allCommandName = Array.from(commands.keys());
        const checker = stringSimilarity.findBestMatch(commandName, allCommandName);
        if (checker.bestMatch.rating >= 0.5) {
          command = commands.get(checker.bestMatch.target);
        } else {
          return api.sendMessage(global.getText("handleCommand", "commandNotExist", checker.bestMatch.target), threadID, messageID);
        }
      }
    }
    if (commandBanned.get(threadID) || commandBanned.get(senderID)) {
      if (!ADMINBOT.includes(senderID) && !OPERATOR.includes(senderID)) {
        const banThreads = commandBanned.get(threadID) || [],
          banUsers = commandBanned.get(senderID) || [];
        if (banThreads.includes(command.config.name))
          return api.sendMessage(global.getText("handleCommand", "commandThreadBanned", command.config.name), threadID, async (err, info) => {
            await new Promise(resolve => setTimeout(resolve, 5 * 1000))
            return api.unsendMessage(info.messageID);
          }, messageID);
        if (banUsers.includes(command.config.name))
          return api.sendMessage(global.getText("handleCommand", "commandUserBanned", command.config.name), threadID, async (err, info) => {
            await new Promise(resolve => setTimeout(resolve, 5 * 1000));
            return api.unsendMessage(info.messageID);
          }, messageID);
      }
    }

    if (command && command.config) {
      if (command.config.usePrefix === false && commandName.toLowerCase() !== command.config.name.toLowerCase()) {
        api.sendMessage(global.getText("handleCommand", "notMatched", command.config.name), event.threadID, event.messageID);
        return;
      }
      if (command.config.usePrefix === true && !body.startsWith(PREFIX)) {
        return;
      }
    }
    if (command && command.config) {
      if (typeof command.config.usePrefix === 'undefined') {
        api.sendMessage(global.getText("handleCommand", "noPrefix", command.config.name), event.threadID, event.messageID);
        return;
      }
    }

    if (command && command.config && command.config.commandCategory && command.config.commandCategory.toLowerCase() === 'nsfw' && !global.data.threadAllowNSFW.includes(threadID) && !ADMINBOT.includes(senderID))
      return api.sendMessage(global.getText("handleCommand", "threadNotAllowNSFW"), threadID, async (err, info) => {
        await new Promise(resolve => setTimeout(resolve, 5 * 1000))
        return api.unsendMessage(info.messageID);
      }, messageID);
    var threadInfo2;
    if (event.isGroup == !![])
      try {
        threadInfo2 = (threadInfo.get(threadID) || await Threads.getInfo(threadID))
        if (Object.keys(threadInfo2).length == 0) throw new Error();
      } catch (err) {
        logger(global.getText("handleCommand", "cantGetInfoThread", "error"));
      }

    var permssion = 0;
    var threadInfoo = (threadInfo.get(threadID) || await Threads.getInfo(threadID));
    const find = threadInfoo.adminIDs.find(el => el.id == senderID);
    if (OPERATOR.includes(senderID.toString())) permssion = 3;
    else if (ADMINBOT.includes(senderID.toString())) permssion = 2;
    else if (!ADMINBOT.includes(senderID) && find) permssion = 1;
    if (command && command.config && command.config.hasPermssion && command.config.hasPermssion > permssion) {
      return api.sendMessage(global.getText("handleCommand", "permissionNotEnough", command.config.name), event.threadID, event.messageID);
    }

    if (command && command.config && !clientCooldowns.has(command.config.name)) {
      clientCooldowns.set(command.config.name, new Map());
    }

    const timestamps = command && command.config ? clientCooldowns.get(command.config.name) : undefined;

    const expirationTime = (command && command.config && command.config.cooldowns || 1) * 1000;
    if (timestamps && timestamps.has(senderID)) {
      if (dateNow < timestamps.get(senderID) + expirationTime) {
        if (!cooldowns.has(senderID)) {
          await sendCooldownMessage(api, event, commandName, expirationTime);
          cooldowns.set(senderID, true);
        }
        return;
      } else {
        // Reset cooldown state after the cooldown period is over
        timestamps.delete(senderID);
      }
    }

    async function sendCooldownMessage(api, event, commandName, cooldownTime) {
      const cooldownMessage = `𝗔𝗡𝗧𝗜 𝗦𝗣𝗔𝗠 𝗖𝗗⚠️:\nPlease wait ${cooldownTime / 1000} second(s) 🕚 before using it again.`;
      const cooldownMsg = await api.sendMessage(cooldownMessage, event.threadID);

      // Set a timeout to automatically send a message when cooldown is done
      setTimeout(async () => {
        await api.sendMessage(`Cooldown for "${commandName}" is over. You can use it again.`, event.threadID);
        cooldowns.delete(senderID); // Remove the user from the cooldown list
        await api.unsendMessage(cooldownMsg.messageID); // Remove the cooldown message
      }, cooldownTime);
    }

    var getText2;
    if (command && command.languages && typeof command.languages === 'object' && command.languages.hasOwnProperty(global.config.language))

      getText2 = (...values) => {
        var lang = command.languages[global.config.language][values[0]] || '';
        for (var i = values.length; i > 0x2533 + 0x1105 + -0x3638; i--) {
          const expReg = RegExp('%' + i, 'g');
          lang = lang.replace(expReg, values[i]);
        }
        return lang;
      };
    else getText2 = () => { };
    try {
      const Obj = {
        api: api,
        event: event,
        args: args,
        models: models,
        Users: Users,
        Threads: Threads,
        Currencies: Currencies,
        permssion: permssion,
        getText: getText2
      };

      if (command && typeof command.run === 'function') {
        command.run(Obj);
        timestamps.set(senderID, dateNow);

        if (DeveloperMode == !![]) {
          logger(global.getText("handleCommand", "executeCommand", time, commandName, senderID, threadID, args.join(" "), (Date.now()) - dateNow) + '\n', "command");
        }

        return;
      }
    } catch (e) {
      return api.sendMessage(global.getText("handleCommand", "commandError", commandName, e), threadID);
    }
    activeCmd = false;
  };
};
