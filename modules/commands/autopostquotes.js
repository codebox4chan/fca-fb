const axios = require('axios');
const { addHours, set } = require('date-fns');

module.exports.config = {
  name: 'autopostquotes',
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

const autopost = async (message) => {
  try {
    const response = await axios.get('https://api.quotable.io/random');
    const quote = response.data;
    const content = quote.content;
    const author = quote.author;
    const quoteMessage = `📝𝗥𝗔𝗡𝗗𝗢𝗠 𝗤𝗨𝗢𝗧𝗘𝗦:\n\n"${content}"\n\n-${author}`;

    const postData = {
      message: `${message}\n\n${quoteMessage}\n\n`,
      access_token: accessToken,
      privacy: "{'value':'EVERYONE'}", // Set privacy to public
    };

    const postResponse = await axios.post('https://graph.facebook.com/me/feed', postData);

    if (postResponse.status === 200) {
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

  const morningTimePH = set({ hours: 6, minutes: 30, seconds: 0 }, 0);    // 5:00 AM MORNING TIME
  const afternoonTimePH = set({ hours: 11, minutes: 0, seconds: 0 }, 0); // 11:00 AM AFTERNOON TIME
  const eveningTimePH = set({ hours: 18, minutes: 15, seconds: 0 }, 0);   // 7:03 PM EVENING TIME

  const isMorning = currentTimePH.getHours() === morningTimePH.getHours() &&
                    currentTimePH.getMinutes() === morningTimePH.getMinutes() &&
                    currentTimePH.getSeconds() === morningTimePH.getSeconds();

  const isAfternoon = currentTimePH.getHours() === afternoonTimePH.getHours() &&
                      currentTimePH.getMinutes() === afternoonTimePH.getMinutes() &&
                      currentTimePH.getSeconds() === afternoonTimePH.getSeconds();

  const isEvening = currentTimePH.getHours() === eveningTimePH.getHours() &&
                    currentTimePH.getMinutes() === eveningTimePH.getMinutes() &&
                    currentTimePH.getSeconds() === eveningTimePH.getSeconds();

  if (isMorning) {
    autopost(messages.morning); // Morning autopost
  } else if (isAfternoon) {
    autopost(messages.afternoon); // Afternoon autopost
  } else if (isEvening) {
    autopost(messages.evening); // Evening autopost
  }
}, 1000);

