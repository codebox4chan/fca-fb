const axios = require('axios');
const fs = require('fs');

module.exports.config = {
  name: 'wikipedia',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'August Quinn',
  description: 'Get Wikipedia information.',
  commandCategory: 'educational',
  usePrefix: true,
  usages: '[page_title]',
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  try {
    const pageTitle = encodeURIComponent(args.join(' '));

    if (!pageTitle) {
      return api.sendMessage('Kindly provide a page title.', event.threadID, event.messageID);
    }

    const processingMessage = await api.sendMessage('Processing, please wait...', event.threadID);

    const response = await axios.get(`https://wikipedia2.august-api.repl.co/wiki/${pageTitle}`);
    const { title, extract, imageUrl, url, pageId, lastRevision, lastRevisionId } = response.data;

    await api.unsendMessage(processingMessage.messageID);

    if (!extract) {
      return api.sendMessage(`No information found for "${args.join(' ')}".`, event.threadID, event.messageID);
    }

    let path = __dirname + "/cache/wikipedia_image.jpg";
    let hasError = false;

    try {
      let imageResponse = await axios.get(imageUrl, { responseType: "arraybuffer" });
      fs.writeFileSync(path, Buffer.from(imageResponse.data, "binary"));
    } catch (error) {
      console.error('Error fetching Wikipedia image:', error);
      hasError = true;
    }

    const message = `📖 Wikipedia Information for "${title}"\n\n𝗧𝗜𝗧𝗟𝗘: ${title}\n𝗖𝗢𝗡𝗧𝗘𝗡𝗧: ${extract || 'N/A'}\n\n𝗜𝗠𝗔𝗚𝗘 𝗨𝗥𝗟: ${imageUrl || 'N/A'}\n𝗨𝗥𝗟: ${url || 'N/A'}\n𝗣𝗔𝗚𝗘 𝗜𝗗: ${pageId || 'N/A'}\n𝗟𝗔𝗦𝗧 𝗥𝗘𝗩𝗜𝗦𝗜𝗢𝗡: ${lastRevision || 'N/A'}\n𝗟𝗔𝗦𝗧 𝗥𝗘𝗩𝗜𝗦𝗜𝗢𝗡 𝗜𝗗: ${lastRevisionId || 'N/A'}`;

    if (!hasError) {
      return api.sendMessage(
        { body: message, attachment: fs.createReadStream(path) },
        event.threadID,
        event.messageID
      );
    } else {
      return api.sendMessage(
        { body: message },
        event.threadID,
        event.messageID
      );
    }
  } catch (error) {
    console.error('Error fetching Wikipedia information:', error);
    return api.sendMessage('An error occurred while fetching Wikipedia information.', event.threadID);
  }
};