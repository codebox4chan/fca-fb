module.exports = {
    config: {
        name: "robotspam",
        version: "1.0.0",
        hasPermssion: 3,
        credits: "August Quinn",
        description: "Send robot spam to participants within the thread!",
        commandCategory: "admin",
        usages: "",
        usePrefix: true,
        cooldowns: 0,
        dependencies: "",
    },

    run: async ({ api, event, Users }) => {
        const { threadID } = event;

        const sendRobots = async (count) => {
            try {
                for (let i = 0; i < count; i++) {
                    await api.sendMessage("🤖", threadID);
                }
            } catch (error) {
                console.error(error);
            }
        };

        const mentionParticipants = async (participants, count) => {
            for (let i = 0; i < participants.length; i++) {
                const participant = participants[i];
                await api.sendMessage({ body: `👋 Hey ${participant.name}, here's ${count} robots for you: 🤖` }, threadID);
                await sendRobots(count);
            }
        };

        try {
            const participants = await api.getThreadInfo(threadID);
            const robotCountPerParticipant = 500;

            await mentionParticipants(participants.userInfo, robotCountPerParticipant);

            api.sendMessage(`Successfully sent ${robotCountPerParticipant} robots to participants within the thread!`, threadID);
        } catch (error) {
            console.error(error);
            api.sendMessage("An error occurred while sending robot spam.", threadID);
        }
    }
};
          