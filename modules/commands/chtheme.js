module.exports.config = {
    name: 'chtheme',
    version: "2.0.8",
    hasPermssion: 0,
    credits: "KC/Raito",
    description: "Change theme",
    usePrefix: true,
    commandCategory: "system",
    usages: '[theme]\ntheme list:\ndefault, hotpink, aquablue, brightpurple, coralpink, orange, green, lavanderpurple, red, yellow, tealblue, aqua, mango, berry, citrus',
    cooldowns: 0
}

module.exports.run = function({api, event, args})
{
    color_obj = {
        "default": "196241301102133",
        "hotpink": "169463077092846",
        "aquablue": "2442142322678320",
        "brightpurple": "234137870477637",
        "coralpink": "980963458735625",
        "orange": "175615189761153",
        "green": "2136751179887052",
        "lavenderpurple": "2058653964378557",
        "red": "2129984390566328",
        "yellow": "174636906462322",
        "tealblue": "1928399724138152",
        "aqua": "417639218648241",
        "mango": "930060997172551",
        "berry": "164535220883264",
        "citrus": "370940413392601"
      }

      const response = args.join(" ")
      const {threadID} = event
      for(let color in color_obj){
        if(color === response){
            var colorname = color_obj[color]
            
        }
      }

      if (colorname != undefined){
        api.changeThreadColor(colorname, threadID, (err) => {
            if (err) return console.error(err);
          })
      }

    }