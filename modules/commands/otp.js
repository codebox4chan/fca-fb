const prompts = [
"{A} and {B} go to a fair/amusement park, and {A} wants to go on the roller coaster, and {B} agrees. Later, {B} regrets their decision and ends up clinging onto {A} for dear life.",
"{B} won't let {A} get out of bed by cuddling them.",
"{A} is about to leave for work. {B} asks them if they've forgotten anything, and {A} gives them a kiss. {B} turns red and opens their hand to reveal {A}'s keys/wallet/etc., saying 'I meant this, but thanks.'",
"{A} buys a box of sweets and puts them in the cupboard. {B} spontaneously eats them all in the middle of the night and tries to keep it a secret.",
"{A} teaching {B} how to kiss, and {B} ends up kissing {A} really quick, nervously asks 'Like that?' and leaves {A} silent and flustered for a moment.",
"{A} and {B} falling asleep together with their heads on the other's shoulder/head in the backseat of the car while their friend is driving.",
"{B} holding a sobbing {A}. {A} cries themselves to sleep with their face buried into {B}.",
"{A} and {B} sleeping on top of each other (in the bed, couch, wherever you prefer) when {B} flops down on the floor.",
"{B} is a prince or princess, falling for {A}, the castle gardener who tends to the foliage surrounding {B}'s balcony.",
"{A} and {B} watching a horror movie. {A} can't sleep that night and {B} comforts them in a cuddle.",
"{A} and {B} sleeping together. {A} wakes up first and contemplates waking {B} with a kiss. {A} leans in only to hesitate centimeters away out of embarrassment. {B} opens their eyes and says, 'Well if you won't do it, I will.'",
"{B} gets the hiccups, causing {A} to laugh every time they try to talk until {A} gets the hiccups too.",
"{A} and {B} not speaking each other languages, falling in love and learning together.",
"{B} and {A} break up, but they have a pet and neither of them want to give it up. Then they spend a few days each with the pet separately. But it kinda helps them get together again.",
"{A} and {B} dancing in the moonlight.",
"{A} and {B} at a theme park or carnival, and walking towards one of the many games to win a large stuffed animal. {A} is sure that they can win the game, but after many attempts (and a lot of cash down the drain) {A} gives up. {B}, however, tries and succeeds on their first go.",
"{B} and {A} eating spaghetti like the lady and the tramp did in that animated film.",
"{B} is a ghost who falls in love with {A}, but {A} can't see them. Does {B} do anything to make {A} notice them?",
"{A} and {B} unable to sleep after watching a horror movie, but neither will admit that the movie scared them.",
"{B} and {A} play Twister. Things get embarrassing and awkward fast.",
"{A} trying to get something on their computer to work. While they’re getting frustrated and flipping out, {B} is sitting nearby cracking up.",
"{A} and {B} find themselves stranded in a remote cabin during a snowstorm, forcing them to spend quality time together.",
"{A} and {B} decide to challenge each other to a series of hilarious and unconventional dares.",
"{B} surprises {A} with a heartfelt love letter, sparking a romantic and emotional evening.",
"{A} and {B} embark on a spontaneous adventure, exploring an abandoned amusement park at night.",
"{B} teaches {A} a new hobby, and they bond over the learning process and shared laughter.",
"{A} and {B} accidentally switch phones for a day, leading to amusing discoveries about each other's lives.",
"On a camping trip, {A} and {B} have a playful competition to see who can build the best campfire.",
"{A} and {B} take a dance class together, resulting in a mix of laughter and surprisingly graceful moments.",
"{B} surprises {A} with breakfast in bed and a day filled with their favorite activities.",
"{A} and {B} get caught in a rainstorm while on a hike and seek refuge in a cozy mountain cabin, leading to a romantic evening by the fireplace."
];

module.exports.config = {
  name: "otp",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Minn", // please don't change the credits:(( change credits = fatherless + fat + L + cap + discord mod + obese
  description: "Generate otpprompts from provided names",
  usePrefix: false,
  commandCategory: "fun",
  usages: "[name] + [name]",
  cooldowns: 3,
};

module.exports.run = async function ({ api, event, args }) {
  const input = args.join(" ");
  const matches = input.match(/(\w+)\s*\+\s*(\w+)/g);
  
  if (!matches || matches.length === 0) {
    api.sendMessage(`please provide names separated by "+".\nfor example: otp you + me`, event.threadID, event.messageID);
    return;
  }

  const randomp = Math.floor(Math.random() * prompts.length);
  const getrandom = prompts[randomp];
  
  let msg = getrandom;
  for (const match of matches) {
    const [A, B] = match.split(/\s*\+\s*/);
    msg = msg.replace(/{A}/g, A).replace(/{B}/g, B);
  }
  api.sendMessage(msg, event.threadID, event.messageID);
};