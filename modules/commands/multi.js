const axios = require("axios");

// Goimagesearch 
async function searchImages(query) {
  const google = global.nodemodule["googlethis"];
  try {
    const options = {
      page: 1,
      safe: false,
    };
    let result = await google.image(query, options);
    return result;
  } catch (error) {
    console.log("Error searching images:", error);
    return [];
  }
}

// Eric
async function searchEric(query, api, event) {
  const google = require("googlethis");
  let results = "";
  try {
    const options = {
      page: 0,
      safe: false,
      additional_params: {
        hl: "en",
      },
    };
    api.sendMessage(`🔎 Searching for "${query}" on Eric Ed Gov...`, event.threadID, event.messageID);
    const response = await google.search(`site:eric.ed.gov ${query}`, options);

    for (let i = 0; i < 10; i++) {
      let title = response.results[i].title;
      let description = response.results[i].description;
      let url = response.results[i].url;
      results += `📌 ${i + 1}:\n\n𝗧𝗜𝗧𝗟𝗘: ${title}\n\n𝗗𝗘𝗦𝗖𝗥𝗜𝗣𝗧𝗜𝗢𝗡: ${description}\n\n𝗨𝗥𝗟: ${url}\n\n━━━━━━━━━━━━━\n\n`;
    }

    api.sendMessage(results, event.threadID, event.messageID);
  } catch (error) {
    console.error("🚫 ERROR!\n\nError fetching API:", error);
    api.sendMessage("An error occurred while fetching data from Eric Ed Gov.", event.threadID);
  }
}

// Conversational AI
async function chatWithAI(api, event, text) {
  try {
    const introduction = "🤖 AI Conversation:\n\n";
    // Place your Bard or ChatGPT API here
    const url = `https://reikodev.spiritii.repl.co/api/gpt4?query=${encodeURIComponent(text)}`;
    const resAI = await axios.get(url);
    const response = resAI.data.reply;
    api.sendMessage(introduction + `𝗬𝗼𝘂: ${text}\n\n𝗔𝗜: ${response}`, event.threadID, event.messageID);
  } catch (error) {
    console.log("Error in AI conversation:", error);
    api.sendMessage("🚫 An error occurred during the conversation with AI.", event.threadID, event.messageID);
  }
}

module.exports.config = {
  name: "multi",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "JOHN RÉ PORAS",
  description: "An AI entertainment tool that can send images, information and engage in conversations.", // Please have respect, but if you don't have respect because you're just ignorant and idiot, then OKAY, change it. I don't really mind hahahah //
  commandCategory: "educational",
  usePrefix: false,
  usages: "[image|chat|eric] [query]",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const command = args[0];
  const query = args.slice(1).join(" ");

  if (!command || !query) {
    api.sendMessage(
      "Please use the command like this:\n\n/multi [image | chat | eric] [query]",
      event.threadID,
      event.messageID
    );
    return;
  }

  try {
    if (command === "image") {
      let images = await searchImages(query);
      if (images.length === 0) {
        api.sendMessage(`⚠️ No images found for "${query}".`, event.threadID, event.messageID);
        return;
      }

      let streams = [];
      let counter = 0;

      for (let image of images) {
        if (counter >= 10) break; // this section as you can see..the image counter is limited to 30 only..but you can change it if you want to..just don't do it in the credits section😀
        let url = image.url;
        if (!url.endsWith(".jpg") && !url.endsWith(".png")) continue;

        let path = __dirname + `/cache/image-${counter}.jpg`;

        try {
          let response = await axios.get(url, { responseType: "arraybuffer" });
          global.nodemodule["fs-extra"].writeFileSync(path, Buffer.from(response.data, "binary"));
        } catch (error) {
          console.log("Error downloading image:", error);
          continue;
        }

        streams.push(
          global.nodemodule["fs-extra"].createReadStream(path).on("end", () => {
            if (global.nodemodule["fs-extra"].existsSync(path)) {
              global.nodemodule["fs-extra"].unlinkSync(path);
            }
          })
        );

        counter += 1;
      }

      if (streams.length === 0) {
        api.sendMessage(`⚠️ No valid images found for "${query}".`, event.threadID, event.messageID);
        return;
      }

      api.sendMessage({ body: `🖼️ Images for "${query}":`, attachment: streams }, event.threadID, () => {});
    } else if (command === "chat") {
      chatWithAI(api, event, query);
    } else if (command === "eric") {
      searchEric(query, api, event);
    } else {
      api.sendMessage(
        `⚠️ Invalid command. Please use one of these commands: image, chat, eric`,
        event.threadID,
        event.messageID
      );
    }
  } catch (error) {
    console.log("Error in AI Multi:", error);
    api.sendMessage("🚫 An error occurred in AI Multi.", event.threadID, event.messageID);
  }
};