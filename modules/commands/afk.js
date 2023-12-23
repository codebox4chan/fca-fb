module.exports.config = {
    name: "afk",
    version: "1.0.0",
    hasPermssion: 1,
    credits: "D-Jukie",
    description: "AFK!",
    commandCategory: "tools",
    usePrefix: true,
    usages: "[input reason]",
    cooldowns: 5
};
module.exports.run = async ({ event: e, api: w, args: b }) => {
    const { threadID: t, messageID: n, senderID: c } = e;
    if (!global.afk) { global.afk = new Map() }
    if(global.afk.has(t) == false) { global.afk.set(t, { v: [] }) }
    var h = global.afk.get(t)
    var r = b.join(' ') || 'No reason'
    h.v.push({ c, r,  p: 1, v: [] })
    global.afk.set(t, h)
    return w.sendMessage(`AFK set successfully\nNote: ${r}`, t, n);
}
module.exports.handleEvent = async function ({ event: e, api: w, Users }) {
    const { threadID: t, messageID: n, senderID: c, body: y } = e;
    if(!global.afk) return
    var q = global.afk.get(t);
    if(!q) return;
    var a = Object.keys(e.mentions);
    if(a.length !== 0) {
        var k = []
        for (let i of a) {
            var g = q.v.some(h => h.c == i);
            if(g == true) {
                var s = q.v.find(d => d.c == i)
                w.sendMessage(`Admin: ${(await Users.getData(i)).name} is AFK: ${s.r}`, t, n)
                s.v.push({
                    c: c,
                    y: y
                })
            }
        }
    }
    var x = q.v.some(z => z.c == c);
    var u = q.v.find(z => z.c == c);
    if(u !== undefined) {
        if(x == true && u.p == 0) {
            var m = ``
            m+= `${u.v.length} people mentioned you while you were AFK:\n`
            for(let i of u.v) {
                m+= `👤 Name: ${(await Users.getData(i.c)).name}\nContent: ${i.y}\n\n`
            }
            m += ``
            var i = q.v.findIndex(f => f.c == c);
            q.v.splice(i, 1)
            global.afk.set(t, q);
            return w.sendMessage(`\n${m}`, t, n);
        }
        u.p = 0
        global.afk.set(t, q);
    }
}
