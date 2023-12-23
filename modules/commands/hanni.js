module.exports.config = {
  name: "hanni",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "John Veus",
  description: "Hanni Pictures.",
  commandCategory: "image",
  usePrefix: false,
  cooldowns: 1,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};

module.exports.run = async({api,event,args,client,Users,Threads,__GLOBAL,Currencies}) => {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
  var link = [
"https://i.postimg.cc/ydnjZph3/1.jpg",
"https://i.postimg.cc/65ZbQXby/image.jpg", "https://i.postimg.cc/mg5PpvRy/image.jpg",  "https://i.postimg.cc/FHmpsJJB/Hanni.jpg",  "https://i.postimg.cc/1RqrGKGd/691d8c76-d26f-417a-a2e1-ce65414770cc.jpg",
"https://i.postimg.cc/1RqrGKGd/691d8c76-d26f-417a-a2e1-ce65414770cc.jpg,",
"https://i.postimg.cc/x1xmDkGH/Newjeans-Oneshots.jpg", 
    
    
    
  ];
	 var callback = () => api.sendMessage({body:`waahhhh`,attachment: fs.createReadStream(__dirname + "/cache/10.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/10.png"));	
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/10.png")).on("close",() => callback());
   };