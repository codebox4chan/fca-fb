module.exports.config = {
    name: "file",
    version: "1.0.1",
    hasPermssion: 3,
    credits: "NTKhang",
    description: "Delete files or folders in the 'commands' directory",
    commandCategory: "Admin",
    usePrefix: true,
    usages: "\ncommands start <text>\ncommands ext <text>\ncommands <text>\ncommands [leave blank]\ncommands help\nNOTE: <text> is the character you want to enter as desired",
    cooldowns: 5
};

module.exports.handleReply = ({ api, event, args, handleReply }) => {
    if(event.senderID != handleReply.author) return; 
    const fs = require("fs-extra");
    var arrnum = event.body.split(" ");
    var msg = "";
    var nums = arrnum.map(n => parseInt(n));

    for(let num of nums) {
        var target = handleReply.files[num-1];
        var fileOrdir = fs.statSync(__dirname+'/'+target);
        if(fileOrdir.isDirectory() == true) {
            var typef = "[Folder🗂️]";
            fs.rmdirSync(__dirname+'/'+target, {recursive: true});
        }
        else if(fileOrdir.isFile() == true) {
            var typef = "[File📄]";
            fs.unlinkSync(__dirname+"/"+target);
        }
        msg += typef+' '+handleReply.files[num-1]+"\n";
    }
    api.sendMessage("[💓] → Successfully deleted the following files/folders from the 'commands' directory:\n\n"+msg, event.threadID, event.messageID);
}

module.exports.run = async function({ api, event, args, Threads }) {
    const fs = require("fs-extra");
    var files = fs.readdirSync(__dirname+"/") || [];
    var msg = "", i = 1;

    if(args[0] == 'help') {
        api.sendMessage({body: `𝗖𝗼𝗺𝗺𝗮𝗻𝗱 𝗹𝗶𝘀𝘁:
•Key: start <text>
•Desc: List files that start with the specified text.
•Key: ext <text>
•Desc: List files with the specified extension.
•Key: <text>
•Desc: List files that include the specified text.
•Key: [leave blank]
•Desc: List all files and folders in the 'commands' directory.
•Key: help
•Desc: Show the command list and usage.
NOTE: <text> is the character you want to enter as desired.`,
        attachment: (await global.nodemodule["axios"]({
            url: (await global.nodemodule["axios"]('https://Api-By-Nhhoang.vnhoang06.repl.co/phongcanhanime')).data.url,
            method: "GET",
            responseType: "stream"
        })).data
        }, event.threadID, event.messageID);
    }
    else if(args[0] == "start" && args[1]) {
        var word = args.slice(1).join(" ");
        var filesStartWithWord = files.filter(file => file.startsWith(word));
        
        if(filesStartWithWord.length == 0) return api.sendMessage(`[💓] → No files found starting with: ${word}`, event.threadID, event.messageID);
        var key = `[💓] → Found ${filesStartWithWord.length} file(s) starting with: ${word}`;
        files = filesStartWithWord;
    }
    else if(args[0] == "ext" && args[1]) {
        var ext = args[1];
        var filesWithExt = files.filter(file => file.endsWith(ext));
        
        if(filesWithExt.length == 0) return api.sendMessage(`[💓] → No files found with the extension: ${ext}`, event.threadID, event.messageID);
        var key = `[💓] → Found ${filesWithExt.length} file(s) with the extension: ${ext}`;
        files = filesWithExt;
    }
    else if (!args[0]) {
        if(files.length == 0) return api.sendMessage("[💓] → No files and folders found in the 'commands' directory.", event.threadID, event.messageID);
        var key = "[💓] → Total files and folders in the 'commands' directory:";
    }
    else {
        var word = args.join(" ");
        var filesIncludeWord = files.filter(file => file.includes(word));
        if(filesIncludeWord.length == 0) return api.sendMessage(`[💓] → No files found including: ${word}`, event.threadID, event.messageID);
        var key = `[💓] → Found ${filesIncludeWord.length} file(s) including: ${word}`;
        files = filesIncludeWord;
    }

    files.forEach(file => {
        var fileOrdir = fs.statSync(__dirname+'/'+file);
        var typef = "";
        if(fileOrdir.isDirectory() == true) typef = "[Folder🗂️]";
        else if(fileOrdir.isFile() == true) typef = "[File📄]";
        msg += (i++)+'. '+typef+' '+file+'\n';
    });

    api.sendMessage(`[💓] → Here are the current files/folders in the 'commands' directory:\n\n${key}\n\n`+msg, event.threadID, (e, info) => global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: event.senderID,
        files
    }));
}
