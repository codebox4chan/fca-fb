const fs = require("fs");

class VirtualPet {
  constructor(name) {
    this.name = name;
    this.happiness = 50;
    this.hunger = 50;
    this.energy = 100;
    this.coins = 0;
    this.lastRestTime = null;
    this.foods = ["🍒", "🍎", "🍉", "🍑", "🍊", "🥭", "🍍", "🌶️", "🍋", "🍈", "🍏", "🍐", "🥝", "🍇", "🥥", "🍅", "🥕", "🍠", "🌽", "🥦", "🥒", "🥬", "🥑", "🍆", "🥔", "🌰", "🥜", "🍞", "🥐", "🥖", "🥯", "🥞", "🍳", "🥚", "🧀", "🥓", "🥩", "🍗", "🍖", "🍔", "🌭", "🥪", "🥨", "🍟", "🍕", "🌮", "🌯", "🥙", "🥘", "🍝", "🥫", "🥣", "🥗", "🍲", "🍛", "🍜", "🦞", "🍣", "🍤", "🥡", "🍚", "🥟", "🥟", "🍢", "🍙", "🍘", "🍥", "🍡", "🥠", "🥮", "🍧", "🍨", "🍦", "🥧", "🍰", "🍮", "🎂", "🧁", "🍭", "🍫", "🍫", "🍩", "🍪", "🍯", "🧂", "🍿", "🥤", "🥛", "🍵", "☕", "🍹", "🍶"];
  }
  
  feed() {
    if (this.hunger >= 10) {
      const randomFood = this.foods[Math.floor(Math.random() * this.foods.length)];
      this.hunger -= 10;
      this.happiness += 5;
      this.energy += 2;
      return `${this.name} happily enjoyed the ${randomFood}!\n\n𝗛𝗨𝗡𝗚𝗘𝗥: ${this.hunger}\n𝗛𝗔𝗣𝗣𝗜𝗡𝗘𝗦𝗦: ${this.happiness}\n𝗘𝗡𝗘𝗥𝗚𝗬: ${this.energy}`;
    } else {
      return `${this.name} is already full!`;
    }
  }

  play() {
    if (this.energy >= 10) {
      this.happiness += 10;
      this.energy -= 5;
      this.coins += 5;
      return `${this.name} had a great time playing!\n\n𝗛𝗔𝗣𝗣𝗜𝗡𝗘𝗦𝗦: ${this.happiness}\n𝗘𝗡𝗘𝗥𝗚𝗬: ${this.energy}\n\nCongratulations! you earned $5💰`;
    } else {
      return `${this.name} is too tired to play right now.`;
    }
  }

  rest() {
    const currentTime = Date.now();
    if (!this.lastRestTime || (currentTime - this.lastRestTime) >= 7200000) {
      this.energy += 10;
      this.lastRestTime = currentTime;
      return `${this.name} had a good rest and regained energy.\n\n𝗘𝗡𝗘𝗥𝗚𝗬: ${this.energy}`;
    } else {
      const remainingTime = Math.floor((7200000 - (currentTime - this.lastRestTime)) / 60000);
      return `${this.name} is still resting. Please wait ${remainingTime} minutes.`;
    }
  }

  getStatus() {
    return `${this.name}'s Status\n\n𝗛𝗨𝗡𝗚𝗘𝗥: ${this.hunger}\n𝗛𝗔𝗣𝗣𝗜𝗡𝗘𝗦𝗦: ${this.happiness}\n𝗘𝗡𝗘𝗥𝗚𝗬: ${this.energy}\n𝗖𝗢𝗜𝗡𝗦: $${this.coins}`;
  }
}

const petDataFile = "petData.json";
const userPets = loadPetData();

function loadPetData() {
  try {
    const data = fs.readFileSync(petDataFile);
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
}

function savePetData() {
  fs.writeFileSync(petDataFile, JSON.stringify(userPets, null, 2));
}

module.exports.config = {
  name: "pet",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "August Quinn",
  description: "Interact with a virtual pet",
  commandCategory: "fun",
  usePrefix: false,
  usages: "[action] [pet_name]",
  cooldowns: 10,
};

module.exports.run = async function ({ api, event, args }) {
  const action = args[0];
  const petName = args[1];

  if (!action) {
    return api.sendMessage("Please specify an action:\n⌲ Create\n⌲ Feed\n⌲ Play\n⌲ Rest\n⌲ Status\n⌲ Balance\n⌲ Reset", event.threadID, event.messageID);
  }

  if (action === "create") {
    if (userPets[event.senderID]) {
      return api.sendMessage(`You already have a pet named "${userPets[event.senderID].name}". You can't create another one.`, event.threadID, event.messageID);
    }

    if (!petName) {
      return api.sendMessage("Please specify a name for your pet when creating one.", event.threadID, event.messageID);
    }
    
    userPets[event.senderID] = new VirtualPet(petName);
    savePetData();
    return api.sendMessage(`You've created a pet named ${petName}.`, event.threadID, event.messageID);
  }

  if (!userPets[event.senderID]) {
    return api.sendMessage("You need to create a pet first. Use /Pet create [name].", event.threadID, event.messageID);
  }

  const pet = userPets[event.senderID];
  let result = "";

  switch (action) {
    case "create":
      result = `You've created a pet named ${pet.name}.`;
      break;
    case "feed":
      result = pet.feed();
      break;
    case "play":
      result = pet.play();
      break;
    case "rest":
      result = pet.rest();
      break;
    case "status":
      result = pet.getStatus();
      break;
    case "balance":
      result = `${pet.name}'s balance: $${pet.coins}`;
      break;
    case "reset":
      if (!petName) {
        return api.sendMessage("Please specify the pet's name to reset.", event.threadID, event.messageID);
      }
      if (pet.name !== petName) {
        return api.sendMessage(`You can only reset your own pet. Your pet is named "${pet.name}".`, event.threadID, event.messageID);
      }
      delete userPets[event.senderID];
      savePetData();
      return api.sendMessage(`Pet "${petName}" has been reset. Use /Pet create [name] to create a new pet.`, event.threadID, event.messageID);
    default:
      result = "Unknown action. Available actions:\n\n⌲ Create\n⌲ Feed\n⌲ Play\n⌲ Rest\n⌲ Status\n⌲ Balance\n⌲ Reset";
  }

  savePetData();
  return api.sendMessage(result, event.threadID, event.messageID);
};
      