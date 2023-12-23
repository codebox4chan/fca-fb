
const axios = require('axios');
let autoReact = "on";

module.exports = {
    config: {
        name: "reactor",
        aliases: [], 
        version: "1.0",
        hasPermssion: 2, 
        role: 0, 
        author: "LiANE", 
        credits: "LiANE", 
        description: "Not a cmd", 
        shortDescription: "Not a cmd", 
        longDescription: " Not a cmd", 
        usePrefix: true, 
        category: "Noprefix", 
        commandCategory: "system", 
        usages: "", 
        guide: " wala", 
        cooldowns: 5, 
        countDown:  5 // Removed the comma at the end
    },
    onMAIN: async({ api, event }, botType) => {
        const [cmd, ...args] = event.body.split(" ");
if (args[0] === "status") {
}
       else if (args[0] === "on") {
            autoReact = "On";
        } else if (args[0] === "off") {
            autoReact = "Off";
        } else {
            if (autoReact === "On") {
                autoReact = "Off";
            } else if (autoReact === "Off") { 
                autoReact = "On";
            }
        }

        api.sendMessage(`✨ |  Auto React for: ${botType}

Auto React will automatically react to a user's message, depending on the message context.
- LiANE

🎉
 | Status: ${autoReact}`, event.threadID);
    },
    onStart: async (context) => {
        const botType = "Goatbot V2";
        await module.exports.onMAIN(context, botType); 
    },
    run: async (context) => {
        const botType = "Botpack / Mirai";
        await module.exports.onMAIN(context, botType); 
    },
    onChat: async (context) => { 
        const { api, event } = context;
if (autoReact === "Off") 
{
return;
}

        // Probability of 40%, adjust it depending on what you need, but not 100%, please
        if (Math.random() < 0.7) {
            const response = await axios.get(`https://school-project-lianefca.bene-edu-ph` + `.repl.co/autoreact?query=${encodeURIComponent(event.body)}`);
            const emoji = response.data.message;
            api.setMessageReaction(emoji, event.messageID, () => {}, true);
        }
    }, 
    handleEvent: async (context) => {
        await module.exports.onChat(context);
    },
};