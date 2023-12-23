let moment = require('moment-timezone');

let is_time_in_ranges = (time = moment.tz("Asia/Manila").format('HH:mm:ss'), range, format = 'HH:mm:ss') => moment(time, format).isBetween(moment(range.start, format), moment(range.end, format));

module.exports.config = {
  name: "schedule",
  version: "1.1.1",
  hasPermssion: 0,
  credits: "Quất",
  description: "Class schedule",
  commandCategory: "system",
  usages: "",
  usePrefix: false,
  cooldowns: 3,
};

module.exports.run = async function ({ api, event, args }) {
  const axios = require("axios");
  const link = (url) => axios.get(url, { responseType: "stream", }).then((r) => r.data);
  if (args[0] == 'main') {
    return api.sendMessage({ body: 'Class Schedule', attachment: await link('https://i.imgur.com/x1UgEUs.png') }, event.threadID);
  }
  var timeRanges = [
    { start: '00:00:00', end: '06:50:00', day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], text: 'Break' },
    { start: '06:50:00', end: '07:00:00', day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], text: 'Homeroom' },
    { start: '07:45:00', end: '07:50:00', day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], text: 'Transition' },
    { start: '08:35:00', end: '08:55:00', day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], text: 'Recess' },
    { start: '09:40:00', end: '09:45:00', day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], text: 'Transition' },
    { start: '10:30:00', end: '13:25:00', day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], text: 'Break' },
    { start: '13:25:00', end: '13:30:00', day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], text: 'Homework' },
    { start: '16:50:00', end: '23:59:00', day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], text: 'Break' },
    { start: '11:25:00', end: '23:59:59', day: 'Saturday', text: 'Break' },
    { start: '10:30:00', end: '10:40:00', day: 'Saturday', text: 'Recess' },
    { start: '15:00:00', end: '15:20:00', day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], text: 'Recess' },
    // Monday
    { start: '07:00:00', end: '07:45:00', day: 'Monday', text: 'Flag Salute' },
    { start: '07:50:00', end: '08:35:00', day: 'Monday', text: 'Class Meeting' },
    { start: '08:55:00', end: '09:40:00', day: 'Monday', text: 'Chemistry' },
    { start: '09:45:00', end: '10:30:00', day: 'Monday', text: 'Technology' },
    { start: '13:30:00', end: '14:15:00', day: 'Monday', text: 'Physics' },
    { start: '14:15:00', end: '15:00:00', day: 'Monday', text: 'National Defense' },
    { start: '15:20:00', end: '16:05:00', day: 'Monday', text: 'Mathematics' },
    { start: '16:05:00', end: '16:50:00', day: 'Monday', text: 'Career Guidance' },
    // Tuesday
    { start: '07:00:00', end: '07:45:00', day: 'Tuesday', text: 'History' },
    { start: '07:50:00', end: '08:35:00', day: 'Tuesday', text: 'History' },
    { start: '08:55:00', end: '09:40:00', day: 'Tuesday', text: 'English' },
    { start: '09:45:00', end: '10:30:00', day: 'Tuesday', text: 'English' },
    { start: '13:30:00', end: '14:15:00', day: 'Tuesday', text: 'Literature' },
    { start: '14:15:00', end: '15:00:00', day: 'Tuesday', text: 'Literature' },
    { start: '15:20:00', end: '16:05:00', day: 'Tuesday', text: 'Mathematics' },
    { start: '16:05:00', end: '16:50:00', day: 'Tuesday', text: 'Mathematics' },
    // Wednesday
    { start: '07:00:00', end: '07:45:00', day: 'Wednesday', text: 'Mathematics' },
    { start: '07:50:00', end: '08:35:00', day: 'Wednesday', text: 'Mathematics' },
    { start: '08:55:00', end: '09:40:00', day: 'Wednesday', text: 'Computer Science' },
    { start: '09:45:00', end: '10:30:00', day: 'Wednesday', text: 'Computer Science' },
    { start: '13:30:00', end: '14:15:00', day: 'Wednesday', text: 'Physical Education' },
    { start: '14:15:00', end: '15:00:00', day: 'Wednesday', text: 'Physical Education' },
    { start: '15:20:00', end: '16:05:00', day: 'Wednesday', text: 'Mathematics' },
    { start: '16:05:00', end: '16:50:00', day: 'Wednesday', text: 'Mathematics' },
    // Thursday
    { start: '07:00:00', end: '07:45:00', day: 'Thursday', text: 'Civics' },
    { start: '07:50:00', end: '08:35:00', day: 'Thursday', text: 'Chemistry' },
    { start: '08:55:00', end: '09:40:00', day: 'Thursday', text: 'Biology' },
    { start: '09:45:00', end: '10:30:00', day: 'Thursday', text: 'Physics' },
    { start: '13:30:00', end: '14:15:00', day: 'Thursday', text: 'Civics' },
    { start: '14:15:00', end: '15:00:00', day: 'Thursday', text: 'Civics' },
    { start: '15:20:00', end: '16:05:00', day: 'Thursday', text: 'History' },
    { start: '16:05:00', end: '16:50:00', day: 'Thursday', text: 'History' },
    // Friday
    { start: '07:00:00', end: '07:45:00', day: 'Friday', text: 'English' },
    { start: '07:50:00', end: '08:35:00', day: 'Friday', text: 'English' },
    { start: '08:55:00', end: '09:40:00', day: 'Friday', text: 'Literature' },
    { start: '09:45:00', end: '10:30:00', day: 'Friday', text: 'Literature' },
    { start: '13:30:00', end: '14:15:00', day: 'Friday', text: 'Geography' },
    { start: '14:15:00', end: '15:00:00', day: 'Friday', text: 'Geography' },
    { start: '15:20:00', end: '16:05:00', day: 'Friday', text: 'English' },
    { start: '16:05:00', end: '16:50:00', day: 'Friday', text: 'English' },
    // Saturday
    { start: '07:00:00', end: '07:45:00', day: 'Saturday', text: 'Mathematics' },
    { start: '07:50:00', end: '08:35:00', day: 'Saturday', text: 'Mathematics' },
    { start: '08:55:00', end: '09:40:00', day: 'Saturday', text: 'Geography' },
    { start: '09:45:00', end: '10:30:00', day: 'Saturday', text: 'Geography' },
    { start: '10:40:00', end: '11:25:00', day: 'Saturday', text: 'Literature' },
    // Sunday
    { start: '00:00:00', end: '23:59:59', day: 'Sunday', text: 'Break' },
  ];
  var time = moment.tz('Asia/Manila').format('HH:mm:ss');
  var dddd = moment.tz('Asia/Manila').format('dddd');
  var day;
  if (dddd == 'Sunday') day = 'Sunday'
  if (dddd == 'Monday') day = 'Monday'
  if (dddd == 'Tuesday') day = 'Tuesday'
  if (dddd == 'Wednesday') day = 'Wednesday'
  if (dddd == 'Thursday') day = 'Thursday'
  if (dddd == 'Friday') day = 'Friday'
  if (dddd == 'Saturday') day = 'Saturday'
  const currentTime = moment.tz("Asia/Manila").format('HH:mm:ss');
  for (const range of timeRanges) for (let weekDay of typeof range.day == 'string' ? [range.day] : range.day) if (dddd == weekDay && is_time_in_ranges(time, range)) api.sendMessage({ body: `
➩ It's currently ${day} at ${time}
➩ Class Schedule: ${range.text}
➩ During: ${day}, ${range.start} to ${range.end.replace('23:59:59', '00:00:00')}`
    , attachment: await link(
    range.text == 'Physics'       ? 'https://i.imgur.com/niKxegp.jpg' :
    range.text == 'Mathematics'   ? 'https://i.imgur.com/4l8lqqI.jpg' :
    range.text == 'Flag Salute'   ? 'https://i.imgur.com/UpgDqPO.jpg' :
    range.text == 'Recess'        ? 'https://i.imgur.com/aoAC4oU.jpg' :
    range.text == 'Break'         ? 'https://i.imgur.com/4t3Dgdb.jpg' :
    range.text == 'Homeroom'      ? 'https://i.imgur.com/DYBcvCQ.jpg' :
    range.text == 'Literature'    ? 'https://i.imgur.com/fOAzlaN.jpg' :
    range.text == 'Class Meeting' ? 'https://i.imgur.com/wH6v7Bz.jpg' :
    range.text == 'Chemistry'     ? 'https://i.imgur.com/MsXBuE0.jpg' :
    range.text == 'Technology'    ? 'https://i.imgur.com/kniutfc.jpg' :
    range.text == 'Career Guidance' ? 'https://i.imgur.com/FPdxR0D.jpg' :
    range.text == 'National Defense' ? 'https://i.imgur.com/FYaoC6T.jpg' :
    range.text == 'History'       ? 'https://i.imgur.com/6Hpavyw.jpg' :
    range.text == 'English'       ? 'https://i.imgur.com/fvhyo8v.jpg' :
    range.text == 'Civics'        ? 'https://i.imgur.com/KFGNMfz.jpg' :
    range.text == 'Geography'     ? 'https://i.imgur.com/LEDFoB5.jpg' :
    range.text == 'Physical Education' ? 'https://i.imgur.com/tJd6RjC.jpg' :
    range.text == 'Computer Science' ? 'https://i.imgur.com/5QR1aYj.jpg' :
    range.text == 'Biology'       ? 'https://i.imgur.com/8Pj5sfY.jpg' :
                                   'https://i.imgur.com/KSfXQgm.jpg') }, event.threadID);
  }
    