const axios = require('axios');

module.exports.config = {
  name: "mbti",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "August Quinn",
  description: "Get description and traits for a specific MBTI personality type",
  commandCategory: "info",
  usePrefix: false,
  usages: "[personality type]",
  cooldowns: 5,
};

module.exports.run = async ({ api, event, args }) => {
  const baseURL = "https://mbti.august-api.repl.co";
  const personalityType = args[0]?.toUpperCase();

  if (!personalityType) {
    return api.sendMessage("There are 16 distinct personality types form which consist of different characteristics unique to that type. What is your type?\n\nESTP: I prefer to have a structured and planned approach to life. I am organized and efficient in my tasks, and I value action and adventure.\n\nISFP: I prefer a more spontaneous and flexible approach to life. I am open-minded and adaptable to change, and I value creativity and self-expression.\n\nISFJ: I prefer to have a structured and planned approach to life. I am organized and efficient in my tasks, and I value stability and security.\n\nINFJ: I prefer a more spontaneous and flexible approach to life. I am open-minded and adaptable to change, and I value creativity and originality.\n\nINTP: I am primarily focused on facts and data. I prefer to learn through my senses and am comfortable with concrete information, and I enjoy solving puzzles and finding logical solutions.\n\nISTJ: I am primarily focused on ideas and concepts. I prefer to learn through abstract thought and am comfortable with theoretical information, and I value accuracy and attention to detail.\n\nENTP: I make decisions based on logic and reason. I am objective and impartial in my judgments, and I enjoy debating and challenging ideas, and I value intellectual stimulation.\n\nESFP: I make decisions based on feelings and values. I am subjective and compassionate in my judgments, and I value harmony and social connection, and I enjoy living in the present moment.\n\nENTJ: I prefer to have a structured and planned approach to life. I am organized and efficient in my tasks, and I value leadership and control, and I enjoy making decisions and taking charge.\n\nESFJ: I prefer a more spontaneous and flexible approach to life. I am open-minded and adaptable to change, and I value cooperation and teamwork, and I enjoy helping others and making them feel comfortable.\n\nINFP: I am primarily focused on feelings and values. I am subjective and compassionate in my judgments, and I value authenticity and self-expression, and I enjoy exploring my inner world and understanding others.\n\nINTJ: I am primarily focused on ideas and concepts. I prefer to learn through abstract thought and am comfortable with theoretical information, and I value intellectual stimulation and analysis, and I enjoy creating new ideas and developing theories.\n\nISTP: I make decisions based on logic and reason. I am objective and impartial in my judgments, and I enjoy problem-solving and finding practical solutions, and I value efficiency and getting things done.\n\nISFP: I make decisions based on feelings and values. I am subjective and compassionate in my judgments, and I value harmony and authenticity, and I enjoy experiencing new things and expressing myself creatively.\n\nENFP: I prefer a more spontaneous and flexible approach to life. I am open-minded and adaptable to change, and I value imagination and exploration, and I enjoy connecting with others and inspiring creativity.\n\nESTJ: I prefer to have a structured and planned approach to life. I am organized and efficient in my tasks, and I value tradition and order, and I enjoy leading and implementing practical solutions.", event.threadID, event.messageID);
  }

  try {
    const response = await axios.get(`${baseURL}/mbti/${personalityType}`);
    const { type, description, traits } = response.data;

    const resultMessage = `𝗧𝗬𝗣𝗘: ${type}\n𝗗𝗘𝗦𝗖𝗥𝗜𝗣𝗧𝗜𝗢𝗡: ${description}\n\n𝗧𝗥𝗔𝗜𝗧𝗦: ${traits}`;

    api.sendMessage(resultMessage, event.threadID, event.messageID);
  } catch (error) {
    console.error('ERROR', error.response?.data || error.message);
    api.sendMessage('An error occurred while processing the request. Please try again later.', event.threadID, event.messageID);
  }
};