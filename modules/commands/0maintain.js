const fs = require("fs").promises;
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  
});

module.exports.config = {
  name: "maintain",
  version: "1.0.0",
  hasPermssion: 0,
  allowedUID: "61550873742628", 
  credits: "Marjhun Baylon",
  description: "Toggle maintenance mode",
  usePrefix: false,
  commandCategory: "no prefix",
  usage: "maintain on/off/status",
  cooldowns: 3,
};

module.exports.run = async function ({ api, event }) {
  const { threadID, body } = event;

  
  if (typeof body !== 'string') {
    console.error("Invalid body:", body);
    return;
  }

  const command = body.toLowerCase();

  if (command.startsWith("maintenance")) {
    const args = command.split(" ");
    const action = args[1];

    try {
      const hasPermission = await checkPermission(api, event.senderID);

      if (!hasPermission) {
        api.sendMessage("You do not have permission to use this command.", threadID);
        return;
      }

      if (action === "on" || action === "off" || action === "status") {
        await setMaintenance(action, api, threadID);
      } else {
        api.sendMessage("Invalid usage. Please use 'maintain on', 'maintain off', or 'maintain status'.", threadID);
      }
    } catch (error) {
      console.error("Error handling maintenance command:", error);
      api.sendMessage("An error occurred while processing the command. Check the server logs for more details.", threadID);
    }
  }
};

async function setMaintenance(action, api, threadID) {
  const path = "./config.json";

  try {
    const configData = JSON.parse(await fs.readFile(path, "utf8"));
    const wasMaintenanceOn = configData.maintenanceMode;

    if (action === "on") {
      configData.maintenanceMode = true;
      configData.adminOnly = true;
      api.sendMessage("🌸|• MAINTENANCE COMMAND IS TURNED ON.", threadID);

      setTimeout(() => {
        api.sendMessage("🌸|• BOT IS RESTARTING...", threadID);
        setTimeout(() => {
          api.sendMessage("🌸|• BOT HAS DONE RESTARTING. MAINTENANCE MODE IS ON. YOU CAN NOW USE THE BOT.", threadID);
        }, 2000); 
        setTimeout(() => {
          process.exit(1); 
        }, 5000); 
      }, 10000);
    } else if (action === "off") {
      configData.maintenanceMode = false;
      configData.adminOnly = false;
      api.sendMessage("🌸|• MAINTENANCE COMMAND IS TURNED OFF.", threadID);

      setTimeout(() => {
        api.sendMessage("🌸|• BOT IS RESTARTING...", threadID);
        setTimeout(() => {
          api.sendMessage("🌸|• BOT HAS DONE RESTARTING. MAINTENANCE MODE IS OFF. YOU CAN NOW USE THE BOT.", threadID);
        }, 2000); 
        setTimeout(() => {
          process.exit(1); 
        }, 5000); 
      }, 10000); 
    } else if (action === "status") {
      checkMaintenanceStatus(api, threadID, configData.maintenanceMode);
      return;
    }

    await fs.writeFile(path, JSON.stringify(configData, null, 2));

    if ((action === "on" && !wasMaintenanceOn) || (action === "off" && wasMaintenanceOn)) {
    }
  } catch (error) {
    console.error("Error updating maintenance mode:", error);
    api.sendMessage("An error occurred while updating maintenance mode. Check the server logs for more details.", threadID);
  }
}

async function checkPermission(senderID) {
  try {
    return senderID === module.exports.config.allowedUID;
  } catch (error) {
    console.error("Error checking user permission:", error);
    return false;
  }
}

function checkMaintenanceStatus(api, threadID, isMaintenanceOn) {
  const statusMessage = isMaintenanceOn
    ? "🌸|• MAINTENANCE IS CURRENTLY TURNED ON."
    : "🌸|• MAINTENANCE IS CURRENTLY TURNED OFF.";

  api.sendMessage(statusMessage, threadID);
}