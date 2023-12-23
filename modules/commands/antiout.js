module.exports.config = {
  name: "antiout",
  version: "1.0.0",
  credits: "DungUwU (Khánh Milo Fix)",
  hasPermssion: 0,
  description: "Turn off antiout",
  usePrefix: false,
  usages: "antiout on/off",
  commandCategory: "system",
  cooldowns: 0
};

module.exports.run = async ({ api, event, Threads }) => {
  let data = (await Threads.getData(event.threadID)).data || {};
  if (typeof data["antiout"] == "undefined" || data["antiout"] == false) data["antiout"] = true;
  else data["antiout"] = false;

  await Threads.setData(event.threadID, { data });
  global.data.threadData.set(parseInt(event.threadID), data);
  return api.sendMessage(` Done ${(data["antiout"] == true) ? "turn on" : "Turn off"} successful antiout!`, event.threadID);
}