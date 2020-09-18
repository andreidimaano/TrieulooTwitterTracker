const dotenv = require('dotenv');
const axios = require('axios').default;

axios.defaults.baseURL = 'https://na1.api.riotgames.com/lol/';

getAccount("Trieuloo");


function getAccount(summonerName){
    
    axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`,)
    const url = `?api_key=${process.env.API_KEY}`;
    
    https.get(url, (res) => {
        // console.log(res.statusCode);

        res.on('data', (d) => {
            const accountData = JSON.parse(d);
            console.log("accountData: ", JSON.parse(d));
            const accountId = accountData.accountId;
            const amountOfGames = 1;
            // getMatch(accountId, amountOfGames);
        });
    });
}