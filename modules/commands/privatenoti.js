module.exports.config = {
  name: "privatenoti",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "Blue/mojako",
  description: "Sends an anonymous message to all groups and can only be done by the dev.",
  usePrefix: true,
  commandCategory: "message",
  usages: "[Text]",
  cooldowns: 5
};

module.exports.run = async ({
  api: _0x207380,
  event: _0xebfcbc,
  args: _0x480777
}) => {
  if (this.config.credits !== "Blue/mojako") {
    const _0x2bfe37 = "[ 𝙉𝙊𝙏𝙄𝘾𝙀 𝙁𝙍𝙊𝙈 𝘿𝙀𝙑𝙀𝙇𝙊𝙋𝙀𝙍 ]\nThe Credits was changed; please respect the owner\nIf you need help, contact:\n\n𝙉𝙤𝙩𝙞𝙘𝙚 𝙎𝙚𝙣𝙙𝙚𝙧: " + global.config.BOTNAME + "\n𝙏𝙝𝙞𝙨 𝙈𝙤𝙙𝙪𝙡𝙚 𝙉𝙖𝙢𝙚: " + this.config.name + "\n𝘼𝙙𝙢𝙞𝙣 𝘽𝙤𝙩 𝙇𝙞𝙣𝙠: " + global.config.ADMINBOT;
    _0x207380.sendMessage(_0x2bfe37, "");
    return _0x207380.sendMessage(_0x2bfe37, _0xebfcbc.threadID);
  }
  
  const _0x5e3611 = "NOTICE FROM ANONYMOUS: " + _0x480777.join(" ");
  
  async function _0x56e034(_0x21ad0d) {
    try {
      await _0x207380.sendMessage(_0x5e3611, _0x21ad0d.threadID);
    } catch (_0x57cb20) {
      console.error("Error sending a message:", _0x57cb20);
    }
  }
  
  const _0x41940c = await _0x207380.getThreadList(25, null, ["INBOX"]);
  let _0x525dd2 = 0;
  
  for (const _0x37c4b0 of _0x41940c) {
    if (_0x525dd2 >= 20) {
      break;
    }
    
    if (_0x37c4b0.isGroup && _0x37c4b0.name != _0x37c4b0.threadID && _0x37c4b0.threadID != _0xebfcbc.threadID) {
      await _0x56e034(_0x37c4b0);
      _0x525dd2++;
    }
  }
  
  if (_0x525dd2 > 0) {
    _0x207380.sendMessage("› Sent the anonymous notification successfully.", _0xebfcbc.threadID);
  } else {
    _0x207380.sendMessage("› No eligible group threads found to send the message to.", _0xebfcbc.threadID);
  }
};