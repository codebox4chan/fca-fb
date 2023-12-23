module.exports.config = {
  name: "cipher",
  version: "1.1.1",
  hasPermssion: 0,
  credits: "DC-Nam",
  description: "Text encryption",
  commandCategory: "tools",
  usePrefix: true,
  usages: "[en|de]",
  cooldowns: 0
}

module.exports.run = async ({ api, event, args }) => {
  var text = args.splice(2).join(" ");
  const allType = ["enc", "dec"];

  if (!args[0] || !allType.includes(args[0]) || !args[1] || isNaN(args[1]) || args[0] > 10 || args[0] <= 0 || !text) {
    return api.sendMessage(`${!args[0] || !allType.includes(args[0]) ? '» Please choose enc|dec' : !args[1] ? '» Please enter the number of iterations for en|de' : isNaN(args[1]) ? '» The number of iterations for enc|dec must be a valid number' : args[0] > 10 ? '» The number of iterations for enc|dec is too high, recommend < 10 and > 0' : !text ? '» Please enter the text you want to encrypt/decrypt' : '» :v'}`, event.threadID, event.messageID);
  }

  switch (args[0]) {
    case "enc": {
      const myCipher = cipher('mySecretSalt');
      for (var i = 0; i < args[1]; i++) {
        text = myCipher(text);
      }
      api.sendMessage(text, event.threadID, event.messageID);
      break;
    }
    case "dec": {
      const myDecipher = decipher('mySecretSalt');
      for (var i = 0; i < args[1]; i++) {
        text = myDecipher(text);
      }
      api.sendMessage(text, event.threadID, event.messageID);
      break;
    }
  }
}

const cipher = salt => {
  const textToChars = text => text.split('').map(c => c.charCodeAt(0));
  const byteHex = n => ("0" + Number(n).toString(16)).substr(-2);
  const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code);
  return text => text.split('')
    .map(textToChars)
    .map(applySaltToChar)
    .map(byteHex)
    .join('');
}

const decipher = salt => {
  const textToChars = text => text.split('').map(c => c.charCodeAt(0));
  const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code);
  return encoded => encoded.match(/.{1,2}/g)
    .map(hex => parseInt(hex, 16))
    .map(applySaltToChar)
    .map(charCode => String.fromCharCode(charCode))
    .join('');
}
