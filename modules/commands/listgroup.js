module.exports.config = {
  name: 'listgroup',
  version: '1.0.0',
  credits: '???',
  hasPermssion: 2,
  description: 'group list',
  commandCategory: 'group',
  usages: '',
  usePrefix: true,
  cooldowns: 0
};

module.exports.handleReply = async function({ api, event, args, Threads, handleReply }) {
  if (parseInt(event.senderID) !== parseInt(handleReply.author)) return;

  var arg = event.body.split(" ");
  var idgr = handleReply.groupid[arg[1] - 1];

  switch (handleReply.type) {
    case "reply": {
      if (arg[0] == "ban" || arg[0] == "Ban") {
        const data = (await Threads.getData(idgr)).data || {};
        data.banned = 1;
        await Threads.setData(idgr, { data });
        global.data.threadBanned.set(parseInt(idgr), 1);
        api.sendMessage(`[${idgr}] 𝗜𝘁 𝘄𝗮𝘀 𝘀𝘂𝗰𝗰𝗲𝘀𝘀𝗳𝘂𝗹!`, event.threadID, event.messageID);
        break;
      }

      if (arg[0] == "leave" || arg[0] == "Leave") {
        api.removeUserFromGroup(`${api.getCurrentUserID()}`, idgr);
        api.sendMessage(" 𝗟𝗲𝗮𝘃𝗲 𝗚𝗿𝗼𝘂𝗽 𝘄𝗶𝘁𝗵 𝗜𝗗: " + idgr + "\n" + (await Threads.getData(idgr)).name, event.threadID, event.messageID);
        break;
      }
    }
  }
};

module.exports.run = async function({ api, event, client }) {
  var inbox = await api.getThreadList(100, null, ['INBOX']);
  let list = [...inbox].filter(group => group.isSubscribed && group.isGroup);

  var listthread = [];

  for (var groupInfo of list) {
    let data = (await api.getThreadInfo(groupInfo.threadID));

    listthread.push({
      id: groupInfo.threadID,
      name: groupInfo.name,
      sotv: data.userInfo.length,
    });
  }

  var listbox = listthread.sort((a, b) => {
    if (a.sotv > b.sotv) return -1;
    if (a.sotv < b.sotv) return 1;
  });

  let msg = '',
    i = 1;
  var groupid = [];
  for (var group of listbox) {
    msg += `${i++}. ${group.name}\n✦𝗧𝗵𝗿𝗲𝗮𝗱𝗜𝗗: ${group.id}\n✦𝗨𝗦𝗘𝗥𝗦: ${group.sotv}\n\n`;
    groupid.push(group.id);
  }

  const data = await api.sendMessage(msg + '𝗥𝗲𝗽𝗹𝘆 "𝗼𝘂𝘁" 𝗼𝗿 "𝗯𝗮𝗻" 𝘁𝗵𝗲 𝗻𝘂𝗺𝗯𝗲𝗿 𝗼𝗳 𝗼𝗿𝗱𝗲𝗿 𝘁𝗼 𝗼𝘂𝘁 𝗼𝗿 𝗯𝗮𝗻 𝘁𝗵𝗮𝘁 𝘁𝗵𝗿𝗲𝗮𝗱!!', event.threadID);
  global.client.handleReply.push({
    name: this.config.name,
    author: event.senderID,
    messageID: data.messageID,
    groupid,
    type: 'reply'
  });
};
