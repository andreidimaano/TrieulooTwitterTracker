// let { getAccount } = require("./api-files/riot.js");
// let { tweetMessage } = require("../twitterbot.js");
import { tweetMessage } from './twitterbot';

async function main() {
    tweetMessage();
}

main()    
    .catch(e => {
        console.error(e.stack);
        process.exit(1);
    });
setInterval(main, 500000);
