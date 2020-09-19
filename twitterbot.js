var Twit = require('twit');
require('dotenv').config();

const { getMessages } = require("./messages.js");

async function messages() {
    let messages = await getMessages();
    let matchId, funnyText, funnyStat;
    [matchId, funnyText, funnyStat] = [messages[0], messages[1], messages[2]];
    tweetIt(matchId, funnyText, funnyStat);
    // console.log(funnyText + "\n" + funnyStat[0] + ": " + funnyStat[1]);
}

    messages();


function tweetIt(matchId, funnyText, funnyStat) {
    var T = new Twit({
              consumer_key:         process.env.TWIT_KEY
            , consumer_secret:      process.env.TWIT_SECRET_KEY
            , access_token:         process.env.TWIT_ACCESS_KEY
            , access_token_secret:  process.env.TWIT_ACCESS_SECRET_KEY
    });

    var tweet = {
        status: funnyText + "\n" + funnyStat[0] + ": " + funnyStat[1]
    }

    T.post('statuses/update', tweet, tweeted);

    function tweeted(err, data, response) {
        if(err) {
            console.log("Did not go through");
        }
        else {
            console.log("It worked!");
        }
    }
}
