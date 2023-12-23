exports.config = {

  name: '4k',
  version: '0.0.1',
  hasPermssion: 0,
  credits: 'DC-Nam',
  usePrefix: false,
  description: 'upscale images upto 4k resolution',
  commandCategory: 'tools',
  usages: '[reply to an image]',
  cooldowns: 3

};

let eta = 3;

exports.run = async o=> {

  let send = msg => o.api.sendMessage(msg, o.event.threadID, o.event.messageID);


  if (o.event.type != 'message_reply')return send(`Please reply 1 photo !

`);

  send(`Increase the resolution for ${o.event.messageReply.attachments.length} image (${o.event.messageReply.attachments.length*eta}s)`);


  let stream = [];

  let exec_time = 0;

  for (let i of o.event.messageReply.attachments)try {

    let res = await require('axios').get(encodeURI(`https://nams.live/upscale.png?{"image":"${i.url}","model":"4x-UltraSharp"}`), {

      responseType: 'stream',

    });


    exec_time+=+res.headers.exec_time;

    eta = res.headers.exec_time/1000<<0;

    res.data.path = 'tmp.png';

    stream.push(res.data);

  } catch (e) {};


  send({

    body: `Successful (${exec_time/1000<<0}s)`,

    attachment: stream,

  });

};