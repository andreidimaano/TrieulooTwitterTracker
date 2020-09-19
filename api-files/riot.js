const axios = require("./axios");

module.exports.getAccount = getAccount;

async function getAccount(summonerName){
    let response = await axios.get(`/summoner/v4/summoners/by-name/${summonerName}`);
    let accountId = response.data.accountId;
    let summonerId = response.data.id;
    return await getMatch(accountId, summonerId, 1);
}

async function getMatch(accountId, summonerId, amountOfGames) {
    let response = await axios.get(`/match/v4/matchlists/by-account/${accountId}`,{
        params: {
            endIndex: amountOfGames,
            beginIndex: 0
        }
    });
    
    let match = response.data.matches[0];
    let gameId = match.gameId;
    // console.log(gameId);
    let champId = match.champion;
    // console.log(response.data);
    return await getMatchData(gameId, summonerId, champId);
};

async function getMatchData(gameId, summonerId, champId) {

    let response = await axios.get(`/match/v4/matches/${gameId}`);
    let body = response.data;

    let participant = body.participants.filter(participant => participant.championId === champId)[0];
   
    //get stats 
    let isVictor = participant.stats.win;
    let longestTimeSpentliving = participant.stats.longestTimeSpentLiving;
    let longestTimeSpentLivingMin = `${Math.floor(longestTimeSpentliving/60)}m ${longestTimeSpentliving - (60 * Math.floor(longestTimeSpentliving/60))}s`; 
    let visionWardsBoughtInGame = participant.stats.visionWardsBoughtInGame;
    let totalDamageDealtToChampions = participant.stats.totalDamageDealtToChampions;
    let killingSprees = participant.stats.killingSprees;
    let kdaSpread = `${participant.stats.kills}/${participant.stats.deaths}/${participant.stats.assists}`;
    let kda = (participant.stats.kills + participant.stats.assists) / participant.stats.deaths;
    let cs = ((participant.stats.totalMinionsKilled + participant.stats.neutralMinionsKilled)/(body.gameDuration/60.0)).toFixed(2);

    let currentRank = await axios.get(`/league/v4/entries/by-summoner/${summonerId}`);
    let tier = currentRank.data[0].tier;
    let rank = currentRank.data[0].rank;
    let lp = currentRank.data[0].leaguePoints;
    let winloss = `${currentRank.data[0].wins}W ${currentRank.data[0].losses}L`;
    

    let gameData = {
        currentRank: (tier === "DIAMOND") ? `${tier} ${rank} ${lp} LP` : `${tier} ${lp} LP`,
        WL: winloss,
        gameId: gameId,
        win: isVictor,
        longestTimeSpentLiving: longestTimeSpentLivingMin,
        visionWardsBoughtInGame: visionWardsBoughtInGame,
        totalDamageDealtToChampions: totalDamageDealtToChampions,
        killingSprees: killingSprees,
        kda:`${kdaSpread} (${kda})`,
        csPerMin: cs
    }

    return gameData;
};