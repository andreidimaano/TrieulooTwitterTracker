const axios = require("./axios");

getAccount("Trieuloo");

var gameId;

function getAccount(summonerName){
    
    axios.get(`/summoner/v4/summoners/by-name/${summonerName}`)
    .then((response) => {
        const accountId = response.data.accountId;
        // console.log(response.data.accountId);
        getMatch(accountId, 1);
    })
    .catch((error) => {
        console.log(error);
    })

}

function getMatch(accountId,amountOfGames) {
    axios.get(`/match/v4/matchlists/by-account/${accountId}`,{
        params: {
            endIndex: amountOfGames,
            beginIndex: 0
        }
    })
    .then((response) => {
        const match = response.data.matches[0];
        gameId = match.gameId;
        const champId = match.champion;
        // console.log(response.data);
        getMatchData(gameId, champId);
    })
    .catch((error) => {
        console.log(error);
    });
};

function getMatchData(gameId, champId) {

    axios.get(`/match/v4/matches/${gameId}`)
    .then((response) => {
        const body = response.data;

        const participant = body.participants.filter(participant => participant.championId === champId);

        if(participant[0].stats.win == true){
            console.log("Okay good job, you won but when will you hit challenger lol.");
        } else {
            console.log("XDDDDDDDDD. What else could I have expected.")
        }
    })
    .catch((error) => {
        console.log(error);
    });

};