module.exports = function ({ api, models, Users, Threads, Currencies }) {
    const logger = require("../../utils/log.js");
    const moment = require("moment");

    return function ({ event }) {
        const timeStart = Date.now();
        const time = moment.tz("Asia/Manila").format("HH:MM:ss L");
        const { userBanned, threadBanned } = global.data;
        const { events } = global.client;
        const { DeveloperMode, APPROVED, approval, PREFIX, allowInbox } = global.config;
        let { senderID, threadID } = event;
        senderID = String(senderID);
        threadID = String(threadID);

        const notApproved = `This group is not approved yet!\n\nthe bot will automatically leave this group after 5 minutes\n\nPlease use "${PREFIX}𝗿𝗲𝗾𝘂𝗲𝘀𝘁" to send an approval request to the bot operators and wait for the operators to approve this group.\n\nDo not add this bot again if this group is not approved yet, or else the bot will automatically block you! instead, contact the developer of this chatbot!\n\nhttps://www.facebook.com/100081201591674\n\n🗓️:${time}`;

        if (!APPROVED.includes(threadID) && approval) {
            return api.sendMessage(notApproved, threadID, async (err, info) => {
                if (err) {
                    return logger.error(`can't send the message`);
                }
                await new Promise(resolve => setTimeout(resolve, 80 * 1000));
                return api.unsendMessage(info.messageID);
            });
        }

        if (userBanned.has(senderID) || threadBanned.has(threadID) || (allowInbox == false && senderID == threadID)) return;

        for (const [key, value] of events.entries()) {
            if (value.config.eventType.indexOf(event.logMessageType) !== -1) {
                const eventRun = events.get(key);
                try {
                    const Obj = {};
                    Obj.api = api;
                    Obj.event = event;
                    Obj.models = models;
                    Obj.Users = Users;
                    Obj.Threads = Threads;
                    Obj.Currencies = Currencies;
                    eventRun.run(Obj);

                    if (DeveloperMode == !![]) 
                        logger(global.getText('handleEvent', 'executeEvent', time, eventRun.config.name, threadID, Date.now() - timeStart), 'Event');
                } catch (error) {
                    logger(global.getText('handleEvent', 'eventError', eventRun.config.name, JSON.stringify(error)), "error");
                }
            }
        }
        return;
    };
};
