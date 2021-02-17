require('dotenv').config();
import Twit from 'twit';
import Datastore from 'nedb';
import { getMessage } from './messages'
let database = new Datastore('matches.db');

// database.loadDatabase();

export let getTweet = async () => {
    let response = await getMessage();
    let matchId = response.gameId;
    let message = response.message;
    tweetIt(message);

    // database.find({matchId}, function(err, docs) {
    //     if(docs === undefined || docs.length=== 0) {
    //         database.insert({matchId});
    //         tweetIt(message);
    //     }
    //     else {
    //         console.log("No new tweet");
    //     }
    // });
 }

export let tweetIt = (message) => {
    let T = new Twit({ 
        consumer_key: process.env.TWIT_KEY,
        consumer_secret: process.env.TWIT_SECRET_KEY,
        access_token: process.env.TWIT_ACCESS_KEY,
        access_token_secret: process.env.TWIT_ACCESS_SECRET_KEY
    });

    let tweet = {status: message};

    T.post('statuses/update', tweet, (err, data, response) => {
        let currentDate = new Date();
        let timestamp = currentDate.getDate() + "-" + (currentDate.getMonth()+1) + "-" + currentDate.getFullYear() + 
        " " + currentDate.getHours() + ":" + currentDate.getMinutes();
        console.log("Tweeted at " + timestamp);
    })
}
