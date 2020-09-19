var Twit = require('twit');
require('dotenv').config();
const Datastore = require('nedb');

const { getMessage } = require("./messages.js");

const database = new Datastore('matches.db');
database.loadDatabase();

async function messages() {
    let messages = await getMessage();
    let matchId, message;
    matchId = messages.gameId;
    message = messages.message;
    database.find({matchId}, function(err, docs) {
        if(docs === undefined || docs.length=== 0) {
            database.insert({matchId});
            tweetIt(message);
        }
        else {
            console.log("No new tweet");
        }
    });
 }

 messages();

function tweetIt(message) {
    var T = new Twit({
              consumer_key:         process.env.TWIT_KEY
            , consumer_secret:      process.env.TWIT_SECRET_KEY
            , access_token:         process.env.TWIT_ACCESS_KEY
            , access_token_secret:  process.env.TWIT_ACCESS_SECRET_KEY
    });

    var tweet = {
        status: message
    }

    T.post('statuses/update', tweet, tweeted);

    function tweeted(err, data, response) {
        var currentDate = new Date();
        var timestamp = currentDate.getDate() + "-" + (currentDate.getMonth()+1) + "-" + currentDate.getFullYear() + 
                        " " + currentDate.getHours() + ":" + currentDate.getMinutes();
        console.log("Tweeted at " + timestamp);
    }
}
