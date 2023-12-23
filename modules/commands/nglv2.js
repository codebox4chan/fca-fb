const axios = require('axios');

module.exports.config = {
  name: "nglv2",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Kim Joseph DG Bien",
  description: "Send a message using user",
  usePrefix: true,
  commandCategory: "tools",
  cooldowns: 30,
  usages: "[username] [message] [amount]",
};

module.exports.run = async ({ api, event, args }) => {
  const nglusername = args[0];
  const message = args.slice(1, -1).join(' ');
  const amount = args[args.length - 1]; 

  if (!nglusername || !message || !amount) {
    return api.sendMessage("Invalid command format. Please use /ngl [username] [message] [amount]", event.threadID);
  }

  try {
    const headers = {
      'referer': `https://ngl.link/${nglusername}`,
      'accept-language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7',
    };

    const data = {
      'username': nglusername,
      'question': message,
      'deviceId': 'ea356443-ab18-4a49-b590-bd8f96b994ee',
      'gameSlug': '',
      'referrer': '',
    };

    let value = 0;
    for (let i = 0; i < amount; i++) {
      await axios.post('https://ngl.link/api/submit', data, {
        headers,
      });
      value += 1;
      console.log(`[+] Send => ${value}`);
    }

    api.sendMessage(`Successfully sent ${amount} message(s) to ${nglusername} through ngl.link.`, event.threadID);
  } catch (error) {
    console.log(error);
    api.sendMessage("An error occurred while sending the message through ngl.link.", event.threadID);
  }
};