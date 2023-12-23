const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports.config = {
  name: 'deck',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'codebox4chan',
  description: 'Get information about a specific Yu-Gi-Oh card',
  commandCategory: 'fun',
  usePrefix: false,
  usages: [],
  cooldowns: 5,
};

module.exports.run = async function ({ api, event }) {
  const { threadID, messageID } = event;

  try {
    const apiUrl = `https://replhome.codebox4chan.repl.co/api/card?apiKey=${this.config.credits}`;
    const response = await axios.get(apiUrl);
    const card = response.data; 

    if (card) {
      const imageUrl = card.card_images[0].image_url;
      const imageResponse = await axios.get(imageUrl, { responseType: 'stream' });
      const imagePath = path.join(__dirname, '/cache/card.jpg');
      const imageWriter = fs.createWriteStream(imagePath);

      imageResponse.data.pipe(imageWriter);

      imageWriter.on('finish', () => {
        const attachment = {
          body: `𝗡𝗔𝗠𝗘: ${card.name || '?'}\n𝗧𝗬𝗣𝗘: ${card.type || '?'}\n𝗗𝗘𝗦𝗖𝗥𝗜𝗣𝗧𝗜𝗢𝗡: ${card.desc || '?'}\n𝗔𝗧𝗞: ${card.atk || '?'}\n𝗗𝗘𝗙: ${card.def || '?'}\nLevel: ${card.level || '?'}\n𝗥𝗔𝗖𝗘: ${card.race || '?'}\nAttribute: ${card.attribute || '?'}\n𝗔𝗥𝗖𝗛𝗘𝗧𝗬𝗣𝗘: ${card.archetype || '?'}\n\n𝗖𝗔𝗥𝗗 𝗦𝗘𝗧𝗦:\n${formatCardSets(card.card_sets || '?')}\n\n𝗖𝗔𝗥𝗗 𝗣𝗥𝗜𝗖𝗘𝗦:\n${formatCardPrices(card.card_prices || '?')}`,
          attachment: fs.createReadStream(imagePath),
        };

        api.sendMessage(attachment, threadID, messageID);
      });

      imageWriter.on('error', (error) => {
        console.error(error);
        api.sendMessage('Failed to download card image. Please try again later!', threadID, messageID);
      });
    } else {
      api.sendMessage('No card data found!', threadID, messageID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage('Failed to fetch card data. Please try again later!', threadID, messageID);
  }
};

function formatCardSets(cardSets) {
  return cardSets.map((set) => `${set.set_name} (${set.set_rarity}): ${set.set_price}`).join('\n');
}

function formatCardPrices(cardPrices) {
  return cardPrices.map((price) => `𝗖𝗔𝗥𝗗𝗠𝗔𝗥𝗞𝗘𝗧: ${price.cardmarket_price}\n𝗧𝗖𝗚𝗣𝗟𝗔𝗬𝗘𝗥: ${price.tcgplayer_price}\n𝗘𝗕𝗔𝗬: ${price.ebay_price}\n𝗔𝗠𝗔𝗭𝗢𝗡: ${price.amazon_price}`).join('\n');
}

