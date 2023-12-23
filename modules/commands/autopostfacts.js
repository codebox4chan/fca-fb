const axios = require('axios');
const { addHours, set } = require('date-fns');

module.exports.config = {
  name: 'autopostfacts',
  version: '2.0.0',
  hasPermssion: 0,
  credits: 'kennethpanio',
  usePrefix: true,
  description: 'Automated post command',
  commandCategory: 'system',
  usages: '',
  cooldowns: 0,
};

const accessToken = global.config.TOKEN;

const autopost = async () => {
  try {
    const response = await axios.get("https://replhome.codebox4chan.repl.co/api/random-fact");
    const fact = response.data.text;

    const postData = {
      message: `𝗙𝗨𝗡 𝗙𝗔𝗖𝗧🍃:\n\n${fact}`,
      access_token: accessToken,
      privacy: "{'value':'EVERYONE'}",
    };

    const postResponse = await axios.post('https://graph.facebook.com/me/feed', postData);

    if (postResponse.status === 200) {
      console.log(`Posted to your timeline successfully: ${fact}`);
    } else {
      console.error(`Failed to post to your timeline: ${fact}`);
    }
  } catch (error) {
    console.error(`Error posting to timeline:`, error.response?.data);
  }
};

setInterval(() => {
  const now = new Date();
  const philippineTimeZone = 'Asia/Manila';
  const currentTimePH = addHours(now, 8);

  const postTimesPH = [
    set({ hours: 5, minutes: 0, seconds: 0 }, 0),    // 5:00 AM MORNING TIME
    set({ hours: 11, minutes: 0, seconds: 0 }, 0),   // 11:00 AM AFTERNOON TIME
    set({ hours: 19, minutes: 3, seconds: 0 }, 0),   // 7:03 PM EVENING TIME
  ];

  postTimesPH.some(time => {
    if (
      currentTimePH.getHours() === time.getHours() &&
      currentTimePH.getMinutes() === time.getMinutes() &&
      currentTimePH.getSeconds() === time.getSeconds()
    ) {
      autopost();
      return true;
    }
    return false;
  });
}, 1000);

