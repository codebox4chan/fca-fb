const logger = require('./utils/log');
const cron = require('node-cron');
const axios = require("axios");
const fs = require('fs');
const path = require('path');
const PREFIX = true;

module.exports = async ({ api }) => {
  const minInterval = 5;
  let lastMessageTime = 0;
  let messagedThreads = new Set();

  const config = {
    autoRestart: {
      status: false,
      time: 40,
      note: 'To avoid problems, enable periodic bot restarts',
    },
    acceptPending: {
      status: false,
      time: 30,
      note: 'Approve waiting messages after a certain time',
    },
  };

  function autoRestart(config) {
    if (config.status) {
      cron.schedule(`*/${config.time} * * * *`, () => {
        logger('Start rebooting the system!', 'Auto Restart');
        process.exit(1);
      });
    }
  }

  function acceptPending(config) {
    if (config.status) {
      cron.schedule(`*/${config.time} * * * *`, async () => {
        const list = [
          ...(await api.getThreadList(1, null, ['PENDING'])),
          ...(await api.getThreadList(1, null, ['OTHER'])),
        ];
        if (list[0]) {
          api.sendMessage('You have been approved for the queue. (This is an automated message)', list[0].threadID);
        }
      });
    }
  }

  autoRestart(config.autoRestart);
  acceptPending(config.acceptPending);

  // AUTOGREET EVERY 10 MINUTES
  cron.schedule('*/60 * * * *', () => {
    const currentTime = Date.now();
    if (currentTime - lastMessageTime < minInterval) {
      console.log("Skipping message due to rate limit");
      return;
    }
    api.getThreadList(25, null, ['INBOX'], async (err, data) => {
      if (err) return console.error("Error [Thread List Cron]: " + err);
      let i = 0;
      let j = 0;

      async function message(thread) {
         try {
           let fact = await axios.get('https://replhome.codebox4chan.repl.co/api/random-fact');

          api.sendMessage({
            body: `𝗙𝗨𝗡𝗙𝗔𝗖𝗧💡: ${fact.data.text}`
          }, thread.threadID, (err) => {
            if (err) return;
            messagedThreads.add(thread.threadID);

          });
        } catch (error) {
          console.error("Error sending a message:", error);
        }
      }

      while (j < 20 && i < data.length) {
        if (data[i].isGroup && data[i].name != data[i].threadID && !messagedThreads.has(data[i].threadID)) {
          await message(data[i]);
          j++;
          const CuD = data[i].threadID;
          setTimeout(() => {
            messagedThreads.delete(CuD);
          }, 1000);
        }
        i++;
      }
    });
  }, {
    scheduled: true,
    timezone: "Asia/Manila"
  });

  // AUTOGREET EVERY 15 MINUTES
  cron.schedule('*/80 * * * *', () => {
    const currentTime = Date.now();
    if (currentTime - lastMessageTime < minInterval) {
      console.log("Skipping message due to rate limit");
      return;
    }
    api.getThreadList(25, null, ['INBOX'], async (err, data) => {
      if (err) return console.error("Error [Thread List Cron]: " + err);
      let i = 0;
      let j = 0;

      async function message(thread) {
        try {
          const response = await axios.get('https://replhome.codebox4chan.repl.co/api/random-quote');
          const quote = response.data.quote;
          const author = response.data.author;
          api.sendMessage({
            body: `𝗤𝗨𝗢𝗧𝗘📜:\n\n"${quote}"\n\n-${author}`
          }, thread.threadID, (err) => {
            if (err) return;
            messagedThreads.add(thread.threadID);

          });
        } catch (error) {
          console.error("Error sending a message:", error);
        }
      }


      while (j < 20 && i < data.length) {
        if (data[i].isGroup && data[i].name != data[i].threadID && !messagedThreads.has(data[i].threadID)) {
          await message(data[i]);
          j++;
          const CuD = data[i].threadID;
          setTimeout(() => {
            messagedThreads.delete(CuD);
          }, 1000);
        }
        i++;
      }
    });
  }, {
    scheduled: true,
    timezone: "Asia/Manila"
  });
};

// ...

// AUTOGREET EVERY 15 MINUTES
cron.schedule('*/45 * * * *', async () => {
    const currentTime = Date.now();
    if (currentTime - lastMessageTime < minInterval) {
        console.log("Skipping message due to rate limit");
        return;
    }
    api.getThreadList(25, null, ['INBOX'], async (err, data) => {
        if (err) return console.error("Error [Thread List Cron]: " + err);
        let i = 0;
        let j = 0;

        async function message(thread) {
            try {
                const baseUrl = 'https://newsapi.org/v2/everything';
                const currentDate = new Date();
                currentDate.setDate(currentDate.getDate() - 1); // Subtract current date with realtime update

                const formattedDate = currentDate.toISOString().split('T')[0];
                const apiKey = 'f21962c22cfc4f1db804bee6e09808b5';
                const topic = 'news'; // Replace with your desired topic

                const response = await axios.get(baseUrl, {
                    params: {
                        q: topic,
                        from: formattedDate,
                        sortBy: 'publishedAt',
                        apiKey: apiKey,
                    },
                });

                if (response.data && response.data.articles && response.data.articles.length > 0) {
                    const articles = response.data.articles;
                    const randomIndex = Math.floor(Math.random() * articles.length);
                    const article = articles[randomIndex];
                    const imageUrl = article.urlToImage;
                    const imageStream = await axios.get(imageUrl, { responseType: 'stream' });
                    const imagePath = path.join(__dirname, '/cache/news.png');
                    const imageWriter = fs.createWriteStream(imagePath);

                    imageStream.data.pipe(imageWriter);

                    imageWriter.on('finish', () => {
                        api.sendMessage({
                            body: `𝗡𝗘𝗪𝗦📰: ${article.source.name}\n𝗧𝗜𝗧𝗟𝗘: ${article.title}\n𝗗𝗘𝗦𝗖𝗥𝗜𝗣𝗧𝗜𝗢𝗡: ${article.description}\n𝗦𝗢𝗨𝗥𝗖𝗘: ${article.url || 'Trust Me Bro!'}\n𝗣𝗨𝗕𝗟𝗜𝗦𝗛𝗘𝗥: ${article.author || 'Kenneth Panio'}\n𝗗𝗔𝗧𝗘: ${article.publishedAt}`,
                            attachment: fs.createReadStream(imagePath),
                        }, thread.threadID, (err) => {
                            if (err) return;
                            messagedThreads.add(thread.threadID);
                        });
                    });
                }
            } catch (error) {
                console.error("Error sending a message:", error);
            }
        }

  while (j < 20 && i < data.length) {
              if (data[i].isGroup && data[i].name != data[i].threadID && !messagedThreads.has(data[i].threadID)) {
                  await message(data[i]);
                  j++;
                  const CuD = data[i].threadID;
                  setTimeout(() => {
                      messagedThreads.delete(CuD);
                  }, 1000);
              }
              i++;
          }
      });
  }, {
    scheduled: true,
    timezone: "Asia/Manila"
});
const crypto = require('crypto');

class Coc {
  constructor(email, password) {
    this.email = email;
    this.password = password;
    this.apiKey = null;
    this.periodicCheckInterval = null;
    this.periodicallyCheckAndGenerateKey();
  }

  async getMyIp() {
    const response = await axios.get('https://api.ipify.org?format=json');
    return response.data.ip;
  }

  async login() {
    const url = 'https://developer.clashofclans.com/api/login';
    const headers = { 'authority': 'developer.clashofclans.com',
      'accept': '*/*',
      'x-requested-with': 'XMLHttpRequest',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
      'content-type': 'application/json',
      'sec-gpc': '1',
      'origin': 'https://developer.clashofclans.com',
      'sec-fetch-site': 'same-origin',
      'sec-fetch-mode': 'cors',
      'sec-fetch-dest': 'empty',
      'referer': 'https://developer.clashofclans.com/',
      'accept-language': 'en-US,en;q=0.9',
      'cookie': 'cookieconsent_status=dismiss' };
    const data = { 'email': this.email, 'password': this.password };
    const response = await axios.post(url, JSON.stringify(data), { headers });
    return response.headers['set-cookie'];
  }

async saveApiKeyToFile(apiKey, ip) {
  const filePath = path.join(__dirname, 'cocdev.json');
  let jsonData = { apiKey, ip };

  try {
    const existingData = fs.readFileSync(filePath);
    const parsedData = JSON.parse(existingData);
    jsonData = { ...parsedData, apiKey, ip }; // Update existing data with new values
  } catch (error) {
    // File doesn't exist or couldn't be read, proceed with new data
  }

  fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
}

  async loadApiKeyFromFile() {
    const filePath = path.join(__dirname, 'cocdev.json');
    try {
      const rawData = fs.readFileSync(filePath);
      const jsonData = JSON.parse(rawData);
      return jsonData || null;
    } catch (error) {
      return null;
    }
  }

  async createKey() {
    const apiKeyFromFile = await this.loadApiKeyFromFile();
    const currentIp = await this.getMyIp();

    if (!apiKeyFromFile || apiKeyFromFile.ip !== currentIp) {
      // API key doesn't exist or IP has changed, generate a new key
      await this.deleteKey();
      const newApiKey = await this.generateApiKey(currentIp);
      this.apiKey = newApiKey;
    } else {
      // Use the existing API key
      this.apiKey = apiKeyFromFile.apiKey;
    }

    // Save the API key to file, whether it's newly generated or existing
    await this.saveApiKeyToFile(this.apiKey, currentIp);

    return this.apiKey;
  }

  async periodicallyCheckAndGenerateKey() {
    this.periodicCheckInterval = setInterval(async () => {
      const currentIp = await this.getMyIp();
      const apiKeyFromFile = await this.loadApiKeyFromFile();

      if (!apiKeyFromFile || apiKeyFromFile.ip !== currentIp) {
        await this.deleteKey();
        const newApiKey = await this.generateApiKey(currentIp);
        this.apiKey = newApiKey;
        console.log("New API Key generated:", newApiKey);
      } else {
        console.log("IP matches existing API Key.");
      }
    }, 5 * 60 * 1000);
  }

  async generateApiKey(ip) {
    const cookie = await this.login();
    const url = 'https://developer.clashofclans.com/api/apikey/create';
    const headers = { 'authority': 'developer.clashofclans.com',
      'accept': '*/*',
      'x-requested-with': 'XMLHttpRequest',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
      'content-type': 'application/json',
      'sec-gpc': '1',
      'origin': 'https://developer.clashofclans.com',
      'sec-fetch-site': 'same-origin',
      'sec-fetch-mode': 'cors',
      'sec-fetch-dest': 'empty',
      'referer': 'https://developer.clashofclans.com/',
      'accept-language': 'en-US,en;q=0.9',
      'cookie': cookie };
    const randomData = crypto.randomBytes(12).toString('hex');
    const data = { "name": randomData, "description": randomData, "cidrRanges": [ip], "scopes": null };
    const response = await axios.post(url, JSON.stringify(data), { headers });
    const newApiKey = response.data.key;
    await this.saveApiKeyToFile(newApiKey, ip);
    return newApiKey;
  }

  async deleteKey() {
    const apiKeyInfo = await this.loadApiKeyFromFile();

    if (!apiKeyInfo || !apiKeyInfo.apiKey) {
      console.log('API key information not found.');
      return;
    }

    const cookie = await this.login();
    const url = 'https://developer.clashofclans.com/api/apikey/revoke';
    const headers = {    'authority': 'developer.clashofclans.com',
      'accept': '*/*',
      'x-requested-with': 'XMLHttpRequest',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
      'content-type': 'application/json',
      'sec-gpc': '1',
      'origin': 'https://developer.clashofclans.com',
      'sec-fetch-site': 'same-origin',
      'sec-fetch-mode': 'cors',
      'sec-fetch-dest': 'empty',
      'referer': 'https://developer.clashofclans.com/',
      'accept-language': 'en-US,en;q=0.9',
      'cookie': cookie };
    const data = { "id": apiKeyInfo.apiKey };
    const response = await axios.post(url, JSON.stringify(data), { headers });
    console.log(response.data);
  }
}

const c = new Coc("lkpanio25@gmail.com", "@codebox4chan");
c.createKey().then(apiKey => console.log(apiKey)).catch(error => console.error(error));

