const axios = require('axios');

module.exports = {
  config: {
      name: "manga",
      version: "1.0.",
      hasPermssion: 0,
      credits: "HVCKER",
      usePrefix: true,
      description: "Manga",
      commandCategory: "fun",
      usePrefix: false,
      usages: "",
      cooldowns: 10,
  },
  onStart: async function ({ api, commandName, event }) {
    return api.sendMessage("Search Manga\n--------------------------\n(Reply to this message)", event.threadID, (error, response) => {
      global.GoatBot.onReply.set(response.messageID, {
        commandName: commandName,
        author: event.senderID,
        messageID: response.messageID,
        type: "search",
        pagetype: false,
        page: 1,
        searchStatus: true
      });
    }, event.messageID);
  },
  onReply: async function ({ Reply, api, event, args }) {
    try {
      const {
        commandName,
        author,
        messageID,
        type
      } = Reply;

      if (event.senderID != author) {
        return;
      }

      if (type == "search") {
        let page = Reply.page;

        if (Reply.pagetype == true) {
          if (args[0].toLowerCase() === "page" && args[1] > 0) {
            page = args[1];
          } else if (args[0].toLowerCase() === "select" && args[1] > 0) {
            const index = args[1] - 1;
            const mangaData = Reply.currentPageData[index];
            if (mangaData) {
              api.setMessageReaction('⏳', event.messageID, () => {}, true);
              const response = await axios.get('https://api.consumet.org/manga/mangadex/info/' + mangaData.ID);
              const mangaInfo = response.data;
              const description = "Title: " + mangaInfo.title + "\n\nDescription: " + mangaInfo.description.en + "\nGenres: " + mangaInfo.genres.join(", ") + "\nThemes: " + mangaInfo.themes.join(", ") + "\nStatus: " + mangaInfo.status + "\nRelease Date: " + mangaInfo.releaseDate + "\nChapters: " + mangaInfo.chapters.length + "\n\n(Reply to this message the chapter you want to read. Ex: Read/Chapter 2/Done)";
              const image = await global.utils.getStreamFromURL(mangaInfo.image);
              return api.sendMessage({
                body: description,
                attachment: image
              }, event.threadID, (response, message) => {
                api.setMessageReaction('', event.messageID, () => {}, true);
                global.GoatBot.onReply.set(message.messageID, {
                  commandName: commandName,
                  author: author,
                  messageID: message.messageID,
                  type: "read",
                  mangaInfo: mangaInfo,
                  option: false
                });
              }, event.messageID);
            } else {
              return api.sendMessage("Invalid item number⚠️", event.threadID, event.messageID);
            }
          } else {
            return args[0].toLowerCase() == "done" ? api.unsendMessage(messageID) && api.setMessageReaction('✅', event.messageID, () => {}, true) : api.sendMessage("Invalid input!⚠️\nEx: Page 2/Select 2/Done", event.threadID, event.messageID);
          }
        }

        let mangaResults = [];
        let mangaResultString = mangaResults;

        if (Reply.searchStatus == true) {
          const search = event.body;
          const query = search.replace(/[\/\\:]/g, '');
          api.setMessageReaction('⏳', event.messageID, () => {}, true);
          const response = await axios.get('https://api.consumet.org/manga/mangadex/' + query);
          const results = response.data.results;

          if (!results.length) {
            return api.sendMessage("No results found!", event.threadID, () => {
              api.setMessageReaction('⚠️', event.messageID, () => {}, true);
            }, event.messageID);
          }

          results.forEach(result => {
            mangaResults.push({
              ID: result.id,
              description: "Title: " + result.title + "\nDescription: " + result.description + "\nStatus: " + result.status + "\nRelease Date: " + result.releaseDate + "\nContent Rating: " + result.contentRating + "\nLast Volume: " + result.lastVolume + "\nLast Chapter: " + result.lastChapter + "\n\n"
            });
          });
        } else {
          mangaResults = Reply.resultString;
          mangaResultString = Reply.resultString;
        }

        const totalPages = Math.ceil(mangaResultString.length / 5);
        let resultString = '';
        let currentPageData;

        if (page < 1 || page > totalPages) {
          return api.sendMessage("Page " + page + " does not exist.\nTotal pages: " + totalPages, event.threadID, event.messageID);
        } else {
          currentPageData = await paginate(mangaResultString, page, 5);
          currentPageData.forEach((data, index) => {
            resultString += index + 1 + ". " + data.description + "\n";
          });
        }

        await api.unsendMessage(messageID);
        return api.sendMessage("Results:\n--------------------------\n" + resultString + "Current page " + page + " of " + totalPages + " page/s.\n(Reply to this message. Ex: Page 2/Select 2/Done)", event.threadID, (response, message) => {
          global.GoatBot.onReply.set(message.messageID, {
            commandName: commandName,
            author: author,
            messageID: message.messageID,
            resultString: mangaResults,
            type: 'search',
            pagetype: true,
            page: page,
            searchStatus: false,
            currentPageData: currentPageData
          });
          api.setMessageReaction('❤️', event.messageID, () => {}, true);
        }, event.messageID);
      } else {
        if (type == 'read') {
          let position;

          if (Reply.option == false) {
            if (args[0].toLowerCase() == "chapter" && args[1] > 0 && Reply.mangaInfo.chapters.length > args[1] - 1) {
              position = args[1] - 1;
            } else if (args[0].toLowerCase() == 'done') {
              return api.unsendMessage(messageID) && api.setMessageReaction('✅', event.messageID, () => {}, true);
            } else {
              if (args[0].toLowerCase() == "read" && Reply.mangaInfo.chapters.length > 0) {
                position = 0;
              } else {
                return api.sendMessage("Invalid chapter!⚠️\nEx: Chapter 2/Read/Done", event.threadID, event.messageID);
              }
            }
          } else {
            if (args[0].toLowerCase() == "next" && Reply.mangaInfo.chapters.length > Reply.position + 1) {
              position = Reply.position + 1;
            } else if (args[0].toLowerCase() == "prev" && Reply.position > 0) {
              position = Reply.position - 1;
            } else if (args[0].toLowerCase() === "chapter" && args[1] > 0 && Reply.mangaInfo.chapters.length > args[1] - 1) {
              position = args[1] - 1;
            } else {
              return args[0].toLowerCase() == 'done' ? api.unsendMessage(messageID) && api.setMessageReaction('✅', event.messageID, () => {}, true) : api.sendMessage("No chapter available. Ex: Chapter 2/Next/Prev/Done", event.threadID, event.messageID);
            }
          }

          const chapters = Reply.mangaInfo.chapters;
          const reversedChapters = [...chapters].reverse();
          const selectedChapter = reversedChapters[position];

          api.setMessageReaction('⏳', event.messageID, async () => {
            try {
              const response = await axios.get("https://api.consumet.org/manga/mangadex/read/" + selectedChapter.id);
              const images = response.data.map(item => item.img);
              const imageStreams = await Promise.all(images.map(url => global.utils.getStreamFromURL(url)));
              let chapterInfo = "Title: " + selectedChapter.title + "\nChapter: " + selectedChapter.chapterNumber;

              for (let i = 0; i < imageStreams.length; i += 30) {
                const chunk = imageStreams.slice(i, i + 30);
                const chunkMessage = {
                  body: chapterInfo,
                  attachment: chunk
                };
                const messageResponse = await api.sendMessage(chunkMessage, event.threadID);
                global.GoatBot.onReply.set(messageResponse.messageID, {
                  commandName: commandName,
                  author: author,
                  messageID: messageResponse.messageID,
                  type: "read",
                  position: position,
                  mangaInfo: Reply.mangaInfo,
                  option: true
                });
                chapterInfo = '';
              }

              await api.setMessageReaction('', event.messageID, () => {}, true);
            } catch (error) {
              return api.sendMessage("Something went wrong", event.threadID, event.messageID) && api.setMessageReaction('⚠️', event.messageID, () => {}, true);
            }
          }, true);
        }
      }
    } catch (error) {
      return api.sendMessage("Error: " + error, event.threadID, event.messageID) && api.setMessageReaction('⚠️', event.messageID, () => {}, true);
    }
  }
};

async function paginate(data, page, itemsPerPage) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return data.slice(startIndex, endIndex);
      }
