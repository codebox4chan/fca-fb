module.exports.config = {
    name: "fortune",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "August Quinn",
    description: "Predict users' fortunes using random outcomes.",
    commandCategory: "fun",
    usePrefix: true,
    usages: "",
    cooldowns: 5,
    dependencies: "",
};

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

module.exports.run = async function ({ api, event }) {
    const fortunes = [
    {
        fortune: "A pleasant surprise is in store for you.",
        luckyNumbers: [7, 15, 22],
        recommendedAction: "Take a leap of faith and pursue a new opportunity.",
        insight: "This is a time of positive transformation and growth.",
    },
    {
        fortune: "Be cautious in financial matters and avoid unnecessary risks.",
        luckyNumbers: [3, 11, 18],
        recommendedAction: "Focus on budgeting and saving for the future.",
        insight: "Prudent decisions now will lead to stability later.",
    },
    {
        fortune: "Your creativity will lead to innovative solutions.",
        luckyNumbers: [8, 16, 24],
        recommendedAction: "Engage in creative activities to spark inspiration.",
        insight: "Your unique approach will yield remarkable results.",
    },
    {
        fortune: "New friendships will enrich your life.",
        luckyNumbers: [2, 10, 17],
        recommendedAction: "Attend social events and connect with new people.",
        insight: "Meaningful relationships are on the horizon.",
    },
    {
        fortune: "Embrace change and embrace new beginnings.",
        luckyNumbers: [5, 12, 19],
        recommendedAction: "Step out of your comfort zone and embrace change.",
        insight: "Change is the catalyst for growth and progress.",
    },
    {
        fortune: "Your dedication will pave the way to achievement.",
        luckyNumbers: [9, 14, 21],
        recommendedAction: "Stay committed to your goals and work diligently.",
        insight: "Your hard work will lead to notable accomplishments.",
    },
    {
        fortune: "Believe in yourself and others will too.",
        luckyNumbers: [1, 13, 20],
        recommendedAction: "Practice self-confidence and showcase your skills.",
        insight: "Your self-assurance will inspire confidence in others.",
    },
    {
        fortune: "Your positive energy will attract positive people.",
        luckyNumbers: [4, 17, 23],
        recommendedAction: "Radiate positivity and surround yourself with like-minded individuals.",
        insight: "Your optimistic attitude will attract kindred spirits.",
    },
    {
        fortune: "Your kindness will be rewarded in unexpected ways.",
        luckyNumbers: [6, 18, 25],
        recommendedAction: "Perform random acts of kindness and spread goodwill.",
        insight: "Your generosity will lead to surprising blessings.",
    },
    {
        fortune: "Stay patient; good things take time.",
        luckyNumbers: [10, 21, 27],
        recommendedAction: "Practice patience and allow things to unfold naturally.",
        insight: "The best outcomes are worth waiting for.",
    },
    {
        fortune: "Your potential is limited only by your imagination.",
        luckyNumbers: [12, 24, 30],
        recommendedAction: "Explore your creative side and dream big.",
        insight: "Your imagination holds the key to endless possibilities.",
    },
    {
        fortune: "Success is the result of your daily choices.",
        luckyNumbers: [14, 28, 35],
        recommendedAction: "Make consistent positive choices that align with your goals.",
        insight: "Small actions lead to significant achievements.",
    },
    {
        fortune: "Your hard work will lead to boundless achievements.",
        luckyNumbers: [16, 32, 40],
        recommendedAction: "Stay focused on your goals and put in the effort.",
        insight: "Diligence and determination yield remarkable results.",
    },
    {
        fortune: "Your passion will drive your accomplishments.",
        luckyNumbers: [18, 36, 45],
        recommendedAction: "Channel your passion into your work and pursuits.",
        insight: "Your enthusiasm will fuel your success.",
    },
    {
        fortune: "Trust the timing of your life.",
        luckyNumbers: [20, 40, 50],
        recommendedAction: "Let go of impatience and trust that things will unfold at the right time.",
        insight: "Life's rhythm is guided by perfect timing.",
    },
    {
        fortune: "Your positive mindset will lead to positive outcomes.",
        luckyNumbers: [22, 44, 55],
        recommendedAction: "Cultivate a positive outlook and expect the best.",
        insight: "Your thoughts shape your reality.",
    },
    {
        fortune: "Your journey is just beginning; enjoy the ride.",
        luckyNumbers: [24, 48, 60],
        recommendedAction: "Embrace every experience and savor the journey.",
        insight: "Life's adventure holds endless opportunities.",
    },
    {
        fortune: "Believe in your dreams and they will become reality.",
        luckyNumbers: [26, 52, 65],
        recommendedAction: "Visualize your dreams and take steps toward achieving them.",
        insight: "Your belief in yourself propels your aspirations.",
    },
    {
        fortune: "Your actions will lead to positive change.",
        luckyNumbers: [28, 56, 70],
        recommendedAction: "Take deliberate actions that contribute to positive outcomes.",
        insight: "Your choices shape the world around you.",
    },
    {
        fortune: "Your resilience will carry you through tough times.",
        luckyNumbers: [30, 60, 75],
        recommendedAction: "Stay strong in the face of challenges; you will overcome.",
        insight: "Adversity is an opportunity for growth.",
    },
    {
        fortune: "Luck favors the prepared; keep working hard.",
        luckyNumbers: [32, 64, 80],
        recommendedAction: "Combine hard work with readiness to seize lucky opportunities.",
        insight: "Preparation positions you for fortunate outcomes.",
    },
    {
        fortune: "Your determination will lead you to greatness.",
        luckyNumbers: [34, 68, 85],
        recommendedAction: "Stay resolute and persistent in your pursuits.",
        insight: "Your unwavering commitment drives your success.",
    },
    {
        fortune: "Your positive outlook will lead to positive outcomes.",
        luckyNumbers: [36, 72, 90],
        recommendedAction: "Maintain an optimistic attitude; good things are coming.",
        insight: "Positivity attracts abundance into your life.",
    },
    {
        fortune: "Your potential is boundless; never doubt it.",
        luckyNumbers: [38, 76, 95],
        recommendedAction: "Challenge self-doubt and embrace your limitless potential.",
        insight: "Believe in your abilities and achieve the extraordinary.",
    },
    {
        fortune: "Every setback is a setup for a comeback.",
        luckyNumbers: [40, 80, 100],
        recommendedAction: "View challenges as opportunities for growth and resilience.",
        insight: "From setbacks, you rise stronger than before.",
    },
    {
        fortune: "Your courage will open new doors.",
        luckyNumbers: [42, 84, 105],
        recommendedAction: "Step out of your comfort zone; courage leads to growth.",
        insight: "Boldness invites new and exciting possibilities.",
    },
    {
        fortune: "Your success is a journey, not a destination.",
        luckyNumbers: [44, 88, 110],
        recommendedAction: "Appreciate each step of your journey towards success.",
        insight: "Success is found in the journey itself.",
    },
    {
        fortune: "Your positive energy will lift others up.",
        luckyNumbers: [46, 92, 115],
        recommendedAction: "Share your positivity and inspire those around you.",
        insight: "Your energy is contagious and uplifting.",
    },
    {
        fortune: "Your commitment to your goals will pay off.",
        luckyNumbers: [48, 96, 120],
        recommendedAction: "Stay dedicated and focused on your aspirations.",
        insight: "Consistent effort yields rewarding outcomes.",
    },
    {
        fortune: "Embrace change as a stepping stone to success.",
        luckyNumbers: [50, 100, 125],
        recommendedAction: "Embrace change and adapt with enthusiasm.",
        insight: "Change leads to growth and evolution.",
    },
    {
        fortune: "Your success is a reflection of your perseverance.",
        luckyNumbers: [52, 104, 130],
        recommendedAction: "Persist in the face of challenges; your success is imminent.",
        insight: "Endurance fuels your journey to success.",
    },
    {
        fortune: "Your positivity will lead to prosperity.",
        luckyNumbers: [54, 108, 135],
        recommendedAction: "Cultivate positivity and attract abundance.",
        insight: "A positive mindset opens the door to success.",
    },
    {
        fortune: "Your dedication will pave the way to achievement.",
        luckyNumbers: [56, 112, 140],
        recommendedAction: "Stay committed to your goals and work diligently.",
        insight: "Your hard work will lead to notable accomplishments.",
    },
    {
        fortune: "You are the sculptor of your own destiny.",
        luckyNumbers: [58, 116, 145],
        recommendedAction: "Take control and shape your future with intention.",
        insight: "Your choices shape the life you create.",
    },
    {
        fortune: "Your belief in yourself is your greatest asset.",
        luckyNumbers: [60, 120, 150],
        recommendedAction: "Build self-confidence and trust in your abilities.",
        insight: "Confidence is the cornerstone of achievement.",
    },
    {
        fortune: "Your hard work will result in significant rewards.",
        luckyNumbers: [62, 124, 155],
        recommendedAction: "Invest effort in your pursuits; the payoff is substantial.",
        insight: "Your diligent work leads to remarkable outcomes.",
    },
    {
        fortune: "You have the power to make a difference.",
        luckyNumbers: [64, 128, 160],
        recommendedAction: "Use your influence to impact the lives of others.",
        insight: "Your actions have far-reaching effects.",
    },
    {
        fortune: "Your potential for success is unlimited.",
        luckyNumbers: [66, 132, 165],
        recommendedAction: "Acknowledge your capabilities and strive for excellence.",
        insight: "Your potential knows no bounds.",
    },
    {
        fortune: "Your dreams will guide you toward fulfillment.",
        luckyNumbers: [68, 136, 170],
        recommendedAction: "Chase your dreams with determination and passion.",
        insight: "Your aspirations are your compass.",
    },
    {
        fortune: "Your passion will fuel your journey.",
        luckyNumbers: [70, 140, 175],
        recommendedAction: "Let your passion drive your actions and choices.",
        insight: "Passion is the driving force behind achievement.",
    },
    {
        fortune: "You are destined for greatness.",
        luckyNumbers: [72, 144, 180],
        recommendedAction: "Embrace your innate greatness and aim high.",
        insight: "Destiny holds extraordinary possibilities for you.",
    },
    {
        fortune: "Your optimism will unlock new opportunities.",
        luckyNumbers: [74, 148, 185],
        recommendedAction: "Maintain a positive perspective; doors will open.",
        insight: "Optimism is the key to discovering new paths.",
    },
    {
        fortune: "Your efforts will leave a lasting impact.",
        luckyNumbers: [76, 152, 190],
        recommendedAction: "Strive to create a legacy through your actions.",
        insight: "Your actions shape your lasting influence.",
    },
    {
        fortune: "Your determination will shape your future.",
        luckyNumbers: [78, 156, 195],
        recommendedAction: "Stay steadfast in pursuing your goals.",
        insight: "Your unwavering commitment molds your destiny.",
    },
    {
        fortune: "You possess the keys to your own success.",
        luckyNumbers: [80, 160, 200],
        recommendedAction: "Recognize your strengths and use them to achieve success.",
        insight: "Empower yourself to unlock your full potential.",
    },
    {
        fortune: "Your positive attitude is your secret weapon.",
        luckyNumbers: [82, 164, 205],
        recommendedAction: "Harness the power of positivity for maximum impact.",
        insight: "Positivity amplifies your effectiveness.",
    },
    {
        fortune: "Your commitment will lead to triumph.",
        luckyNumbers: [84, 168, 210],
        recommendedAction: "Stay dedicated and victory will follow.",
        insight: "Your steadfastness paves the way for success.",
    },
    {
        fortune: "Your success is written in the stars.",
        luckyNumbers: [86, 172, 215],
        recommendedAction: "Align with the cosmic energy; success is destined.",
        insight: "The universe conspires to support your success.",
    },
    {
        fortune: "You are a beacon of light in the world.",
        luckyNumbers: [88, 176, 220],
        recommendedAction: "Share your light and inspire others to shine.",
        insight: "Your presence illuminates the lives of others.",
    },
    {
        fortune: "Your hard work will lead to abundant achievements.",
        luckyNumbers: [90, 180, 225],
        recommendedAction: "Persist with determination; rewards are plentiful.",
        insight: "Endurance yields bountiful success.",
    },
    {
        fortune: "Your dreams are the compass of your journey.",
        luckyNumbers: [92, 184, 230],
        recommendedAction: "Follow your dreams as they guide your path.",
        insight: "Your aspirations guide your steps forward.",
    },
    {
        fortune: "Your positive outlook will attract positivity.",
        luckyNumbers: [94, 188, 235],
        recommendedAction: "Project positivity and attract harmonious energies.",
        insight: "Positivity invites positive experiences.",
    },
    {
        fortune: "Your perseverance will break down barriers.",
        luckyNumbers: [96, 192, 240],
        recommendedAction: "Overcome obstacles with relentless determination.",
        insight: "Your persistence dismantles limitations.",
    },
    {
        fortune: "You have the courage to conquer any challenge.",
        luckyNumbers: [98, 196, 245],
        recommendedAction: "Face challenges fearlessly; you are capable.",
        insight: "Courage empowers you to overcome adversity.",
    },
 ];

    const randomFortuneObject = getRandomElement(fortunes);

    const message = `🔮 𝗙𝗢𝗥𝗧𝗨𝗡𝗘 𝗧𝗘𝗟𝗟𝗘𝗥 🔮\n\n${randomFortuneObject.fortune}\n\n𝗟𝗨𝗖𝗞𝗬 𝗡𝗨𝗠𝗕𝗘𝗥𝗦\n   ⌲ ${randomFortuneObject.luckyNumbers.join(', ')}\n\n𝗥𝗘𝗖𝗢𝗠𝗠𝗘𝗡𝗗 𝗔𝗖𝗧𝗜𝗢𝗡\n ⌲  ${randomFortuneObject.recommendedAction}\n\n𝗜𝗡𝗦𝗜𝗚𝗛𝗧\n  ⌲ ${randomFortuneObject.insight}`;

    api.sendMessage(message, event.threadID, event.messageID);
};
      