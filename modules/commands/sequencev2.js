module.exports.config = {
  name: "sequencev2",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "August Quinn",
  description: "Solve arithmetic, geometric, and Fibonacci sequences",
  commandCategory: "educational",
  usePrefix: true,
  usages: "[category] [a1] [n] [d/r]",
  cooldowns: 5,
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID, senderID } = event;

  const getUserInfo = async (api, userID) => {
    try {
      const userInfo = await api.getUserInfo(userID);
      return userInfo[userID].name;
    } catch (error) {
      console.error(`Error fetching user info: ${error}`);
      return "";
    }
  };

  const userName = await getUserInfo(api, senderID);

  if (args.length !== 4) {
    const availableCategories = "𝗔𝗩𝗔𝗜𝗟𝗔𝗕𝗟𝗘 𝗖𝗔𝗧𝗘𝗚𝗢𝗥𝗜𝗘𝗦:\n   ⓵ Arithmetic\n   ⓶ Geometric\n   ➂ Fibonacci\n";
    const correctUsage = `𝗨𝗦𝗔𝗚𝗘:\nThe correct usage is: /Sequence [category] [a1] [n] [d/r]`;
    api.sendMessage(`${availableCategories}\n${correctUsage}`, threadID, messageID);
    return;
  }

  const sequenceType = args[0].toLowerCase();
  const a1 = parseFloat(args[1]);
  const n = parseFloat(args[2]);
  const dr = parseFloat(args[3]);

  if (isNaN(a1) || isNaN(n) || isNaN(dr)) {
    api.sendMessage("${userName}, please provide valid numeric inputs.", threadID, messageID);
    return;
  }

  let result = null;

  if (sequenceType === "arithmetic") {
    const d = dr;
    result = a1 + (n - 1) * d;
  } else if (sequenceType === "geometric") {
    const r = dr;
    result = a1 * Math.pow(r, n - 1);
  } else if (sequenceType === "fibonacci") {
    result = calculateFibonacciTerm(n);
  } else {
    const availableCategories = "𝗔𝗩𝗔𝗜𝗟𝗔𝗕𝗟𝗘 𝗖𝗔𝗧𝗘𝗚𝗢𝗥𝗜𝗘𝗦\n\n   ⓵ Arithmetic\n   ⓶ Geometric\n   ➂ Fibonacci";
    api.sendMessage(`Unsupported category. ${availableCategories}`, threadID, messageID);
    return;
  }

  const message = `🔢 𝗦𝗘𝗤𝗨𝗘𝗡𝗖𝗘 𝗦𝗢𝗟𝗩𝗘𝗥\n\n${userName}, the ${n}-th term of the ${sequenceType} sequence is: ${result}`;

  api.sendMessage(message, threadID, messageID);
};

function calculateFibonacciTerm(n) {
  if (n === 1 || n === 2) {
    return 1;
  }

  let fibPrev = 1;
  let fibCurr = 1;

  for (let i = 3; i <= n; i++) {
    const fibNext = fibPrev + fibCurr;
    fibPrev = fibCurr;
    fibCurr = fibNext;
  }

  return fibCurr;
  }
    