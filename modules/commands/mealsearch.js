const axios = require('axios');

module.exports.config = {
  name: "mealsearch",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "August Quinn",
  description: "Search for meal recipes by name!",
  commandCategory: "info",
  usePrefix: true,
  usages: "[meal_name]",
  cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  try {
    if (!args[0]) {
      api.sendMessage("Provide the name of the meal you want to search for.", event.threadID, event.messageID);
      return;
    }

    const mealName = encodeURIComponent(args.join(" "));

    const searchURL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;

    const response = await axios.get(searchURL);

    if (response.data.meals && response.data.meals.length > 0) {
      const meal = response.data.meals[0];
      const mealDetails = formatMealDetails(meal);
      api.sendMessage(`Found a meal for '${mealName}':\n\n${mealDetails}`, event.threadID, event.messageID);
    } else {
      api.sendMessage(`No meal found for '${mealName}'. Try a different name!`, event.threadID, event.messageID);
    }
  } catch (error) {
    console.error("Error searching for meal:", error);
    api.sendMessage("Error searching for meal. Try again with a different name!", event.threadID, event.messageID);
  }
};

function formatMealDetails(meal) {
  let details = `  ⦿ 𝗡𝗔𝗠𝗘: ${meal.strMeal}\n  ⦿ 𝗖𝗔𝗧𝗘𝗚𝗢𝗥𝗬: ${meal.strCategory}\n  ⦿ 𝗔𝗥𝗘𝗔: ${meal.strArea}\n`;
  details += `  ⦿ 𝗜𝗡𝗦𝗧𝗥𝗨𝗖𝗧𝗜𝗢𝗡𝗦: ${meal.strInstructions}\n\n  ⦿ 𝗜𝗡𝗚𝗥𝗘𝗗𝗜𝗘𝗡𝗧𝗦:\n`;

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && measure) {
      details += `    • ${ingredient} - ${measure}\n`;
    } else {
      break;
    }
  }

  return details;
}
