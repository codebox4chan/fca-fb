const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");

module.exports.config = {
    name: "put",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "August Quinn",
    description: "Overlay a smaller image onto the replied image",
    commandCategory: "image",
    usePrefix: true,
    cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
    const messageReply = event.messageReply;
    if (!messageReply || args.length === 0) {
        return api.sendMessage("Usage: Send a photo and reply with /put [image URL]", event.threadID);
    }

    try {
        const imageAttachments = messageReply.attachments;
        if (!imageAttachments || imageAttachments.length === 0) {
            return api.sendMessage("Error: Unable to fetch the image you replied to.", event.threadID);
        }

        const imageAttachment = imageAttachments[0];
        const imageUrl = imageAttachment.url;
        const overlayImageUrl = args[0];

        const imageBuffer = await loadImage(imageUrl);
        const overlayImageBuffer = await loadImage(overlayImageUrl);

        const canvas = createCanvas(imageBuffer.width, imageBuffer.height);
        const context = canvas.getContext("2d");

        context.drawImage(imageBuffer, 0, 0, imageBuffer.width, imageBuffer.height);

        const scaleFactor = 0.2; // Adjust this to make the overlay image even smaller
        const overlayWidth = overlayImageBuffer.width * scaleFactor;
        const overlayHeight = overlayImageBuffer.height * scaleFactor;
        const offsetX = (imageBuffer.width - overlayWidth) / 2;
        const offsetY = (imageBuffer.height - overlayHeight) / 2;

        context.drawImage(overlayImageBuffer, offsetX, offsetY, overlayWidth, overlayHeight);

        const editedImageBuffer = canvas.toBuffer();

        fs.writeFileSync("editedImage.png", editedImageBuffer);

        return api.sendMessage({
            body: "Here's the edited image with overlay:",
            attachment: fs.createReadStream("./cache/editedImage.png"),
        }, event.threadID);

    } catch (error) {
        console.error(error);
        return api.sendMessage("An error occurred while processing the images.", event.threadID);
    }
};
      