const axios = require('axios');
const { addHours, set } = require('date-fns');

module.exports.config = {
  name: 'autopostvideos',
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

const videoUrl = 'https://drive.google.com/uc?export=download&id=1nsjpzQHER7zNUaswzOr4EVt9STQoUkLb';
const caption = "It's 1:00 PM, Time flies very fast. 😓";

const videoUrl2 = 'https://drive.google.com/uc?export=download&id=1nsjpzQHER7zNUaswzOr4EVt9STQoUkLb';
const caption2 = "It's 3:00 PM,🥱";

const videoUrl3 = 'https://drive.google.com/uc?export=download&id=1nsjpzQHER7zNUaswzOr4EVt9STQoUkLb';
const caption3 = "It's 9:00 PM, time to sleep😴";

const autopostWithVideo = async (videoUrl, caption) => {
  const videoData = {
    access_token: accessToken,
    file_url: videoUrl,
    description: caption,
  };

  try {
    const videoResponse = await axios.post('https://graph-video.facebook.com/me/videos', videoData);

    if (videoResponse.status === 200 && videoResponse.data.id) {
      const videoId = videoResponse.data.id;

      const postData = {
        attached_media: [{ media_fbid: videoId }],
        access_token: accessToken,
      };

      const response = await axios.post('https://graph.facebook.com/me/feed', postData);

      if (response.status === 200) {
        console.log(`Posted video to your timeline successfully.`);
      } else {
        console.error(`Failed to post video to your timeline.`);
      }
    } else {
      console.error('Failed to upload the video.');
    }
  } catch (error) {
    console.error(`Error posting video to timeline:`, error.response?.data);
  }
};

const scheduleAutopost = (hour, minute, second, videoUrl, caption) => {
  setInterval(async () => {
    const now = new Date();
    const philippineTimeZone = 'Asia/Manila';
    const currentTimePH = addHours(now, 8);

    const targetTime = set({ hours: hour, minutes: minute, seconds: second }, 0);

    if (currentTimePH.getHours() === targetTime.getHours() &&
        currentTimePH.getMinutes() === targetTime.getMinutes() &&
        currentTimePH.getSeconds() === targetTime.getSeconds()) {
      await autopostWithVideo(videoUrl, caption);
    }
  }, 1000);
};

// Schedule posts
scheduleAutopost(13, 0, 0, videoUrl, caption); // 1:00 PM
scheduleAutopost(15, 0, 0, videoUrl2, caption2); // 3:00 PM
scheduleAutopost(21, 0, 0, videoUrl3, caption3); // 9:00 PM
