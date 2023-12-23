module.exports.config = {
  name: "pairv2",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Blue",
  description: "Generate a random pairing message.",
  usePrefix: false, 
  commandCategory: "fun",
  usages: "",
  cooldowns: 5,
};

module.exports.run = async ({ api, event, args }) => {
  const threadInfo = await api.getThreadInfo(event.threadID);
  const participantIDs = threadInfo.participantIDs;
  const randomUserID1 = participantIDs[Math.floor(Math.random() * participantIDs.length)];
  let randomUserID2 = randomUserID1;

  // Ensure that randomUserID2 is different from randomUserID1 please lang uwu

  while (randomUserID2 === randomUserID1) {
    randomUserID2 = participantIDs[Math.floor(Math.random() * participantIDs.length)];
  }

  const randomUser1 = (await api.getUserInfo(randomUserID1))[randomUserID1];
  const randomUser2 = (await api.getUserInfo(randomUserID2))[randomUserID2];

  const message = `Gusto ni ${randomUser1.name} si ${randomUser2.name}`;
  api.sendMessage(message, event.threadID);
};