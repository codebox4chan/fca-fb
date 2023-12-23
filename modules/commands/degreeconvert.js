module.exports.config = {
    name: "degreeconvert",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "draff",
    description: "Converts between different units of temperature",
    commandCategory: "educational",
    usages: "<value> <source unit> to <target unit>",
    usePrefix: true,
    cooldowns: 5,
};

const conversions = {
    "rankine": 5/9,
    "degreecelsius": 1,
    "degreereaumur": 5/4,
    "degreefahrenheit": 5/9,
    "kelvin": 1,
};

const shortestAbbreviations = {
    "degreerankine": "°R",
    "degreecelsius": "°C",
    "degreereaumur": "°Re",
    "degreefahrenheit": "°F",
    "kelvin": "K",
};

module.exports.run = function({ api, event, args }) {
    if (args.length !== 4 || args[2].toLowerCase() !== "to") {
        return api.sendMessage("⚠️ Invalid format! Use: <value> <source unit> to <target unit>", event.threadID);
    }

    const value = parseFloat(args[0]);
    if (isNaN(value)) {
        return api.sendMessage("⚠️ Invalid value provided.", event.threadID);
    }

    const sourceUnit = args[1].toLowerCase();
    const targetUnit = args[3].toLowerCase();

    const sourceUnitFull = Object.keys(shortestAbbreviations).find(key => shortestAbbreviations[key] === sourceUnit);
    const targetUnitFull = Object.keys(shortestAbbreviations).find(key => shortestAbbreviations[key] === targetUnit);

    const useSourceUnit = sourceUnitFull || conversions.hasOwnProperty(sourceUnit);
    const useTargetUnit = targetUnitFull || conversions.hasOwnProperty(targetUnit);

    if (!useSourceUnit || !useTargetUnit) {
        return api.sendMessage("⚠️ Invalid units provided.", event.threadID);
    }

    const conversionFactor = conversions[targetUnitFull || targetUnit] / conversions[sourceUnitFull || sourceUnit];
    const convertedValue = value * conversionFactor;

    const sourceAbbreviation = shortestAbbreviations[sourceUnitFull || sourceUnit];
    const targetAbbreviation = shortestAbbreviations[targetUnitFull || targetUnit];

    const computationFormula = `${value}${sourceAbbreviation} → ${convertedValue.toFixed(6)}${targetAbbreviation}`;
    const resultMessage = `🌡️ 𝗗𝗲𝗴𝗿𝗲𝗲 𝗖𝗼𝗻𝘃𝗲𝗿𝘀𝗶𝗼𝗻:\n\n${computationFormula}`;

    api.sendMessage(resultMessage, event.threadID);
};
          