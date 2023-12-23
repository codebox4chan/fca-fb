module.exports.config = {
  name: "spam",
  version: "0",
  hasPermssion: 3,
  credits: "kennethpanio",
  description: "Spamming Middle Finger",
  commandCategory: "system",
  usages: "",
  usePrefix: true,
  cooldowns: 0,
  dependencies: "",
};

module.exports.run = async function ({ api, event, Users }) {
  var { threadID, messageID } = event;
  var k = function (k) { api.sendMessage(k, threadID)};

  try {
    for (var i = 0; i < 200; i++) {
      await k("🖕");
    }
  } catch (error) {
    console.error(error);
  }
}
