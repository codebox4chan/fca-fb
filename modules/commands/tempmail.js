const axios = require('axios');

module.exports.config = {
  name: 'tempv2',
  version: '1.0.0',
  hasPermssion: 0,
  credits: '@Hazeyy',
  usePrefix: false,
  description: '( Generates temporary email addresses )',
  commandCategory: 'tools',
  usages: '( Gen )',
  cooldowns: 5,
  dependencies: { axios: '0.21.1' },
};

module.exports.run = async ({ api, event, args }) => {
  const action = args[0].toLowerCase();

  if (action === 'gen') {
    try {
      const count = args[1] || 1;
      const response = await axios.get(
        `https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=${count}`
      );
      const emails = response.data;
      const emailList = '\n' + emails.join('\n');
      api.sendMessage(emailList, event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage(
        '𝖤𝗋𝗋𝗈𝗋 𝖮𝖼𝖼𝗎𝗋𝖾𝖽! 𝖶𝗁𝗂𝗅𝖾 𝖦𝖾𝗇𝖾𝗋𝖺𝗍𝗂𝗇𝗀 𝖤𝗆𝖺𝗂𝗅 𝖠𝖽𝗋𝖾𝗌𝗌!',
        event.threadID
      );
    }
  } else if (action === 'domains') {
    try {
      const response = await axios.get(
        'https://www.1secmail.com/api/v1/?action=getDomainList'
      );
      const domains = response.data;
      const domainList = 'Active Domains:\n' + domains.join('\n');
      api.sendMessage(domainList, event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage(
        '𝖤𝗋𝗋𝗈𝗋 𝖮𝖼𝖼𝗎𝗋𝖾𝖽 𝖶𝗁𝗂𝗅𝖾 𝖥𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝖣𝖺𝗍𝖺 𝖥𝗋𝗈𝗆 𝖠𝖼𝗍𝗂𝗏𝖾 𝖣𝗈𝗆𝖺𝗂𝗇𝗌!',
        event.threadID
      );
    }
  } else if (action === 'msg') {
    try {
      const randomUsername = generateRandomUsername();
      const response = await axios.get(
        'https://www.1secmail.com/api/v1/?action=getDomainList'
      );
      const domains = response.data;
      const randomDomain = pickRandomDomain(domains);
      const messages = await axios.get(
        `https://www.1secmail.com/api/v1/?action=getMessages&login=${randomUsername}&domain=${randomDomain}`
      );
      const messageList = messages.data;

      if (messageList.length === 0) {
        api.sendMessage('𝖭𝗈 𝗆𝗌𝗀 𝖿𝗈𝗎𝗇𝖽 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇!', event.threadID);
        return;
      }

      let messageDetails = '';
      messageList.forEach((message, index) => {
        messageDetails += `Email ${index + 1}:\n`;
        messageDetails += `From: ${message.from}\n`;
        messageDetails += `Subject: ${message.subject}\n`;
        messageDetails += `Date: ${message.date}\n\n`;
      });

      api.sendMessage(messageDetails, event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage(
        '𝖤𝗋𝗋𝗈𝗋 𝖮𝖼𝖼𝗎𝗋𝖾𝖽 𝖶𝗁𝗂𝗅𝖾 𝖥𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝖣𝖺𝗍𝖺!',
        event.threadID
      );
    }
  } else if (action === 'inbox') {
    const email = args[1];

    if (!email) {
      api.sendMessage(
        '𝖯𝗅𝖾𝖺𝗌𝖾 𝖯𝗋𝗈𝗏𝗂𝖽𝖾 𝖤𝗆𝖺𝗂𝗅 𝖠𝖽𝖽𝗋𝖾𝗌𝗌!',
        event.threadID
      );
      return;
    }

    const username = getUsernameFromEmail(email);

    if (!username) {
      api.sendMessage(
        '𝖨𝗇𝗏𝖺𝗅𝗂𝖽 𝖾𝗆𝖺𝗂𝗅 𝖺𝖽𝖽𝗋𝖾𝗌𝗌 𝖿𝗈𝗋𝗆𝖺𝗍',
        event.threadID
      );
      return;
    }

    try {
      const response = await axios.get(
        'https://www.1secmail.com/api/v1/?action=getDomainList'
      );
      const domains = response.data;
      const randomDomain = pickRandomDomain(domains);
      const messages = await axios.get(
        `https://www.1secmail.com/api/v1/?action=getMessages&login=${username}&domain=${randomDomain}`
      );
      const messageList = messages.data;

      if (messageList.length === 0) {
        api.sendMessage('𝖭𝗈 𝗆𝗌𝗀 𝖿𝗈𝗎𝗇𝖽 𝗉𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇!', event.threadID);
        return;
      }

      let messageDetails = '';
      messageList.forEach((message, index) => {
        messageDetails += `Email ${index + 1}:\n`;
        messageDetails += `From: ${message.from}\n`;
        messageDetails += `Subject: ${message.subject}\n`;
        messageDetails += `Date: ${message.date}\n\n`;
      });

      api.sendMessage(messageDetails, event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage(
        '𝖤𝗋𝗋𝗈𝗋 𝖥𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝖣𝖺𝗍𝖺 𝖯𝗅𝖾𝖺𝗌𝖾 𝖳𝗋𝗒 𝖠𝗀𝖺𝗂𝗇!',
        event.threadID
      );
    }
  } else {
    api.sendMessage(
      '𝖨𝗇𝗏𝖺𝗅𝗂𝖽 𝖼𝗈𝗆𝗆𝖺𝗇𝖽. 𝖠𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽𝗌: 𝗀𝖾𝗇, 𝖽𝗈𝗆𝖺𝗂𝗇𝗌, 𝗆𝗌𝗀, 𝗂𝗇𝖻𝗈𝗑',
      event.threadID
    );
  }
};

function generateRandomUsername() {
  const prefix = 'shiki';
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let randomString = '';
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }
  const shuffledString = shuffleString(randomString);
  return prefix + shuffledString;
}

function pickRandomDomain(domainList) {
  const randomIndex = Math.floor(Math.random() * domainList.length);
  return domainList[randomIndex];
}

function shuffleString(inputString) {
  const charArray = inputString.split('');
  for (let i = charArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [charArray[i], charArray[randomIndex]] = [charArray[randomIndex], charArray[i]];
  }
  return charArray.join('');
}

function getUsernameFromEmail(email) {
  const atIndex = email.indexOf('@');
  if (atIndex !== -1) {
    return email.substring(0, atIndex);
  }
  return null;
}