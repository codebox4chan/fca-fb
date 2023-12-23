module.exports.config = {
  name: 'encrypt',
  version: '1.0.0',
  hasPermssion: 3,
  credits: '?',
  description: 'Encode obfuscated code! JavaScript!',
  commandCategory: 'operator',
  usePrefix: false,
  usages: "",
  cooldowns: 5,
  dependencies: { 'javascript-obfuscator': '' },
};

module.exports.languages = {
  vi: {},
  en: {},
};

module.exports.run = async ({ event: e, api: a, args: g }) => {
  const axios = require('axios');
  const fs = require('fs-extra');
  let fill = [];

  if (g[0]) {
    for (let d of g) {
      if (!d.endsWith('.js')) {
        d += '.js';
      }
      fill.push(fs.readFileSync(__dirname + '/' + d, 'utf8'));
    }
    return encObfuscate(fill, a, e);
  } else {
    if (e.attachments.length > 0) {
      for (const q of e.attachments) {
        const w = await axios.get(q.url, { responseType: 'arraybuffer' });
        fill.push(w.data.toString('utf8'));
      }
      return encObfuscate(fill, a, e);
    } else {
      a.sendMessage(
        'Please reply to this message with the name of the command file or attach a .txt file containing the code you want to obfuscate!',
        e.threadID,
        (r, info) => {
          global.client.handleReply.push({
            name: this.config.name,
            messageID: info.messageID,
            author: e.senderID,
          });
        }
      );
    }
  }
};

module.exports.handleReply = async ({ api: a, event: e, handleReply: h }) => {
  if (e.senderID != h.author) {
    return;
  }
  const axios = require('axios');
  let nek = [];

  if (e.body) {
    return ((nek = [e.body]), encObfuscate(nek, a, e));
  } else {
    if (e.attachments.length > 0) {
      for (const u of e.attachments) {
        const i = await axios.get(u.url, { responseType: 'arraybuffer' });
        nek.push(i.data.toString('utf8'));
      }
      return encObfuscate(nek, a, e);
    } else {
      return a.sendMessage('Invalid syntax!', e.threadID, e.messageID);
    }
  }
};

function encObfuscate(o, p, f) {
  const fs = require('fs-extra');
  const js = require('javascript-obfuscator');
  const not = [];
  const nekk = [];
  const hmm = [];

  for (let to = 0; to < o.length; to++) {
    const cunket = __dirname + '/cache/codeEnc' + to + '.txt';
    const dark = js.obfuscate(o[to], {
      compact: true,
      controlFlowFlattening: true,
      deadCodeInjection: true,
      debugProtection: true,
      debugProtectionInterval: 4000,
      disableConsoleOutput: true,
      identifierNamesGenerator: 'hexadecimal',
      log: false,
      numbersToExpressions: false,
      renameGlobals: false,
      selfDefending: true,
      simplify: true,
      splitStrings: true,
      stringArray: true,
      stringArrayCallsTransform: true,
      stringArrayCallsTransformThreshold: 0.2,
      stringArrayEncoding: ["base64"],
      stringArrayIndexShift: true,
      stringArrayRotate: true,
      stringArrayShuffle: true,
      stringArrayWrappersCount: 1,
      stringArrayWrappersChainedCalls: true,
      stringArrayWrappersParametersMaxCount: 2,
      stringArrayWrappersType: 'variable',
      stringArrayThreshold: 0.2,
      unicodeEscapeSequence: false,
    });
    fs.writeFileSync(cunket, dark.getObfuscatedCode(), 'utf8');
    not.push(fs.createReadStream(cunket));
    nekk.push(cunket);
  }

  const haizz = {
    body:
      nekk.length > 0
        ? 'Successfully obfuscated ' + nekk.length + ' files!'
        : '' + hmm.length > 0
        ? '\nFailed to obfuscate ' + hmm.length + ' files!'
        : '',
  };

  if (not.length > 0) {
    haizz.attachment = not;
  }

  p.sendMessage(
    haizz,
    f.threadID,
    (hotnek, cojhot) => {
      for (const machamay of nekk) fs.unlinkSync(machamay);
    },
    f.messageID
  );
}
