module.exports.config = {
    name: "qrcodev2",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "August Quinn | Original code by Mirai Team",
    description: "Generate QR code from text",
    commandCategory: "image",
    usePrefix: true,
    usages: "[text]",
    cooldowns: 5,
    dependencies: {
        "qrcode": "",
        "fs-extra": ""
    }
};

const colorOptions = {
    red: '#FF0000',
    blue: '#0000FF',
    green: '#00FF00',
    violet: '#EE82EE',
    black: '#000000',
    white: '#FFFFFF',
    yellow: '#FFFF00',
    orange: '#FFA500',
    pink: '#FFC0CB',
    purple: '#800080',
    brown: '#A52A2A',
    gold: '#FFD700',
    silver: '#C0C0C0',
    gray: '#808080',
    cyan: '#00FFFF',
    magenta: '#FF00FF',
    indigo: '#4B0082',
    turquoise: '#40E0D0',
    maroon: '#800000',
    olive: '#808000',
    navy: '#000080',
    teal: '#008080',
    lavender: '#E6E6FA',
    peach: '#FFDAB9',
    coral: '#FF6B6B',
    beige: '#F5F5DC',
    plum: '#DDA0DD',
    orchid: '#DA70D6',
    periwinkle: '#CCCCFF',
    lavenderBlush: '#FFF0F5',
    forestGreen: '#228B22',
    chocolate: '#D2691E',
    crimson: '#DC143C',
    royalBlue: '#4169E1',
    slateGray: '#708090',
    darkSlateGray: '#2F4F4F',
    aqua: '#00FFFF',
    steelBlue: '#4682B4',
    mediumOrchid: '#BA55D3',
    darkOrange: '#FF8C00',
    firebrick: '#B22222',
    hotPink: '#FF69B4',
    tomato: '#FF6347',
    mediumSpringGreen: '#00FA9A',
    darkOliveGreen: '#556B2F',
    chartreuse: '#7FFF00',
    deepSkyBlue: '#00BFFF',
    darkViolet: '#9400D3',
    darkRed: '#8B0000',
    darkMagenta: '#8B008B',
    mediumBlue: '#0000CD',
    midnightBlue: '#191970',
    darkCyan: '#008B8B',
    cadetBlue: '#5F9EA0',
    darkGoldenrod: '#B8860B',
    oliveDrab: '#6B8E23',
    saddleBrown: '#8B4513',
    forestGreen: '#228B22',
    darkSlateBlue: '#483D8B',
    darkSlateGrey: '#2F4F4F',
    mediumSeaGreen: '#3CB371',
    limeGreen: '#32CD32',
    royalBlue: '#4169E1',
    purple: '#800080',
    rosyBrown: '#BC8F8F',
    sienna: '#A0522D',
    lightCoral: '#F08080',
    lightSalmon: '#FFA07A',
    lightSkyBlue: '#87CEFA',
    lightSteelBlue: '#B0C4DE',
    darkKhaki: '#BDB76B',
    mediumPurple: '#9370DB',
    mediumVioletRed: '#C71585',
    peru: '#CD853F',
    slateBlue: '#6A5ACD',
    yellowGreen: '#9ACD32',
    papayaWhip: '#FFEFD5',
    deepPink: '#FF1493',
    aquamarine: '#7FFFD4',
    paleVioletRed: '#DB7093',
    darkSeaGreen: '#8FBC8F',
    lightGreen: '#90EE90',
    burlyWood: '#DEB887',
    lavender: '#E6E6FA',
    powderBlue: '#B0E0E6',
    lightPink: '#FFB6C1',
    mistyRose: '#FFE4E1',
    seashell: '#FFF5EE',
    oldLace: '#FDF5E6',
    cornsilk: '#FFF8DC',
};

module.exports.run = async function({ api, event, args }) {
    const { createReadStream, unlinkSync } = global.nodemodule["fs-extra"];
    
    if (args.length === 0) {
        const text = args.join(" ");
        if (!text) {
            return api.sendMessage("Please enter the text you want to encode into a QR code.", event.threadID, event.messageID);
        }

        const options = {
            errorCorrectionLevel: 'H',
            type: 'image/png',
            quality: 0.3,
            scale: 50,
            margin: 1,
            color: {
                dark: colorOptions.black,
                light: '#ffffff'
            }
        };
        api.sendTypingIndicator(event.threadID, () => global.nodemodule["qrcode"].toFile(__dirname + '/cache/qr.png', text, options, (err) => {
            if (err) return err;
            api.sendMessage({
                attachment: createReadStream(__dirname + '/cache/qr.png')
            }, event.threadID, () => {
                unlinkSync(__dirname + '/cache/qr.png');
            }, event.messageID);
        }));
    } else if (args[0].toLowerCase() === 'list') {
        const colorList = Object.keys(colorOptions).map(color => `• ${color}: ${colorOptions[color]}`).join('\n');
        api.sendMessage(`Available colors:\n${colorList}`, event.threadID, event.messageID);
    } else if (args.length === 1) {
        api.sendMessage("Please use the '-' separator to specify the color. Example: /qrcode red - [text]", event.threadID, event.messageID);
    } else if (colorOptions[args[0].toLowerCase()] && args[1] === '-') {
        const color = colorOptions[args[0].toLowerCase()];
        const text = args.slice(2).join(" ");
        
        if (!text) {
            return api.sendMessage("Please enter the text you want to encode into a QR code.", event.threadID, event.messageID);
        }

        const options = {
            errorCorrectionLevel: 'H',
            type: 'image/png',
            quality: 0.3,
            scale: 50,
            margin: 1,
            color: {
                dark: color,
                light: '#ffffff'
            }
        };

        api.sendTypingIndicator(event.threadID, () => global.nodemodule["qrcode"].toFile(__dirname + '/cache/qr.png', text, options, (err) => {
            if (err) return err;
            api.sendMessage({
                attachment: createReadStream(__dirname + '/cache/qr.png')
            }, event.threadID, () => {
                unlinkSync(__dirname + '/cache/qr.png');
            }, event.messageID);
        }));
    } else {
        api.sendMessage("Invalid input. Please use the '-' separator to specify the color. Example: /qrcode red - [text]", event.threadID, event.messageID);
    }
    }
              