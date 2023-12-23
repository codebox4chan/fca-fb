module.exports.config = {
  name: 'removebg',
  version: '1.1.1',
  hasPermssion: 0,
  credits: '𝙈𝙧𝙏𝙤𝙢𝙓𝙭𝙓/fixed by Jonell',
  description: 'remove photo background',
  commandCategory: 'tools',
  usages: '[Reply to an images or url images]',
  usePrefix: false,
  cooldowns: 2,
  dependencies: {
       'form-data': '',
       'image-downloader': ''
    }
};

const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs-extra');
const path = require('path');
const {image} = require('image-downloader');
module.exports.run = async function({
    api, event, args
}){
    try {
        if (event.type !== "message_reply") return api.sendMessage("🖼️ | You must to reply the photo you want to removed bg", event.threadID, event.messageID); api.sendMessage("🖼 | Removing Background Picture your provide. Please Wait....", event.threadID, event.messageID);
        if (!event.messageReply.attachments || event.messageReply.attachments.length == 0) return api.sendMessage("✅ | Removed Background Has Been Successfully ", event.threadID, event.messageID);
        if (event.messageReply.attachments[0].type != "photo") return api.sendMessage("❌ | This Media is not available", event.threadID, event.messageID);

        const content = (event.type == "message_reply") ? event.messageReply.attachments[0].url : args.join(" ");
        const prApi = ["1d24068fc42c06cbd86b40e241edd71d2c8a3215"]
        const inputPath = path.resolve(__dirname, 'cache', `photo.png`);
         await image({
        url: content, dest: inputPath
    });
        const formData = new FormData();
        formData.append('size', 'auto');
        formData.append('image_file', fs.createReadStream(inputPath), path.basename(inputPath));
        axios({
            method: 'post',
            url: 'https://sdk.photoroom.com/v1/segment',
            data: formData,
            responseType: 'arraybuffer',
            headers: {
                ...formData.getHeaders(),
                'X-Api-Key': prApi[Math.floor(Math.random() * prApi.length)],
            },
            encoding: null
        })
            .then((response) => {
                if (response.status != 200) return console.error('Error:', response.status, response.statusText);
                fs.writeFileSync(inputPath, response.data);
                return api.sendMessage({ attachment: fs.createReadStream(inputPath) }, event.threadID, () => fs.unlinkSync(inputPath));
            })
            .catch((error) => {
                return console.error('Failed Removedbg commands api', error);
            });
     } catch (e) {
        console.log(e)
        return api.sendMessage(`Error Api Removed Background Command`, event.threadID, event.messageID);
  }
         }