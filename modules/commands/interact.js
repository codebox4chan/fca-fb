module.exports.config = {
   name: "interact",
   version: "2.0.1",
   hasPermssion: 0,
   credits: "", //lagyan mona kung anong gusto mo
   description: "auto response",
   usePrefix: false,
   commandCategory: "system",
   usages: "last chat, ha, etc...",
   cooldowns: 1,
};

module.exports.handleEvent = function (
{
   api,
   event,
   client,
   __GLOBAL
})
{
   //font
   function font(letters)
   {
      const change = {
         a: "𝖺",
         b: "𝖻",
         c: "𝖼",
         d: "𝖽",
         e: "𝖾",
         f: "𝖿",
         g: "𝗀",
         h: "𝗁",
         i: "𝗂",
         j: "𝗃",
         k: "𝗄",
         l: "𝗅",
         m: "𝗆",
         n: "𝗇",
         o: "𝗈",
         p: "𝗉",
         q: "𝗊",
         r: "𝗋",
         s: "𝗌",
         t: "𝗍",
         u: "𝗎",
         v: "𝗏",
         w: "𝗐",
         x: "𝗑",
         y: "𝗒",
         z: "𝗓",
         A: "𝖠",
         B: "𝖡",
         C: "𝖢",
         D: "𝖣",
         E: "𝖤",
         F: "𝖥",
         G: "𝖦",
         H: "𝖧",
         I: "𝖨",
         J: "𝖩",
         K: "𝖪",
         L: "𝖫",
         M: "𝖬",
         N: "𝖭",
         O: "𝖮",
         P: "𝖯",
         Q: "𝖰",
         R: "𝖱",
         S: "𝖲",
         T: "𝖳",
         U: "𝖴",
         V: "𝖵",
         W: "𝖶",
         X: "𝖷",
         Y: "𝖸",
         Z: "𝖹"
      };
      let formattedFont = "";
      for (let i = 0; i < letters.length; i++)
      {
         const char = letters[i];
         formattedFont += change[char] || char;
      }
      return formattedFont
   }
   {
      var
      {
         threadID,
         messageID
      } = event;

      //last chat
      {
         let lastChat = ["lc", "last chat", "ako na lc", "ako na last chat", "lc ako", "last chat ako", "lc em"];
         if (event.body && typeof event.body === 'string' && event.body.trim() !== '')
         {
            if (lastChat.includes(event.body.toLowerCase()))
            {
               let lcVar = ["ako na beh, don't say that. you're more than just a last chat. everytime na maiisip mo na last chat ka no! you're a wonderful person and i appreciate you so much. hindi biro maging last chat. It must've been tough pero u did it. you're so strong kaya sobrang proud kami sayo.i know what you feel, yung feeling na maging last chat pero always remember you're a strong person. nakayanan mo ang lahat ng ito, if feeling mo magiging last chat ka nagchachat ka pa rin, we're so proud of you kaya you deserve a respect. you're an independent person. we love you so much.", `╭────༺♡༻────╮\n     In Loving Memories\n         —𝐋𝐀𝐒𝐓 𝐂𝐇𝐀𝐓—\n╰────༺♡༻────╯`, `     —𝗟𝗔𝗦𝗧 𝗖𝗛𝗔𝗧—\n\n
salo kona, ako naman palagi eh, palibhasa iniwan, pinaasa, di pinaglaban, di crinushback, at pampalipas oras lang naman ako, wala din namang nag mamahal sakin, sino ba naman ako`, `𝐒𝐀𝐆𝐈𝐏 𝐊𝐎𝐍𝐀 𝐋𝐀𝐒𝐓 𝐂𝐇𝐀𝐓\n\nTo be the last chat is such an honor and responsibility. If I were to be the last chat, I will use my chat to influence the youth, I will raise awareness to certain causes like Last chat awareness, I wanna show the world, my internet friends rather that I'm confidently cute to be the last chat`];
               let lcRes = lcVar[Math.floor(Math.random() * lcVar.length)];
               api.sendMessage(font(`${lcRes}`), threadID, messageID);
               api.setMessageReaction('', event.messageID, (err) =>
               {}, true);
            }
         }
      };

      //hakdog
      {
         let ha = ["ha", "hakdog", "hamburger", "halaman"];
         if (event.body && typeof event.body === 'string' && event.body.trim() !== '')
         {
            if (ha.includes(event.body.toLowerCase()))
            {
               let haVar = ["hatdog HAHAHAHA", "hatdog", "hakdog", "H A T D O G", "HA labyo yieee", "halaman", "hamburger HAHAHAHAHA", "HAngin"];
               let haRes = haVar[Math.floor(Math.random() * haVar.length)];
               api.sendMessage(font(`${haRes}`), threadID, messageID);
               api.setMessageReaction('', event.messageID, (err) =>
               {}, true);
            }
         }
      };
      //pwede ka pa mag dagdag dito, ito yung template:
      /*{
			let a = [//words na rereplyan ng bot];
			if (event.body && typeof event.body === 'string' && event.body.trim() !== '') {
				if (a.includes(event.body.toLowerCase())) {
					let r =[//ito naman yung mga responds ng bot];
					let r2 = r[Math.floor(Math.random() * r.length)];
					api.sendMessage(font(`${r2}`), threadID, messageID);
					api.setMessageReaction('//dito yung emoji(reaction)', event.messageID, (err) => {}, true);
				}
			}
		};*/
   }
}