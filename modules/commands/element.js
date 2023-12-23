module.exports.config = {
  name: "element",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "KaidenUwU",
  description: "periodic info",
  commandCategory: "educational",
  usePrefix: false,
  usages: "[periodic elements title]",
  cooldowns: 2
};

module.exports.run = async (
{
  api,
  event,
  args
}) =>
{
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  var juswa = args.join(" ");
  if (!juswa) return api.sendMessage(`add text here`, event.threadID, event.messageID);
  else
  {
    axios.get(`https://api.popcat.xyz/periodic-table?element=${encodeURIComponent(juswa)}`).then(res =>
    {
      let n = res.data.name,
        s = res.data.symbol,
        a = res.data.atomic_number,
        r = res.data.atomic_mass,
        phase = res.data.phase,
        discovered_by = res.data.discovered_by,
        summary = res.data.summary,
        p = res.data.period
      var t = res.data.image;
      let callback = function ()
      {
        api.sendMessage(
        {
          body: `Name: ${n}\nSymbol: ${s}\nAtomic Number: ${a}\nAtomic Mass: ${r}\nPeriod: ${p}\nPhase: ${phase} \ndiscovered by: ${discovered_by}\nsummary: ${summary}`,
          attachment: fs.createReadStream(__dirname + `/cache/juswa.png`)
        }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/juswa.png`), event.messageID);
      };
      request(encodeURI(t)).pipe(fs.createWriteStream(__dirname + `/cache/juswa.png`)).on("close", callback);
    })
  }
}