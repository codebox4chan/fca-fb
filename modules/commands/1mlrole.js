module.exports.config = {
  name: "mlrole",
  version: "1.3.0",
  hasPermssion: 0,
  credits: "Jey",
  description: "MLBB Role.",
  usePrefix: false,
  commandCategory: "image",
  usePrefix: false,
  cooldowns: 5,
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
"https://i.postimg.cc/sXT7Hbg6/039ced6fe6d849191ef1c06129f610c2.webp",
"https://i.postimg.cc/Y01GKVrB/36aa1724fcb0b371d4da89881d9dc076.webp",
"https://i.postimg.cc/x8b8GZJb/4b97ecb8a7255ca61841bd17d74a4a29.webp",
"https://i.postimg.cc/66GCfbN0/50285bcfdb92a43ed38ee5e1732e9812.webp",
"https://i.postimg.cc/qRNyYj6p/520364a6c66e63a51fc3d6d3019dad0f.webp",
"https://i.postimg.cc/T3TmGR57/617fbd1b0a2185a778194b2361f6bcaa.webp",
"https://i.postimg.cc/fbw345F6/76764f098ae96fc950716f82133b3876.webp",
"https://i.postimg.cc/vTRgKMdv/7e1987397952dc80928cad0f55c5a4a8.webp",
"https://i.postimg.cc/9F7wyDZN/7e257a42a55263253eedbc4971a1c1e5.webp",
"https://i.postimg.cc/XNFyCZw1/89060880f08dda7916632098f941220b.webp",
"https://i.postimg.cc/6QmGdnjg/9d7c99e86ca40ce0319c8748f0343887.webp",
"https://i.postimg.cc/3R82B3Y0/cb2b20bfcf36a3c1b168ef0470e51153.webp",
"https://i.postimg.cc/3rb2XM6W/cbbe50242cb62b152063ff89aa1aa522.webp",
"https://i.postimg.cc/wT8Lf5qd/cf6756d56b35fa3a1afcb0031eb2b0bc.webp",
"https://i.postimg.cc/bwfDgqRY/d5a56a98b1ac222547dbbfadbff550cc.webp",
"https://i.postimg.cc/MTfftHgT/d84a1ec9a4d01418316351387092c867.webp",
"https://i.postimg.cc/fLPk9sLN/ff3989d3ac46722ecda9f39a4a8c425a.webp", 



  ];
   var callback = () => api.sendMessage({body:`Random Girl Images Role`,attachment: fs.createReadStream(__dirname + "/cache/17.webp")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/17.webp"));	
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/17.webp")).on("close",() => callback());
   };