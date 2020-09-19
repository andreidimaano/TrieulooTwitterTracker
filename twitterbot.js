var Twit = require('twit');
require('dotenv').config();
const Datastore = require('nedb');

const { getMessages } = require("./messages.js");

const database = new Datastore('matches.db');
database.loadDatabase();

async function messages() {
    let messages = await getMessages();
    let matchId, funnyText, funnyStat;
    [matchId, funnyText, funnyStat] = [messages[0], messages[1], messages[2]];
    database.find({matchId}, function(err, docs) {
        if(docs === undefined || docs.length=== 0) {
            database.insert({matchId});
            tweetIt(matchId, funnyText, funnyStat);
        }
        else {
            console.log("No new tweet");
        }
    });
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
        status: funnyText + "\n" + "\n" + funnyStat[2][0] + ": " + funnyStat[2][1] 
                + "\n" +  funnyStat[3][0] + ": " + funnyStat[3][1] 
                + "\n" + funnyStat[4][0] + ": " + funnyStat[4][1] 
                + "\n"+ funnyStat[5][0] + ": " + funnyStat[5][1] 
                + "\n" + funnyStat[6][0] + ": " + funnyStat[6][1] 
                + "\n" + funnyStat[7][0] + ": " + funnyStat[7][1]
    }

    T.post('statuses/update', tweet, tweeted);

    function tweeted(err, data, response) {
        var currentDate = new Date();
        var timestamp = currentDate.getDate() + "-" + (currentDate.getMonth()+1) + "-" + currentDate.getFullYear() + 
                        " " + currentDate.getHours() + ":" + currentDate.getMinutes();
        console.log("Tweeted at " + timestamp);
    }
}
