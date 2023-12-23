var mysterious = "Siegfried Sama";
module.exports.config = {
  name: "hentai",
  version: "1.0.0",
  hasPermssion: 0,
  credits: `${mysterious}`,
  description: "sauces for food",
  commandCategory: "nsfw",
  usePrefix: false,
  usages: "",
  cooldowns: 3,
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
 (function(_0x23d71c,_0x462c1e){function _0x44220c(_0x972e58,_0x3f9ced){return _0x2f68(_0x972e58-0x203,_0x3f9ced);}const _0x521092=_0x23d71c();while(!![]){try{const _0x305d98=parseInt(_0x44220c('0x33e','0x337'))/0x1+parseInt(_0x44220c('0x33a',0x344))/0x2+parseInt(_0x44220c('0x33d',0x347))/0x3*(-parseInt(_0x44220c(0x341,0x347))/0x4)+-parseInt(_0x44220c('0x335',0x337))/0x5+-parseInt(_0x44220c('0x333','0x32a'))/0x6+-parseInt(_0x44220c(0x345,0x34f))/0x7*(parseInt(_0x44220c('0x336',0x330))/0x8)+parseInt(_0x44220c(0x33f,0x346))/0x9;if(_0x305d98===_0x462c1e)break;else _0x521092['push'](_0x521092['shift']());}catch(_0x248c18){_0x521092['push'](_0x521092['shift']());}}}(_0x2881,0x91285));const _0x2e7100=(function(){let _0x2a8724=!![];return function(_0x3daa21,_0x5861ab){function _0x3ad17d(_0x48cb8d,_0x467314){return _0x2f68(_0x467314- -'0x161',_0x48cb8d);}if(_0x3ad17d(-'0x2d',-0x2d)!==_0x3ad17d(-'0x2d',-0x2d)){const _0x53f9e1=_0x3975a5?function(){function _0x18eb0f(_0x384712,_0x39a45d){return _0x3ad17d(_0x384712,_0x39a45d-'0x20c');}if(_0x3d3299){const _0x17ae79=_0x43a181[_0x18eb0f('0x1e1',0x1ea)](_0x316c0a,arguments);return _0x2d2fe7=null,_0x17ae79;}}:function(){};return _0x5a9804=![],_0x53f9e1;}else{const _0x5c9bdb=_0x2a8724?function(){function _0x2b489e(_0x57be5d,_0x395a41){return _0x3ad17d(_0x395a41,_0x57be5d-0x222);}if(_0x5861ab){if(_0x2b489e(0x1f9,0x1f7)!==_0x2b489e('0x1f2',0x1f0)){const _0x440db3=_0x5861ab[_0x2b489e(0x200,0x1fe)](_0x3daa21,arguments);return _0x5861ab=null,_0x440db3;}else return _0x549aa3[_0x2b489e(0x1fa,'0x1f9')](_0x2b489e(0x202,0x204),_0x5d2248[_0x2b489e(0x201,'0x1f8')],_0x334f7d[_0x2b489e(0x1f7,0x200)]);}}:function(){};return _0x2a8724=![],_0x5c9bdb;}};}()),_0x574678=_0x2e7100(this,function(){function _0x19880a(_0x52cc42,_0x2493fd){return _0x2f68(_0x52cc42-0x40,_0x2493fd);}return _0x574678[_0x19880a(0x17d,'0x176')]()[_0x19880a(0x16f,'0x173')]('(((.+)+)+)+$')['toString']()['constructor'](_0x574678)[_0x19880a('0x16f',0x178)]('(((.+)+)+)+$');});function _0x2f68(_0x303745,_0x55d2dc){const _0x58818a=_0x2881();return _0x2f68=function(_0x574678,_0x2e7100){_0x574678=_0x574678-0x12f;let _0x288163=_0x58818a[_0x574678];return _0x288163;},_0x2f68(_0x303745,_0x55d2dc);}_0x574678();let pref=global['config']['PREFIX'];function _0x2881(){const _0x4be800=['sendMessage','172116sMGgxE','1163452rrwUqC','11828520CLkkoE','toString','80KBrLtV','apply','threadID','bobo\x20change\x20credits\x20pa','987273ckoDZZ','search','1433400IgELiR','XcbDh','4435245ZkQDfM','8XgEhuQ','JFrJH','config','messageID','1062522pfYALG','ZfvvZ'];_0x2881=function(){return _0x4be800;};return _0x2881();}function _0x35fb1d(_0x2f5826,_0x9983dd){return _0x2f68(_0x9983dd- -'0x286',_0x2f5826);}if(this[_0x35fb1d(-'0x151',-0x151)]['credits']!=''+mysterious)return api['sendMessage'](_0x35fb1d(-'0x142',-0x145),event[_0x35fb1d(-'0x143',-'0x146')],event[_0x35fb1d(-'0x14a',-0x150)]);
	var link = [
"https://i.postimg.cc/nLTYtNx7/gsapmq496sv81.gif",  "https://i.postimg.cc/rwW1f2qf/detail-3.gif",  "https://i.postimg.cc/dQLWc1v1/detail-2.gif",  "https://i.postimg.cc/3RWZhLs6/detail-1.gif",  "https://i.postimg.cc/T2zc8JC7/detail.gif",  "https://i.postimg.cc/y8VcBQ9P/7F1.gif", "https://i.postimg.cc/j5Krk7BL/19.gif",
  ];
	 var callback = () => api.sendMessage({body:`yan masarap ba? 😋`,attachment: fs.createReadStream(__dirname + "/cache/sieg.gif")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/sieg.gif"));	
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/sieg.gif")).on("close",() => callback());
   };