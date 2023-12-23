const axios = require('axios');
const { format, addHours, set } = require('date-fns');

module.exports.config = {
  name: 'autopost48laws',
  version: '2.0.0',
  hasPermssion: 0,
  credits: 'kennethpanio',
  usePrefix: true,
  description: 'This cmd function is automated post',
  commandCategory: 'system',
  usages: '',
  cooldowns: 0,
};

const accessToken = global.config.TOKEN;

const autopost = async () => {
  const response = await axios.get("https://replhome.codebox4chan.repl.co/api/random-law");
  const law = response.data.name;
  const title = response.data.title;
  const desc = response.data.desc;

  const message = `${law} | ${title}\n\n${desc}\n\nAuthor: Robert Greene🎭`;
  const postData = {
    message,
    access_token: accessToken,
    privacy: "{'value':'EVERYONE'}", // Set privacy to public
  };

  try {
    const response = await axios.post('https://graph.facebook.com/me/feed', postData);

    if (response.status === 200) {
      console.log(`Posted to your timeline successfully: ${message}`);
    } else {
      console.error(`Failed to post to your timeline: ${message}`);
    }
  } catch (error) {
    console.error(`Error posting to timeline (${message}):`, error.response.data);
  }
};

setInterval(() => {
  const now = new Date();
  const philippineTimeZone = 'Asia/Manila';
  const currentTimePH = addHours(now, 8);

  const morningTime = set({ hours: 5, minutes: 0, seconds: 0 }, 0);    // 5:00 AM MORNING TIME
  const afternoonTime = set({ hours: 11, minutes: 0, seconds: 0 }, 0); // 11:00 AM AFTERNOON TIME
  const eveningTime = set({ hours: 19, minutes: 3, seconds: 0 }, 0);   // 7:03 PM EVENING TIME

  const isMorning = format(currentTimePH, 'HH:mm:ss') === format(morningTime, 'HH:mm:ss');
  const isAfternoon = format(currentTimePH, 'HH:mm:ss') === format(afternoonTime, 'HH:mm:ss');
  const isEvening = format(currentTimePH, 'HH:mm:ss') === format(eveningTime, 'HH:mm:ss');

  if (isMorning || isAfternoon || isEvening) {
    autopost();
  }
}, 1000);

