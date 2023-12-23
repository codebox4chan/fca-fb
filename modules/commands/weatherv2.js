const axios = require("axios");
const moment = require("moment-timezone");
 
module.exports.config = {
  name: "weatherv2",
  version: "1.1.0",
  credits: "August Quinn",
  description: "Get the current weather conditions",
  commandCategory: "info",
  usages: "[location]",
  usePrefix: false,
  cooldowns: 3,
};
 
module.exports.run = async function ({ api, event, args }) {
  const apiKey = "deae5206758c44f38b0184151232208";
  const city = args.join(" ");
  
  if (!city) {
    return api.sendMessage("Please provide a city name.", event.threadID, event.messageID);
  }
  
  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`;
  
  try {
    const response = await axios.get(apiUrl);
    const data = response.data;
    
    if (data.error) {
      return api.sendMessage("City not found or error occurred.", event.threadID, event.messageID);
    }
    
    const weatherInfo = data.current;
    const currentDateTime = moment().tz(data.location.tz_id).format("YYYY-MM-DD HH:mm:ss");
    
    const weatherMessage = `
Weather for ${city} (As of ${currentDateTime}):\n
Temperature: ${weatherInfo.temp_c}°C (${weatherInfo.temp_f}°F)
Feels like: ${weatherInfo.feelslike_c}°C (${weatherInfo.feelslike_f}°F)
Condition: ${weatherInfo.condition.text}
Wind: ${weatherInfo.wind_kph} km/h, ${weatherInfo.wind_dir}
Pressure: ${weatherInfo.pressure_mb} mb
Humidity: ${weatherInfo.humidity}%
UV Index: ${weatherInfo.uv}
    `;
 
    const additionalInfo = `
Cloud Cover: ${weatherInfo.cloud}%
Precipitation: ${weatherInfo.precip_mm} mm (${weatherInfo.precip_in} in)
Gust: ${weatherInfo.gust_kph} km/h
    `;
 
    api.sendMessage(weatherMessage + additionalInfo, event.threadID, event.messageID);
  } catch (error) {
    console.error(`Error fetching weather data: ${error}`);
    api.sendMessage("An error occurred while fetching weather data.", event.threadID, event.messageID);
  }
};
                                      