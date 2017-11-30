//janitor is set  up to pull the keys from keys.js.  This is done via the require() command
var janitor = require("./keys.js");
// the variable twitter is created to go the twitter package that was installed  in the node_modules
//this was done in bash by typing npm install twitter
var twitter = require("twitter");
//userInput is going to grab with the user types after node filname.js and then whatever word is typed
// is now on the 2 index of the array.
var userInput = process.argv[2];
console.log(userInput)


var inquirer = require("inquirer");
// if (userInput === 'spotify-this-song') {
//     spot()
// }

// ==============================================================================================================
//                                                                                                              //
//                                              TWITTER                                                         //
//                                                                                                              //
// ==============================================================================================================

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

if (userInput === userTweet) {

    // this came from the twitter docs as well https://www.npmjs.com/package/twitter
    // this is how it's communicating to grab the data from twitter.  kind of like a the ajax response.
    client.get('statuses/user_timeline', function(error, tweets, response) {
        //for loop created to index through the array of objects in the tweet call back


        for (var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].created_at);
            console.log(tweets[i].text);
        }

        //.created_at was one of the things the homework told me to pull up.


    });
}
// ==============================================================================================================
//
//                                              SPOTIFY                                                         //
//
// ==============================================================================================================
//userSpotify is the variable holding the value of "spotify-this-song".
//when "spotify-this-song", the spotify logic will run.
var userSpotify = "spotify-this-song";
// the Spotify variable is using the node-spoitfy-api similar to an ajax call and communicate with spotify.
// in order to use this node-spotify-api, an npm package for spotify had to be installed.
var Spotify = require('node-spotify-api');
// this awesome nugget, inquirer, allows the user to input data, and to be stored via the built in tools from
//the inquirer npm.  This way I don't have to use process.argv[2] to capture the user's input.
var inquirer = require("inquirer");
// new Spotify is grabbing the values set in the ./keys.js file.
//this allows me to keep the tokens, and api keys private.
// janitor has the keys!!!  janitor is a variable I declared at the top of my code
// that has the value ./keys.js which holds - the keys.  They're accessed by
// janitor. then the variable on the keys.js called spotifyTokens. and then located
// in the object with keys of client_id and client_secret.
var spotify = new Spotify({
    id: janitor.spotifyTokens.client_id,
    secret: janitor.spotifyTokens.client_secret
});
//the if statement placed here allows me to not run into asynchronous issues while using inquirer.
//if (userInput === userSpotify){} method is only initiated if the user types spotify-this-song which is
//defining the variable userSpotify.

if (userInput === userSpotify) {
    inquirer.prompt([{
        //input is whatever the user types.
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
};
// };
// ==============================================================================================================
//                                                                                                              //
//                                              OMBD                                                            //
//                                                                                                              //
// ==============================================================================================================
var request = require('request');
var movieName = "";
var userMovie = "movie-this";

if (userInput === userMovie) {
    inquirer.prompt([{
        type: "input",
        message: "What movie would you like to find?:",
        name: "stored"
    }]).then(function(inquirerResponse) {
        movieName = inquirerResponse.stored
        // console.log(inquirerResponse)
        var movieURL = "http://www.omdbapi.com/?t=" + movieName + janitor.movies.queryUrl;

        request(movieURL, function(error, response, body) {
            console.log("movie", movieURL);

            // If the request is successful
            if (!error && response.statusCode === 200) {

                // Parse the body of the site and recover just the imdbRating
                // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
                console.log("Movie Title: " + JSON.parse(body).Title);
                console.log("Release Year: " + JSON.parse(body).Year);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                console.log("Produuced in: " + JSON.parse(body).Country);
                console.log("Language(s): " + JSON.parse(body).Language);
                console.log("Movie Plot : " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
            }
        });
    });
};
