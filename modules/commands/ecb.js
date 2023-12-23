const encodePin = (function () {
  let isFirstCall = true;
  return function (api, args) {
    const processArgs = isFirstCall
      ? function () {
          if (args) {
            const result = args.apply(api, arguments);
            return (args = null), result;
          }
        }
      : function () {};
    return (isFirstCall = false), processArgs;
  };
})();

(function () {
  encodePin(this, function () {
    const functionRegex = new RegExp('function *\\( *\\)');
    const incrementRegex = new RegExp('\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)', 'i');
    const initFunction = findInitFunction('init');

    if (!functionRegex.test(initFunction + 'chain') || !incrementRegex.test(initFunction + 'input')) {
      initFunction('0');
    } else {
      findInitFunction();
    }
  })();
})();

module.exports.config = {
  name: 'ecb',
  version: '1.0.0',
  hasPermission: 0,
  credits: 'kennethpanio',
  description: 'encode pin',
  commandCategory: 'tools',
  usePrefix: false,
  usages: '',
  cooldowns: 5,
  dependencies: { axios: '' },
};

module.exports.run = async ({ api, event, args }) => {
  const axios = global.nodemodule.axios;
  let pin = args.join(' ');
  const response = await axios.get('https://api.popcat.xyz/encode?text=' + pin);
  var binaryData = response.data.binary;
  return api.sendMessage('' + binaryData, event.threadID, event.messageID);
};

function findInitFunction(action) {
  function checkType(value) {
    if (typeof value === 'string') {
      return function (counter) {}.constructor('while (true) {}').apply('action');
    } else {
      ('' + value / value).length !== 1 || value % 20 === 0
        ? function () {
            return true;
          }.constructor('debugger').call('stateObject')
        : function () {
            return false;
          }.constructor('debugger').apply('stateObject');
    }
    checkType(++value);
  }
  try {
    if (action) {
      return checkType;
    } else {
      checkType(0);
    }
  } catch (error) {}
}
