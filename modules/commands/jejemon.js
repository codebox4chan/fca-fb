module.exports.config = {
  name: "jejemon",
  version: "1.2.0",
  hasPermssion: 0,
  credits: "August Quin ",
  description: "Convert words into Jejemon style (Tagalog only) with random emojis and uwu",
  commandCategory: "fun",
  usePrefix: true,
  usages: "[text]",
  cooldowns: 5,
};

module.exports.run = function ({ api, event, args }) {
  if (args.length === 0) {
    api.sendMessage("Pls provide a sentence or words 2 convert 2 Jejemon style.", event.threadID, event.messageID);
    return;
  }

  const tagalogJejemon = {
    a: "4",
    b: "b",
    c: "c",
    d: "d",
    e: "3",
    f: "f",
    g: "G",
    h: "h",
    i: "i",
    j: "j",
    k: "k",
    l: "l",
    m: "m",
    n: "n",
    o: "0",
    p: "p",
    q: "q",
    r: "r",
    s: "x",
    t: "7",
    u: "U",
    v: "v",
    w: "w",
    x: "x",
    y: "y",
    z: "z",
    A: "4",
    B: "B",
    C: "C",
    D: "D",
    E: "3",
    F: "F",
    G: "G",
    H: "H",
    I: "I",
    J: "J",
    K: "K",
    L: "L",
    M: "M",
    N: "N",
    O: "0",
    P: "P",
    Q: "Q",
    R: "R",
    S: "x",
    T: "7",
    U: "U",
    V: "V",
    W: "W",
    X: "X",
    Y: "Y",
    Z: "Z",
  };

  const wordReplacements = {
    kayo: "kEo",
    kamusta: "uZtaH",
    love: "lab",
    mahal: "mAhaL",
    kita: "kta",
    you: "yuHh",
    "have to": "hAfta",
    boyfriend: "jOwa",
    girlfriend: "jOwa",
    beshy: "beZzy",
    idol: "lodi",
    malupit: "peTmaLu",
    crazy: "kalErki",
    huh: "nAKaKaluRkey k nmAn",
    naman: "nman",
    ko: "q",
    ako: "aQ",
    hahaha: "jAjaJa",
    "i_love_you": "lAbqCkyOuHh",
    "i miss you": "Imiszqckyuh",
  };

  const randomEmojis = ["👉👈", "❤️", "😊", "🙌", "🤗", "💝💖💘", "🥰😘", "💘", "😚😊😌", "😚💖"];
  const randomUwu = ["uwu👉👈", "OWO", "XD", "charowt", "^w^", "sanaol💖💝"];

  const inputText = args.join(" ");
  let convertedText = "";

  const words = inputText.split(" ");
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const formattedWord = word.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
    
    if (wordReplacements.hasOwnProperty(formattedWord)) {
      convertedText += wordReplacements[formattedWord];
    } else if (wordReplacements.hasOwnProperty(word.toLowerCase())) {
      convertedText += wordReplacements[word.toLowerCase()];
    } else {
      convertedText += word.split("").map(char => tagalogJejemon[char] || char).join("");
    }
    
    if (i !== words.length - 1) {
      convertedText += " ";
    }
  }

  const randomEmoji = randomEmojis[Math.floor(Math.random() * randomEmojis.length)];
  const randomUwuWord = randomUwu[Math.floor(Math.random() * randomUwu.length)];

  convertedText += ` ${randomEmoji} ${randomUwuWord}`;

  api.sendMessage(`👉𝗝𝗘𝗝𝗘𝗠𝗢𝗡 𝗦𝗧𝗬𝗟𝗘👈\n\n${convertedText}`, event.threadID, event.messageID);
};
    