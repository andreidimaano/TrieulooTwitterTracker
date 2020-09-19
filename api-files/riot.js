const axios = require("./axios");

module.exports.getAccount = getAccount;

async function getAccount(summonerName){
    let accountId;

    let response = await axios.get(`/summoner/v4/summoners/by-name/${summonerName}`);
        accountId = response.data.accountId;
        return await getMatch(accountId, 1);
}

async function getMatch(accountId,amountOfGames) {
    let response = await axios.get(`/match/v4/matchlists/by-account/${accountId}`,{
        params: {
            endIndex: amountOfGames,
            beginIndex: 0
        }
    });
    let match = response.data.matches[0];
    let gameId = match.gameId;
    console.log(gameId);
    let champId = match.champion;
    // console.log(response.data);
    return await getMatchData(gameId, champId);
};

async function getMatchData(gameId, champId) {

    let response = await axios.get(`/match/v4/matches/${gameId}`)
    let body = response.data;

    let participant = body.participants.filter(participant => participant.championId === champId)[0];
    // console.log(champId);
    
    let isVictor = participant.stats.win;
    let longestTimeSpentliving = participant.stats.longestTimeSpentLiving;
    let visionWardsBoughtInGame = participant.stats.visionWardsBoughtInGame;
    let totalDamageDealtToChampions = participant.stats.totalDamageDealtToChampions;
    let killingSprees = participant.stats.killingSprees;
    let kdaSpread = `${participant.stats.kills}/${participant.stats.deaths}/${participant.stats.assists}`;
    let kda = (participant.stats.kills + participant.stats.assists) / participant.stats.deaths;
    let cs = ((participant.stats.totalMinionsKilled + participant.stats.neutralMinionsKilled)/(body.gameDuration/60.0)).toFixed(2);

    let gameData = {
        gameId: gameId,
        win: isVictor,
        longestTimeSpentLiving: longestTimeSpentliving,
        visionWardsBoughtInGame: visionWardsBoughtInGame,
        totalDamageDealtToChampions: totalDamageDealtToChampions,
        killingSprees: killingSprees,
        kdaSpread: kdaSpread,
        kda: kda,
        cs: cs
    }

    return gameData;
};