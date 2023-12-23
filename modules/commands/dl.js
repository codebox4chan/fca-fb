function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

module.exports.config = {
  name: 'dl',
  version: "1.0.0",
  hasPermssion: 3,
  credits: "kennethpanio",
  description: "Download links",
  commandCategory: "tools",
  usages: "[link]",
  usePrefix: false,
  cooldowns: 60,
};

const axios = require("axios");

module.exports.run = async function({ api, event, args }) {
  const download = (url) => axios.get(url, { responseType: "stream" }).then((response) => response.data);

  let links;
  if (event.type == 'message_reply') {
    links = event.messageReply.body.split('\n');
  } else {
    links = args.join(' ').split('\n');
  }

  const validLinks = [];
  const invalidLinks = [];
  const audioLinks = [];
  const videoLinks = [];
  const mediaLinks = [];

  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    if (!isValidUrl(link)) {
      invalidLinks.push(i + 1);
    } else {
      validLinks.push(link);

      if (link.endsWith('.mp3')) {
        audioLinks.push(link);
      } else if (link.endsWith('.mp4')) {
        videoLinks.push(link);
      } else if (link.endsWith('.gif') || link.endsWith('.jpg') || link.endsWith('.jpeg') || link.endsWith('.png')) {
        mediaLinks.push(link);
      } else {
        invalidLinks.push(i + 1);
      }
    }
  }

  if (invalidLinks.length > 0) {
    const errorMessage = `Links ${invalidLinks.join(', ')} are not in the correct format. Removing...`;
    api.sendMessage({ body: errorMessage, attachment: [] }, event.threadID);
    links = links.filter((_, index) => !invalidLinks.includes(index + 1));
  }

  const audioAttachments = await Promise.all(audioLinks.map(async link => await download(link)));
  const videoAttachments = await Promise.all(videoLinks.map(async link => await download(link)));
  const mediaAttachments = await Promise.all(mediaLinks.map(async link => await download(link)));
  const successfulDownloads = audioAttachments.filter(Boolean).length + videoAttachments.filter(Boolean).length + mediaAttachments.filter(Boolean).length;

  api.sendMessage({
    body: `Downloading ${successfulDownloads} links...`,
    attachment: []
  }, event.threadID);

  if (audioAttachments.length > 0) {
    for (const audioAttachment of audioAttachments) {
      api.sendMessage({
        body: `Successfully downloaded 1 audio`,
        attachment: [audioAttachment]
      }, event.threadID);
    }
  }

  if (videoAttachments.length > 0) {
    for (const videoAttachment of videoAttachments) {
      api.sendMessage({
        body: `Successfully downloaded 1 video.`,
        attachment: [videoAttachment]
      }, event.threadID);
    }
  }

  if (mediaAttachments.length > 0) {
    let mediaMessage = `Successfully downloaded ${mediaAttachments.length} images and gifs`;
    api.sendMessage({
      body: mediaMessage,
      attachment: mediaAttachments
    }, event.threadID);
  }
}
