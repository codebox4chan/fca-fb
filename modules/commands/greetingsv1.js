module.exports.config = {
  name: 'greetingsv1',
  version: '1.0',
  hasPermssion: 0,
  credits: 'ryuko/ modified rickciel / remod by kennethpanio added random message array',
  usePrefix: false,
  description: 'Greetings and hourly message',
  commandCategory: 'system',
  usages: '',
  cooldowns: 3,
};

const greetings = [
  {
    timer: '5:00:00 AM',
    message: [`Good morning! Have a great day ahead!`],
  },
  {
    timer: '12:00:00 AM',
    message: [`Good afternoon! Take a break and stay hydrated!`],
  },
  {
    timer: '19:00:00 PM',
    message: [`Good night! Ensure a restful sleep for a productive day tomorrow.`],
  },
];

const Reminders = [
  `How to get your own token,cookie,fbstate?\nExample: "${global.config.PREFIX}token [UID or Email] [Password]"`, `How to shareboost?\nExample: ${global.config.PREFIX}fbshare [token] [link of the post] [amount of shares] [interval value (optional not needed)]`,
  `How to chat with ai?\nExample: ai [message]`, `How to see commands?\nExample: ${global.config.PREFIX}help`, `How to chat with python ai?\nExample: box [message]`, `How to chat with ${global.config.BOTNAME}\nExample: ${global.config.BOTNAME} [message]`, `How to scrape data from url?\nExample: scrape [url]`, `System: automatic block user after spamming 20x`, `System: Block user if keep adding the bot 10x after it automatically left group chat.`, `How to mention a friend in bio:\n\nFirst, you need to get your friend's UID.\n\nThen, copy and paste this in your bio:\n\n@[100081201591674:999:add your clickable message here directs to your friend's profile!]\n\nReplace "100081201591674" with your friend's UID or the UID of the person you want to mention.`
];

module.exports.onLoad = (o) =>
  setInterval(() => {
    const randomMessage = (array) => array[Math.floor(Math.random() * array.length)];
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

    if (currentHour !== 0) {
      global.data.allThreadID.forEach((threadID) => {
        o.api.sendMessage(randomMessage(Reminders), threadID).catch((error) => {
          console.error('Error sending message:', error);
        });
      });
    }
  }, 3600000); // Send every minute (3600000 milliseconds = to one minute)

module.exports.run = (o) => {};