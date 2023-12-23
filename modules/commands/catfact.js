const axios = require('axios'),
  fs = require('fs'),
  path = require('path')
module.exports.config = {
  name: 'catfact',
  version: '1.0.1',
  hasPermssion: 0,
  credits: 'RICKCIEL',
  usePrefix: false,
  description: 'Retrieve a random cat fact and image.',
  commandCategory: 'fun',
  usages: "",
  cooldowns: 5,
}
const CAT_FACT_API = 'https://catfact.ninja/fact',
  CAT_IMAGE_URLS = [
    'https://example.com/cat-image1.jpg',
    'https://images.pexels.com/photos/1643457/pexels-photo-1643457.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/2173872/pexels-photo-2173872.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/1317844/pexels-photo-1317844.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/384555/pexels-photo-384555.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/866496/pexels-photo-866496.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/2113332/pexels-photo-2113332.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/3257811/pexels-photo-3257811.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/3643714/pexels-photo-3643714.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/6897077/pexels-photo-6897077.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/6869655/pexels-photo-6869655.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/7410722/pexels-photo-7410722.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&w=1600',
  ]
module.exports.run = async ({ api: _0x4e27b1, event: _0x94ab15 }) => {
  try {
    const _0x4bc292 = await axios.get(CAT_FACT_API),
      _0x47e6b4 = _0x4bc292.data.fact,
      _0x2a2471 =
        CAT_IMAGE_URLS[Math.floor(Math.random() * CAT_IMAGE_URLS.length)],
      _0x18141a = await axios.get(_0x2a2471, { responseType: 'arraybuffer' }),
      _0x108797 = _0x18141a.data,
      _0x57bf18 = path.join(__dirname, 'cache')
    !fs.existsSync(_0x57bf18) && fs.mkdirSync(_0x57bf18)
    const _0x514db8 = path.join(_0x57bf18, 'cat-image.jpg')
    fs.writeFileSync(_0x514db8, _0x108797)
    _0x4e27b1.sendMessage(_0x47e6b4, _0x94ab15.threadID)
    _0x4e27b1.sendMessage(
      { attachment: fs.createReadStream(_0x514db8) },
      _0x94ab15.threadID
    )
  } catch (_0x8ad883) {
    console.error(_0x8ad883)
    _0x4e27b1.sendMessage(
      'Failed to fetch a cat fact and image. Please try again later.',
      _0x94ab15.threadID
    )
  }
}