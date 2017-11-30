// ==============================================================================================================
//                                                                                                              //
//                                              TWITTER                                                         //
//                                                                                                              //
// ==============================================================================================================

//janitor is set  up to pull the keys from keys.js.  This is done via the require() command
var janitor = require("./keys.js");
// the variable twitter is created to go the twitter package that was installed  in the node_modules
//this was done in bash by typing npm install twitter
var twitter = require("twitter");
//userInput is going to grab with the user types after node filname.js and then whatever word is typed
// is now on the 2 index of the array.
var userInput = process.argv[2];
// userTweet variable is created so that when the user types my-tweets, it initiates or calls that function
//into action
var userTweet = "my-tweets";
// client  was pulled from the docs, and basically it's grabbing the info from keys, so that it is hidden from public view
var client = new twitter({
    consumer_key: janitor.twitterKeys.consumer_key,
    consumer_secret: janitor.twitterKeys.consumer_secret,
    access_token_key: janitor.twitterKeys.access_token_key,
    access_token_secret: janitor.twitterKeys.access_token_secret,
});
// this came from the twitter docs as well https://www.npmjs.com/package/twitter
// this is how it's communicating to grab the data from twitter.  kind of like a the ajax response.
client.get('statuses/user_timeline', function(error, tweets, response) {
    //for loop created to index through the array of objects in the tweet call back


    if (userInput === userTweet) {

        for (var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].created_at);
            console.log(tweets[i].text);
        }

        //.created_at was one of the things the homework told me to pull up.

    }
});

// ==============================================================================================================
//
//                                              SPOTIFY                                                         //
//
// ==============================================================================================================

var userSpotify = "spotify-this-song";
var Spotify = require('node-spotify-api');
var inquirer = require("inquirer");

var spotify = new Spotify({
    id: janitor.spotifyTokens.client_id,
    secret: janitor.spotifyTokens.client_secret
});

inquirer.prompt([{
    type: "input",
    message: "What song would you like to find?:",
    name: "stored"
}]).then(function(inquirerResponse) {
    spotify.search({ type: 'track', query: inquirerResponse.stored, limit: 1 }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }


        var car = data.tracks.items;

        console.log("The artist(s) who sings this is", JSON.stringify(car[0].album.artists[0].name, null, 3));
        console.log("The songs name is", JSON.stringify(car[0].name, null, 3));
        console.log("Here's a snippet:", JSON.stringify(car[0].preview_url));
        console.log("And in case you were wondering");
        console.log("The album's name is", JSON.stringify(car[0].album.name, null, 3));
        // var songs = car[0].preview_url;
        // if( songs === null ){
        //   cars }
        // };


    });
});

// ==============================================================================================================
//                                                                                                              //
//                                              OMBD                                                            //
//                                                                                                              //
// ==============================================================================================================


var userMovie = "movie-this";
