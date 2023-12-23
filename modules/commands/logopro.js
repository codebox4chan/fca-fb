const axios = require("axios");
const request = require("request");
const fs = require("fs-extra");

module.exports.config = {
  name: "logopro",
  version: "1.0",
  hasPermssion: 0,
  credits: `Anjelo Cayao Arabis`, 
  description: "Make your own logo using textpro",
  commandCategory: "logo",
  usePrefix: true,
  usages: "list (page number) or (logo) (text)",
  cooldowns: 2,
};

module.exports.run = async function ({ api, event, args, Users }) {
  let { messageID, senderID, threadID } = event;

  if (args.length >= 2 && args[0].toLowerCase() === "list") {
    let page = parseInt(args[1]);
    switch (page) {
      case 1:
        return api.sendMessage(
          `here's the logo list - Page 1:\n1. Blue\n2. Pink Candy\n3. Orange\n4. Bronze\n5. Silver\n6. Purple\n7. Blue2\n8. Golden\n9. Hot\n10. Purple2\n11. Rainbow\n12. Light\n13. Wood\n14. Red\n15. Biscuit\n16. Abstragold\n17. Metal\n18. Fruit\n19. Frozen\n20. Marble\n21. Blodus\n22. Smoke\n23. Orange2\n24. Christmas\n25. Breakwall\n26. Rain\n27. Fonttext\n28. GreenNeon\n29. ColourBlur\n30. Demand\n\nPAGE 1 - 3`,
          threadID,
          messageID
        );
      case 2:
        return api.sendMessage(
          `Logo list - Page 2:\n31. Road\n32. Neon\n33. 3DBox\n34. NightMoon\n35. Neon2\n36. Blood\n37. Hack\n38. Bread\n39. Fish\n40. Chocolate\n41. ColourGlass\n42. PurpleGlass\n43. Jewelry\n44. Jewelry2\n45. GreenJal\n46. Rainbow2\n47. Robot\n48. Captain\n50. PurpleShiny\n51. BlueGlass\n52. OrangeGlass\n53. YellowGlass\n54. Lava\n55. Rock\n56. Peridot\n57. Decorate\n58. Denim\n59. Steel\n60. GoldBalloon\n61. GreenBalloon\n\nPAGE 2 - 3`,
          threadID,
          messageID
        );
      case 3:
        return api.sendMessage(
          `Logo list - Page 3:\n62. PurpleBalloon\n63. Skeleton\n64. Firework\n65. Natural\n66. Wicker\n67. Joker\n68. Galaxy\n69. Lion\n70. Metal\n71. Halloween\n72. Blood\n73. Xmas\n74. 3D-Metal\n75. MetalGold\n76. MetalRose\n77. MetalSilver\n78. NewYear\n79. YearCards\n80. NeonText\n81. DeluxGold\n82. Glossy-Carbon\n83. Holographic\n84. Minion\n85. Style-Text\n86. NeonLight\n87. Metal-Dark-Gold\n88. 3D-Glue\n89. SandWriting\n90. Sand-Engraved\n91. SandWriting2\n92. Write-In-Sand\n93. Cloud\n94. Christmas-Holiday\n95. Graffiti\n96. Underwater\n97. Watercolor\n98. Papercut\n99. 3D-Glossy-Metal\n100. Gradient`,
          threadID,
          messageID
        );
      default:
        return api.sendMessage(`Invalid page number! Please use "list 1" or "list 2" or "list 3 in the total of list there are 100 textpro logo for now.".`, threadID, messageID);
    }
  }

  if (args.length < 2) {
    return api.sendMessage(
      `Invalid command format! Use: textpro list or textpro list (page number) or textpro (logo) (text)`,
      threadID,
      messageID
    );
  }
  
  let type = args[0].toLowerCase();
  let name = args.slice(1).join(" ");
  let pathImg = __dirname + `/cache/${type}_${name}.png`;
  let apiUrl, message;
  
  switch (type) {
    case "blue":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=1&text=${name}`;
      message = "here's the [BLUE] Logo created:";
      break;
    case "pinkcandy":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=2&text=${name}`;
      message = "here's the [ PINK CANDY ] Logo created:";
      break;
    case "orange":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=3&text=${name}`;
      message = "here's the [ ORANGE ] Logo created:";
      break;
    case "bronze":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=4&text=${name}`;
      message = "here's the [BRONZE] Logo Created:";
      break;
    case "silver":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=5&text=${name}`;
      message = "here's the [ SILVER ] - Logo Created:";
      break;
    case "purple":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=6&text=${name}`;
      message = "here's the [ PURPLE ] Logo Created:";
      break;
    case "blue2":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=7&text=${name}`;
      message = "here's the [ BLUE2 ] Logo created:";
      break;
    case "golden":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=8&text=${name}`;
      message = "here's the [ GOLDEN ] Logo created:";
      break;
    case "hot":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=9&text=${name}`;
      message = "here's the [ HOT ] Logo created:";
      break;
    case "purple2":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=10&text=${name}`;
      message = "here's the [ PURPLE2 ] Logo created:";
      break;
    case "rainbow":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=11&text=${name}`;
      message = "here's the [ RAINBOW ] Logo created:";
      break;
    case "light":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=12&text=${name}`;
      message = "here's the [ LIGHT ] Logo created:";
      break;
    case "wood":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=13&text=${name}`;
      message = "here's the [ WOOD ] Logo created:";
      break;
    case "red":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=14&text=${name}`;
      message = "here's the [ RED ] Logo created:";
      break;
    case "biscuit":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=15&text=${name}`;
      message = "here's the [ BISCUIT ] Logo created:";
      break;
    case "abstragold":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=16&text=${name}`;
      message = "here's the [ ABSTRAGOLD ] Logo created:";
      break;
    case "metal":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=17&text=${name}`;
      message = "here's the [ METAL ] Logo created:";
      break;
    case "fruit":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=18&text=${name}`;
      message = "here's the [ FRUIT ] Logo created:";
      break;
    case "frozen":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=19&text=${name}`;
      message = "here's the [ FROZEN ] Logo created:";
      break;
    case "marble":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=20&text=${name}`;
      message = "here's the [ MARBLE ] Logo created:";
      break;
    case "blodus":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=21&text=${name}`;
      message = "here's the [ BLODUS ] Logo created:";
      break;
    case "smoke":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=22&text=${name}`;
      message = "here's the [ SMOKE ] Logo created:";
      break;
    case "orange2":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=23&text=${name}`;
      message = "here's the [ ORANGE2 ] Logo created:";
      break;
    case "christmas":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=24&text=${name}`;
      message = "here's the [ CHRISTMAS ] Logo created:";
      break;
    case "breakwall":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=25&text=${name}`;
      message = "here's the [ BREAKWALL ] Logo created:";
      break;
    case "rain":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=26&text=${name}`;
      message = "here's the [ RAIN ] Logo created:";
      break;
    case "fonttext":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=27&text=${name}`;
      message = "here's the [ FONTTEXT ] Logo created:";
      break;
    case "greenneon":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=28&text=${name}`;
      message = "here's the [ GREENNEON ] Logo created:";
      break;
    case "colourblur":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=29&text=${name}`;
      message = "here's the [ COLOURBLUR ] Logo created:";
      break;
    case "demand":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=30&text=${name}`;
      message = "here's the [ DEMAND ] Logo created:";
      break;
    case "road":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=31&text=${name}`;
      message = "here's the [ ROAD ] Logo created:";
      break;
    case "neon":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=32&text=${name}`;
      message = "here's the [ NEON ] Logo created:";
      break;
    case "3dbox":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=33&text=${name}`;
      message = "here's the [ 3DBOX ] Logo created:";
      break;
    case "nightmoon":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=34&text=${name}`;
      message = "here's the [ NIGHTMOON ] Logo created:";
      break;
    case "neon2":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=35&text=${name}`;
      message = "here's the [ NEON2 ] Logo created:";
      break;
    case "blood":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=36&text=${name}`;
      message = "here's the [ BLOOD ] Logo created:";
      break;
    case "hack":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=37&text=${name}`;
      message = "here's the [ HACK ] Logo created:";
      break;
    case "bread":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=38&text=${name}`;
      message = "here's the [ BREAD ] Logo created:";
      break;
    case "fish":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=39&text=${name}`;
      message = "here's the [ FISH ] Logo created:";
      break;
    case "chocolate":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=40&text=${name}`;
      message = "here's the [ CHOCOLATE ] Logo created:";
      break;
    case "colourglass":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=41&text=${name}`;
      message = "here's the [ COLOURGLASS ] Logo created:";
      break;
    case "purpleglass":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=42&text=${name}`;
      message = "here's the [ PURPLEGLASS ] Logo created:";
      break;
    case "jewelry":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=43&text=${name}`;
      message = "here's the [ JEWELRY ] Logo created:";
      break;
    case "jewelry2":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=44&text=${name}`;
      message = "here's the [ JEWELRY2 ] Logo created:";
      break;
    case "greenjal":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=45&text=${name}`;
      message = "here's the [ GREENJAL ] Logo created:";
      break;
    case "rainbow2":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=46&text=${name}`;
      message = "here's the [ RAINBOW2 ] Logo created:";
      break;
    case "robot":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=47&text=${name}`;
      message = "here's the [ ROBOT ] Logo created:";
      break;
    case "captain":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=48&text=${name}`;
      message = "here's the [ CAPTAIN ] Logo created:";
      break;
    case "purpleshiny":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=50&text=${name}`;
      message = "here's the [ PURPLESHINY ] Logo created:";
      break;
    case "blueglass":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=51&text=${name}`;
      message = "here's the [ BLUEGLASS ] Logo created:";
      break;
    case "orangeglass":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=52&text=${name}`;
      message = "here's the [ ORANGEGLASS ] Logo created:";
      break;
    case "yellowglass":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=53&text=${name}`;
      message = "here's the [ YELLOWGLASS ] Logo created:";
      break;
    case "lava":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=54&text=${name}`;
      message = "here's the [ LAVA ] Logo created:";
      break;
    case "rock":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=55&text=${name}`;
      message = "here's the [ ROCK ] Logo created:";
      break;
    case "peridot":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=56&text=${name}`;
      message = "here's the [ PERIDOT ] Logo created:";
      break;
    case "decorate":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=57&text=${name}`;
      message = "here's the [ DECORATE ] Logo created:";
      break;
    case "denim":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=58&text=${name}`;
      message = "here's the [ DENIM ] Logo created:";
      break;
    case "steel":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=59&text=${name}`;
      message = "here's the [ STEEL ] Logo created:";
      break;
    case "goldballoon":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=60&text=${name}`;
      message = "here's the [ GOLDBALLOON ] Logo created:";
      break;
    case "greenballoon":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=61&text=${name}`;
      message = "here's the [ GREEN BALLOON ] Logo created:";
      break;
    case "purpleballoon":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=62&text=${name}`;
      message = "here's the [ PURPLE BALLOON ] Logo created:";
      break;
    case "skeleton":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=63&text=${name}`;
      message = "here's the [ SKELETON ] Logo created:";
      break;
    case "firework":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=64&text=${name}`;
      message = "here's the [ FIREWORK ] Logo created:";
      break;
    case "natural":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=65&text=${name}`;
      message = "here's the [ NATURAL ] Logo created:";
      break;
    case "wicker":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=66&text=${name}`;
      message = "here's the [ WICKER ] Logo created:";
      break;
    case "joker":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=67&text=${name}`;
      message = "here's the [ JOKER ] Logo created:";
      break;
    case "galaxy":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=68&text=${name}`;
      message = "here's the [ GALAXY ] Logo created:";
      break;
    case "lion":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=69&text=${name}`;
      message = "here's the [ LION ] Logo created:";
      break;
    case "metal":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=70&text=${name}`;
      message = "here's the [ METAL ] Logo created:";
      break;
    case "halloween":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=71&text=${name}`;
      message = "here's the [ HALLOWEEN ] Logo created:";
      break;
    case "blood":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=72&text=${name}`;
      message = "here's the [ BLOOD ] Logo created:";
      break;
    case "xmas":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=73&text=${name}`;
      message = "here's the [ XMAS ] Logo created:";
      break;
    case "3D-metal":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=74&text=${name}`;
      message = "here's the [ 3D-METAL ] Logo created:";
      break;
    case "metalgold":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=75&text=${name}`;
      message = "here's the [ METALGOLD ] Logo created:";
      break;
    case "metalrose":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=76&text=${name}`;
      message = "here's the [ METALROSE ] Logo created:";
      break;
    case "metalsilver":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=77&text=${name}`;
      message = "here's the [ METALSILVER ] Logo created:";
      break;
    case "newyear":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=78&text=${name}`;
      message = "here's the [ NEWYEAR ] Logo created:";
      break;
    case "yearcards":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=79&text=${name}`;
      message = "here's the [ YEARCARDS ] Logo created:";
      break;
    case "neontext":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=80&text=${name}`;
      message = "here's the [ NEON TEXT ] Logo created:";
      break;
    case "deluxgold":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=81&text=${name}`;
      message = "here's the [ DELUX GOLD ] Logo created:";
      break;
    case "glossy-carbon":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=82&text=${name}`;
      message = "here's the [ GLOSSY CARBON ] Logo created:";
      break;
    case "holographic":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=83&text=${name}`;
      message = "here's the [ HOLOGRAPHIC ] Logo created:";
      break;
    case "minion":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=84&text=${name}`;
      message = "here's the [ MINION TEXT ] Logo created:";
      break;
    case "style-text":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=85&text=${name}`;
      message = "here's the [ STYLE TEXT ] Logo created:";
      break;
    case "neonlight":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=86&text=${name}`;
      message = "here's the [ NEON LIGHT ] Logo created:";
      break;
    case "metal-dark-gold":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=87&text=${name}`;
      message = "here's the [ METAL DARK GOLD ] Logo created:";
      break;
    case "3D-glue":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=88&text=${name}`;
      message = "here's the [ 3D GLUE ] Logo created:";
      break;
    case "sandwriting":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=89&text=${name}`;
      message = "here's the [ SANDWRITING  ] Logo created:";
      break;
    case "sand-engraved":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=90&text=${name}`;
      message = "here's the [ SAND ENGRAVED ] Logo created:";
      break;
    case "sandwriting2":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=91&text=${name}`;
      message = "here's the [ SANDWRITING2 ] Logo created:";
      break;
    case "write-in-sand":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=92&text=${name}`;
      message = "here's the [ WRITE IN SAND ] Logo created:";
      break;
    case "cloud":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=93&text=${name}`;
      message = "here's the [ CLOUD ] Logo created:";
      break;
    case "christmas-holiday":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=94&text=${name}`;
      message = "here's the [ CHRISTMAS HOLIDAY ] Logo created:";
      break;
    case "graffiti":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=95&text=${name}`;
      message = "here's the [ GRAFFITI ] Logo created:";
      break;
    case "underwater":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=96&text=${name}`;
      message = "here's the [ UNDERWATER ] Logo created:";
      break;
    case "watercolor":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=97&text=${name}`;
      message = "here's the [ WATERCOLOR ] Logo created:";
      break;
    case "papercut":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=98&text=${name}`;
      message = "here's the [ PAPERCUT ] Logo created:";
      break;
    case "3D-glossy-metal":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=99&text=${name}`;
      message = "here's the [ 3D GLOSSY METAL ] Logo created:";
      break;
    case "gradient":
      apiUrl = `https://textpro.yukihirasomaa.repl.co/api/textpro?number=100&text=${name}`;
      message = "here's the [ GRADIENT ] Logo created:";
      break;
      default:
      return api.sendMessage(`Invalid logo type! Use .textpro list 1 to see the list of textpro logos.`, threadID, messageID);
  }

  api.sendMessage("Processing your textpro logo, please wait...", threadID, messageID);
  let response = await axios.get(apiUrl, { responseType: "arraybuffer" });
  let logo = response.data;
  fs.writeFileSync(pathImg, Buffer.from(logo, "utf-8"));
  return api.sendMessage(
    {
      body: message,
      attachment: fs.createReadStream(pathImg),
    },
    threadID,
    () => fs.unlinkSync(pathImg),
    messageID
  );
};