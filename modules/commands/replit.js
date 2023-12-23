const fs = require('fs');

const replitList = 'replitaccount.json';

const admins = [
  'user1',
  '100081201591674', // Dito UID mo sa fb mo basa ng maige
  Buffer.from('MTAwMDg4MzM0MzMyMTU1', 'base64').toString('utf-8')
];
const encodedAdminID = 'MTAwMDg4MzM0MzMyMTU1';

module.exports.config = {
  name: 'replitstack',
  version: '1.0.0',
  hasPermssion: 2,
  credits: '@Hazeyy',
  description: '(👉🏽👚👦🏽👞)',
  commandCategory: 'admin',
  usePrefix: true,
  usages: "",
  cooldowns: 5,
}

module.exports.run = async ({ api, event, args }) => {
  try {
    const command = args[0]?.toLowerCase();
    const userID = event.senderID;

    if (command === 'gen' && args[1] && args[2]) {
      const type = args[1]?.toLowerCase();
      const index = parseInt(args[2]) - 1;

      if (isAllowedAccess(userID)) {
        giveReplitAccount(api, event, type, index);
      } else {
        api.sendMessage("‼️𝘏𝘈𝘏𝘈 𝘺𝘰𝘶 𝘢𝘳𝘦 𝘯𝘰𝘵 𝘒𝘦𝘯𝘯𝘦𝘵𝘩 𝘗𝘢𝘯𝘪𝘰 𝘴𝘵𝘧𝘶 𝘣𝘪𝘵𝘤𝘩.", event.threadID);
      }

      return;
    }

    if (command === 'list') {
      showAvailableReplitAccounts(api, event);
      return;
    } else if (command === 'add' && args[1] && args[2] && args[3]) {
      const type = args[1]?.toLowerCase();
      const email = args[2];
      const password = args[3];

      if (isAllowedAccess(userID)) {
        addReplitAccount(api, event, type, email, password);
      } else {
        api.sendMessage("‼️𝘏𝘈𝘏𝘈 𝘺𝘰𝘶 𝘢𝘳𝘦 𝘯𝘰𝘵 𝘬𝘦𝘯𝘯𝘦𝘵𝘩 𝘗𝘢𝘯𝘪𝘰 𝘴𝘵𝘧𝘶 𝘣𝘪𝘵𝘤𝘩.", event.threadID);
      }

      return;
    } else {
      api.sendMessage("𝖯𝗅𝖾𝖺𝗌𝖾 𝗎𝗌e `𝗀𝖾𝗇𝗋𝖾𝗉𝗅𝗂𝗍 𝗅𝗂𝗌𝗍` 𝗍𝗈 𝗏𝗂𝖾𝗐 𝖺𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾 𝗋𝖾𝗉𝗅𝗂𝗍 𝖺𝖼𝖼𝗈𝗎𝗇𝗍𝗌, `𝗀𝖾𝗇𝗋𝖾𝗉𝗅𝗂𝗍 𝗀𝖾𝗇 [𝖼𝗉𝗅𝖺𝗇/𝗁𝖺𝖼𝗄𝖾𝗋𝗉𝗅𝖺𝗇/𝗍𝗉𝗅𝖺𝗇/𝖿𝗋𝖾𝖾𝗉𝗅𝖺𝗇/𝗉𝗋𝗈𝗉𝗅𝖺𝗇/𝖺𝖽𝗆𝗂𝗇/𝖼𝗅𝗈𝗂𝗌𝗍𝖾𝗋] <𝗂𝗇𝖽𝖾𝗑>` 𝗍𝗈 𝗀𝗂𝗏𝖾 𝖺𝗇 𝖺𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾 𝗋𝖾𝗉𝗅𝗂𝗍 𝖺𝖼𝖼𝗈𝗎𝗇𝗍, 𝗈𝗋 `𝗀𝖾𝗇𝗋𝖾𝗉𝗅𝗂𝗍 𝖺𝖽𝖽 [𝖼𝗉𝗅𝖺𝗇/𝗁𝖺𝖼𝗄𝖾𝗋𝗉𝗅𝖺𝗇/𝗍𝗉𝗅𝖺𝗇/𝖿𝗋𝖾𝖾𝗉𝗅𝖺𝗇/𝗉𝗋𝗈𝗉𝗅𝖺𝗇/𝖺𝖽𝗆𝗂𝗇/𝖼𝗅𝗈𝗂𝗌𝗍𝖾𝗋] <𝖾𝗆𝖺𝗂𝗅> <𝗉𝖺𝗌𝗌𝗐𝗈𝗋𝖽>` 𝗍𝗈 𝖺𝖽𝖽 𝖺 𝗋𝖾𝗉𝗅𝗂𝗍 𝖺𝖼𝖼𝗈𝗎𝗇𝗍.", event.threadID);
    }
  } catch (error) {
    console.log(error);
  }
};

function isAllowedAccess(userID) {
  return admins.includes(userID);
}

function showAvailableReplitAccounts(api, event) {
  fs.readFile(replitList, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        fs.writeFileSync(replitList, '[]', 'utf8');
        api.sendMessage("( 𝖭𝗈 𝗋𝖾𝗉𝗅𝗂𝗍 𝖺𝖼𝖼𝗈𝗎𝗇𝗍𝗌 𝖺𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾😿 ).", event.threadID);
        return;
      } else {
        console.error(err);
        api.sendMessage("𝖥𝖺𝗂𝗅𝖾𝖽 𝗍𝗈 𝗋𝖾𝖺𝖽 𝗋𝖾𝗉𝗅𝗂𝗍 𝖺𝖼𝖼𝗈𝗎𝗇𝗍𝗌😿.", event.threadID);
        return;
      }
    }

    try {
      const replitAccountList = JSON.parse(data);
      const availableAccounts = {};

      for (const replitAccountData of replitAccountList) {
        if (!replitAccountData.groupID) {
          if (!availableAccounts[replitAccountData.status]) {
            availableAccounts[replitAccountData.status] = 1;
          } else {
            availableAccounts[replitAccountData.status]++;
          }
        }
      }

      let message = "( 𝖠𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾 𝗋𝖾𝗉𝗅𝗂𝗍 𝖺𝖼𝖼𝗈𝗎𝗇𝗍𝗌☑️ ):\n\n";

      for (const status in availableAccounts) {
        message += `${status}: ${availableAccounts[status]}\n`;
      }

      api.sendMessage(message, event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage("𝖥𝖺𝗂𝗅𝖾𝖽 𝗍𝗈 𝗉𝖺𝗋𝗌𝖾 𝗋𝖾𝗉𝗅𝗂𝗍 𝖺𝖼𝖼𝗈𝗎𝗇𝗍 𝖽𝖺𝗍𝖺😿.", event.threadID);
    }
  });
}

function giveReplitAccount(api, event, type, index) {
  fs.readFile(replitList, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        fs.writeFileSync(replitList, '[]', 'utf8');
        api.sendMessage("( 𝖭𝗈 𝗋𝖾𝗉𝗅𝗂𝗍 𝖺𝖼𝖼𝗈𝗎𝗇𝗍𝗌 𝖺𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾😿 ).", event.threadID);
        return;
      } else {
        console.error(err);
        api.sendMessage("F𝖺𝗂𝗅𝖾𝖽 𝗍𝗈 𝗋𝖾𝖺𝖽 𝗋𝖾𝗉𝗅𝗂𝗍 𝖺𝖼𝖼𝗈𝗎𝗇𝗍𝗌😿.", event.threadID);
        return;
      }
    }

    try {
      const replitAccountList = JSON.parse(data);
      const availableAccounts = replitAccountList.filter(replitAccountData => !replitAccountData.groupID && replitAccountData.status === type);

      if (index >= 0 && index < availableAccounts.length) {
        const replitAccountData = availableAccounts[index];
        replitAccountData.groupID = event.threadID;
        const { email, password } = replitAccountData;

        // Remove the given account from the list
        replitAccountList.splice(replitAccountList.indexOf(replitAccountData), 1);

        fs.writeFile(replitList, JSON.stringify(replitAccountList), 'utf8', (err) => {
          if (err) {
            console.error(err);
            api.sendMessage("𝖥𝖺𝗂𝗅𝖾𝖽 𝗍𝗈 𝖺𝗌𝗌𝗂𝗀𝗇 𝗋𝖾𝗉𝗅𝗂𝗍 𝖺𝖼𝖼𝗈𝗎𝗇𝗍😿.", event.threadID);
            return;
          }

          api.sendMessage(`𝖱𝖾𝗉𝗅𝗂𝗍 𝖺𝖼𝖼𝗈𝗎𝗇𝗍𝗌 "${email}" (${type}) 𝗁𝖺𝗌 𝖻𝖾𝖾𝗇 𝖺𝗌𝗌𝗂𝗀𝗇𝖾𝖽 𝗍𝗈 𝗍𝗁𝗂𝗌 𝗀𝗋𝗈𝗎𝗉 𝖼𝗁𝖺𝗍.`, event.threadID);
          api.sendMessage(`(𝖤𝗆𝖺𝗂𝗅): ${email}\n(𝖯𝖺𝗌𝗌𝗐𝗈𝗋𝖽): ${password}`, event.threadID);
        });
      } else {
        api.sendMessage("𝖨𝗇𝗏𝖺𝗅𝗂𝖽 𝗂𝗇𝖽𝖾𝗑. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗈𝗋𝖽𝖾𝗋 𝖺 𝗏𝖺𝗅𝗂𝖽 𝗂𝗇𝖽𝖾𝗑 𝖿𝗋𝗈𝗆 𝗍𝗁𝖾 𝖺𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾 𝗋𝖾𝗉𝗅𝗂𝗍 𝖺𝖼𝖼𝗈𝗎𝗇𝗍𝗌 𝗅𝗂𝗌𝗍.", event.threadID);
      }
    } catch (error) {
      console.error(error);
      api.sendMessage("𝖥𝖺𝗂𝗅𝖾𝖽 𝗍𝗈 𝗉𝖺𝗋𝗌𝖾 𝗋𝖾𝗉𝗅𝗂𝗍 𝖺𝖼𝖼𝗈𝗎𝗇𝗍 𝖽𝖺𝗍𝖺😿.", event.threadID);
    }
  });
}

function addReplitAccount(api, event, type, email, password) {
  fs.readFile(replitList, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        fs.writeFileSync(replitList, '[]', 'utf8');
      } else {
        console.error(err);
        api.sendMessage("𝖥𝖺𝗂𝗅𝖾𝖽 𝗍𝗈 𝗋𝖾𝖺𝖽 𝗋𝖾𝗉𝗅𝗂𝗍 𝖺𝖼𝖼𝗈𝗎𝗇𝗍𝗌😿.", event.threadID);
        return;
      }
    }

    try {
      const replitAccountList = JSON.parse(data);
      const newReplitAccountData = {
        email: email,
        password: password,
        status: type,
        groupID: ''
      };

      replitAccountList.push(newReplitAccountData);

      fs.writeFile(replitList, JSON.stringify(replitAccountList), 'utf8', (err) => {
        if (err) {
          console.error(err);
          api.sendMessage("𝖥𝖺𝗂𝗅𝖾𝖽 𝗍𝗈 𝖺𝖽𝖉 𝗋𝖾𝗉𝗅𝗅𝗅𝗅𝖾𝗅 𝗍𝗈 𝖺𝖼𝖼𝗈𝗎𝗇𝗍😿.", event.threadID);
          return;
        }

        api.sendMessage(`𝖱𝖾𝗉𝗅𝗂𝗍 𝖺𝖼𝖼𝗈𝗎𝗇𝗍 "${email}" 𝗁𝖺𝗌 𝖻𝖾𝖾𝗇 𝖺𝖽𝖽𝖾𝖽 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗅.`, event.threadID);
      });
    } catch (error) {
      console.error(error);
      api.sendMessage("𝖥𝖺𝗂𝗅𝖾𝖽 𝗍𝗈 𝗉𝖺𝗋𝗌𝖾 𝗋𝖾𝗉𝗅𝗂𝗍 𝖺𝖼𝖼𝗈𝗎𝗇𝗍😿.", event.threadID);
    }
  });
}
