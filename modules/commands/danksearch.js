module.exports.config = {
    name: "danksearch",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Draffodils",
    description: "Search for money and bonuses in different locations. ",
    usePrefix: false,
    commandCategory: "fun",
  commandCategory: "fun",
    cooldowns: 1.70 // Cooldown time in seconds (30 seconds)
};

module.exports.run = async ({ event, api, Currencies }) => {
    const locations = [
        { name: "draffodils house", meme: "You raid the draffodils house like a pro... and find a jar of coins that is worth it! 🐦" },
     { name: "mysterious briefcase hoping for money... and it turns out to be filled with office supplies.😞" },
  { name: "police station", meme: "You search the police station for seized cash... and end up filling out a lost and found report.😭" },
  { name: "bushes", meme: "Digging through the bushes in search of money... and a squirrel throws an acorn at you.😷" },
  { name: "gloves", meme: "Putting on gloves to search for money... and you find a single coin stuck in the lining.🦆" },
  { name: "beehive", meme: "You approach a beehive hoping for honey and money... and get stung instead.😄" },
  { name: "cardbox", meme: "Opening a cardboard box expecting riches... and find packing peanuts and bubble wrap.🤣" },
  { name: "Jake Park", meme: "Searching Jake Park for hidden cash... you stumble upon a picnic and get invited to share.😆" },
  { name: "computer", meme: "You browse the computer looking for online money... and end up buying a digital pet instead.🥶" },
  { name: "Haunted house", meme: "Braving the haunted house in search of spooky treasures... and you find a cobweb-covered coin.🤠" },
  { name: "Stock market", meme: "You dive into the stock market hoping for financial gains... and the numbers just keep going down.🤓" },
  { name: "ocean", meme: "Scanning the ocean floor for sunken treasures... you find a seashell collection and no money.😹" },
  { name: "desert", meme: "Exploring the desert sands for buried money... and you uncover a cactus and sand.😓" },
  { name: "attic", meme: "You climb up to the attic searching for valuables... and discover a dusty old lamp with no genie.😫" },
  { name: "supreme court", meme: "You stand before the supreme court, hoping for justice and money... and get a stern lecture instead.🤐" },
  { name: "Owo dressing room", meme: "You step into the Owo dressing room for a change of luck... but all you find is a mismatched outfit.😑" },
  { name: "Kizuna's mansion", meme: "You search Kizuna's mansion for luxury and cash... and end up in a grand hallway with no money.🥴" },
  { name: "taxi", meme: "Hailing a taxi in search of a fare... you find a lost phone and return it to its owner.🥸" },
  { name: "bus", meme: "You hop on a bus hoping for a ticket to riches... and all you get is a scenic tour of the city.🥲" },
  { name: "broken jeepney", meme: "You examine a broken jeepney hoping for hidden coins... and it's just a prop for a movie set😆." },
  { name: "crawl space", meme: "Crawling through a tight space for hidden treasures... and emerge with cobwebs and dust🐥." },
  { name: "vent", meme: "Climbing into a vent to find secret money... and you emerge covered in lint and disappointment 🕊 ." }      
        // ... (add more location objects)
    ];

    const currentTime = Math.floor(Date.now() / 1000);
    const bonusPercentage = (Math.sin(currentTime) + 1) * 39 + 2; // Range: 2% - 80%

    const randomLocationObj = locations[Math.floor(Math.random() * locations.length)];
    const randomLocation = randomLocationObj.name;

    const isLucky = Math.random() < (bonusPercentage / 100);
    let moneyEarned = 0;

    let message = `————————————————\n ⊂⊃ 𝐃𝐚𝐧𝐤𝐬𝐞𝐚𝐫𝐜𝐡 𝐑𝐞𝐬𝐮𝐥𝐭 ⊂⊃ \n————————————————\n@[${event.senderID}] searched ${randomLocation}!`;

    if (isLucky) {
        moneyEarned = Math.floor(Math.random() * (6100 - 17 + 1)) + 17;
        message += ` and found ⏣ ${moneyEarned.toLocaleString()}! ${randomLocationObj.meme}\n`;
    } else {
        const badLuckMemes = [
            "When life gives you lemons, but you were hoping for money.",
           "When you search for treasure and find disappointment instead.",
          "Expectation: Money! Reality: Nothing but dust.",
            "You searched high and low... and found nada.",
            "When you're on a quest for riches, but all you get is a lesson in humility.",
            "Searching for gold like a pirate... and ending up with a rusty nail.",
            "When you play the search game, but RNG is not on your side.",
            "When you realize the real treasure was the friends you made along the way (and not the money)."
          // ... (add more bad luck memes if needed)
        ];
        const randomBadLuckMeme = badLuckMemes[Math.floor(Math.random() * badLuckMemes.length)];
        message += ` and found nothing. Bad luck! ${randomBadLuckMeme}\n`;
    }

    const bonusAmount = (moneyEarned * (bonusPercentage / 100)).toFixed(0);
    message += `: 𝗠𝘂𝗹𝘁𝗶 𝗕𝗼𝗻𝘂𝘀 +${bonusPercentage.toFixed(2)}% (⏣ + ${bonusAmount.toLocaleString()})\n`;

    api.sendMessage(message, event.threadID);

    if (moneyEarned > 0) {
        await Currencies.increaseMoney(event.senderID, moneyEarned);
    }
};
