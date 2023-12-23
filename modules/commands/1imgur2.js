const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

module.exports.config = {
  name: "imgur2",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Dipto",//please don't change credit.Support me😊🫶
  usePrefix: true,
  description: "Convert video to Imgur link",
  commandCategory: "tools",
  dependencies: {
    "axios": "",
    "form-data": ""
  },
  cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  const { threadID, messageID } = event;
  // Assuming the user sends the video as an attachment
const axios = global.nodemodule['axios'];
  var videoUrl = event.messageReply.attachments[0].url || args.join(" ");
  const videoName = `video-${Date.now()}.mp4`;
if (!videoUrl) {
    return api.sendMessage('Please reply a video file.', threadID, messageID);
}
  // Download the video from the message
  const videoResponse = await axios({
    method: 'get',
    url: videoUrl,
    responseType: 'stream'
  });

  // Save video to a file
  const videoStream = videoResponse.data;
  const videoPath = `${__dirname}/cache/${videoName}`;
  const videoWriter = fs.createWriteStream(videoPath);
  videoStream.pipe(videoWriter);

  // Wait for the download to finish
  await new Promise((resolve, reject) => {
    videoWriter.on('finish', resolve);
    videoWriter.on('error', reject);
  });

  // Upload to Imgur
  const formData = new FormData();
  formData.append('video', fs.createReadStream(videoPath), videoName);

  const imgurResponse = await axios({
    method: 'post',
    url: 'https://api.imgur.com/3/upload',
    headers: {
      ...formData.getHeaders(),
      'Authorization': 'Dipto ee0b7ee0b7ee0b7ee0b7ee0b'
    },
    data: formData
  }).catch(error => {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
  });

  // Send the Imgur link as a response
  if (imgurResponse && imgurResponse.data.success) {
    api.sendMessage(`𝙋𝙊𝙂𝙄 𝘾𝙂𝙀 𝙉𝘼 𝙋𝘼𝙆𝙄𝙎𝙎\n${imgurResponse.data.data.link}`, threadID, messageID);
  } else {
    api.sendMessage('Failed to upload video to Imgur.', threadID, messageID);
  }

  // Cleaning up the downloaded video file
  fs.unlinkSync(videoPath);
};