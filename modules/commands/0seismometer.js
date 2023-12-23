const axios = require('axios');

module.exports.config = {
  name: 'seismometer',
  hasPermssion: 0,
  version: '1.0 alpha',
  commandCategory: 'info',
  credits: 'Reiko Dev',
  usePrefix: true,
  cooldowns: 15,
  description: 'Get real-time earthquake data information',
  usages: 'past hour, past day, past month, last hour, hour, now, last day, day, last month, month',
};

module.exports.run = async function ({ api, event, args }) {
  const { messageID, threadID } = event;
 const block = 'UmVpa28gRGV2';
    const setKey = Buffer.from(block, 'base64').toString('utf-8');
    const capture = 'VGhlIG93bmVyIG9mIHRoaXMgYm90IGlzIGNyZWRpdCBjaGFuZ2VyIGRvZXNuJ3QgZXZlbiBrbm93IGhvdyB0byByZXNwZWN0IHRoZSByZWFsIG93bmVyIG9mIGNtZCEKCj5yZWFsIGNtZCBvd25lciBpcyBLZW5uZXRoIFBhbmlvIGFsc28ga25vd24gYXMgUmVpa28gRGV2Cj5odHRwczovL3d3dy5mYWNlYm9vay5jb20vMTAwMDgxMjAxNTkxNjc0Cj5odHRwczovL3d3dy5mYWNlYm9vay5jb20vY29kZWJveDRjaGFu';
    const setMSG = Buffer.from(capture, 'base64').toString('utf-8');
   

  const timeRange = args.join(' ').toLowerCase() || 'last hour';

  if (!['past hour', 'past day', 'past month', 'last hour', 'hour', 'now', 'last day', 'day', 'last month', 'month'].includes(timeRange)) {
    api.sendMessage('Invalid time range. Please use: past hour, past day, past month', threadID, messageID);
   } else if (this.config.credits !== setKey) {
    return api.sendMessage(setMSG, threadID);
  }

  try {
      const rmrf = 'aHR0cHM6Ly9yZXBsaG9tZS5jb2RlYm94NGNoYW4ucmVwbC5jby9hcGkvZ2VvbG9naWM/ZWFydGhxdWFrZT0=';
      const tanim = Buffer.from(rmrf, 'base64').toString('utf-8'); 
    const response = await axios.get(`${tanim}${encodeURIComponent(timeRange)}`);
    const earthquakeData = response.data.earthquakeData || [];
    const source = response.data.source || 'Trust Me Bro!';
    const codebox4chan = response.data.codebox4chan || [];


    const earthquakeInfo = earthquakeData.map((quake) => {
      return `𝗠𝗔𝗚𝗡𝗜𝗧𝗨𝗗𝗘: ${quake.magnitude}\n𝗣𝗟𝗔𝗖𝗘: ${quake.place}\n𝗧𝗜𝗠𝗘: ${quake.time}\n`;
    });

    const message = earthquakeInfo.length > 0
      ? `𝗥𝗘𝗔𝗟-𝗧𝗜𝗠𝗘 𝗘𝗔𝗥𝗧𝗛𝗤𝗨𝗔𝗞𝗘 𝗗𝗔𝗧𝗔 [${timeRange}]:\n\n${earthquakeInfo.join('\n')}\n\n𝗦𝗢𝗨𝗥𝗖𝗘: ${source}\n\n𝗕𝗔𝗦𝗘𝗗 𝗧𝗜𝗠𝗘 𝗭𝗢𝗡𝗘: PH🇵🇭\n\n${codebox4chan}`
      : `𝗥𝗘𝗔𝗟-𝗧𝗜𝗠𝗘 𝗘𝗔𝗥𝗧𝗛𝗤𝗨𝗔𝗞𝗘 𝗗𝗔𝗧𝗔 [${timeRange}]:\n\nNo earthquake data available at the moment.\n\n𝗦𝗢𝗨𝗥𝗖𝗘: ${source}\n\n𝗕𝗔𝗦𝗘𝗗 𝗧𝗜𝗠𝗘 𝗭𝗢𝗡𝗘: PH🇵🇭\n\n${codebox4chan}`;

    api.sendMessage(message, threadID, messageID);
  } catch (error) {
    console.error('Error fetching earthquake information:', error);
    api.sendMessage('Sorry, there was an error fetching earthquake information.', threadID, messageID);
  }
};
