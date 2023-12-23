const axios = global.nodemodule.axios;
const googlethis = global.nodemodule.googlethis;
const cloudscraper = global.nodemodule.cloudscraper;
const fs = global.nodemodule['fs-extra'];

module.exports.config = {
  name: 'rule34',
  version: '1.0.0',
  hasPermission: 0,
  credits: 'kennethpanio',
  description: 'Rule34.',
  usePrefix: true,
  commandCategory: 'nsfw',
  usages: '[input_example]',
  cooldowns: 5,
  dependencies: {
    axios: '',
    'fs-extra': '',
    googlethis: '',
    cloudscraper: '',
  },
};

module.exports.run = async function ({
  matches,
  event,
  api,
  extra,
  args,
  users,
}) {
  try {
    // Determine the search query from the event or arguments
    const query =
      event.type === 'message_reply' ? event.messageReply.body : args.join(' ');

    // Inform that the search is being performed
    const searchMessage = await api.sendMessage(
      `✦ Searching Rule34 Pics for "${query}"...`,
      event.threadID
    );

    // Construct the search URL with the query and domain
    const searchURL = `https://rule34.paheal.net/post/list/${encodeURIComponent(
      query
    )}`;

    // Perform the image search using the constructed URL
    let searchResults = await googlethis.image(searchURL, { safe: false });

    // If no images are found, send a message indicating that
    if (searchResults.length === 0) {
      api.sendMessage(
        `No Pics Found for "${query}" on Rule34.`,
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
      if (imageCount >= 30) {
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
        `No Valid Pics Found for "${query}".`,
        event.threadID,
        searchMessage.messageID
      );
      return;
    }

    // Send the search results along with the attachment list
    const sentMessage = await api.sendMessage(
      {
        body: `Search Result for: "${query}"\n\nFound: ${searchResults.length} Pic${
          searchResults.length > 1 ? 's' : ''
        }\nShowing: ${attachments.length} Pic${attachments.length > 1 ? 's' : ''}`,
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
