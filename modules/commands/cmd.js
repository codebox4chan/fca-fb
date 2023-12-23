const fontMaps = [
  {
    name: 'cursive',
    map: {
      ' ': ' ',
      'a': '𝖺', 'b': '𝖻', 'c': '𝖼', 'd': '𝖽', 'e': '𝖾', 'f': '𝖿', 'g': '𝗀', 'h': '𝗁',
      'i': '𝗂', 'j': '𝗃', 'k': '𝗄', 'l': '𝗅', 'm': '𝗆', 'n': '𝗇', 'o': '𝗈', 'p': '𝗉', 'q': '𝗊',
      'r': '𝗋', 's': '𝗌', 't': '𝗍', 'u': '𝗎', 'v': '𝗏', 'w': '𝗐', 'x': '𝗑', 'y': '𝗒', 'z': '𝗓',
      'A': '𝖠', 'B': '𝖡', 'C': '𝖢', 'D': '𝖣', 'E': '𝖤', 'F': '𝖥', 'G': '𝖦', 'H': '𝖧',
      'I': '𝖨', 'J': '𝖩', 'K': '𝖪', 'L': '𝖫', 'M': '𝖬', 'N': '𝖭', 'O': '𝖮', 'P': '𝖯', 'Q': '𝖰',
      'R': '𝖱', 'S': '𝖲', 'T': '𝖳', 'U': '𝖴', 'V': '𝖵', 'W': '𝖶', 'X': '𝖷', 'Y': '𝖸', 'Z': '𝖹',
    },
  },     
  // Add more font style maps here if needed
];

module.exports.config = {
  name: "cmd",
  version: "1.0.2",
  hasPermssion: 0,
  credits: "kennethpanio",
  description: "display current cmd educational category",
  usePrefix: false,
  commandCategory: "info",
  usages: "[commands]",
  cooldowns: 5,
  envConfig: {
    autoUnsend: true,
    delayUnsend: 180
  }
};

module.exports.run = async function ({ api, event, args, getText }) {
  const { commands } = global.client;
  const { threadID, messageID } = event;
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
  const prefix = threadSetting.hasOwnProperty("PREFIX")
    ? threadSetting.PREFIX
    : global.config.PREFIX;

  const educationalCommands = Array.from(commands.values())
    .filter(cmd => cmd.config.commandCategory.toLowerCase() === 'educational', 'tools');

  const itemsPerPage = 100;
  const totalPages = Math.ceil(educationalCommands.length / itemsPerPage);

  let currentPage = 1;
  if (args[0]) {
    const parsedPage = parseInt(args[0]);
    if (!isNaN(parsedPage) && parsedPage >= 1 && parsedPage <= totalPages) {
      currentPage = parsedPage;
    } else {
      return api.sendMessage(
        `Page number should be between 1 and ${totalPages}.`,
        threadID,
        messageID
      );
    }
  }

  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = Math.min(startIdx + itemsPerPage, educationalCommands.length);
  const visibleCommands = educationalCommands.slice(startIdx, endIdx);
  let msg = "";
  for (let i = startIdx; i < endIdx; i++) {
    const command = visibleCommands[i];
    const fontStyle = fontMaps.find(style => style.name === 'cursive');
    const mappedName = Array.from(command.config.name).map(char => fontStyle.map[char] || char).join('');
    const mappedUsages = command.config.usages ? Array.from(command.config.usages).map(char => fontStyle.map[char] || char).join('') : '';
    const mappedDescription = Array.from(command.config.description).map(char => fontStyle.map[char] || char).join('');

    // Check if usePrefix is true, and prepend prefix if needed
    const displayName = command.config.usePrefix ? `${prefix}${mappedName}` : mappedName;

    const symbol = ":";

msg += `\n${i + 1}. ➥ ${displayName} ${symbol} ${mappedUsages}\n${mappedDescription}\n`;
  }

  const messageContent = `
    Educational Tool commands for the current category:\n\n${msg}
  `;

  const sentMessage = await api.sendMessage(messageContent, threadID, async (error, info) => {
    if (autoUnsend) {
      await new Promise(resolve => setTimeout(resolve, delayUnsend * 1000));
      return api.unsendMessage(info.messageID);
    } else return;
  }, messageID);
};
