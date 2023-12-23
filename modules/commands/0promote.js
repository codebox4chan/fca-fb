module.exports = {
    config: {
        name: "promote",
        aliases: ["adminme"],
        version: "1.0",
        credits: "kenneth panio",
        description: "just useless cmd",
        commandCategory: "tools",
        cooldowns: 10,
        usages: "[uid]",
        hasPermssion: 0,
        usePrefix: true,
        author: "Somby KH",
        countDown: 5,
        role: 2,
        shortDescription: {
            en: "Respect command - make the user an administrator of the current thread",
            tl: "Respect command - gawin kang administrator ng kasalukuyang thread",
        },
        longDescription: {
            en: "Respect command - make the user an administrator of the current thread",
            tl: "Respect command - gawin kang administrator ng kasalukuyang thread",
        },
        category: "box",
        guide: {
            en: "{p}respect",
            tl: "{p}respect",
        },
    },

    onStart: async function (context) {
        const { api, event, args } = context;
        const threadID = event.threadID;
        const adminID = args.length > 0 ? args[0] : event.senderID;

        await api.changeAdminStatus(threadID, adminID, true);

        api.sendMessage(`${adminID === event.senderID ? "You are" : `${adminID} is`} now an administrator of this thread. Respect!`, threadID, event.messageID);
    },

    run: async function (context) {
        await module.exports.onStart(context);
    },
};
