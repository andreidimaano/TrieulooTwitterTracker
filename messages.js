const { getAccount } = require("./api-files/riot.js");
const { winMessages, loseMessages} = require("./components/tweetMessage.js");
let summonerName = 'Trieuloo'

module.exports.getMessage = getMessage;
async function getMessage() {
    let gameData = await getAccount(summonerName);
    let message;

    //depending on win or lose, append string message
    if (gameData.win) {
        message += winMessages[Math.floor(Math.random() * winMessages.length)];
        message += "\n Congrats on Winning! Maybe you might actually hit challenger this season =) \n";
    } else {
        message += loseMessages[Math.floor(Math.floor(Math.random() * loseMessages.length))];
        message += "\n Congrats on Losing! Make sure you don't tilt to D1 again =) \n";
    }

    const gameStat = Object.entries(gameData)
    let one = gameData.gameId;
    let two = resultArr[Math.floor(Math.random()*resultArr.length)];
    for (i in gameStat){
        var camel = gameStat[i][0].replace(/([A-Z])+/g, " $1");
        var normal = camel.charAt(0).toUpperCase() + camel.slice(1);
        gameStat[i][0] = normal
    }
    let three = gameStat;
    var game = [one, two, three];
    return game;
}

/*


*/
