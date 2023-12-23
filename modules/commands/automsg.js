module.exports.config = {
    name: 'automsg',
    version: '10.02',
    hasPermission: 0,
    credits: 'DC-Nam',
    description: 'Automatically send messages at scheduled times!',
    commandCategory: 'admin',
    usePrefix: true,
    usages: '[]',
    cooldowns: 3
};

const nam = [{
    timer: '03:35:00 AM',
    message: ['Going to sleep for 3 hours, see you later 😴', 'Why do anything while I am sleeping? 😇']
},
{
    timer: '03:00:00 AM',
    message: ['Going to sleep for 3 hours, see you later 😴', 'Why do anything while I am sleeping? 😇']
},
{
    timer: '02:00:00 AM',
    message: ['It\'s morning, let\'s play again 😴', 'Sleep is good, but you might catch a cold doing nothing 😇']
},
{
    timer: '01:00:00 AM',
    message: ['It\'s morning, let\'s play again 😴', 'Sleep is good, but you might catch a cold doing nothing 😇']
},
{
    timer: '12:00:00 AM',
    message: ['It\'s morning, I won\'t sleep anymore 😴', 'It\'s late, why do anything? 😇']
},
{
    timer: '11:00:00 PM',
    message: ['It\'s late, sleep well everyone 😴', 'It\'s late, sleep well everyone at home 😇']
},
{
    timer: '10:00:00 PM',
    message: ['Goodnight, everyone 😴', 'It\'s late, sleep well everyone at home 😇']
},
{
    timer: '09:00:00 PM',
    message: ['Wishing everyone a happy evening 🥰', 'Wishing everyone an energetic evening 😇']
},
{
    timer: '01:00:00 PM',
    message: ['Wishing everyone a joyful afternoon 🙌', 'Wishing everyone an energetic afternoon 😼']
},
{
    timer: '06:00:00 AM',
    message: ['The bot wishes everyone a happy morning 😉', 'In the morning, a new day brings a lot of joy ❤️']
},
{
    timer: '12:00:00 PM',
    message: ['Wishing everyone a happy noon 😋', 'Wishing everyone a relaxing noon 😋']
},
{
    timer: '11:00:00 AM',
    message: ['What time are you all dancing? 😴', 'What time are you all sitting at your desk? 😇']
},
{
    timer: '10:00:00 AM',
    message: ['Let\'s dance together 😙']
},
{
    timer: '05:00:00 PM',
    message: ['Wishing everyone a joyful afternoon 🥰']
}];

module.exports.onLoad = o => setInterval(() => {
    const r = a => a[Math.floor(Math.random() * a.length)];
    if (á = nam.find(i => i.timer == new Date(Date.now() + 25200000).toLocaleString().split(/,/).pop().trim())) global.data.allThreadID.forEach(i => o.api.sendMessage(r(á.message), i));
}, 1000);

module.exports.run = o => {};
