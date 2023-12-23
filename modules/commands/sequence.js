module.exports.config = {
    name: "sequence",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "draff",
    description: "Calculate terms of arithmetic and geometric sequences",
    commandCategory: "educational",
    usePrefix: true,
    usages: "<sequence> find the <term number>th term",
    cooldowns: 5,
};

module.exports.run = function({ api, event, args }) {
    const input = args.join(" ");
    const indexOfFind = input.indexOf("find the");
    if (indexOfFind === -1) {
        return api.sendMessage("⚠️ Invalid format! Use: <sequence> find the <term number>th term", event.threadID);
    }

    const sequenceArgs = input.substring(0, indexOfFind).trim().split(" ");
    const type = sequenceArgs[0].toLowerCase();
    const sequence = sequenceArgs.slice(1).map(parseFloat);

    const termNumber = parseInt(input.substring(indexOfFind + 9).trim());

    if (isNaN(termNumber)) {
        return api.sendMessage("⚠️ Invalid input provided.", event.threadID);
    }

    let resultMessage = "";
    let term = 0;

    if (type === "arithmetic") {
        const commonDifference = sequence[1] - sequence[0];
        term = sequence[0] + (termNumber - 1) * commonDifference;
        resultMessage = `Arithmetic Sequence: ${sequence.join(", ")}\n\n`;
    } else if (type === "geometric") {
        if (sequence[0] === 0) {
            return api.sendMessage("⚠️ The first term of a geometric sequence cannot be 0.", event.threadID);
        }
        const commonRatio = sequence[1] / sequence[0];
        term = sequence[0] * Math.pow(commonRatio, termNumber - 1);
        resultMessage = `Geometric Sequence: ${sequence.join(", ")}\n\n`;
    } else {
        return api.sendMessage("⚠️ Invalid sequence type. Choose 'arithmetic' or 'geometric'.", event.threadID);
    }

    resultMessage += `The ${termNumber}th term is ${term}`;
    api.sendMessage(resultMessage, event.threadID);
};
  