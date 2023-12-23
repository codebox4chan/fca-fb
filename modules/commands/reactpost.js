module.exports.config = {
	name: "reactpost",
	version: "1.0.0",
	hasPermssion: 3,
	credits: "??",
	description: "React posts by id",
  usePrefix: true,
	commandCategory: "tools",
	usages: "[postID] <reaction type>: (unlike/like/love/heart/haha/wow/sad/angry)",
	cooldowns: 1
};


module.exports.run = async ({ api, event, args }) => {
  const allType = "unlike/like/love/heart/haha/wow/sad/angry".split("/");
  const postID = args[0];
  const type = args[1];
  if (!postID || !type) return global.utils.throwError(this.config.name, event.threadID, event.messageID);
  if (!allType.includes(type)) return api.sendMessage(`The reaction type is not valid, please choose one of the following styles: ${allType.join("/")}`, event.threadID, event.messageID);
  api.setPostReaction(Number(postID), type, (err, data) => {
    if (err) return api.sendMessage("Something went wrong, please check your postID and try again later", event.threadID, event.messageID);
    api.sendMessage(`Dropped emotion ${type} for posts with id ${postID}`, event.threadID, event.messageID);
  });
};