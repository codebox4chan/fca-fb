module.exports.config = {
  name: 'escalate',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'August Quinn',
  description: 'Escalate the given text.',
  commandCategory: 'fun',
  usePrefix: true,
  usages: '[text] - [number of times]',
  cooldowns: 5,
};

module.exports.run = function ({ api, event, args }) {
  const { threadID, messageID } = event;
  const input = args.join(' ');

  const match = input.match(/^(.*)\s-\s(\d+)$/);
  if (!match) {
    api.sendMessage('Invalid input. Please use the format: /Escalate [text] - [number of times]', threadID, messageID);
    return;
  }

  const [, text, repeatCount] = match;
  const count = parseInt(repeatCount);

  if (isNaN(count) || count < 1) {
    api.sendMessage('Invalid number of times. Please provide a positive number.', threadID, messageID);
    return;
  }

 const escalatedText = Array.from({ length: count }, () => text).join('\n');

  api.sendMessage(escalatedText, threadID, (error) => {
    if (error) {
      console.error(error);
      api.sendMessage('An error occurred. This may be due to Messenger\'s limitation on message length. Please try with a smaller text or fewer repetitions.', threadID, messageID);
    }
  });
};