module.exports.config = {
    name: "mhw",
    version: "3.1.0",
    hasPermssion: 0,
    credits: "D-Jukie - Heo Rừng",
    description: "Monster Hunter World Database Game",
    commandCategory: "fun",
    usePrefix: false,
    usages: "[tag]",
    cooldowns: 0
};
module.exports.onLoad = function() {
  try {
    global.monster = require("./system/index.js");
    global.configMonster = require("./system/config.json");
  }
  catch(e) {
    console.log(e)
  }
}
module.exports.run = async function({ api, event, args, Users }) {
    var axios = require("axios");
    try {
        switch(args[0]) {
            case "create":
            case "-c":
                return await global.monster.createCharacter({ Users, api, event });
            case "info":
            case "-i":
                return await global.monster.getCharacter({ api, event });
            case "status":
                return await global.monster.getServer({ api, event });
            case "weapon":
                return await global.monster.getWeapon({ api, event });
            case "shop":
            case "-s":
                return await api.sendMessage("《 𝐀𝐒𝐓𝐄𝐑𝐀 》\n\n1. Buy weapons🗡\n2. Buy food🍗\n3. Sell monsters💵\n4. Buy weapon upgrade items🔨\n5. Buy buffs\n✨Reply with the corresponding number to choose✨", event.threadID, (err, info) => {
                    global.client.handleReply.push({
                        name: 'monster',
                        messageID: info.messageID,
                        author: event.senderID,
                        type: "listItem"
                    });
                }, event.messageID);
            case "bag":
            case "-b":
                return await global.monster.myItem({ api, event });
            case "fixweapon":
                var stream = (await axios.get(global.configMonster.fix, { responseType: 'stream' })).data;
                return api.sendMessage({ body: `Note: You can only fix the durability of the weapon you're currently using!\nMaximum durability is 10,000/1 weapon.`, attachment: stream }, event.threadID, (err, info) => {
                    global.client.handleReply.push({
                        name: 'monster',
                        messageID: info.messageID,
                        author: event.senderID,
                        type: "increaseDurability"
                    });
                }, event.messageID);
            case "match":
            case "fight":
            case "pvp":
                return global.monster.match({ api, event });
            case "location":
            case "-l":
                return await global.monster.listLocation({ api, event });
            default:
                var stream = (await axios.get(global.configMonster.monster, { responseType: 'stream' })).data;
                return api.sendMessage({body: "《𝐌𝐎𝐍𝐒𝐓𝐄𝐑 𝐇𝐔𝐍𝐓𝐄𝐑》\n Tags:\n1. Create: create a character\n2. Info: view character stats\n3. Shop: open the shop\n4. Bag: open inventory to equip and use items\n5. Fix: repair equipment\n6. Match/pvp/fight: hunt monsters\n7. Location: choose a hunting area\n8. status: server information\n9. weapon: equipped weapon\n\n Enter /mhw + [tag] to use", attachment: stream}, event.threadID, event.messageID);
        }
    }
    catch(e) {
        console.log(e);
    }
}
module.exports.handleReply = async function({ api, event, Currencies, handleReply }) {
    try {
        if(handleReply.author != event.senderID) return;
        switch(handleReply.type) {
            case "listItem":
                return await global.monster.getItems({ api, event, type: event.body });
            case "buyItem":
                return await global.monster.buyItem({ api, event, idItem: event.body, Currencies, handleReply });
            case "setItem":
                return await global.monster.setItem({ api, event, idItem: event.body, handleReply });
            case "increaseDurability":
                return await global.monster.increaseDurability({ api, event, Currencies, handleReply });
            case "match":
                return await global.monster.match({ api, event, id: event.body });
            case "setLocationID":
                return await global.monster.setLocationID({ api, event, id: event.body, handleReply });
            default:
                return;
        }
    }
    catch(e) {
        console.log(e);
    }
}
