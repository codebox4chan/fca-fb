module.exports.config = {
    name: "sorry",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "jasper",
    description: "Continuously tag the person you tagged for 5 times\nYou can call that person's soul",
    commandCategory: "fun",
    usages: "[@mention]",
    usePrefix: false,
    cooldowns: 10,
    dependencies: {
        "fs-extra": "",
        "axios": ""
    }
}

module.exports.run = async function({ api, args, Users, event}) {
    var mention = Object.keys(event.mentions)[0];
    if(!mention) return api.sendMessage("ok? 🤔🤷", event.threadID);
 let name =  event.mentions[mention];
    var arraytag = [];
        arraytag.push({id: mention, tag: name});
    var a = function (a) { api.sendMessage(a, event.threadID); }
a("sorry po");
setTimeout(() => {a({body: "Isa lang ang gusto kong sabihin sayo, mahal na mahal kita" + " " + name, mentions: arraytag})}, 3000);
setTimeout(() => {a({body: "kahit minsan hindi tayo mag kaintindihan " + " " + name, mentions: arraytag})}, 5000);
setTimeout(() => {a({body: "I hope na sana patawarin mona ko" + " " + name, mentions: arraytag})}, 7000);
setTimeout(() => {a({body: "Alam mo mahal ayoko nang mawala kapa " + " " + name, mentions: arraytag})}, 9000);
setTimeout(() => {a({body: "Sorry  po mahal sa nagawa ko " + " " +  name, mentions: arraytag})}, 12000);
setTimeout(() => {a({body: "na misunderstood lang tayo hehe " + " " + name, mentions: arraytag})}, 15000);
setTimeout(() => {a({body: " bati napo please " + " " + name, mentions: arraytag})}, 17000);
setTimeout(() => {a({body: "Wag kana po magalit mahal" + " " + name, mentions: arraytag})}, 20000);
setTimeout(() => {a({body: "Sorry po " + " " + name, mentions: arraytag})}, 23000);
setTimeout(() => {a({body: "yiee wag n magalit " + " " + name, mentions: arraytag})}, 25000);
setTimeout(() => {a({body: "kiss nalang kita ksksks" + " " + name, mentions: arraytag})}, 28500);
setTimeout(() => {a({body: "*/kiss ur tight " + " " + name, mentions: arraytag})}, 31000);
setTimeout(() => {a({body: "*/kiss ur forehead" + " " + name, mentions: arraytag})}, 36000);
setTimeout(() => {a({body: "*/kiss ur cheek's" + " " + name, mentions: arraytag})}, 39000);
setTimeout(() => {a({body: "*/kiss ur lips" + " " + name, mentions: arraytag})}, 40000);
setTimeout(() => {a({body: "mwuah mwuah nayan" + " " + name, mentions: arraytag})}, 65000);
setTimeout(() => {a({body: "yiee bati na" + " " + name, mentions: arraytag})}, 70000);
setTimeout(() => {a({body: "galit kapa din😭😭" + " " + name, mentions: arraytag})}, 75000);
setTimeout(() => {a({body: "dimonako lab?🥺 " + " " + name, mentions: arraytag})}, 80000);
setTimeout(() => {a({body: "iiyak ako sigee" + " " + name, mentions: arraytag})}, 85000);
setTimeout(() => {a("joke mahalll sorry naaa po")} , 90000);
setTimeout(() => {a({body: "nangungulila napo ko" + " " + name, mentions: arraytag})}, 95000);
setTimeout(() => {a({body: "maawa ka naman" + " " + name, mentions: arraytag})}, 100000);
setTimeout(() => {a({body: "hahahaha yiee loveyouuuu " + " " + name, mentions: arraytag})}, 105000);
setTimeout(() => {a("ganda mo mahal^>^")} , 110000);


  
      }