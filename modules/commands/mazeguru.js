const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const { createCanvas, loadImage, registerFont } = require("canvas");

module.exports.config = {
  name: "guru",
  description: "Generate an image based on a text prompt",
  usages: "[model 1-43] [prompt]",
  commandCategory: "image",
  usePrefix: false,
  credits: "kennethpanio",
  version: "0.0.1",
  hasPermssion: 0,
  cooldowns: 18,
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  const text = args.join(" ");

  let prompt, model;

if (!text) {
  const availableModels = `Available Models: \n0. Absolute Reality V16\n1. Absolute Reality V181\n2. Analog Diffusion 1.0\n3. Anything V3.0 (Pruned)\n4. Anything V4.5 (Pruned)\n5. Anything V5 (PrtRE)\n6. AOM3A3 Orange Mix\n7. Children's Stories V13D\n8. Children's Stories V1 Semi-Real\n9. Children's Stories V1 Toon Anime\n10. Cyberrealistic V33\n11. Deliberate V2\n12. Dreamlike Anime 1.0\n13. Dreamlike Diffusion 1.0\n14. Dreamlike Photoreal 2.0\n15. Dreamshaper 6 (Baked VAE)\n16. Dreamshaper 7\n17. Dreamshaper 8\n18. Edge of Realism Eor V20\n19. Eimis Anime Diffusion V1\n20. Elldreth's Vivid Mix\n21. Epic Realism Natural Sin RC1VAE\n22. I Can't Believe It's Not Photography Seco\n23. Juggernaut Aftermath\n24. Lyriel V16\n25. Mechamix V10\n26. Meinamix Meina V9\n27. Meinamix Meina V11\n28. Open Journey V4\n29. Portrait Plus V1.0\n30. Realistic Vision V1.4 (Pruned, FP16)\n31. Realistic Vision V2.0\n32. Realistic Vision V4.0\n33. Realistic Vision V5.0\n34. Redshift Diffusion V10\n35. Rev Animated V122\n36. Run DiffusionFX 25D V10\n37. Run DiffusionFX V10\n38. SD V1.4\n39. V1.5 (Pruned, Emaonly)\n40. Shonin's Beautiful V10\n41. The Ally's Mix II (Churned)\n42. Timeless 1.0\n43. ToonYou Beta 6`;
  api.sendMessage(
    `Please provide a prompt for image generation.\n\nHow to use model? here's example: guru 35 a beautiful girl\n\n${availableModels}`,
    threadID);
  return;
  
  }

  if (text.includes(" ")) {
    const [modelText, promptText] = text.split(" ");
    model = parseInt(modelText);
    prompt = promptText;
  } else {
    model = 0; // Default model
    prompt = text;
  }

  try {
    // Send a "Waiting, generating image for you..." message
    api.sendMessage("generating image for you...", threadID, messageID);
//credits to the owner, sorry i borrowed your api
    const API = `https://aliestercrowley.com/api/crowgen.php?model=${model}&prompt=${encodeURIComponent(
      prompt
    )}`;
    const response = await axios.get(API, { responseType: "arraybuffer" });

    const imageStream = Buffer.from(response.data, "binary");
    const imageFileName = path.join(__dirname, "./cache/mazeguru.png");

    fs.writeFileSync(imageFileName, imageStream);

    // Create a canvas
    const canvas = createCanvas(800, 600); // Specify the canvas size
    const ctx = canvas.getContext("2d");

    // Load the image
    const image = await loadImage(imageFileName);

    // Draw the image on the canvas
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

// Add watermark to the top-left corner
const watermarkText = "•|Maze.Guru|•";
ctx.font = "28px Bold"; // Adjust the font size and family as needed

// Measure the width of the text
const textWidth = ctx.measureText(watermarkText).width;

// Calculate the background width based on text width
const backgroundWidth = textWidth + 20; // Add some padding

// Calculate the background height
const backgroundHeight = 60; // Adjust the height as needed

// Define the radius for the rounded corners
const cornerRadius = 10; // Adjust the radius as needed

// Add a black background behind the text with curved edges
ctx.fillStyle = "rgba(0, 0, 0, 10.)"; // Adjust the background color and opacity
ctx.beginPath();
ctx.moveTo(0, cornerRadius);
ctx.lineTo(0, backgroundHeight - cornerRadius);
ctx.arcTo(0, backgroundHeight, cornerRadius, backgroundHeight, cornerRadius);
ctx.lineTo(backgroundWidth - cornerRadius, backgroundHeight);
ctx.arcTo(backgroundWidth, backgroundHeight, backgroundWidth, backgroundHeight - cornerRadius, cornerRadius);
ctx.lineTo(backgroundWidth, cornerRadius);
ctx.arcTo(backgroundWidth, 0, backgroundWidth - cornerRadius, 0, cornerRadius);
ctx.lineTo(cornerRadius, 0);
ctx.arcTo(0, 0, 0, cornerRadius, cornerRadius);
ctx.closePath();
ctx.fill();

// Add watermark text on top of the black background with orange text color
ctx.fillStyle = "rgba(255, 165, 0, 1.0)"; // Orange color (adjust the values as needed)
ctx.fillText(watermarkText, 10, 30);


    // Save the canvas as an image
    const watermarkedImage = canvas.toBuffer();
    fs.writeFileSync(imageFileName, watermarkedImage);

    const imageMessage = {
      body: "Here's your generated image:",
      attachment: fs.createReadStream(imageFileName),
    };

    await api.sendMessage(imageMessage, threadID);
    fs.unlinkSync(imageFileName);
  } catch (error) {
    console.error(error);
    api.sendMessage("An error occurred while generating the image. Please try again later.", threadID);
  }
};
