const fs = require('fs');

module.exports.config = {
    name: "tord",
    version: "1.0",
    credits: "Ethan",
    hasPermssion: 0,
    cooldowns: 5,
    commandCategory: "fun",
  commandCategory: "fun",
    usePrefix: false,
    usages: "",
    description: "play truth or dare",
  },

  module.exports.run = async function ({ api, args, event }) {

  let { threadID, senderID, messageID} = event;
	  
  const getUserInfo = async (api, userID) => {
    try {
      const userInfo = await api.getUserInfo(userID);
      return userInfo[userID].firstName;
    } catch (error) {
      console.error(`Error fetching user info: ${error}`);
      return "";
    }
  };
	  
  const muiEmojis = () => {
  const muichiroEmojis = ["😀", "😃", "😄", "😁", "🙂", "😉", "😊", "☺️", "🥲", "🤭", "🫡", "😏", "😌", "✌️", "👌", "🫰", "🫶", "🙆", "💙", "🩵"];
    return muichiroEmojis[Math.floor(Math.random() * muichiroEmojis.length)];
  };  

  let choices = ['truth', 'dare'];

  if (!args || args.length === 0) {
	  const userInfo = await getUserInfo(api, senderID);
        api.sendMessage({body:`${userInfo}, please provide your choice of 'truth' or 'dare'`,mentions: [
          {
            tag: userInfo,
            id: senderID,
          },
        ],}, threadID, messageID);
        return;
    }

  let userChoice = args[0];
  
    if (userChoice === 'truth') {
		const userInfo = await getUserInfo(api, senderID);
		const emojis = muiEmojis();
      const truthQuestions = JSON.parse(fs.readFileSync(`${__dirname}/cons/tord.json`));
      const randomTruth = truthQuestions[Math.floor(Math.random() * truthQuestions.length)];      
      api.sendMessage({body:`${userInfo}, here's your truth question:\n\n${randomTruth} ${emojis}`, mentions: [
          {
            tag: userInfo,
            id: senderID,
          },
        ],}, threadID, messageID);
    }
    
    else if (userChoice === 'dare') {
		const userInfo = await getUserInfo(api, senderID);
		const emojis = muiEmojis();
      const dareChallenges = JSON.parse(fs.readFileSync(`${__dirname}/cons/tord.json`));
      const randomDare = dareChallenges[Math.floor(Math.random() * dareChallenges.length)];     
      api.sendMessage({body:`${userInfo}, here's your dare:\n\n${randomDare} ${emojis}`, mentions: [
          {
            tag: userInfo,
            id: senderID,
          },
        ],}, threadID, messageID);
    } 

     else{
		 const userInfo = await getUserInfo(api, senderID);
       api.sendMessage({body:`Invalid choice ${userInfo}, please choose either 'truth' or 'dare'`,mentions: [
          {
            tag: userInfo,
            id: senderID,
          },
        ],}, threadID, messageID);
     };
} 