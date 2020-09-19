const { getAccount } = require("./api-files/riot.js");
let summonerName = 'Trieuloo'

module.exports.getMessages = getMessages;
getMessages();
async function getMessages() {
    let gameData = await getAccount(summonerName);

    var WArr = ['Okay, congratulations but when are you gonna be challenger?',
     'Team diff gg','He’s probably carried', 'Trieuly some free elo', 'Dub for the boys']
    var LArr = ['Poopy Woopy, you just lost some LP', 'XDDDDDDDDD ',
     'If you’re subscribed to @~ on twitch, consider refunding =)',
     'Refund that account', 'Boosted or wat?', 'Sadness']
    if (gameData.win) {
        var resultArr = WArr.map(function(x){return x.replace(/~/g, summonerName);});
        //console.log(resultArr)
    }
    else{
        var resultArr = LArr.map(function(x){return x.replace(/~/g, summonerName);});
        //console.log(resultArr) 
}
    const gameStat = Object.entries(gameData)
    //console.log([gameData.gameId, resultArr[Math.floor(Math.random()*resultArr.length)], gameStat[Math.floor(Math.random()*6)+2]]);
    let one = gameData.gameId;
    let two = resultArr[Math.floor(Math.random()*resultArr.length)];
    let three = gameStat;
    var game = [one, two, three];
    return game;
}
