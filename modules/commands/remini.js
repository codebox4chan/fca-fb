module.exports.config = {
  name: "remini",
  version: "0.0.1",
  hasPermssion: 0,
  usePrefix: false,
  credits: "Hazeyy",
  description: "𝙀𝙣𝙝𝙖𝙣𝙘𝙚 𝙄𝙢𝙖𝙜𝙚",
  commandCategory: "tools",
  usages: "[Reply to an Image]",
  cooldowns: 3
};

let eta = 3;

module.exports.run = async ({ api, event, args }) => {
  const axios = global.nodemodule["axios"];
  let send = msg => api.sendMessage(msg, event.threadID, event.messageID);

  if (event.type != "message_reply") return send("😸𝖸𝗈𝗎 𝗇𝖾𝖾𝖽 𝗍𝗈 𝗋𝖾𝗉𝗅𝗒 𝖺𝗇 𝗂𝗆𝖺𝗀𝖾");

  send(`✅𝖤𝗇𝗁𝖺𝗇𝖼𝗂𝗇𝗀 𝖨𝗆𝖺𝗀𝖾𝗌 𝖱𝖾𝗌𝗈𝗅𝗎𝗍𝗂𝗈𝗇 𝖿𝗈𝗋... ${event.messageReply.attachments.length} image(s) (${event.messageReply.attachments.length * eta}s)`);

  let stream = [];
  let exec_time = 0;

  for (let i of event.messageReply.attachments) {
    try {
      let res = await axios.get(encodeURI(`https://nams.live/upscale.png?{"image":"${i.url}","model":"4x-UltraSharp"}`), {
        responseType: "stream"
      });

      exec_time += +res.headers.exec_time;
      eta = res.headers.exec_time / 1000 << 0;
      res.data.path = "tmp.png";
      stream.push(res.data);
    } catch (e) {}
  }

  send({
    body: `✅𝖲𝗎𝖼𝖼𝖾𝗌𝗌 (${exec_time / 1000 << 0}s)`,
    attachment: stream
  });
};
        