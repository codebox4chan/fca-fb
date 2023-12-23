module.exports.config = {
    name: "powerconvert",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "draff",
    description: "Converts between different units of power",
    commandCategory: "educational",
    usages: "<value> <source unit> to <target unit>",
    usePrefix: true,
    cooldowns: 5,
};

const conversions = {
    "joulepersecond": 1,
    "britishthermalunitpersecond": 1055.06,
    "metrichorsepower": 735.499,
    "kilogrammeterpersecond": 9.80665,
    "kilocaloriepersecond": 4186.8,
    "watt": 1,
    "imperialhorsepower": 745.7,
    "footpoundpersecond": 1.35582,
    "newtonmeterpersecond": 1,
    "kilowatt": 1000,
};

const shortestAbbreviations = {
    "joulepersecond": "J/s",
    "britishthermalunitpersecond": "Btu/s",
    "metrichorsepower": "PS",
    "kilogrammeterpersecond": "kg.m/s",
    "kilocaloriepersecond": "kcal/s",
    "watt": "W",
    "imperialhorsepower": "hp",
    "footpoundpersecond": "ft.lb/s",
    "newtonmeterpersecond": "Nm/s",
    "kilowatt": "kW",
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

    const conversionFactor = conversions[sourceUnitFull || sourceUnit] / conversions[targetUnitFull || targetUnit];
    const convertedValue = value * conversionFactor;

    const sourceAbbreviation = shortestAbbreviations[sourceUnitFull || sourceUnit];
    const targetAbbreviation = shortestAbbreviations[targetUnitFull || targetUnit];

    const computationFormula = `${value} ${sourceAbbreviation || sourceUnitFull} → ${convertedValue.toFixed(6)} ${targetAbbreviation || targetUnitFull}`;
    const resultMessage = `⚙️ 𝗣𝗼𝘄𝗲𝗿 𝗖𝗼𝗻𝘃𝗲𝗿𝘀𝗶𝗼𝗻:\n\n${computationFormula}`;

    api.sendMessage(resultMessage, event.threadID);
};
      