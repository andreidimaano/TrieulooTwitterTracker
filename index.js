// let { getAccount } = require("./api-files/riot.js");
let { tweetMessage } = require("./twitterbot.js");

async function main() {
    tweetMessage();
    // setInterval(tweetMessage, 3600000);
    setInterval(tweetMessage, 30);
}

main()    
    .catch(e => {
        console.error(e.stack);
        process.exit(1);
    });