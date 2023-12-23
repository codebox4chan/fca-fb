module.exports.config = {
	name: "creategc",	
	version: "2.0.0", 
	hasPermssion: 2,
	credits: "kennethpanio",
  usePrefix: true,
	description: "create a new chat group with the tag", 
  commandCategory: "admin",
	usages: '[name]',
	cooldowns: 5, 
	dependencies: "",
};

module.exports.run = async function({ api, Users, args, event }) {
 if (args[0] == "me")
  var id = [event.senderID]
  else id = [];
  var main = event.body; 
  var groupTitle = main.slice(main.indexOf("|") +2)
  for (var i = 0; i < Object.keys(event.mentions).length; i++)
id.push(Object.keys(event.mentions)[i]);
  api.createNewGroup(id, groupTitle,() => {api.sendMessage(`successfully created a group ${groupTitle}`, event.threadID)})
}