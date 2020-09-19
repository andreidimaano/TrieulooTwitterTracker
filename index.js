const { getAccount } = require("./api-files/riot.js");

async function main() {
    let gameData = await getAccount("Trieuloo");
    console.log(gameData);
}

main()
    .catch(e => {
        console.error(e.stack);
        process.exit(1);
    });