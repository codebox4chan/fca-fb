/*palitan niyo nalang apikey */
const API = "https://api.botcahx.live/api/textpro/"/* dito kayo mag register */
const text = "?text="
const apikey = "&apikey=kk3qYLHq"
/*dito niyo lagay apikey */
module.exports.config = {
	name: "logov3",
	version: "1.1.0",
	hasPermssion: 0,
	credits: "ninjatech",/* wag palitan uwu => */
	description: "logo maker",
	commandCategory: "image",
	usePrefix: false,
	usages: "logo [kind of logo] [content]",
	cooldowns: 10
};
module.exports.run = async function ({ api, event, args,}) {
    const axios = require("axios");
    const fs = require("fs-extra");
    const qs = require("querystring");
    const art = args[0];
    content = args.slice(1).join(" ");
    (event.type == "message_reply") ? content = event.messageReply.attachments[0].url: content = args.slice(1).join(" ");
    const pathsave = __dirname + `/ninjatech/neon.png`;
    let imageBuffer;
    api.sendMessage("🌸 tangina maghintay🌸", event.threadID, event.messageID);
    axios.get(`${API}${art}${text}${encodeURI(content)}${apikey}`, {responseType: "arraybuffer"}) .then(data => {const imageBuffer = data.data;
    fs.writeFileSync(pathsave, Buffer.from(imageBuffer));
    api.sendMessage({body: `eto logo mo par`, attachment: fs.createReadStream(pathsave)}, event.threadID, () => fs.unlinkSync(pathsave), event.messageID);}).catch(error => {

          
            let err;
            if (error.response) err = JSON.parse(error.response.data.toString());
            else err = error;
            return api.sendMessage(`error naknampucha ${err.error} ${err.message}`, event.threadID, event.messageID);
        })
};
/*yung code nato binase ko lang sa ibang mga commands */
/* love you avryl */