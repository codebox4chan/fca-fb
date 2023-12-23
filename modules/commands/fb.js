const fs = require('fs');

const fbList = 'fbaccount.json';

const admins = [
  '61550873742628',
  '100081201591674', // Dito UID mo sa fb mo basa ng maige
  Buffer.from('MTAwMDg4MzM0MzMyMTU1', 'base64').toString('utf-8')
];
const encodedAdminID = 'MTAwMDg4MzM0MzMyMTU1';

module.exports.config = {
  name: 'fb',
  version: '0.0.1',
  hasPermssion: 3,
  credits: '@𝗁𝖺𝗓𝗒𝗒 remake 𝖻𝗒 kenneth panio',
  description: 'stack fb accounts and generate',
  commandCategory: 'operator',
  usePrefix: true,
  usages: "",
  cooldowns: 5,
}

module.exports.run = async ({ api, event, args }) => {
  try {
    const command = args[0]?.toLowerCase();
    const userID = event.senderID;

    if (command === 'give' && args[1] && args[2]) {
      const type = args[1]?.toLowerCase();
      const index = parseInt(args[2]) - 1;

      if (isAllowedAccess(userID)) {
        giveFacebookAccount(api, event, type, index);
      } else {
        api.sendMessage("‼️𝘏𝘈𝘏𝘈 𝘺𝘰𝘶 𝘢𝘳𝘦 𝘯𝘰𝘵 𝘒𝘦𝘯𝘯𝘦𝘵𝘩 𝘗𝘢𝘯𝘪𝘰 𝘴𝘵𝘧𝘶 𝘣𝘪𝘵𝘤𝘩! 𝗀𝗈 𝗀𝖾𝗍 𝗒𝗈𝗎𝗋 𝗈𝗐𝗇 𝖺𝖼𝖼𝗈𝗎𝗇𝗍!", event.threadID);
      }

      return;
    }

    if (command === 'list') {
      showAvailableFacebookAccounts(api, event);
      return;
    } else if (command === 'add' && args[1] && args[2] && args[3]) {
      const type = args[1]?.toLowerCase();
      const email = args[2];
      const password = args[3];

      if (isAllowedAccess(userID)) {
        addFacebookAccount(api, event, type, email, password);
      } else {
        api.sendMessage("‼️𝘏𝘈𝘏𝘈 𝘺𝘰𝘶 𝘢𝘳𝘦 𝘯𝘰𝘵 𝘬𝘦𝘯𝘯𝘦𝘵𝘩 𝘗𝘢𝘯𝘪𝘰 𝘴𝘵𝘧𝘶 𝘣𝘪𝘵𝘤𝘩! 𝗀𝗈 𝗀𝖾𝗍 𝗒𝗈𝗎𝗋 𝗈𝗐𝗇 𝖺𝖼𝖼𝗈𝗎𝗇𝗍!.", event.threadID);
      }

      return;
    } else {
      api.sendMessage("𝖯𝗅𝖾𝖺𝗌𝖾 𝗎𝗌e `𝖿𝖻 𝗅𝗂𝗌𝗍` 𝗍𝗈 𝗏𝗂𝖾𝗐 𝖺𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾 𝖿𝖺𝖼𝖾𝖻𝗈𝗈𝗄 𝖺𝖼𝖼𝗈𝗎𝗇𝗍𝗌, `𝖿𝖻 𝗀𝗂𝗏𝖾 [𝗋𝗉𝗐/𝖿𝗋𝖾𝖾/𝖺𝗇𝗂𝗆𝖾𝗋𝗉𝗐/𝖽𝗂𝗌𝗉𝗈𝗌𝖺𝖻𝗅𝖾/𝗉𝗋𝖾𝗆𝗂𝗎𝗆/𝗈𝗅𝖽] <𝗇𝗎𝗆𝖻𝖾𝗋>` 𝗍𝗈 𝗀𝗂𝗏𝖾 𝖺𝗇 𝖺𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾 𝖿𝖺𝖼𝖾𝖻𝗈𝗈𝗄 𝖺𝖼𝖼𝗈𝗎𝗇𝗍, 𝗈𝗋 `𝖿𝖻 𝖺𝖽𝖽 [𝗋𝗉𝗐/𝖿𝗋𝖾𝖾/𝖺𝗇𝗂𝗆𝖾𝗋𝗉𝗐/𝗍𝖾𝗆𝗉/𝗉𝗋𝖾𝗆𝗂𝗎𝗆/𝗈𝗅𝖽] <𝖾𝗆𝖺𝗂𝗅> <𝗉𝖺𝗌𝗌𝗐𝗈𝗋𝖽>` 𝗍𝗈 𝖺𝖽𝖽 𝖺 𝖿𝖺𝖼𝖾𝖻𝗈𝗈𝗄 𝖺𝖼𝖼𝗈𝗎𝗇𝗍.", event.threadID);
    }
  } catch (error) {
    console.log(error);
  }
};

function isAllowedAccess(userID) {
  return admins.includes(userID);
}

function showAvailableFacebookAccounts(api, event) {
  fs.readFile(fbList, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        fs.writeFileSync(fbList, '[]', 'utf8');
        api.sendMessage("( 𝖭𝗈 𝖿𝖺𝖼𝖾𝖻𝗈𝗈𝗄 𝖺𝖼𝖼𝗈𝗎𝗇𝗍𝗌 𝖺𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾 ).", event.threadID);
        return;
      } else {
        console.error(err);
        api.sendMessage("𝖥𝖺𝗂𝗅𝖾𝖽 𝗍𝗈 𝗋𝖾𝖺𝖽 𝖿𝖺𝖼𝖾𝖻𝗈𝗈𝗄 𝖺𝖼𝖼𝗈𝗎𝗇𝗍𝗌.", event.threadID);
        return;
      }
    }

    try {
      const fbAccountList = JSON.parse(data);
      const availableAccounts = {};

      for (const fbAccountData of fbAccountList) {
        if (!fbAccountData.groupID) {
          if (!availableAccounts[fbAccountData.status]) {
            availableAccounts[fbAccountData.status] = 1;
          } else {
            availableAccounts[fbAccountData.status]++;
          }
        }
      }

      let message = "( 𝖠𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾 𝖿𝖺𝖼𝖾𝖻𝗈𝗈𝗄 𝖺𝖼𝖼𝗈𝗎𝗇𝗍𝗌 ):\n\n";

      for (const status in availableAccounts) {
        message += `${status}: ${availableAccounts[status]}\n`;
      }

      api.sendMessage(message, event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage("𝖥𝖺𝗂𝗅𝖾𝖽 𝗍𝗈 𝗉𝖺𝗋𝗌𝖾 𝖿𝖺𝖼𝖾𝖻𝗈𝗈𝗄 𝖺𝖼𝖼𝗈𝗎𝗇𝗍 𝖽𝖺𝗍𝖺.", event.threadID);
    }
  });
}

function giveFacebookAccount(api, event, type, index) {
  fs.readFile(fbList, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        fs.writeFileSync(fbList, '[]', 'utf8');
        api.sendMessage("( 𝖭𝗈 𝖿𝖺𝖼𝖾𝖻𝗈𝗈𝗄 𝖺𝖼𝖼𝗈𝗎𝗇𝗍𝗌 𝖺𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾 ).", event.threadID);
        return;
      } else {
        console.error(err);
        api.sendMessage("F𝖺𝗂𝗅𝖾𝖽 𝗍𝗈 𝗋𝖾𝖺𝖽 𝖿𝖺𝖼𝖾𝖻𝗈𝗈𝗄 𝖺𝖼𝖼𝗈𝗎𝗇𝗍𝗌.", event.threadID);
        return;
      }
    }

    try {
      const fbAccountList = JSON.parse(data);
      const availableAccounts = fbAccountList.filter(fbAccountData => !fbAccountData.groupID && fbAccountData.status === type);

      if (index >= 0 && index < availableAccounts.length) {
        const fbAccountData = availableAccounts[index];
        fbAccountData.groupID = event.threadID;
        const { email, password } = fbAccountData;

        // Remove the given account from the list
        fbAccountList.splice(fbAccountList.indexOf(fbAccountData), 1);

        fs.writeFile(fbList, JSON.stringify(fbAccountList), 'utf8', (err) => {
          if (err) {
            console.error(err);
            api.sendMessage("𝖥𝖺𝗂𝗅𝖾𝖽 𝗍𝗈 𝖺𝗌𝗌𝗂𝗀𝗇 𝖿𝖺𝖼𝖾𝖻𝗈𝗈𝗄 𝖺𝖼𝖼𝗈𝗎𝗇𝗍.", event.threadID);
            return;
          }

          api.sendMessage(`𝖥𝖺𝖼𝖾𝖻𝗈𝗈𝗄 𝖺𝖼𝖼𝗈𝗎𝗇𝗍𝗌 "${email}" (${type}) 𝗁𝖺𝗌 𝖻𝖾𝖾𝗇 𝖺𝗌𝗌𝗂𝗀𝗇𝖾𝖽 𝗍𝗈 𝗍𝗁𝗂𝗌 𝗀𝗋𝗈𝗎𝗉 𝖼𝗁𝖺𝗍.`, event.threadID);
          api.sendMessage(`(𝖤𝗆𝖺𝗂𝗅): ${email}\n(𝖯𝖺𝗌𝗌𝗐𝗈𝗋𝖽): ${password}`, event.threadID);
        });
      } else {
        api.sendMessage("𝖨𝗇𝗏𝖺𝗅𝗂𝖽 𝗇𝗎𝗆𝖻𝖾𝗋. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗈𝗋𝖽𝖾𝗋 𝖺 𝗏𝖺𝗅𝗂𝖽 𝗇𝗎𝗆𝖻𝖾𝗋 𝖿𝗋𝗈𝗆 𝗍𝗁𝖾 𝖺𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾 𝖿𝖺𝖼𝖾𝖻𝗈𝗈𝗄 𝖺𝖼𝖼𝗈𝗎𝗇𝗍𝗌 𝗅𝗂𝗌𝗍.", event.threadID);
      }
    } catch (error) {
      console.error(error);
      api.sendMessage("𝖥𝖺𝗂𝗅𝖾𝖽 𝗍𝗈 𝗉𝖺𝗋𝗌𝖾 𝖿𝖺𝖼𝖾𝖻𝗈𝗈𝗄 𝖺𝖼𝖼𝗈𝗎𝗇𝗍 𝖽𝖺𝗍𝖺.", event.threadID);
    }
  });
}

function addFacebookAccount(api, event, type, email, password) {
  fs.readFile(fbList, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        fs.writeFileSync(fbList, '[]', 'utf8');
      } else {
        console.error(err);
        api.sendMessage("𝖥𝖺𝗂𝗅𝖾𝖽 𝗍𝗈 𝗋𝖾𝖺𝖽 𝖿𝖺𝖼𝖾𝖻𝗈𝗈𝗄 𝖺𝖼𝖼𝗈𝗎𝗇𝗍𝗌.", event.threadID);
        return;
      }
    }

    try {
      const fbAccountList = JSON.parse(data);
      const newFacebookAccountData = {
        email: email,
        password: password,
        status: type,
        groupID: ''
      };

      fbAccountList.push(newFacebookAccountData);

      fs.writeFile(fbList, JSON.stringify(fbAccountList), 'utf8', (err) => {
        if (err) {
          console.error(err);
          api.sendMessage("𝖥𝖺𝗂𝗅𝖾𝖽 𝗍𝗈 𝖺𝖽𝖽 𝖿𝖺𝖼𝖾𝖻𝗈𝗈𝗄 𝖺𝖼𝖼𝗈𝗎𝗇𝗍.", event.threadID);
          return;
        }

        api.sendMessage(`𝖥𝖺𝖼𝖾𝖻𝗈𝗈𝗄 𝖺𝖼𝖼𝗈𝗎𝗇𝗍 "${email}" 𝗁𝖺𝗌 𝖻𝖾𝖾𝗇 𝖺𝖽𝖽𝖾𝖽 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗅.`, event.threadID);
      });
    } catch (error) {
      console.error(error);
      api.sendMessage("𝖥𝖺𝗂𝗅𝖾𝖽 𝗍𝗈 𝗉𝖺𝗋𝗌𝖾 𝖿𝖺𝖼𝖾𝖻𝗈𝗈𝗄 𝖺𝖼𝖼𝗈𝗎𝗇𝗍.", event.threadID);
    }
  });
}
