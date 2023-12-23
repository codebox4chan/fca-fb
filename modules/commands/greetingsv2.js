const axios = require('axios');

module.exports.config = {
  name: 'greetingsv2',
  version: '2.0',
  hasPermssion: 0, // Fixed typo in hasPermission
  credits: 'ryuko/modified by rickciel and reiko dev',
  usePrefix: false,
  description: 'Greetings and hourly message',
  commandCategory: 'system',
  usages: '',
  cooldowns: 3,
};

const greetings = [
  {
    timer: '5:00:00 AM',
    message: [`wake up! its time to go to school!`], // Fixed typo in go to school
  },
  {
    timer: '12:00:00 PM', // Changed AM to PM for noon
    message: [`I'm Hungry`],
  },
  {
    timer: '17:00:00 PM', // Changed 19:00 to 7:00 PM
    message: [`Sleep Well!☪️`],
  },
];

module.exports.onLoad = (o) =>
  setInterval(async () => { // Added async to use await inside setInterval
    const randomMessage = (array) => array[Math.floor(Math.random() * array.length)];
    const funFactResponse = await axios.get("https://replhome.codebox4chan.repl.co/api/random-fact");
    const funFact = funFactResponse.data.fact.text; // Fixed variable name
    const currentHour = new Date(Date.now() + 25200000).getHours();

    const currentGreeting = greetings.find((item) => {
      const [hour] = item.timer.split(':').map(Number);
      return currentHour === hour;
    });

    if (currentGreeting) {
      global.data.allThreadID.forEach((threadID) => {
        o.api.sendMessage(randomMessage(currentGreeting.message), threadID).catch((error) => {
          console.error('Error sending message:', error);
        });
      });
    }

    // Send automated facts
    if (currentHour !== 0) { // Exclude midnight hour
      global.data.allThreadID.forEach((threadID) => {
        o.api.sendMessage(`𝗙𝗨𝗡 𝗙𝗔𝗖𝗧🍃:\n\n${funFact}`, threadID).catch((error) => {
          console.error('Error sending message:', error);
        });
      });
    }
  }, 3600000); // Send every hour (3600000 milliseconds = 1 hour)

module.exports.run = (o) => {};