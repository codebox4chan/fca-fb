const axios = require('axios');
const fs = require('fs-extra');

const models = [
"46846", "232703", "180845", "106922", "64094", "209164", "176425", "93208", "128713", "181914", "179446", "100675", "143906", "119057", "5038", "156263", "75209", "218017", "121557", "89855", "108289", "234105", "86698", "132760", "198401", "115942", "130121", "95489", "224009", "224200", "223670", "130072", "182252", "141866", "160495", "127207", "127416", "112809", "108545", "127680", "90854", "220703", "90599", "181248", "6087", "229575", "166916", "158294", "223684", "142125", "147184", "204878", "189192", "25993", "181191", "124626", "137204", "113391", "6878", "5036", "167841", "224080", "105796", "24129", "137207", "69687", "70977", "158155", "115086", "120036", "101966", "159473", "180919", "114492", "234205", "153135", "84783", "103277", "6792", "89927", "90674", "112825", "208500", "215628", "147336", "229535", "12763", "138124", "232266", "125903", "161429", "110299", "17084", "205925", "220987", "23323", "233820", "53806", "2810071", "45669", "29179", "128046", "5021", "45601", "179525", "23326", "67192", "71733", "14459", "75", "90587", "123908", "207802", "232446", "224916", "139087", "107812", "142506", "43825" ];
const ratios = ['0', '1', '2']

module.exports.config = {
  name: 'imagine',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'JARiF | Akash Xzh', //dont change author or remove ... otherwise i will turn off the API
  description: 'Text to Image',
  usePrefix: true,
  commandCategory: 'image',
  cooldowns: 10,
  usages: `type {pn} with prompts | model_number | ratio\n\n1. ReV Animated v1.2.2-EOL
    2. Babes Babes 3.0
    3. Aniverse V1.5 - Pruned
    4. Hassaku (hentai model) v1.3
    5. NeverEnding Dream (NED) v1.22 baked vae
    6. Indigo Furry mix v90_hybrid
    7. majicMIX realistic 麦橘写实 v7
    8. Dark Sushi Mix 大颗寿司Mix 2.25D
    9. DreamShaper 8
    10. BB95 Furry Mix v12.0
    11. Perfect World 完美世界 v6 (Baked)
    12. MeinaHentai V4
    13. epiCRealism Natural Sin RC1 VAE
    14. MeinaMix Meina V11
    15. AbyssOrangeMix2 - Hardcore AbyssOrangeMix2_hard
    16. Ether Real Mix Ether Real Mix 3.1
    17. majicMIX sombre 麦橘唯美 v2.0
    18. RealCartoon3D v10
    19. ICBINP - "I Can't Believe It's Not Photography" SECO
    20. majicMIX lux 麦橘奇幻 v2
    21. MeinaPastel V6 ( Pastel )
    22. majicMIX fantasy 麦橘幻想 v3.0
    23. PerfectDeliberate v4.0
    24. AbsoluteReality v1.8.1
    25. CyberRealistic v4.0
    26. Realisian v5.0
    27. DarkSun v4.1
    28. AnyLoRA - Checkpoint bakedVae (blessed) fp16 NOT-PRUNED
    29. RealCartoon-Realistic V10
    30. RealCartoon-Pixar V5
    31. epiCPhotoGasm Last Unicorn
    32. Realistic Vision V5.1 V5.1 (VAE)
    33. Checkpoint YesMix v3.5
    34. Dark Sushi 2.5D 大颗寿司2.5D v4.0
    35. Analog Madness - Realistic model v6.0
    36. Juggernaut Aftermath
    37. SXZ Luma 0.9X VAE
    38. MeinaUnreal V4.1
    39. Mistoon_Anime v2.0
    40. Lucky Strike Mix 可爱女人Lovely Lady V1.05
    41. 万象熔炉 | Anything V5/Ink ink
    42. Sardonyx REDUX v3.0
    43. Colorful v3.1
    44. Virile Reality V3.0 BETA 3
    45. Kotosmix V1.0
    46. AingDiffusion v12
    47. Arthemy Comics v5.0
    48. Sweet-mix v2.2-flat
    49. Animesh Animesh-Full V2.2
    50. Clarity Clarity 3
    51. Meichidark_Mix MeichiDark_V4.5
    52. Flat-2D Animerge v4.0
    53. YiffyMix v35
    54. FaceBombMix v1_bakedVAE
    55. Animerge V2.4
    56. RPG v5
    57. Experience Experience v10
    58. richyrichMix richyrichMix-v2.fp16
    59. Corneo's 7th Heaven Mix v2
    60. AbyssOrangeMix2 - NSFW AbyssOrangeMix2_nsfw
    61. Blazing Drive _V10g
    62. RealCartoon-Anime V7
    63. FaeTastic FaeTastic Version 2
    64. Comic Babes v1
    65. Consistent Factor (Euclid) Euclid (v6.1)
    66. majicMIX reverie 麦橘梦幻 v1.0
    67. Cartunafied v3
    68. Art Universe v8.0
    69. LazyMix+ (Real Amateur Nudes) v3.0b
    70. PerfectDeliberate-Anime v1.0
    71. CarDos Animated v3.0
    72. FluffyRock e184-vpred-e157
    73. RaemuMix v6.0
    74. Ether Blu Mix Ether Blu Mix 5
    75. JAM (just another merge) v2.0_bakedvae_pruned
    76. PicX 1.0
    77. iCoMix iCoMix V05
    78. fCAnimeMix - fC: 动漫 (Anime) v3.0
    79. Kenshi 01
    80. AAM - AnyLoRA Anime Mix - Anime Screencap Style Model v1
    81. Koji v2.1
    82. MeinaAlter V3
    83. Matrix-Hentai-Plus v3.0
    84. BeautyFool v3.0
    85. HARD HARDER
    86. Virile Fusion v3.0 BETA 1
    87. The Ally's Mix III: Revolutions V1.0
    88. CalicoMix v7.5
    89. Hardcore - Hentai v1.2 [baked VAE]
    90. seizaMix v2
    91. CamelliaMIx_2.5D V3
    92. Goofball Mix v2-baked
    93. KoreanStyle2.5D KoreanStyle2.5D Baked VAE fp16
    94. Beautiful Art v7.0
    95. The Truality Engine The Truality Engine V3
    96. Galena Blend v1.2
    97. KayWaii v7.0
    98. majicMIX horror 麦橘恐怖 v1
    99. Anime Pastel Dream Soft - baked vae
    100. CyberRealistic Classic Classic V2.0
    101. TheAlly's Mix IV: Verisimilar v1.0
    102. Grapefruit (hentai model) grapefruitV4.1
    103. 3D Animation Diffusion v1.0
    104. AbyssOrangeMix2 - SFW/Soft NSFW AbyssOrangeMix2_sfw
    105. Aurora v1.0
    106. Rabbit v7
    107. Sardonyx Blend v1.2
    108. rMadArt (SD1.5) v10.0 (test)
    109. Pika's New Generation v2.0
    110. Night Sky YOZORA Style Model YoZoRa-V1-origin
    111. Anything V3 fp16
    112. Dreamscapes & Dragonfire - NEW! - V2.0! - (SEMI-REALISM FANTASY MODEL) DS&Dv2.0
    113. architecture_Exterior_SDlife_v4.0
    114. NeatNess Fluffy Fur Mix Zephyr
    115. RaesanMix v4.1
    116. endlessReality v5
    117. OnlyRealistic | 《唯》· 超高清真人写实 v30 Baked VAE
    118. blue_pencil v10
    119. Kawaii Realistic European Mix v0.4
    120. CarDos Anime v2.0\n\nExample: {pn}imagine cute girl | 1 | 2`
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  const text = args.join(" ");
  if (!text) {
    return api.sendMessage("Please provide a prompt.", threadID, messageID);
  }

  let prompt, ss, r;

  if (text.includes("|")) {
    const [promptText, modelInput, ratioInput] = text.split("|").map((str) => str.trim());
    prompt = promptText;

    if (!isNaN(modelInput) && !isNaN(ratioInput)) {
      const modelNumber = parseInt(modelInput);
      const ratioNumber = parseInt(ratioInput);

      if (modelNumber >= 1 && modelNumber <= models.length) {
        ss = models[modelNumber - 1];
      } else {
        return api.sendMessage("Invalid model number. Please use a valid number from the guide.", threadID, messageID);
      }

      if (ratioNumber >= 0 && ratioNumber < ratios.length) {
        r = ratios[ratioNumber];
      } else {
        return api.sendMessage("Invalid ratio number. Please use a valid ratio number from the available options.", threadID, messageID);
      }
    } else {
      return api.sendMessage("Invalid input for model or ratio. Please use valid numbers for model and ratio.", threadID, messageID);
    }
  } else {
    prompt = text;
    ss = "46846";
    r = "2";
  }
  const waitingMessage = await api.sendMessage("Processing your image...", threadID, MessageID);
  try {

      const x = `https://project-imagine.onrender.com/imagine?prompt=${encodeURIComponent(prompt)}&model=${ss}&ratio=${r}`;

    const timeout = 20000;
    const imageStreamPromise = a.get(x.data.image, { responseType: 'arraybuffer' });

    try {
      const imageStream = await Promise.race([
        imageStreamPromise,
        new Promise((_, reject) =>
          setTimeout(() => {
            api.unsendMessage(waitingMessage.messageID);
            reject(new Error('API request timeout.'));
          }, timeout)
        ),
      ]);

      if (imageStream) {
        const path = __dirname + `/cache/image.png`;
        fs.writeFileSync(path, Buffer.from(imageStream.data, 'utf-8'));
  api.sendMessage( {
            attachment: fs.createReadStream(path),
          },
          threadID,
          () => {
            fs.unlinkSync(path);
            api.unsendMessage(waitingmessage, messageID);
          },
          messageID
        );
      } else {

        api.sendMessage("Error...", threadID, messageID);
      }
    } catch (error) {
    console.error(error);
      api.sendMessage("Error...", threadID, messageID);
    }
  } catch (error) {
    console.error(error);
    api.sendMesaage("Error...", threadID, messageID);
   }
};