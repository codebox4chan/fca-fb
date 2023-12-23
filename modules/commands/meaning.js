var cred = 'Spiritエーアイ';

module.exports.config = {
  name: 'meaning',
  version: '1.0.0',
  hasPermission: 0,
  credits: 'Spiritエーアイ',
  description: 'Get the meaning of the word',
  usePrefix: false,
  usages: '[word]',
  commandCategory: 'educational',
  cooldowns: 5,
};

module.exports.run = async function ({
  api,
  event,
  args,
  utils,
  Users,
  Threads,
}) {
  try {
    const googlethis = require('googlethis');
    const request = require('request');
    const fs = require('fs-extra');

    if (this.config.credits != 'Spiritエーアイ') {
      return api.sendMessage(
        'Change credits pa ulol bulok bot mo',
        event.threadID,
        event.messageID
      );
    }

    let word = args.join(' ');
    if (!word) {
      return api.sendMessage('Missing word', event.threadID, event.messageID);
    }

    const searchResult = await googlethis.search('meaning of ' + word);

    console.log(searchResult);
    var wordName = searchResult.dictionary.word;
    var phonetic = searchResult.dictionary.phonetic;
    var definition = searchResult.dictionary.definitions[0];
    var example =
      searchResult.dictionary.examples[0] === undefined
        ? 'Not found'
        : searchResult.dictionary.examples[0];

    let sendMessageWithAttachment = function () {
      return api.sendMessage(
        {
          body:
            'Word: ' +
            wordName +
            '\n\nPhonetic: ' +
            phonetic +
            '\n\nExample: ' +
            example +
            '\n\nDefinition: ' +
            definition,
          attachment: fs.createReadStream(__dirname + '/cache/meaning.mp3'),
        },
        event.threadID,
        () => fs.unlinkSync(__dirname + '/cache/meaning.mp3'),
        event.messageID
      );
    };

    request(encodeURI(searchResult.dictionary.audio))
      .pipe(fs.createWriteStream(__dirname + '/cache/meaning.mp3'))
      .on('close', sendMessageWithAttachment);
  } catch (error) {
    return (
      console.log(error),
      api.sendMessage('Error: ' + error, event.threadID, event.messageID)
    );
  }
};
