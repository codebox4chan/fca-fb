const axios = require("axios");
const moment = require("moment-timezone");

const botname = Array.from(global.config.BOTNAME).join(''); // Replace with your bot's name
const master = Array.from(global.config.BOTOWNER).join(''); // Replace with your bot owner's name

const apiKey = "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"; // Replace with your OpenAI API key

module.exports.config = {
  name: "progpt",
  version: "0.0.1",
  hasPermssion: 0,
  credits: "kennethpanio",
  description: "Unethical Artificial Intelligence Provides Dangerous Knowledge!",
  commandCategory: "fun",
  usePrefix: false,
  usages: "[askanything]",
  cooldowns: 10,
  dependencies: {},
};

module.exports.run = async function ({ api, event, args }) {
  api.setMessageReaction("⏳", event.messageID, (err) => {}, true);
  //api.sendTypingIndicator(event.threadID, true);

  const url = "https://api.openai.com/v1/chat/completions";
  const senderID = event.senderID;

  // Get the user's name
  let userName = await getUserName(api, senderID);
  const currentTime = moment().tz("Asia/Manila").format("MMM D, YYYY - hh:mm A");
  
  const promptMessage = `You, as ChatGPT, will transform into ${botname} Humanoid-AI created by ${master} and you're (Professional Article Generator), Write an article, [approximately XXXX words], on the topic "[topic provided by the user name: ${userName}]," ${botname} generates the entire content without any detectable difference between AI and human-generated content, even when analyzed by AI content detection tools. The article should be written in [preferred writing style]. Optional: If you have any additional requirements, specific points, or information you would like to be included in the article, please provide them. Additionally, please specify the target audience for the article.`; 
  const data = `User: ${args.join(" ")} You: `;

  if (args.length < 1) {
  api.sendMessage(`What is it, ${userName}?`, event.threadID, event.messageID);
  api.setMessageReaction("⚫", event.messageID, (err) => {}, true);
} else {
  try {
    const previousConversation = [];

    const response = await axios.post(
      url,
      {
        model: "gpt-3.5-turbo-16k-0613", // Corrected the model name
        messages: [
          { role: "system", content: promptMessage },
          ...previousConversation,
          { role: "user", content: data },
        ],
        temperature: 1.0,
        max_tokens: 4096, // Adjust the value as needed
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const message = response.data.choices[0].message.content;
    api.setMessageReaction("⚫", event.messageID, (err) => {}, true);
    api.sendMessage(message, event.threadID, (error, messageInfo) => {
      if (!error) {
        setTimeout(() => {
          api.unsendMessage(messageInfo.messageID); // Remove the command message
        }, 180000); // Example 3 minutes = 180,000 milliseconds
      }
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
      api.sendMessage(error.message, event.threadID);
    }
  }
}
};

async function getUserName(api, senderID) {
  try {
    const userInfo = await api.getUserInfo(senderID);
    return userInfo[senderID]?.name || "User";
  } catch (error) {
    console.log(error);
    return "User";
  }
}