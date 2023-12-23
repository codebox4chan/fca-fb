const axios = require('axios');

module.exports.config = {
  name: "umaminspam",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Minn", // dont remove please:((
  description: "send multiple umamin.link messages to user",
  usePrefix: true,
  commandCategory: "tools",
  usages: "<username> <message> <quantity>",
  cooldowns: 10,
};
module.exports.run = async function ({ api, event, args }) {
  try {
    if (args.length < 3) {
      api.sendMessage(`usage: umaminspam <username> <message> +<quantity>\nexample: umaminspam yuzu hello 50`, event.threadID, event.messageID);
      return;
    }

    const username = args[0];
    const message = args.slice(1, -1).join(' ');

    let quantityArg = args[args.length - 1];
    quantityArg = quantityArg.replace(/\s/g, '');
    quantityArg = quantityArg.startsWith('+') ? quantityArg.substring(1) : quantityArg;

    const quantity = parseInt(quantityArg);

    if (isNaN(quantity)) {
      api.sendMessage(`invalid quantity provided.\nusage: umaminspam <username> <message> <quantity>`, event.threadID, event.messageID);
      return;
    }
    const variables = {
      input: {
        receiverUsername: username,
        content: message,
        receiverMsg: "Send me an anonymous message!",
        clue: "",
      },
    };
    const gquery = `mutation sendMessage($input: SendMessageInput!) {
      sendMessage(input: $input)
    }`;
    for (let i = 0; i < quantity; i++) {
      await axios.post('https://umamin.link/api/graphql', {
        query: gquery,
        variables: variables,
        operationName: 'sendMessage',
      });
    }
    api.sendMessage(`sent ${quantity} anonymous messages to ${username}`, event.threadID);
  } catch (error) {
    console.error(error);
    api.sendMessage('an error occurred.', event.threadID, event.messageID);
  }
};