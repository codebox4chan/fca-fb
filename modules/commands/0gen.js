const fs = require("fs-extra");
const axios = require("axios");

const reactions = {
  "andrei": "💗",
  "kian": "😆",
  "michael": "😱",
  "joshier": "😃",
  "edrian": "😘",
  "verify gcash": "🤑"
};

const imageDetails = {
  "andrei": {
    url: "https://i.imgur.com/cfuR2Cg.jpg",
    body: "blehh😝",
  },
  "kian": {
    url: "https://i.imgur.com/Je89wyV.jpg",
    body: "bleh!😝",
  },
  "joshier": {
    url: "https://i.imgur.com/kTBztIP.jpg",
    body: "gi agbayan mas laki!😱😍",
  },
  "michael": {
    url: "https://i.imgur.com/nGpbnKe.jpg",
    body: "pogi!😍😍😍",
  },
  "edrian": {
    url: "https://i.imgur.com/T4Wa9bq.jpg",
    body: "mwah²💋",
  },
  "verify sa gcash": {
    url: "https://i.imgur.com/LDQSulf.jpg",
    body: "01# — TUTS HOW TO EDIT FAKE PHILHEALTH ID.\n\n02# — HOW TO VERIFY GCASH WITHOUT SCANNING FACE OF THE REAL OWNER ID.\n\n03# — BARCODE GENERATOR.\n\n04# — HOW TO MAKE UNLI’ GMAILS ACCOUNT.\n\n05# — VERIFY GCASH ACCOUNT WITHOUT USING ID.\n\n01#\n\n001. Click this link. Dapat sa messenger mo ioopen.\n⊂⊃ : https://www.canva.com/design/DAE7NQtuJyM/dSmDCPbrLvmXzhc3C7u3PQ/view?utm_content=DAE7NQtuJyM&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink&mode=preview\n\n002. Click 3 dots sa taas, tapos tap mo 'yong open in canva. If need ng sign in, sign in using your google or facebook account.\n\n003. Tap mo lang mga info, sa baba, may nakalagay na edit tapos tap mo 'yon, lagyan mo ng desired info mo.\n\n004. Sa pic naman, tap mo lang din tapos sa baba, may replace tapos click mo 'yon, lalabas mga photo sa gallery mo, mamili ka na lang.\n\n005. Then save mo na sa device mo kapag okay na. If ever mag-eedit ka ulit, punta ka lang sa recent\n\n02#\n• need mo ng isang valid id at isang picture mo na dapat ay matatakpan ang muka ng nasa id\n• punta ka sa gcash\n• get verified\n• ipatong ang picture mo na 1x1 sa muka ng nasa isa at iiscan mo\n• iiscan mo ang muka mo hindi ang may ari ng id\n• papalitan ang first letter ng first name ng id example ang name ng nasa id ay JAVOR pwede siya maging GAVOR,XAVOR etc kahit ano letter ang ipalit mo sa first letter ng first name.\n\n03#\n𝗚𝗘𝗡𝗘𝗥𝗔𝗧𝗘 𝗬𝗢𝗨𝗥 𝗢𝗪𝗡 𝗕𝗔𝗥𝗖𝗢𝗗𝗘 𝗛𝗘𝗥𝗘\nhttps://www.cognex.com/resources/interactive-tools/free-barcode-generator\nSelect the 𝗖𝗮𝘁𝗲𝗴𝗼𝗿𝘆 : Linear Codes. Enter your desired PhilHealth Number in 𝗗𝗮𝘁𝗮 and change the 𝗪𝗶𝗱𝘁𝗵 (𝗽𝘅) / 𝗢𝘂𝘁𝗽𝘂𝘁 𝗧𝘆𝗽𝗲 to 1200 and 𝗚𝗲𝗻𝗲𝗿𝗮𝘁𝗲 𝗕𝗮𝗿𝗰𝗼𝗱𝗲. After that, tap the 𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱 𝗕𝗮𝗿𝗰𝗼𝗱𝗲.\n𝗧𝗔𝗞𝗘 𝗡𝗢𝗧𝗘:\nTo verify your Gcash the ID must have:\n—clear and unfiltered\nphoto\n—real address and correct\npostal code\n—scannable bar code\nThe ID must also be printed in photo paper ( 2R or Wallet Size ) and laminated.\n\n04#\n𝗳𝗶𝗿𝘀𝘁 𝘄𝗮𝘆\n— una punta ka sa settings mo.\n— then click account\n— pindutin mo yung add account\n— tapos gung google na puzzle yung picture\n— click create for your self\n— then gawa kana account\n— may lalabad doon add phone number e iskip mo lang.\n𝘀𝗲𝗰𝗼𝗻𝗱 𝘄𝗮y\n— punta ka sa google.\n— search google classroom\n— add account\n— same method sa first way\n\n𝘁𝗵𝗶𝗿𝗱 𝘄𝗮𝘆\n— punta ka sa google\n— pindutin mo yung bilog sa taas\n— add account\n— same method parin\n\n𝗳𝗼𝘂𝗿𝘁𝗵 𝘄𝗮𝘆\n— punta ka sa youtube app\n─ click mo lng yung profile mo sa gilid\n─ tapos click mo yung plus sign\n─ tapos pindutin mo yung create account for my self\n— same method parin po.\n\n𝗻𝗼𝘁𝗲𝘀 :\n— clear cache/data pag medyo marami nang nakasava na gmail account\n— hindi lahat ng device ay gagana yung tuts nato.\n\n05#\nRequirements:\n—Enrollment form/school registration form\n— Parent consent (for minor pero try mo ilagay fil kesa minor para mawala yung consent)\n\nStep-by-Step:\n1. Go to “help center”\n\n2. Submit a “ticket”\n\n3. Click on “my gcash account”\n\n4. Click on “need assistance to get fully verified”\n\n5. Then click on “my valid ID is not on the list”\n(pag wala pang unang choice ang piliin)\n\n6. Check mo lang yung box doon\n7. Fill-up mo yung kailangan fill-up’an sa ibaba\n\n8. Then may kailangan don na 3 signayure with consent and selfie na hawak mo yung parental consent \n\nEXPLANATION:\n“There is no any other option in submitting ID; so instead, I want to submit a parental consent for my account to be fully verified. Thank you!”\n\n🥳 YAN ILAGAY MO SA EXPLANATION, WAIT 24-48 HOURS MAGSESEND NG EMAIL SI GCASH AND MAKIKITA MONG FULLY VERIFIED NA YUNG GCASH MO PAG TAPOS NA MA REVIEW YUNG TICKET MO.\n❗️Huwag pong atat huhu wait niyo pong ma-process.❗️"
  },
};

module.exports.config = {
  name: "dnhs",
  version: "1.1.1",
  hasPermssion: 0,
  credits: "TheBarKadaz",
  description: "automated send pictures response to make fun of friends",
  commandCategory: "message",
  usages: "",
  cooldowns: 30,
  usePrefix: false,
};

module.exports.handleEvent = async function ({ api, event }) {
  const { threadID } = event;
  const message = event.body ? event.body.toLowerCase() : '';
  const matchedKeyword = Object.keys(reactions).find(keyword => message.includes(keyword));

  if (matchedKeyword) {
    api.setMessageReaction(reactions[matchedKeyword], event.messageID, () => {}, true);

    try {
      const imageDetail = imageDetails[matchedKeyword];
      const response = await axios.get(imageDetail.url, { responseType: "arraybuffer" });
      const fileName = `${matchedKeyword}.png`;
      await fs.writeFile(fileName, response.data);

      api.sendMessage({
        body: imageDetail.body,
        attachment: fs.createReadStream(fileName),
      }, threadID);

      fs.unlinkSync(fileName);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  }
};
