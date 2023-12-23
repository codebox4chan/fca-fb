const axios = require("axios");
module.exports.config = {
    name: "randominfo",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Prince Sanel",
    description: "get random information",
    usePrefix: true,
    commandCategory: "info",
    usages: "",
    cooldowns: 3,
};
module.exports.run = async function({ api, event, args }) {
	var { threadID, messageID } = event;
	try {
		const res = await axios(`https://sensui-useless-apis.codersensui.repl.co/api/tools/random-info`);
		api.sendMessage(`❯❯ Random Info\n\n❯ Name: ${res.data.name}\n❯ Gender: ${res.data.gender}\n❯ Age: ${res.data.age}\n❯ Email: ${res.data.email}\n❯ Phone No.: ${res.data.phone}\n❯ Cell No.: ${res.data.cell}\n❯ Address:\n» Street: ${res.data.address.street}\n» City: ${res.data.address.city}\n» State: ${res.data.address.state}\n» Country: ${res.data.address.country}\n» PostCode: ${res.data.address.postcode}\n❯ Nationality: ${res.data.nationality}\n❯ Username: ${res.data.username}\n❯ Registered: ${res.data.registered}\n❯ Dob: ${res.data.dob}\n❯ ID: ${res.data.id}\n❯ Timezone: ${res.data.timezone}\n❯ Login:\n» UUID: ${res.data.login.uuid}\n» Username: ${res.data.login.username}\n» Password: ${res.data.login.password}\n» Salt: ${res.data.login.salt}\n» Md5: ${res.data.login.md5}\n» Sha1: ${res.data.sha1}\n» Sha256: ${res.data.login.sha256}\n[DONE]`, threadID, messageID);
	} catch (error) {
		api.sendMessage("[!] An error occured while fetching the api.", threadID, messageID);
	}
}