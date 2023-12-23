module.exports.config = {
    name: "masstag",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "VanHung & Dựa trên demo của NTKhang",
    description: "Continuously tag the person you tag for 5 times\nYou can call that person's soul",
    commandCategory: "group",
    usePrefix: true,
    usages: "masstag @mention",
    cooldowns: 1000000,
    dependencies: {
        "fs-extra": "",
        "axios": ""
    }
}

module.exports.run = async function({ api, args, Users, event}) {
    var mention = Object.keys(event.mentions)[0];
    if(!mention) return api.sendMessage("Need to tag 1 friend you want to call soul", event.threadID);
    let name =  event.mentions[mention];
    var arraytag = [];
        arraytag.push({id: mention, tag: name});
    var a = function (a) { api.sendMessage(a, event.threadID); }
a("Start calling souls!");
setTimeout(() => {a({body: "tara ml idol" + " " + name, mentions: arraytag})} , 3000);
setTimeout(() => {a({body: "tara ml idol" + " " + name, mentions: arraytag})} , 4000);
setTimeout(() => {a({body: "tara ml idol" + " " + name, mentions: arraytag})} , 5000);
setTimeout(() => {a({body: "tara ml idol" + " " + name, mentions: arraytag})} , 6000);
setTimeout(() => {a({body: "tara ml idol" + " " + name, mentions: arraytag})} , 6500);
setTimeout(() => {a({body: "tara ml idol" + " " + name, mentions: arraytag})} , 7000);
setTimeout(() => {a({body: "tara ml idol" + " " + name, mentions: arraytag})} , 7500);
setTimeout(() => {a({body: "tara ml idol" + " " + name, mentions: arraytag})} , 8000);
setTimeout(() => {a({body: "tara ml idol" + " " + name, mentions: arraytag})} , 8500);
setTimeout(() => {a({body: "tara ml idol" + " " + name, mentions: arraytag})} , 9000);
setTimeout(() => {a({body: "Hoyy anona" + " " + name, mentions: arraytag})} , 9500);
setTimeout(() => {a({body: "bobo kaba" + " " + name, mentions: arraytag})} , 10000);
 }