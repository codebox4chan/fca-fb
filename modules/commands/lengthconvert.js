module.exports.config = {
    name: "lengthconvert",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "draff",
    description: "Converts between different units of length",
    commandCategory: "educational",
    usages: "<value> <source unit> to <target unit>",
    usePrefix: true,
    cooldowns: 5,
};

const conversions = {
    "decimeter": 0.1,
    "lightyear": 9460730472580800,
    "millimeter": 0.001,
    "kilometer": 1000,
    "centimeter": 0.01,
    "meter": 1,
    "micrometer": 0.000001,
    "parsec": 30856780000000000,
    "astronomicalunit": 149597870700,
    "lunardistance": 384400000,
    "picometer": 0.000000000001,
    "nanometer": 0.000000001,
    "furlong": 201.168,
    "fathom": 1.8288,
    "yard": 0.9144,
    "nauticalmile": 1852,
    "foot": 0.3048,
    "mile": 1609.34,
    "inch": 0.0254,
};

const shortestAbbreviations = {
    "decimeter": "dm",
    "lightyear": "ly",
    "millimeter": "mm",
    "kilometer": "km",
    "centimeter": "cm",
    "meter": "m",
    "micrometer": "μm",
    "parsec": "pc",
    "astronomicalunit": "AU",
    "lunardistance": "LD",
    "picometer": "pm",
    "nanometer": "nm",
    "furlong": "fur",
    "fathom": "fth",
    "yard": "yd",
    "nauticalmile": "nmi",
    "foot": "ft",
    "mile": "mi",
    "inch": "in",
};

module.exports.run = function({ api, event, args }) {
    if (args.length !== 4 || args[2].toLowerCase() !== "to") {
        return api.sendMessage("⚠️ 𝗜𝗻𝘃𝗮𝗹𝗶𝗱 𝗳𝗼𝗿𝗺𝗮𝘁! 𝗨𝘀𝗲: <𝘃𝗮𝗹𝘂𝗲> <𝘀𝗼𝘂𝗿𝗰𝗲 𝘂𝗻𝗶𝘁> 𝘁𝗼 <𝘁𝗮𝗿𝗴𝗲𝘁 𝘂𝗻𝗶𝘁>", event.threadID);
    }

    const value = parseFloat(args[0]);
    if (isNaN(value)) {
        return api.sendMessage("⚠️ Invalid value provided.", event.threadID);
    }

    const sourceUnit = args[1].toLowerCase();
    const targetUnit = args[3].toLowerCase();

    // Check if provided units are short abbreviations
    const sourceUnitFull = Object.keys(shortestAbbreviations).find(key => shortestAbbreviations[key] === sourceUnit);
    const targetUnitFull = Object.keys(shortestAbbreviations).find(key => shortestAbbreviations[key] === targetUnit);

    const useSourceUnit = sourceUnitFull || conversions.hasOwnProperty(sourceUnit);
    const useTargetUnit = targetUnitFull || conversions.hasOwnProperty(targetUnit);

    if (!useSourceUnit || !useTargetUnit) {
        return api.sendMessage("⚠️ Invalid units provided.", event.threadID);
    }

    const convertedValue = value * (conversions[sourceUnitFull || sourceUnit] / conversions[targetUnitFull || targetUnit]);
    const sourceAbbreviation = shortestAbbreviations[sourceUnitFull || sourceUnit];
    const targetAbbreviation = shortestAbbreviations[targetUnitFull || targetUnit];

    const computationFormula = `: ̗̀➛ ${value} ${sourceAbbreviation || sourceUnitFull} (${conversions[sourceUnitFull || sourceUnit]} / ${conversions[targetUnitFull || targetUnit]}) = ${convertedValue} ${targetAbbreviation || targetUnitFull}`;

    const message = `📏 𝗖𝗼𝗻𝘃𝗲𝗿𝘀𝗶𝗼𝗻:\n\n${computationFormula}\n\n𝗥𝗲𝘀𝘂𝗹𝘁:${value} ${sourceAbbreviation || sourceUnitFull} 𝗶𝘀 𝗮𝗽𝗽𝗿𝗼𝘅𝗶𝗺𝗮𝘁𝗲𝗹𝘆  ${convertedValue} ${targetAbbreviation || targetUnitFull}`;
    api.sendMessage(message, event.threadID);
};
