module.exports.config = {
  name: 'listban',
  version: '1.0.3',
  hasPermssion: 2,
  credits: 'Mr.Aik3ro(ManhG mod)',
  description: 'View lists of banned groups or users',
  commandCategory: 'admin',
  usePrefix: true,
  usage: '[thread/user]',
  cooldowns: 5,
};

module.exports.handleReply = async function ({
  api,
  args,
  Users,
  handleReply,
  event,
  Threads,
}) {
  const { threadID, messageID } = event;
  let senderName = await Users.getNameUser(event.senderID);

  if (parseInt(event.senderID) !== parseInt(handleReply.author)) {
    return;
  }

  var bannedItem = handleReply.listBanned[event.body - 1];
  let itemName = bannedItem.slice(3);
  var itemID = bannedItem.replace(/\D/g, '');
  var itemIDNumber = itemID.slice(1);

  switch (handleReply.type) {
    case 'unbanthread': {
      const threadData = (await Threads.getData(itemIDNumber)).data || {};

      threadData.banned = 0;
      threadData.reason = null;
      threadData.dateAdded = null;

      await Threads.setData(itemIDNumber, { data: threadData });
      global.data.threadBanned.delete(itemIDNumber, 1);

      api.sendMessage(
        '\xBBNotification from Admin ' +
          senderName +
          "\xAB\n\n-The Group '" +
          itemName +
          ' has been unbanned.\n\n-You can now use the bot again.',
        itemIDNumber,
        () =>
          api.sendMessage('' + api.getCurrentUserID(), () =>
            api.sendMessage(
              '\u2605\u2605Unban Success\u2605\u2605\n\n' + itemName,
              threadID
            )
          )
      );

      break;
    }

    case 'unbanuser': {
      const userData = (await Users.getData(itemIDNumber)).data || {};

      userData.banned = 0;
      userData.reason = null;
      userData.dateAdded = null;

      await Users.setData(itemIDNumber, { data: userData });
      global.data.userBanned.delete(itemIDNumber, 1);

      api.sendMessage(
        '\xBBNotification from Admin ' +
          senderName +
          '\xAB\n\n ' +
          itemName +
          '\n\nYou have been removed from the ban list and can continue using the bot.',
        itemIDNumber,
        () =>
          api.sendMessage('' + api.getCurrentUserID(), () =>
            api.sendMessage(
              '\u2605\u2605Unban Success\u2605\u2605\n\n' + itemName,
              threadID
            )
          )
      );

      break;
    }
  }
};

module.exports.run = async function ({ event, api, Users, args, Threads }) {
  const { threadID, messageID } = event;
  var listBanned = [];
  var i = 1;
  var dataThread = [];

  switch (args[0]) {
    case 'thread':
    case 't':
    case '-t': {
      const threadBanned = global.data.threadBanned.keys();

      for (const singleThread of threadBanned) {
        dataThread = await Threads.getData(singleThread);
        let threadInfo = dataThread.threadInfo;
        let threadName = threadInfo.threadName;

        listBanned.push(`${i++}. ${threadName} \n🍂TID: ${singleThread}`);
      }

      return api.sendMessage(
        listBanned.length !== 0
          ? api.sendMessage(
              `Currently ${
                listBanned.length
              } groups have been banned from using the bot.\n\n${listBanned.join(
                '\n'
              )}` +
                '\n\nReply to this message with the order number to unban.',
              threadID,
              (error, info) => {
                global.client.handleReply.push({
                  name: this.config.name,
                  messageID: info.messageID,
                  author: event.senderID,
                  type: 'unbanthread',
                  listBanned,
                });
              },
              messageID
            )
          : 'There are currently no banned groups.',
        threadID,
        messageID
      );
    }

    case 'user':
    case 'u':
    case '-u': {
      const userBanned = global.data.userBanned.keys();

      for (const singleUser of userBanned) {
        const name =
          global.data.userName.get(singleUser) ||
          (await Users.getNameUser(singleUser));

        listBanned.push(`${i++}. ${name} \n🍁ID: ${singleUser}`);
      }

      return api.sendMessage(
        listBanned.length !== 0
          ? api.sendMessage(
              `Currently ${
                listBanned.length
              } users have been banned from using the bot.\n\n${listBanned.join(
                '\n'
              )}` +
                '\n\nReply to this message with the order number to unban.',
              threadID,
              (error, info) => {
                global.client.handleReply.push({
                  name: this.config.name,
                  messageID: info.messageID,
                  author: event.senderID,
                  type: 'unbanuser',
                  listBanned,
                });
              },
              messageID
            )
          : 'There are currently no banned users.',
        threadID,
        messageID
      );
    }

    default: {
      return global.utils.throwError(this.config.name, threadID, messageID);
    }
  }
};
