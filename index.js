const { getAccount } = require("./api-files/riot.js");

let summonerName = 'Trieuloo'
async function main() {
    let gameData = await getAccount(summonerName);
    // console.log(gameData);
}

main()
    .catch(e => {
        console.error(e.stack);
        process.exit(1);
    });