var Twit = require('twit');
require('dotenv').config();

var T = new Twit({
        consumer_key:         process.env.TWIT_KEY
      , consumer_secret:      process.env.TWIT_SECRET_KEY
      , access_token:         process.env.TWIT_ACCESS_KEY
      , access_token_secret:  process.env.TWIT_ACCESS_SECRET_KEY
});

var tweet = {
    status: 'tweet goes here'
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
