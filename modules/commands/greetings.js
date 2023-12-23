module.exports.config = {
name: 'greetings',
version: '10.02',
hasPermssion: 0,
credits: 'ryuko',
usePrefix: true,
description: 'greetings',
commandCategory: 'system',
usages: '',
cooldowns: 3
};
const nam = [
{
timer: '6:00:00 AM',
message: [`🌞 Good morning, everyone! 🌼 Remember the importance of having breakfast. 🍳 Starting your day with a healthy meal contributes to your overall well-being and energy levels throughout the day. 🌿 A nutritious breakfast supplies vital nutrients and the necessary fuel for your morning activities. 😋 It's crucial to select foods packed with protein, fiber, and essential nutrients such as fruits, veggies, cheese, eggs, grains, or bread rolls. 🥦🍊 Also, make sure to stay hydrated by consuming enough water. 💧 Wishing you a delightful breakfast this morning! 🍽️`]
},
{
timer: '11:00:00 AM',
message: [`Good afternoon, everyone! Please remember to take the time to have your lunch. It's crucial for our energy levels and overall well-being. Having a nutritious meal equips us with the necessary nutrients to support us throughout the day. Ensure your lunch includes a blend of carbohydrates, protein, and vegetables. You may consider options like rice, chicken, fish, vegetables, and fruits. Also, don't forget to stay hydrated by drinking water or other nourishing beverages. Enjoy your meal! 😊🍽️`]
},
{
timer: '19:00:00 PM',
message: [`Good evening, everyone! Ensuring a restful night's sleep is crucial for our overall health and well-being. Remember to prioritize your sleep by setting up a comfortable sleep environment, sticking to a consistent sleep schedule, and incorporating relaxation techniques to aid in faster sleep onset. Wishing you all sweet dreams. 😴💤`]
}];
module.exports.onLoad = o => setInterval(() => {
const r = a => a[Math.floor(Math.random()*a.length)];
if (á = nam.find(i => i.timer == new Date(Date.now()+25200000).toLocaleString().split(/,/).pop().trim())) global.data.allThreadID.forEach(i => o.api.sendMessage(r(á.message), i));
}, 1000);
module.exports.run = o => {};