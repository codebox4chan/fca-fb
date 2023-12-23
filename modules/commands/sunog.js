const axios = require('axios');

module.exports.config = {
    name: "sunog",
    version: "22.1.0",
    hasPermssion: 2,
    credits: "mahiro",
    description: "Report fb Account",
    commandCategory: "admin",
    usePrefix: true,
    usages: "(link)",
    cooldowns: 5
};

module.exports.handleReply = async function ({ api, event, handleReply, client }) {
    if (event.senderID !== handleReply.author) return;
    switch (handleReply.Case) {
        case 1: {
            return api.sendMessage("Please reply to this message and enter the real name of the Facebook user you want to report!", event.threadID, (error, info) => {
                global.client.handleReply.push({ Link: event.body, RealName: event.body, Gmail: null, Content: null, Time: null, name: this.config.name, messageID: info.messageID, author: event.senderID, Case: 2 });
            });
        }
        case 2: {
            return api.sendMessage("Please reply to this message and enter your Gmail to receive Facebook notifications!", event.threadID, (error, info) => {
                global.client.handleReply.push({ Link: handleReply.Link, RealName: handleReply.RealName, Gmail: event.body, Content: null, Time: null, name: this.config.name, messageID: info.messageID, author: event.senderID, Case: 3 });
            });
        }
        case 3: {
            return api.sendMessage("Please reply to this message and enter what you want to report!", event.threadID, (error, info) => {
                global.client.handleReply.push({ Link: handleReply.Link, RealName: handleReply.RealName, Gmail: handleReply.Gmail, Content: event.body, Time: null, name: this.config.name, messageID: info.messageID, author: event.senderID, Case: 4 });
            });
        }
        case 4: {
            global.client.handleReply.push({ Link: handleReply.Link, RealName: handleReply.RealName, Gmail: handleReply.Gmail, Content: handleReply.Content, Time: event.body, name: this.config.name, messageID: info.messageID, author: event.senderID, Case: 5 });
            return api.sendMessage("You requested to report the victim with the following information:\nReal Name: " + handleReply.RealName + "\nGmail (yours): " + handleReply.Gmail + "\nContent: " + handleReply.Content + "\nNumber of reports: " + handleReply.Time, event.threadID, (error, info) => {
                api.sendMessage("Please reply 'ok' to confirm the report launch 💀", event.threadID, (err, info) => {
                    global.client.handleReply.push({ Link: handleReply.Link, RealName: handleReply.RealName, Gmail: handleReply.Gmail, Content: handleReply.Content, Time: handleReply.Time, name: this.config.name, messageID: info.messageID, author: event.senderID, Case: 6 });
                });
            });
        }
        case 5: {
            var Time = parseInt(event.body);
            if (isNaN(event.body)) {
                global.client.handleReply.push({ Link: handleReply.Link, RealName: handleReply.RealName, Gmail: handleReply.Gmail, Content: handleReply.Content, Time: event.body, name: this.config.name, messageID: info.messageID, author: event.senderID, Case: 5 });
                return api.sendMessage("Please re-enter the number of reported victims!", event.threadID, (error, info) => {
                    global.client.handleReply.push({ Link: handleReply.Link, RealName: handleReply.RealName, Gmail: handleReply.Gmail, Content: handleReply.Content, Time: event.body, name: this.config.name, messageID: info.messageID, author: event.senderID, Case: 5 });
                });
            }
            if (event.body < 1 || event.body > 100) {
                global.client.handleReply.push({ Link: handleReply.Link, RealName: handleReply.RealName, Gmail: handleReply.Gmail, Content: handleReply.Content, Time: event.body, name: this.config.name, messageID: info.messageID, author: event.senderID, Case: 5 });
                return api.sendMessage("Please enter the number of reported victims between 1 and 100!", event.threadID, (error, info) => {
                    global.client.handleReply.push({ Link: handleReply.Link, RealName: handleReply.RealName, Gmail: handleReply.Gmail, Content: handleReply.Content, Time: event.body, name: this.config.name, messageID: info.messageID, author: event.senderID, Case: 5 });
                });
            }
            return api.sendMessage("You requested to report the victim with the following information:\nReal Name: " + handleReply.RealName + "\nGmail (yours): " + handleReply.Gmail + "\nContent: " + handleReply.Content + "\nNumber of reports: " + Time, event.threadID, (error, info) => {
                api.sendMessage("Please reply 'ok' to confirm the report launch 💀", event.threadID, (err, info) => {
                    global.client.handleReply.push({ Link: handleReply.Link, RealName: handleReply.RealName, Gmail: handleReply.Gmail, Content: handleReply.Content, Time: Time, name: this.config.name, messageID: info.messageID, author: event.senderID, Case: 6 });
                });
            });
        }
        case 6: {
            if (event.body !== "ok") return api.sendMessage("Please reply 'ok' to confirm the report launch 💀", event.threadID, (error, info) => {
                global.client.handleReply.push({ Link: handleReply.Link, RealName: handleReply.RealName, Gmail: handleReply.Gmail, Content: handleReply.Content, Time: handleReply.Time, name: this.config.name, messageID: info.messageID, author: event.senderID, Case: 6 });
            });
            for (let i = 0; i < handleReply.Time; i++) {
                try {
                    const endpoint = `https://mahirosunogcmd--cyberinstitute.repl.co/sunog?cookie=datr= W6TPZJlvnUr01a_odzLYN95y; fr= 0xLyRCl5MQYVcBJ6W.AWVlDSa4i8bT-T3AymXCSWc8swQ.Bkz6Rb.lA.AAA.0.0.Bkz6Rc.AWU8nDYlPew; m_page_voice= 100095121363796; sb= W6TPZPGxgIJKLJ3LrY8UMyFf; xs= 14%3AFxn1MfxcLiYS5w%3A2%3A1691329629%3A-1%3A22;c_user= 100095121363796&id=${handleReply.Link}`;
                    const response = await axios.get(endpoint);

                    console.log(i + "/ Report " + response.data);
                    await new Promise(resolve => setTimeout(resolve, 1 * 1000));
                } catch (e) {
                    console.log(e);
                    return api.sendMessage("Unknown Error\n" + e, event.threadID);
                }
            }
            return api.sendMessage(`Sent: ${handleReply.Time} report(s) to victim ${handleReply.RealName}!`, event.threadID);
        }
    }
};

module.exports.run = async function ({ api, event, client }) {
    return api.sendMessage("Please reply to this message and enter the Facebook link of the person you want to report!", event.threadID, (error, info) => {
        global.client.handleReply.push({ Link: null, RealName: null, Gmail: null, Content: null, Time: null, name: this.config.name, messageID: info.messageID, author: event.senderID, Case: 1 });
    });
};
