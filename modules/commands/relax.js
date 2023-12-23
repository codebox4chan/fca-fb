const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "relax",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "August Quinn",
  description: "Automatically sends Binaural Beats when certain keywords are detected in the message.",
  commandCategory: "system",
  usePrefix: false,
  cooldowns: 1,
};

module.exports.run = async ({ event, api }) => {};

module.exports.handleEvent = async ({ event, api }) => {
  const message = event.body.toLowerCase();
  const senderID = event.senderID;

  const binauralBeats = {
    "calm sound, relaxation sound, focus, meditation, binaural beats, theta wave, relax theta wave, enery and focus sound, sound waves": [
      {
        title: "Deep Theta Wave",
        description: "To optimize your experience with Deep Theta Waves binaural beats, it's essential to use headphones or headsets. High-quality headphones are recommended to ensure clear audio and a comfortable fit. Closed-back headphones are preferable as they minimize sound leakage, creating a more immersive experience. Stereo headphones are crucial for the binaural effect, providing distinct left and right channels that the beats rely on. Over-ear headphones offer a deeper and enveloping sound quality compared to other types. For consistent audio, opt for a wired connection over Bluetooth.\n\nComfort is key, so choose headphones that fit comfortably over your ears, allowing for extended listening without discomfort. Noise isolation or cancellation features can enhance your session by reducing external disturbances and enhancing the binaural effect. Find a quiet environment to fully immerse yourself in the beats, adopting a relaxed posture while wearing your headphones.\n\nWhen adjusting the volume, start at a moderate level and make sure it's comfortable for your ears. To safeguard your hearing, avoid listening at high volumes. It's important to select binaural beats recordings from reputable sources that provide clear instructions on how to use them effectively.\n\nWhile listening, focus solely on the beats and let your mind synchronize with the rhythm. This mindful approach enhances the experience, so avoid multitasking or engaging in demanding activities that could distract from the effect. By following these recommendations, you can fully engage with the Deep Theta Waves binaural beats and derive the maximum benefits while using headphones or headsets.",
        audioUrl: "https://drive.google.com/uc?export=download&id=1qNPuf63E6O7UCtDV1BoAYTCmhRNirNgP",
      },
      {
        title: "Relax Theta Wave",
        description: "For a truly immersive experience with Relax Theta Waves, using headphones or headsets is essential. These soothing waves are designed to guide you into a state of deep relaxation and tranquility. To make the most of your session, opt for high-quality headphones that ensure the gentle audio nuances are crystal clear. Find a comfortable and quiet space, allowing yourself to fully absorb the calming effects of the Theta Waves. As you listen, let go of stress and worries, allowing the serene rhythm to wash over you. Remember to adjust the volume to a pleasant level, avoiding excessive loudness. By engaging with Relax Theta Waves through headphones, you can enhance your relaxation journey and find a peaceful escape from the demands of the day.",
        audioUrl: "https://drive.google.com/uc?export=download&id=1q_FGIbB6sgivTdcQsQUIeqsTfZcDQFHh",
      },
      {
        title: "Intense Focus",
        description: "Inducing an Intense Focus with Theta Waves requires the use of headphones or headsets for an immersive experience. These specialized waves are crafted to enhance concentration and cognitive clarity. Opt for headphones of superior quality to ensure the precision of audio delivery. In a conducive environment, let the Theta Waves envelop you, sharpening your mental acuity. As you listen, feel distractions fade away, leaving space for unwavering focus. Adjust the volume thoughtfully, keeping it at a comfortable level. With the aid of headphones, harness the power of Intense Focus Theta Waves to elevate your productivity and achieve a heightened sense of mental clarity.",
        audioUrl: "https://drive.google.com/uc?export=download&id=1qcOgDlv0hlz5QaQgAaOt-5DooSb_d3lr",
      },
      {
        title: "Power Nap for Energy and Focus",
        description: "Elevate your Energy and Focus through rejuvenating Power Naps, enriched by the use of headphones or headsets. These restorative breaks are designed to replenish your vitality and enhance cognitive alertness. Select headphones of superior quality to ensure the precision of audio delivery. Find a serene space and settle in, allowing the nap to wash over you, recharging your faculties. As you drift into relaxation, feel your energy renewing and mental clarity sharpening. Adjust the volume to a soothing level, steering clear of excessive loudness. With headphones as your conduit, harness the potential of Power Naps to amplify your energy levels and boost focus, ensuring you emerge revitalized and ready to conquer challenges.",
        audioUrl: "https://drive.google.com/uc?export=download&id=d/1qhHxXpNSxSo8Gb1ChdUOhT-slmE1mHmt",
      },
      {
        title: "Love Signal 528 HZ",
        description: "Amplify your emotional connection with the Love Signal at 528 Hertz, enhanced by the enveloping embrace of headphones or headsets. This specific frequency is renowned for its potential to enhance feelings of love, compassion, and harmony. Opt for headphones that ensure impeccable audio quality, allowing the nuances of the Love Signal to resonate deeply. In a tranquil setting, open yourself to the frequency's influence, allowing it to stir emotions and foster a sense of connection. As the Love Signal envelops you, feel your heart opening and resonating with positive energy. Adjust the volume to a level that resonates with you, prioritizing a comfortable and immersive experience. Through headphones, you can fully immerse yourself in the transformative power of the Love Signal at 528 Hertz, nurturing feelings of love and unity.",
        audioUrl: "https://drive.google.com/uc?export=download&id=1qmZbHAvRfDsjFkC9JK19l6fXHhboGLdR",
      },
      {
        title: "Heart Beat + Binaural Beat",
        description: "Experience the Heart Beat + Binaural Beat fusion to enhance your well-being. Put on headphones or headsets for the best experience. The Heart Beat adds a soothing rhythm that syncs with your body, while the Binaural Beat uses special sounds to help your mind relax. Get comfy in a quiet spot, and let the beats guide you. As you listen, feel the Heart Beat calming you and the Binaural Beat easing your mind. Adjust the volume to a comfy level. With headphones, feel the unique blend of these beats, helping you relax deeply and find balance.",
        audioUrl: "https://drive.google.com/uc?export=download&id=1qqKZwUh9fGBeQY7BP5bn_k3syB_cIu43",
      },
      {
        title: "Brain Wave Sound for Relaxation and Visualisation",
        description: "Engage with Brain Wave Sounds for Relaxation and Visualization, amplified through the use of headphones or headsets. These sounds are crafted to ease your mind and enhance your inner imagery. Don your headphones to ensure the best auditory experience. Find a peaceful space and settle in, allowing the sounds to envelop you. As you listen, feel your mind unwinding and your imagination coming alive. Adjust the volume to a pleasant level, maintaining comfort. With headphones, immerse yourself fully in the Brain Wave Sounds, letting them guide you into a state of deep relaxation and vivid visualization.",
        audioUrl: "https://drive.google.com/uc?export=download&id=1r-wd0y1o-x-0hmqMqoWW-uoW0JDt6lcp",
      },
      {
        title: "Alpha Wave: Relaxation and Meditation",
        description: "Elevate your relaxation and meditation with Alpha Waves, enhanced through the use of headphones or headsets. These gentle waves are designed to soothe your mind and deepen your meditation experience. Slip on your headphones to ensure optimal audio quality. Find a calm, comfortable spot and settle in, letting the Alpha Waves envelop you. As you listen, feel your stress melting away and your mind entering a serene state. Adjust the volume to your comfort, creating a soothing ambiance. Through headphones, fully embrace the Alpha Waves, allowing them to guide you into a tranquil state of relaxation and meditation.",
        audioUrl: "https://drive.google.com/uc?export=download&id=1r0Z7qXp9aJdpAmyNhC2485ccXKGCRgqY",
      },
      {
        title: "Relaxing Theta Waves",
        description: "Immerse yourself in 15 minutes of Relaxing Theta Waves, amplified by the use of headphones or headsets. These soothing waves are designed to ease your mind and create a calming atmosphere. Put on your headphones for an enriched auditory experience. Find a comfortable space, and as you settle in, let the gentle Theta Waves surround you. Feel your stress melting away and your mind entering a state of peaceful tranquility. Adjust the volume to a level that feels right for you, ensuring a relaxing experience. Through headphones, embrace the Relaxing Theta Waves fully, allowing them to lead you into a serene state for the next 15 minutes, where worries fade and relaxation takes over.",
        audioUrl: "https://drive.google.com/uc?export=download&id=1r7ytbCF22jz4nplZEGwRDP0xoC9kHdgk",
      },
      // Add ka pa kung gusto mo.
    ],
  };

  for (const keywords in binauralBeats) {
    if (binauralBeats.hasOwnProperty(keywords)) {
      const keywordsToCheck = keywords.split(',').map(kw => kw.trim());

      for (const kw of keywordsToCheck) {
        if (message.includes(kw)) {
          const randomIndex = Math.floor(Math.random() * binauralBeats[keywords].length);
          const selectedBeat = binauralBeats[keywords][randomIndex];

          try {
            const response = await axios.get(selectedBeat.audioUrl, { responseType: "arraybuffer" });
            const audioBuffer = Buffer.from(response.data, "binary");

            const audioFilePath = path.join(__dirname, "cache", `${kw}_${randomIndex}.mp3`);
            fs.writeFileSync(audioFilePath, audioBuffer);

            const attachment = fs.createReadStream(audioFilePath);

            const messageBody = `𝗧𝗜𝗧𝗟𝗘: ${selectedBeat.title}\n\n𝗗𝗘𝗦𝗖𝗥𝗜𝗣𝗧𝗜𝗢𝗡: ${selectedBeat.description}`;

            await api.sendMessage({ body: messageBody, attachment }, event.threadID, event.messageID);

            fs.unlinkSync(audioFilePath);
          } catch (error) {
            console.error(error);
          }

          break;
        }
      }
    }
  }
};

module.exports.listenGlobal = true;
