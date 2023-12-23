const axios = require('axios');
const { parse } = require('url');

module.exports.config = {
  name: 'haxor',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'reiko seikiro',
  description: 'Grab sites from hax.or.id',
  commandCategory: 'tools',
  usePrefix: false,
  usages: '[FirstPage - LastPage]',
  cooldowns: 0,
  dependencies: [
  ],
};

module.exports.run = async function({ api, event, args }) {
  const [startPage, endPage] = args.join("").split('-');

  if (!startPage || !endPage) {
    api.sendMessage(`Please use the correct usage.\nExample: !haxor 1 - 2`, event.threadID, event.messageID);
    return;
  }

  const start = parseInt(startPage);
  const end = parseInt(endPage);

  if (isNaN(start) || isNaN(end) || start > end) {
    api.sendMessage('Invalid number.', event.threadID, event.messageID);
    return;
  }

  try {
    const urls = await startGrab(start, end);
    const link = urls.join('\n');
    
    let message = `𝗚𝗿𝗮𝗯 𝗩𝘂𝗹𝗻𝗲𝗿𝗮𝗯𝗹𝗲 𝗦𝗶𝘁𝗲𝘀 𝗳𝗿𝗼𝗺 𝗛𝗮𝘅.𝗼𝗿.𝗜𝗗💱:\n\nRemove ()\n\n${link}\n\n𝗣𝗮𝗴𝗲: ${start} to ${end}\n\n𝗗𝗲𝘃 𝗟𝗶𝗻𝗸: https://www.facebook.com/100081201591674`;

    api.sendMessage(message, event.threadID);
  } catch (error) {
    console.error('Something went wrong:', error);
    api.sendMessage('An error occurred while fetching the URLs. Please try again later.', event.threadID, event.messageID);
  }
};

const startGrab = async (firstPage, lastPage) => {
  const mainUrl = 'https://hax.or.id/archive?page=';
  const urls = [];

  for (let page = firstPage; page <= lastPage; page++) {
    const url = mainUrl + page;
    const response = await axios.get(url);
    const links = response.data.match(/<a[^>]+href=["'](https?:\/\/[^"']+)["'][^>]*>/gi);

      links.forEach((link) => {
        const href = link.match(/href=["'](https?:\/\/[^"']+)["']/i)[1];
      const parsedUrl = parse(href);
      const safeUrl = parsedUrl.protocol + '//' + parsedUrl.host.replace(/\./g, '(.)') + '/';
      urls.push(safeUrl);
    });
  }

  return urls;
};