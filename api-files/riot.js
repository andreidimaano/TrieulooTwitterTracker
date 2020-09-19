const axios = require("./axios");

getAccount("Trieuloo");

function getAccount(summonerName){
    let accountId;

    axios.get(`/summoner/v4/summoners/by-name/${summonerName}`)
    .then((response) => {
        accountId = response.data.accountId;
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
        const gameId = match.gameId;
        // console.log(gameId);
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

        const participant = body.participants.filter(participant => participant.championId === champId)[0];
        // console.log(champId);

        const isVictor = participant.stats.win;
        const longestTimeSpentliving = participant.stats.longestTimeSpentLiving;
        const visionWardsBoughtInGame = participant.stats.visionWardsBoughtInGame;
        const totalDamageDealtToChampions = participant.stats.totalDamageDealtToChampions;
        const killingSprees = participant.stats.killingSprees;
        const kda = (participant.stats.kills + participant.stats.assists) / participant.stats.deaths;
        const deaths = participant.stats.deaths;
        const cs = (participant.stats.totalMinionsKilled + participant.stats.neutralMinionsKilled)/(body.gameDuration/60.0);

        const gameData = {
            gameId: gameId,
            win: isVictor,
            longestTimeSpentliving: longestTimeSpentliving,
            visionWardsBoughtInGame: visionWardsBoughtInGame,
            totalDamageDealtToChampions: totalDamageDealtToChampions,
            killingSprees: killingSprees,
            kda: kda,
            deaths: deaths,
            cs: cs
        }

        console.log(gameData);


        //i want to export gameData
        // return gameData;
    })
    .catch((error) => {
        console.log(error);
    });

};