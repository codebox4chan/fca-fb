module.exports.config = {
  name: "table",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "August Quinn",
  description: "Displays multiplication, addition, subtraction, or division tables for a range of numbers",
  commandCategory: "educational",
  usages: "[operation] [start] - [end]",
  cooldowns: 5,
  usePrefix: true,
  dependencies: "",
};
 
module.exports.run = function ({ api, event, args }) {
  if (args.length !== 4 || !["multiplication", "addition", "subtraction", "division"].includes(args[0])) {
    return api.sendMessage("Usage: /Table [operation] [start] - [end]", event.threadID, event.messageID);
  }
 
  const operation = args[0].toLowerCase();
  const start = parseInt(args[1]);
  const end = parseInt(args[3]);
  
  if (isNaN(start) || isNaN(end)) {
    return api.sendMessage("Please provide valid start and end numbers.", event.threadID, event.messageID);
  }
 
  let table = "";
 
  switch (operation) {
    case "multiplication":
      for (let i = start; i <= end; i++) {
        for (let j = 1; j <= 10; j++) {
          table += `   ⌲ ${i} × ${j} = ${i * j}\n`;
        }
        table += "\n";
      }
      break;
 
    case "addition":
      for (let i = start; i <= end; i++) {
        for (let j = 1; j <= 10; j++) {
          table += `   ⌲ ${i} + ${j} = ${i + j}\n`;
        }
        table += "\n";
      }
      break;
 
    case "subtraction":
      for (let i = start; i <= end; i++) {
        for (let j = 1; j <= 10; j++) {
          table += `   ⌲ ${i} - ${j} = ${i - j}\n`;
        }
        table += "\n";
      }
      break;
 
    case "division":
      for (let i = start; i <= end; i++) {
        for (let j = 1; j <= 10; j++) {
          table += `   ⌲ ${i} ÷ ${j} = ${(i / j).toFixed(2)}\n`;
        }
        table += "\n";
      }
      break;
  }
 
  const message = `🧮 𝗧𝗔𝗕𝗟𝗘\n\n 𝗧𝗬𝗣𝗘: ${operation}\n   ❑ From ${start} - ${end}:\n\n${table}`;
  api.sendMessage(message, event.threadID, event.messageID);
};
                                