const axios = require('axios');
const { addHours, set } = require('date-fns');

module.exports.config = {
  name: 'autopostcontent',
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

const videoUrl = 'https://drive.google.com/uc?export=download&id=your_video_id';
const caption = "It's 1:00 PM, Time flies very fast. 😓";

const imageUrl = 'https://drive.google.com/uc?export=download&id=your_image_id';
const imageCaption = "It's picture time! 📷";

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

const autopostWithImage = async (imageUrl, caption) => {
  const imageData = {
    access_token: accessToken,
    url: imageUrl,
    caption: caption,
  };

  try {
    const imageResponse = await axios.post('https://graph.facebook.com/me/photos', imageData);

    if (imageResponse.status === 200 && imageResponse.data.id) {
      const imageId = imageResponse.data.id;

      const postData = {
        attached_media: [{ media_fbid: imageId }],
        access_token: accessToken,
      };

      const response = await axios.post('https://graph.facebook.com/me/feed', postData);

      if (response.status === 200) {
        console.log(`Posted image to your timeline successfully.`);
      } else {
        console.error(`Failed to post image to your timeline.`);
      }
    } else {
      console.error('Failed to upload the image.');
    }
  } catch (error) {
    console.error(`Error posting image to timeline:`, error.response?.data);
  }
};

const scheduleAutopost = (hour, minute, second, contentUrl, caption, autopostFunction) => {
  setInterval(async () => {
    const now = new Date();
    const philippineTimeZone = 'Asia/Manila';
    const currentTimePH = addHours(now, 8);

    const targetTime = set({ hours: hour, minutes: minute, seconds: second }, 0);

    if (
      currentTimePH.getHours() === targetTime.getHours() &&
      currentTimePH.getMinutes() === targetTime.getMinutes() &&
      currentTimePH.getSeconds() === targetTime.getSeconds()
    ) {
      await autopostFunction(contentUrl, caption);
    }
  }, 1000);
};

// Schedule posts
scheduleAutopost(13, 0, 0, videoUrl, caption, autopostWithVideo); // 1:00 PM for video
scheduleAutopost(14, 30, 0, imageUrl, imageCaption, autopostWithImage); // Example: 2:30 PM for image
