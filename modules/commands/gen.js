const axios = require("axios");
const fs = require('fs');
const path = require("path");

module.exports.config = {
  name: "gen",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Loid Butter",
  description: 'Generates an image for you!',
  commandCategory: "image",
  usages: "<description of the photo>",
  usePrefix: false,
  cooldowns: 8
};

var key = "khongbietdattenkeylagi";

module.exports.run = async function ({
  api: _0x29a148,
  event: _0x3706b1,
  args: _0x48b9a7
}) {
  const {
    threadID: _0x468a20,
    messageID: _0x3dade8
  } = _0x3706b1;

  const _0x5f891f = _0x48b9a7.join(" ");

  if (!_0x5f891f) {
    return _0x29a148.sendMessage("𝗣𝗹𝗲𝗮𝘀𝗲 𝗽𝗿𝗼𝘃𝗶𝗱𝗲 𝘆𝗼𝘂𝗿 𝗶𝗱𝗲𝗮𝘀!", _0x3706b1.threadID);
  }

  _0x29a148.sendMessage("𝗚𝗲𝗻𝗲𝗿𝗮𝘁𝗶𝗻𝗴: " + _0x5f891f, _0x468a20, _0x3dade8);

  const _0x2f093f = "https://api.zeidbot.site/trunggian?mota=" + encodeURIComponent(_0x5f891f) + "&key=" + key;

  try {
    const _0x1f406e = await axios.get(_0x2f093f);
    const _0x37dbd7 = _0x1f406e.data.imgurLink;
    const _0x37bb45 = await axios.get(_0x37dbd7, {
      'responseType': "arraybuffer"
    });
    const _0x55b412 = _0x37bb45.data;
    const _0xe899f7 = path.join(__dirname, "../../cache/aiimg.jpg");
    fs.writeFileSync(_0xe899f7, _0x55b412);

    const _0x50084b = {
      'body': "[𝗛𝗲𝗿𝗲'𝘀 𝘆𝗼𝘂𝗿 𝗚𝗲𝗻 𝗜𝗺𝗮𝗴𝗲!]\n\n𝗗𝗼𝗻'𝘁 𝗳𝗼𝗿𝗴𝗲𝘁 𝘁𝗼 𝗳𝗼𝗹𝗹𝗼𝘄 𝗺𝘆 𝗗𝗲𝘃!\nhttps://www.facebook.com/100081201591674\n𝗖𝗼𝗻𝘁𝗲𝗻𝘁: " + _0x5f891f + " ",
      'attachment': fs.createReadStream(_0xe899f7)
    };

    await _0x29a148.sendMessage(_0x50084b, _0x3706b1.threadID);
    fs.unlinkSync(_0xe899f7);
  } catch (_0x1390c1) {
    console.error(_0x1390c1);
    _0x29a148.sendMessage("𝗔𝗻 𝗘𝗿𝗿𝗼𝗿 𝗢𝗰𝗰𝘂𝗿𝗲𝗱 𝗧𝗿𝘆 𝗔𝗴𝗮𝗶𝗻 𝗟𝗮𝘁𝗲𝗿! \n𝗣𝗹𝗲𝗮𝘀𝗲 𝗖𝗼𝗻𝘁𝗮𝗰𝘁 𝗗𝗲𝘃𝗲𝗹𝗼𝗽𝗲𝗿 𝗶𝗳 𝗲𝗿𝗿𝗼𝗿 𝘀𝘁𝗶𝗹𝗹 𝗽𝗲𝗿𝘀𝗶𝘀𝘁\nhttps://www.facebook.com/100081201591674", _0x3706b1.threadID);
  }
};
