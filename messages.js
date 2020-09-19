const { getAccount } = require("./api-files/riot.js");
const { winMessages, loseMessages} = require("./components/tweetMessage.js");
let summonerName = 'Trieuloo'

module.exports.getMessage = getMessage;
async function getMessage() {
    let gameData = await getAccount(summonerName);
    let message;

    //depending on win or lose, append string message
    if (gameData.win) {
        message = winMessages[Math.floor(Math.random() * winMessages.length)];
        message += "\n\nCongrats on Winning! Maybe you might actually hit challenger this season =) \n\n";
    } else {
        message = loseMessages[Math.floor(Math.floor(Math.random() * loseMessages.length))];
        message += "\n\nCongrats on Losing! Make sure you don't tilt to D1 again =) \n\n";
    }

    const gameStat = Object.entries(gameData)
    let gameId = gameData.gameId;
    for (i in gameStat){
        var camel = gameStat[i][0].replace(/([A-Z])+/g, " $1");
        var normal = camel.charAt(0).toUpperCase() + camel.slice(1);
        gameStat[i][0] = normal
    }
    for(i = 2; i < 9; i++) {
        if(i === 6) {
            message +=  "KDA: " + gameStat[6][1] + " (" + gameStat[7][1] + ")" + "\n";
        }
        else if(i === 7) {
            continue;
        }
        else {
            message += gameStat[i][0] + ": " + gameStat[i][1] + "\n";
        }
    }
    var messageData = {
        gameId: gameId,
        message: message
    };
    return messageData;
}

