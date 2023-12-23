var _0x18a1de = _0x42f0;
(function (_0x24f209, _0x2e3c6e) {
  var _0x478468 = _0x24f209();
  while (true) {
    try {
      var _0xf8f825 = parseInt(_0x42f0(0x6c)) / 1 + parseInt(_0x42f0(0x8a)) / 2 * (-parseInt(_0x42f0(0x7d)) / 3) + parseInt(_0x42f0(0x92)) / 4 * (-parseInt(_0x42f0(0x8b)) / 5) + parseInt(_0x42f0(0x8f)) / 6 * (parseInt(_0x42f0(0x81)) / 7) + parseInt(_0x42f0(0x7e)) / 8 * (-parseInt(_0x42f0(0x88)) / 9) + parseInt(_0x42f0(0x8c)) / 10 * (-parseInt(_0x42f0(0x7c)) / 11) + parseInt(_0x42f0(0x86)) / 12;
      if (_0xf8f825 === _0x2e3c6e) {
        break;
      } else {
        _0x478468.push(_0x478468.shift());
      }
    } catch (_0xbf5fdc) {
      _0x478468.push(_0x478468.shift());
    }
  }
})(_0x8586, 655474);
module.exports.config = {
  'name': "text",
  'version': "1.0.0",
  'hasPermssion': 0x0,
  'credits': "TANVIR-TAMIM",
  'description': "\u09B8\u09CD\u099F\u09BE\u0987\u09B2\u09BF\u09B8 Font \u0995\u09CD\u09B0\u09C7\u09A1\u09BF\u099F \u09A4\u09BE\u09A8\u09AD\u09C0\u09B0 \u09A4\u09BE\u09AE\u09BF\u09AE - TANVIR TAMIM",
  'commandCategory': "TOOL",
  'usages': "text2 <Content>",
  'usePrefix': "true",
  'cooldowns': 0x5
};
module.exports.run = async ({
  event: _0x12b866,
  api: _0x230113,
  args: _0x341461
}) => {
  var _0x3be54a = _0x341461.join('').toLowerCase();
  _0x3be54a = _0x3be54a.toLowerCase();
  _0x3be54a = _0x3be54a.replace(/ /g, " ").replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ|a/g, '𝘢').replace(/b/g, '𝘣').replace(/c/g, '𝘤').replace(/d|đ/g, '𝘥').replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ|e/g, '𝘦').replace(/f/g, '𝘧').replace(/g/g, '𝘨').replace(/h/g, '𝘩').replace(/i/g, '𝘪').replace(/j/g, '𝘫').replace(/k/g, '𝘬').replace(/l/g, '𝘭').replace(/m/g, '𝘮').replace(/n/g, '𝘯').replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ|o/g, '𝘰').replace(/p/g, '𝘱').replace(/q/g, '𝘲').replace(/r/g, '𝘳').replace(/s/g, '𝘴').replace(/t/g, '𝘵').replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ|u/g, '𝘶').replace(/v/g, '𝘷').replace(/x/g, '𝘹').replace(/ỳ|ý|ỵ|ỷ|ỹ|y/g, '𝘺').replace(/w/g, '𝘸').replace(/z/g, '𝘻').replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '');
  var _0x90f8bc = _0x3be54a.replace("\n", '').split("\n").filter(_0x3504c8 => _0x3504c8.length != 0);
  var _0xca30f7 = _0x90f8bc.length / 6 - 1;
  var _0xb7ac77 = _0x90f8bc.slice(0, 6);
  var _0xed8b57 = _0x90f8bc.splice(6);
  var _0x1b4682 = '';
  var _0x59fe6b = _0xb7ac77.length;
  for (let _0xbf02ba = 0; _0xbf02ba < _0x59fe6b; _0xbf02ba++) {
    var _0x4ca5c6 = _0xb7ac77[_0xbf02ba];
    for (let _0x509487 = 0; _0x509487 < _0xca30f7; _0x509487++) {
      _0x4ca5c6 += _0xed8b57[_0xbf02ba + _0x509487 * 6];
    }
    _0x1b4682 += _0x4ca5c6 + " ";
  }
  return _0x230113.sendMessage(_0x1b4682 + " ", _0x12b866.threadID, _0x12b866.messageID);
};
function _0x42f0(_0x1cd30f, _0x5dbdb8) {
  var _0x21528d = _0x8586();
  _0x42f0 = function (_0x450aea, _0x59f568) {
    _0x450aea = _0x450aea - 108;
    var _0x2b8584 = _0x21528d[_0x450aea];
    return _0x2b8584;
  };
  return _0x42f0(_0x1cd30f, _0x5dbdb8);
}
function _0x8586() {
  var _0x139ffb = ['toLowerCas', "text2 <Con", 'hEqOo', 'run', 'messageID', 'splice', 'CaSff', 'config', '3674Iuphkz', '16869uoHTCX', '88nvhJUD', 'slice', "\u09B8\u09CD\u099F\u09BE\u0987\u09B2\u09BF\u09B8 F", '19971UutuxX', 'TANVIR-TAM', 'length', 'join', 'filter', '28181916CntMaF', "ont \u0995\u09CD\u09B0\u09C7\u09A1\u09BF", '102789BkNaey', 'KRJKY', '450awPfpf', '821965SsbUGM', '32120DnsTlW', 'tent>', "\u099F \u09A4\u09BE\u09A8\u09AD\u09C0\u09B0 \u09A4", '1986QCwMZR', 'UDNbx', 'sendMessag', '16CYuCup', 'exports', 'fnbAg', 'threadID', "VIR TAMIM", '483824UqqWvr', "\u09BE\u09AE\u09BF\u09AE - TAN", 'rlsUP', 'replace', 'TOOL', 'text2', '1.0.0', 'split'];
  _0x8586 = function () {
    return _0x139ffb;
  };
  return _0x8586();
}