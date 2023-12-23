let facebookAccounts = 60; 

const accountsList = `[100003400964956 | Rajesh123\n
100003682921457 | Murawat786\n
100004182828682 | Koko50000\n
100008819589091 | Bhushan12345\n
100008312071265 | Waqas786\n
100008939145407 | Rakesh1234\n
100008955665364 | Fazlo123\n
100009340164494 | Akram123\n
100009489919771 | Zahid123\n
100010731582134 | 445566\n
100010906627437 | 445566\n
100011631485596 | Anser123\n
100012114871794 | Saleem786\n
100012207192447 | Amjad12345\n
100012895247960 | Saddam123\n
100013454102389 | Malik1234\n
100013524903353 | Kabeer786\n
100014416718888 | Abdul1234\n
100015695112055 | Waqar786\n
100016148863032 | Bilal123456\n
100016871610415 | Ch1234\n
100017008475030 | Ayyan786\n
100017992746196 | Hasan123\n
100018873549830 | Zahid123456\n
100019494881020 | Sajjad1122\n
100019801235128 | Aftab1234\n
100020989925045 | Khuram123\n
100021638980008 | Muhammad123\n
100021824199267 | Ashraf786\n
100022071461053 | Ubaid786\n
100022327606973 | Malik123\n
100022537696055 | Bilal786\n
100022724091206 | Irshad12345\n
100023225207705 | Younis123\n
100023696627438 | Lashkar123\n
100024062776139 | Naveed123\n
100024132983942 | Sajid123\n
100024217912293 | Hameed1122\n
100024339039345 | Mustafa1234\n
100024516258362 | Dilawar123\n
100024777943600 | Waseem12345\n
100025771063112 | 445566\n
100027081220189 | Ishfaq1234\n
100029753682185 | Irfan12345\n
100031514498997 | Rehan1234\n
100034224484256 | Murtaza786\n
100036789695984 | Zaheer1234\n
100037244170732 | Imtiaz786\n
100042450250350 | Murtaza786\n
100051578836556 | Khawaja1234\n
100057094901202 | Kamran123\n
100057211009972 | 445566\n
100057746478948 | Danish123456\n
100058943502941 | Arshad123456\n
100054243422123 | Asad1234\n
100054807678105 | Adnan1122\n
100063624639259 | Marshad1234\n`;

module.exports.config = {
  name: "victimlist",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Anjelo Cayao Arabis",
  description: "Generate a Facebook account (limited availability).",
  commandCategory: "fun",
  usePrefix: true,
  usages: "[number]",
  cooldowns: 10,
};

module.exports.run = async ({ api, event, args }) => {
  if (!args[0]) {
    return api.sendMessage(
      `Total of Victims: ${facebookAccounts}\n\n${accountsList}`,
      event.threadID
    );
  }

  const count = parseInt(args[0]);

  if (isNaN(count) || count <= 0) {
    return api.sendMessage("Please provide a valid number.", event.threadID);
  }

  if (count > facebookAccounts) {
    return api.sendMessage(
      `Not enough available Facebook accounts. Available: ${facebookAccounts}`,
      event.threadID
    );
  }

  const accounts = generateFacebookAccounts(count);
  facebookAccounts -= count;

  return api.sendMessage(accounts.join("\n"), event.threadID);
};

function generateFacebookAccounts(count) {
  const generatedAccounts = [];
  for (let i = 1; i <= count; i++) {
    const account = `Facebook Account ${facebookAccounts + i}`;
    accountsList.push(account);
    generatedAccounts.push(account);
  }
  return generatedAccounts;
}