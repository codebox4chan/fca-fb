module.exports.config = {
    name: "sendmail",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "ShinTHL09/azriel",
    description: "Send Mail",
    commandCategory: "admin",
    usePrefix: true,
    usages: "<mail | title | content>",
    cooldowns: 5,
    dependencies: { }
    //install nodemailer: npm install --save express nodemailer
}
module.exports.run = async function({ api, args, Users, event}) {
  const adminEmail = '';// input mail
  const adminPassword = ''; // input mailpass
  const mailHost = 'smtp.gmail.com';
  const mailPort = 465;
    const { threadID, messageID } = event;
    const str = args.join(' '),
      arr = str.split('|'),
mail = arr[0].trim(),
tiêuĐề = arr[1].trim(),
nộiDung = arr[2].trim();
    if(!mail || !tiêuĐề || !nộiDung) return api.sendMessage(`Please enter the correct format: mail | Title | content`, event.threadID, event.messageID);
    const subject = tiêuĐề.replace(/\\n/g, "<br>").replace(/\/n/g, "<br>").replace(/\-/g, "|");
    const content = nộiDung.replace(/\\n/g, "<br>").replace(/\/n/g, "<br>").replace(/\-/g, "|");
    const htmlContent = `<h1> ${content} </h1>`
    send(mail, subject, htmlContent, adminEmail, adminPassword, mailHost, mailPort);
    api.sendMessage(`====== [ 𝗦𝗨𝗖𝗖𝗘𝗦𝗦𝗙𝗨𝗟 ] ======\n━━━━━━━━━━━━━━━━━━━━━\n👤FROM \n┡ ${adminEmail}\n│\n┟ 👥 TO \n${mail}\n━━━━━━━━━━━━━━━━━━━━━━━\n🗣️ TITLE ► ${subject}\n\n CONTENT ► ${content}\n📃⚙️ Html: ${htmlContent}\n===========================`, threadID, messageID);
}
function send(to, subject, htmlContent, adminEmail, adminPassword, mailHost, mailPort) {
 const nodeMailer = require('nodemailer');
 const transporter = nodeMailer.createTransport({
     host: mailHost,
     port: mailPort,
     secure: true,
     auth: {
       user: adminEmail,
       pass: adminPassword
     }
   })
   const options = {
     from: adminEmail, 
     to: `${to}`, 
     subject: `${subject}`, 
     html: `${htmlContent}` 
   }
   return transporter.sendMail(options)
}