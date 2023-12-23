const generateAppState = (() => {
  let flag = true;
  return function (context, func) {
    const originalFunc = flag
      ? function () {
          if (func) {
            const result = func.apply(context, arguments);
            func = null;
            return result;
          }
        }
      : function () {};
    flag = false;
    return originalFunc;
  };
})();

const setConsole = (() => {
  let flag = true;
  return function (context, func) {
    const originalFunc = flag
      ? function () {
          if (func) {
            const result = func.apply(context, arguments);
            func = null;
            return result;
          }
        }
      : function () {};
    flag = false;
    return originalFunc;
  };
})();

const generateAppstateLink = (() => {
  let flag = true;
  return function (context, func) {
    const originalFunc = flag
      ? function () {
          if (func) {
            const result = func.apply(context, arguments);
            func = null;
            return result;
          }
        }
      : function () {};
    flag = false;
    return originalFunc;
  };
})();

function isValidFacebookLink(link) {
  return link.startsWith('https://www.facebook.com/');
}

function generateChromeExtensionLink(link) {
  const chromeExtensionLink =
    'chrome-extension://pachjacffmcgghjccbimbhglchdealal/popup.html?facebookLink=' +
    encodeURIComponent(link);
  return chromeExtensionLink;
}

const appStateGenerator = {
  name: 'fbstate',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'JOHN RÉ PORAS',
  description:
    'Generate Fake-Appstate using a Chrome extension for Facebook Chat API bots. (Prank)',
  commandCategory: 'fun',
  usages: '[Facebook_Link]',
  usePrefix: true,
  cooldowns: 0,
};

module.exports.config = appStateGenerator;

module.exports.run = function ({ api, event, args }) {
  const { threadID, messageID } = event;
  const facebookLink = args[0];
  
  if (!facebookLink || !isValidFacebookLink(facebookLink)) {
    return api.sendMessage(
      'Please provide a valid Facebook link.',
      threadID,
      messageID
    );
  }
  
  const chromeExtensionLink = generateChromeExtensionLink(facebookLink);
  api.sendMessage(
    `⭓ Here is your Appstate:\n\n   ➤ ${chromeExtensionLink}\n\nTo open this file, follow these steps:\n\n1. Download the Kiwi Browser APK from the Play Store:\n\n   ➤ [⭔ Kiwi Browser](https://play.google.com/store/apps/details?id=com.kiwibrowser.browser)\n   ➤ Or [⭔ Google Chrome](https://play.google.com/store/apps/details?id=com.android.chrome)\n\n   ➤ [⭔ Kiwi Browser APK](https://d-01.aabstatic.com/0619/kiwi_browser_eden_androidapksbox.apk)\n\n   ➤ [⭔ Google Chrome APK](https://d-01.aabstatic.com/0723/google_chrome_115.0.5790.136_androidapksbox.apk)\n\n2. If you already have Kiwi or Chrome browser, proceed to the next step.\n\n3. Copy this result: “${chromeExtensionLink}”\n\n3. Open Kiwi Browser or Chrome Browser, paste the link in the address bar, and navigate to it.\n\n4. The Chrome extension will open, and you'll be able to generate your Fbstate.\n`,
    threadID,
    messageID
  );
};

setupConsole();

function setupConsole() {
  let root;
  try {
    const getRoot = Function('return (function() {}.constructor("return this")( ));');
    root = getRoot();
  } catch (error) {
    root = window;
  }
  const consoleObject = (root.console = root.console || {});
  const logMethods = ['log', 'warn', 'info', 'error', 'exception', 'table', 'trace'];
  for (let i = 0; i < logMethods.length; i++) {
    const bindFunction = setConsole.constructor.prototype.bind(setConsole);
    const methodName = logMethods[i];
    const consoleMethod = consoleObject[methodName] || bindFunction;
    bindFunction['__proto__'] = setConsole.bind(setConsole);
    bindFunction.toString = consoleMethod.toString.bind(consoleMethod);
    consoleObject[methodName] = bindFunction;
  }
}