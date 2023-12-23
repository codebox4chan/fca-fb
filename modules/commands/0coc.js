const axios = require('axios');
const path = require('path');
const fs = require('fs');

const Path = path.join(__dirname, '../../cocdev.json');
const rawData = fs.readFileSync(Path);
const jsonData = JSON.parse(rawData);
const apiKey = jsonData.apiKey.key;
const defaultClanTag = '#YJQ2U2C8';
const defaultPlayerTag = '#2J8QJUVPG';

module.exports.config = {
  name: 'coc',
  hasPermission: 0,
  version: '1.0 alpha',
  commandCategory: 'info',
  credits: 'codebox4chan | reiko dev | Kenneth Panio',
  usePrefix: true,
  cooldowns: 5,
  description: 'Clash of Clans',
  usages: '[function] [tag]',
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  const cocFunction = args[0];
  const cocTag = args.slice(1).join(' ');

  try {
    switch (cocFunction) {
      case 'clan':
        await getClanInfo(api, threadID, messageID, cocTag || defaultClanTag);
        break;
      case 'player':
        await getPlayerInfo(api, threadID, messageID, cocTag || defaultPlayerTag);
        break;
      case 'search':
        await clanSearch(api, threadID, messageID, cocTag);
        break;
      case 'war':
        await getCurrentWar(api, threadID, messageID, cocTag || defaultClanTag);
        break;
      case 'members':
        await getCurrentMembers(api, threadID, messageID, cocTag || defaultClanTag);
        break;
      default:
        api.sendMessage('Invalid function. Available functions: `clan [tag]`, `player [tag]`, `search [tag]`, members [tag]', threadID, messageID);
    }
  } catch (error) {
    handleError(api, threadID, messageID);
  }
};

async function getCurrentMembers(api, threadID, messageID, tag) {
  try {
    const response = await axios.get(`https://api.clashofclans.com/v1/clans/${encodeURIComponent(tag)}/members`, { headers: { 'Authorization': `Bearer ${apiKey}` } });
    const membersInfo = response.data.items;

    const members = membersInfo.map((member, index) => {
      return `${index + 1}. 𝗡𝗔𝗠𝗘: ${member.name}\n𝗥𝗢𝗟𝗘: ${member.role}\n𝗘𝗫𝗣-𝗟𝗘𝗩𝗘𝗟: ${member.expLevel}\n𝗧𝗛-𝗟𝗘𝗩𝗘𝗟: ${member.townHallLevel}\n𝗧𝗥𝗢𝗣𝗛𝗜𝗘𝗦: ${member.trophies}\n`;
    });
    api.sendMessage(`𝗖𝗟𝗔𝗡 𝗠𝗘𝗠𝗕𝗘𝗥𝗦:\n\n${members.join('\n')}`, threadID, messageID);
  } catch (error) {
    handleError(api, threadID, messageID, 'Error getting Clan Members');
  }
}

async function getCurrentWar(api, threadID, messageID, tag) {
  try {
    const response = await axios.get(`https://api.clashofclans.com/v1/clans/${encodeURIComponent(tag)}/currentwar`, { headers: { 'Authorization': `Bearer ${apiKey}` } });
    const currentWar = response.data.warStatus;
    api.sendMessage(`Debug Only${JSON.stringify(currentWar)}`, threadID, messageID);
  } catch (error) {
    handleError(api, threadID, messageID, 'Error fetching current war information');
  }
}

async function getClanInfo(api, threadID, messageID, tag) {
  try {
    const response = await axios.get(`https://api.clashofclans.com/v1/clans/${encodeURIComponent(tag)}`, { headers: { 'Authorization': `Bearer ${apiKey}` } });
    const clanInfo = response.data;

    const infoMessage = `𝗖𝗟𝗔𝗡 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗧𝗜𝗢𝗡:\n𝗡𝗔𝗠𝗘: ${clanInfo.name}\n𝗧𝗔𝗚: ${clanInfo.tag}\n𝗚𝗔𝗧𝗘: ${clanInfo.type}\n𝗗𝗘𝗦𝗖𝗥𝗜𝗣𝗧𝗜𝗢𝗡: ${clanInfo.description}\n𝗟𝗢𝗖𝗔𝗧𝗜𝗢𝗡: ${clanInfo.location.name}\n𝗟𝗘𝗩𝗘𝗟: ${clanInfo.clanLevel}\n𝗥𝗔𝗡𝗞: ${clanInfo.warLeague.name}\n𝗪𝗜𝗡𝗦: ${clanInfo.warWins}\n𝗠𝗘𝗠𝗕𝗘𝗥𝗦: ${clanInfo.members}`;
    api.sendMessage(infoMessage, threadID, messageID);
  } catch (error) {
    handleError(api, threadID, messageID, 'Error fetching Clan information');
  }
}

async function getPlayerInfo(api, threadID, messageID, tag) {
  try {
    const response = await axios.get(`https://api.clashofclans.com/v1/players/${encodeURIComponent(tag)}`, { headers: { 'Authorization': `Bearer ${apiKey}` } });
    const playerInfo = response.data;
    api.sendMessage(`Player Information:\n${JSON.stringify(playerInfo)}`, threadID, messageID);
  } catch (error) {
    handleError(api, threadID, messageID, 'Error fetching Player information');
  }
}

async function clanSearch(api, threadID, messageID, tag) {
  try {
    const response = await axios.get(`https://api.clashofclans.com/v1/clans?name=${tag}&limit=10`, { headers: { 'Authorization': `Bearer ${apiKey}` } });
    const clans = await response.data.items;

    if (clans && clans.length > 0) {
      const message = clans.map((clan, index) => `${index + 1}. 𝗡𝗔𝗠𝗘: ${clan.name}\n𝗧𝗔𝗚: ${clan.tag}\n𝗟𝗘𝗩𝗘𝗟: ${clan.clanLevel}\n𝗠𝗘𝗠𝗕𝗘𝗥𝗦: ${clan.members}\n𝗥𝗔𝗡𝗞: ${clan.warLeague.name}\n𝗟𝗢𝗖𝗔𝗧𝗜𝗢𝗡: ${clan.location.name}\n`).join('\n');
      api.sendMessage(`𝗦𝗘𝗔𝗥𝗖𝗛 𝗖𝗟𝗔𝗡𝗦 𝗙𝗢𝗨𝗡𝗗🔍:\n\n${message}`, threadID, messageID);
    } else {
      api.sendMessage(`No matching clans found for the search query "${tag}".`, threadID, messageID);
    }
  } catch (error) {
    handleError(api, threadID, messageID, 'Not Found!');
  }
}

function handleError(api, threadID, messageID, errorMessage = 'An error occurred while processing the command.') {
  console.error('Error:', errorMessage);
  api.sendMessage(errorMessage, threadID, messageID);
}
