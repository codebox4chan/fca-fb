const axios = global.nodemodule.axios;
const googlethis = global.nodemodule.googlethis;
const fs = global.nodemodule['fs-extra'];
const stringSimilarity = require('string-similarity');

const bannedWords = [
  'porn',
  'adult',
  'nsfw',
  'xxx',
  'hentai',
  'pussy',
  'nudes',
  'sex pictures',
  'naked',
  'dick',
  'fuck',
  'gay',
  'blowjob',
  'pron',
  'brazzers',
  'beeg',
  'hentaigasm',
  'childporn',
  'pinayflix',
  'pinay sex',
  'dagay.com',
  'gayporn',
  'gaysex',
  'gaysex.com',
  'gaysex.net',
  'fuck solo',
  'fuck solo.to',
  'nhentai.net',
  'nhentai.com',
  'nhentai.xxx',
  'nhentai.to',
  'onlyfans.com',
  'hubad na babae',
  'hubad na larawan',
  'porn pictures',
  'pornhub',
  'lexie lore',
  'lexie',
  'sex',
  'nude',
  'xxx.com',
  'kantotan',
  // Add more banned words here as needed
];

const similarityThreshold = 0.7; // You can adjust the threshold as needed

module.exports.config = {
  name: 'search',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'kennethpanio',
  description: 'Searches for images using Google.',
  usePrefix: true,
  commandCategory: 'search',
  usages: '[input_example]',
  cooldowns: 30,
  dependencies: {
    axios: '',
    'fs-extra': '',
    googlethis: '',
  },
};

module.exports.run = async function ({
  event,
  api,
  args,
}) {
  try {
    // Determine the search query from the event or arguments
    const query =
      event.type === 'message_reply' ? event.messageReply.body : args.join(' ');

    // Check if the query contains any banned words using string similarity
    const hasBannedWords = args.some((word) => {
      const similarityScore = bannedWords.some((bannedWord) =>
        stringSimilarity.compareTwoStrings(word.toLowerCase(), bannedWord) >= similarityThreshold
      );
      return similarityScore;
    });

    // If any word in the query is similar to a banned word, block the query
    if (hasBannedWords) {
      api.sendMessage(
        'Search Query Suspended Reason: Inappropriate Content',
        event.threadID
      );
      return;
    }
    // Inform that the search is being performed
    const searchMessage = await api.sendMessage(
      `✦ Searching Images for "${query}"...`,
      event.threadID
    );

    // Perform the image search using Google
    let searchResults = await googlethis.image(query, { safe: false });

    // If no images are found, send a message indicating that
    if (searchResults.length === 0) {
      api.sendMessage(
        `No Images Found for "${query}" on Google.`,
        event.threadID,
        searchMessage.messageID
      );
      return;
    }

    let attachments = [];
    let imageCount = 0;

    // Iterate through the search results
    for (let result of searchResults) {
      // Limit the number of images to 30
      if (imageCount >= 5) {
        break;
      }

      let imageUrl = result.url;

      // Filter out images that are not in JPEG or PNG format
      if (!imageUrl.endsWith('.jpg') && !imageUrl.endsWith('.png')) {
        continue;
      }

      let filePath = __dirname + `/cache/search-image-${imageCount}.jpg`;
      let downloadError = false;

      try {
        // Download the image and save it to a file
        let response = await axios.get(imageUrl, {
          responseType: 'arraybuffer',
        });

        fs.writeFileSync(filePath, Buffer.from(response.data, 'binary'));
      } catch (error) {
        // If an error occurs while downloading, skip to the next image
        console.log(error);
        downloadError = true;
      }

      if (downloadError) {
        continue;
      }

      // Add the image file to the attachment list
      attachments.push(
        fs.createReadStream(filePath).on('end', async () => {
          // Remove the image file after sending it
          if (fs.existsSync(filePath)) {
            fs.unlink(filePath, (unlinkError) => {
              if (unlinkError) {
                return console.log(unlinkError);
              }
              console.log('Deleted file: ' + filePath);
            });
          }
        })
      );

      imageCount += 1;
    }

    // If no valid images are found, send a message indicating that
    if (attachments.length === 0) {
      api.sendMessage(
        `No Valid Images Found for "${query}".`,
        event.threadID,
        searchMessage.messageID
      );
      return;
    }

    // Send the search results along with the attachment list
    const sentMessage = await api.sendMessage(
      {
        body: `Search Result for: "${query}"\n\nFound: ${searchResults.length} Images${
          searchResults.length > 1 ? 's' : ''
        }\nShowing: ${attachments.length} Images${attachments.length > 1 ? 's' : ''}`,
        attachment: attachments,
      },
      event.threadID
    );

    // Auto unsend the search message after a delay
    setTimeout(async () => {
      await api.unsendMessage(searchMessage.messageID);
    }, 5000); // 5 seconds delay before unsend

    // Auto unsend the pictures after a delay
    setTimeout(async () => {
      for (let attachment of attachments) {
        try {
          await api.unsendMessage(sentMessage.messageID, attachment.attachmentID);
        } catch (error) {
          console.error('Error while unsending picture:', error);
        }
      }
    }, 70000); // 10 seconds delay before unsend
  } catch (error) {
    // If an error occurs during the process, send an error message
    console.log('Error: ' + error);
    api.sendMessage(
      'Error! Please try again: ' + error,
      event.threadID,
      event.messageID
    );
  }
};
