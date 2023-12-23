const axios = require('axios');
const { createReadStream, unlinkSync } = require('fs-extra');
const { resolve } = require('path');

// Font map to convert characters to the desired font
const fontMap = {
    A: "𝖠",
    B: "𝖡",
    C: "𝖢",
    D: "𝖣",
    E: "𝖤",
    F: "𝖥",
    G: "𝖦",
    H: "𝖧",
    I: "𝖨",
    J: "𝖩",
    K: "𝖪",
    L: "𝖫",
    M: "𝖬",
    N: "𝖭",
    O: "𝖮",
    P: "𝖯",
    Q: "𝖰",
    R: "𝖱",
    S: "𝖲",
    T: "𝖳",
    U: "𝖴",
    V: "𝖵",
    W: "𝖶",
    X: "𝖷",
    Y: "𝖸",
    Z: "𝖹",
    a: "𝖺",
    b: "𝖻",
    c: "𝖼",
    d: "𝖽",
    e: "𝖾",
    f: "𝖿",
    g: "𝗀",
    h: "𝗁",
    i: "𝗂",
    j: "𝗃",
    k: "𝗄",
    l: "𝗅",
    m: "𝗆",
    n: "𝗇",
    o: "𝗈",
    p: "𝗉",
    q: "𝗊",
    r: "𝗋",
    s: "𝗌",
    t: "𝗍",
    u: "𝗎",
    v: "𝗏",
    w: "𝗐",
    x: "𝗑",
    y: "𝗒",
    z: "𝗓",
  // Add the mapping for all characters you want to replace
};

module.exports.config = {
  name: 'transv2',
  description: 'Global translator mp3',
  hasPermssion: 0,
  commandCategory: 'tools',
  credits: 'kennethpanio',
  usages: '',
  usePrefix: false,
  cooldowns: 0,
  version: '1',
};

module.exports.run = async function ({ api, event, args }) {
  try {
    // Input validation
    var text = event.type === 'message_reply' ? event.messageReply.body : args.join(' ');
    if (!text || text.trim() === 'translate') {
      // Handle missing or incorrect input
      const languages = ['ab - Abkhazian', 'af - Afrikaans', 'ak - Akan', 'am - Amharic', 'ar - Arabic', 'as - Assamese', 'az - Azerbaijani', 'ba - Bashkir', 'be - Belarusian', 'bg - Bulgarian', 'bn - Bengali', 'bo - Tibetan', 'br - Breton', 'bs - Bosnian', 'ca - Catalan', 'cs - Czech', 'cy - Welsh', 'da - Danish', 'de - German', 'dv - Divehi', 'dz - Dzongkha', 'el - Greek', 'en - English', 'eo - Esperanto', 'es - Spanish', 'et - Estonian', 'eu - Basque', 'fa - Persian', 'fi - Finnish', 'fj - Fijian', 'fo - Faroese', 'fr - French', 'ga - Irish', 'gd - Scottish Gaelic', 'gl - Galician', 'gn - Guarani', 'gu - Gujarati', 'he - Hebrew', 'hi - Hindi', 'hr - Croatian', 'ht - Haitian', 'hu - Hungarian', 'hy - Armenian', 'ia - Interlingua', 'id - Indonesian', 'ig - Igbo', 'is - Icelandic', 'it - Italian', 'iu - Inuktitut', 'ja - Japanese', 'ka - Georgian', 'kk - Kazakh', 'km - Khmer', 'kn - Kannada', 'ko - Korean', 'ku - Kurdish', 'ky - Kyrgyz', 'la - Latin', 'lb - Luxembourgish', 'lo - Lao', 'lt - Lithuanian', 'lv - Latvian', 'mg - Malagasy', 'mi - Maori', 'mk - Macedonian', 'ml - Malayalam', 'mn - Mongolian', 'mr - Marathi', 'ms - Malay', 'mt - Maltese', 'nb - Norwegian Bokmål', 'nd - North Ndebele', 'ne - Nepali', 'nl - Dutch', 'nn - Norwegian Nynorsk', 'om - Oromo', 'or - Oriya', 'pa - Punjabi', 'pl - Polish', 'ps - Pashto', 'pt - Portuguese', 'qu - Quechua', 'rm - Romansh', 'rn - Rundi', 'ro - Romanian', 'ru - Russian', 'rw - Kinyarwanda', 'sa - Sanskrit', 'sd - Sindhi', 'se - Northern Sami', 'sg - Sango', 'si - Sinhala', 'sk - Slovak', 'sl - Slovenian', 'sm - Samoan', 'sn - Shona', 'so - Somali', 'sq - Albanian', 'sr - Serbian', 'ss - Swati', 'st - Southern Sotho', 'su - Sundanese', 'sv - Swedish', 'sw - Swahili', 'ta - Tamil', 'te - Telugu', 'tg - Tajik', 'th - Thai', 'ti - Tigrinya', 'tk - Turkmen', 'tl - Tagalog', 'tn - Tswana', 'to - Tonga', 'tr - Turkish', 'ts - Tsonga', 'tt - Tatar', 'tw - Twi', 'ug - Uighur', 'uk - Ukrainian', 'ur - Urdu', 'uz - Uzbek', 've - Venda', 'vi - Vietnamese', 'vo - Volapük', 'wa - Walloon', 'wo - Wolof', 'xh - Xhosa', 'yi - Yiddish', 'yo - Yoruba', 'za - Zhuang', 'zh - Chinese', 'zu - Zulu'];
      const message =
        '⭔ 𝖠𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾 𝖫𝖺𝗇𝗀𝗎𝖺𝗀𝖾𝗌 𝖿𝗈𝗋 𝖳𝗋𝖺𝗇𝗌𝗅𝖺𝗍𝗂𝗈𝗇𝗌 ⭔\n\n' + languages.join('\n');
      return api.sendMessage(message, event.threadID);
    }

    // Extract source language, target language, and text to translate
    const matchResult = text.match(/^([a-z]{2}) - ([a-z]{2}) (.+)/i);
    let fromLang, toLang, textToTranslate;

    if (!matchResult) {
      // No language selected, use Tagalog (Filipino) as default
      fromLang = 'auto';
      toLang = 'tl';
      textToTranslate = text;
    } else {
      fromLang = matchResult[1];
      toLang = matchResult[2];
      textToTranslate = matchResult[3];
    }

    // API request to translate the text
    const translateUrl = 'https://translate.googleapis.com/translate_a/single';
    const translateParams = {
      client: 'gtx',
      sl: fromLang,
      tl: toLang,
      dt: 't',
      q: textToTranslate,
    };

    const requestOptions = { params: translateParams };
    const response = await axios.get(translateUrl, requestOptions);
    const translatedText = response.data[0][0][0];

    // Convert the translated text to the desired font
    const convertedText = translatedText
      .split('')
      .map((char) => fontMap[char.toLowerCase()] || char)
      .join('');

    // Compose the translation message with converted text
    const botname = Array.from(global.config.BOTNAME).join('');
const translationMessage =
  `⭓${botname}|𝖳𝗋𝖺𝗇𝗌𝗅𝖺𝗍𝗈𝗋𝖡𝖮𝖳 \n` +
  `"⭔ ${convertedText}"\n` +
  `⭓ 𝖳𝗋𝖺𝗇𝗌𝗅𝖺𝗍𝖾𝖽 ${fromLang} 𝗍𝗈 ${toLang}`;

    // Download audio file for text-to-speech
    const audioFile = resolve(__dirname, 'cache', event.threadID + '_' + event.senderID + '.mp3');
    await global.utils.downloadFile(
      `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
        convertedText
      )}&tl=${toLang}&client=tw-ob`,
      audioFile
    );

    // Send the translation message along with the audio file
    return Promise.all([
      api.sendMessage({ attachment: createReadStream(audioFile) }, event.threadID, () =>
        unlinkSync(audioFile)
      ),
      api.sendMessage(translationMessage, event.threadID),
    ]);
  } catch (error) {
    // Handle errors gracefully
    console.error('Error occurred:', error);
    return api.sendMessage(
      '𝖲𝖾𝗋𝗏𝖾𝗋 𝖡𝗎𝗌𝗒! 𝖯𝗅𝖾𝖺𝗌𝖾 𝖳𝗋𝗒 𝖠𝗀𝖺𝗂𝗇! 𝖫𝖺𝗍𝖾𝗋!',
      event.threadID
    );
  }
};
