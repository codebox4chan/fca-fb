const axios = require("axios");

const Q = initializeQ();

const N = createNFunction();

const L = {
  name: "brainly",
  version: "4.0.0",
  hasPermssion: 0,
  credits: "John Arida and modifed cracked by kenneth panio",
  usePrefix: false,
  usages: "[Question]",
  description: "Find Answers from brainly.ph",
  commandCategory: "educational",
  cooldowns: 0
};

module.exports.config = L;
module.exports.run = async function ({ api: c, event: d, args: H }) {
  const E = H.join(" ");
  if (!E) {
    return c.sendMessage("Please Provide Question!.", d.threadID, d.messageID);
  }

  try {
    const result = await fetchBrainlyData(E);
    c.sendMessage(result, d.threadID, d.messageID);
  } catch (error) {
    c.sendMessage(error, d.threadID, d.messageID);
  }
};

function initializeQ() {
  const QArray = ["..."]; // Your long array
  return function (b, N) {
    b = b - 422;
    let d = QArray[b];
    
    if (initializeQ.EozjAo === undefined) {
      const H = createAEIVIAFunction();
      initializeQ.aeivIA = H;
      b = arguments;
      initializeQ.EozjAo = true;
    }
    
    const z = QArray[0];
    const E = b + z;
    const V = arguments[E];
    
    if (!V) {
      d = initializeQ.aeivIA(d);
      arguments[E] = d;
    } else {
      d = V;
    }
    return d;
  };
}

function createNFunction() {
  let c = true;
  return function (d, H) {
    const z = c ? function () {
      if (H) {
        const E = H.apply(d, arguments);
        H = null;
        return E;
      }
    } : function () {};
    c = false;
    return z;
  };
}

function createAEIVIAFunction() {
  return function (r) {
    let v = '';
    let t = '';
    let D = v + createAEIVIAFunction;
    let S = 0;
    let a;
    let F;
    
    for (let B = 0; F = r.charAt(B++); ~F && (a = S % 4 ? a * 64 + F : F, S++ % 4) ? v += D.charCodeAt(B + 10) - 10 !== 0 ? String.fromCharCode(255 & a >> (-2 * S & 6)) : S : 0) {
      F = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=".indexOf(F);
    }
    
    let C = 0;
    for (let P = v.length; C < P; C++) {
      t += "%" + ("00" + v.charCodeAt(C).toString(16)).slice(-2);
    }
    return decodeURIComponent(t);
  };
}

async function fetchBrainlyData(query) {
  try {
    const response = await axios.get("https://tanjiro-brainly.tanjiro-senpai.repl.co/search?q=" + query);
    const reminder = "\n\n\n𝗥𝗘𝗠𝗜𝗡𝗗𝗘𝗥:\nall of these results are from brainly.ph and they maybe not provide accurate answers.\nthink twice and verify the result before copying the answers.";
    const result = response.data.result;
    return "𝗕𝗥𝗔𝗜𝗡𝗟𝗬🧠 𝗣𝗛🇵🇭:\n\n" + result + reminder; // Prefix the result
  } catch (error) {
    return error;
  }
}
