const express = require('express');
const app = express();
const Twitter = require('twitter');
const bodyParser = require('body-parser');
const router = express.Router();
const twitterAPI = require('node-twitter-api');
let params = { screen_name: 'nodejs' };
let client;
let twitter;
let access_token_key;
let access_token_secret;
let reqToken;
let reqTokenSecret;

require('dotenv').config()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + './../../')); //serves the index.html

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

twitter = new twitterAPI({
  consumerKey: process.env.consumer_key,
  consumerSecret: process.env.consumer_secret,
  callback: 'http://127.0.0.1:3000/'
});




/*twitter.getAccessToken(reqToken, reqTokenSecret, oauth_verifier, function(error, accessToken, accessTokenSecret, results) {
  if (error) {
    console.log(error);
  } else {
    //access_token_key = accessToken;
    //access_token_secret = accessTokenSecret;
    //Step 4: Verify Credentials belongs here
    twitter.verifyCredentials(accessToken, accessTokenSecret, params, function(error, data, response) {
      if (error) {
        //something was wrong with either accessToken or accessTokenSecret
        //start over with Step 1
      } else {
        //accessToken and accessTokenSecret can now be used to make api-calls (not yet implemented)
        //data contains the user-data described in the official Twitter-API-docs
        //you could e.g. display his screen_name
        console.log(data["screen_name"]);
      }
    });
  }
})
*/




router.get('/', function(req, res) {
	/*console.log('----')
  //var url = req.headers.referer;
  if (url.indexOf('oauth_verifier') > -1) {
    let oauth_verifier = url.substr(url.lastIndexOf("=") + 1, url.length);

    twitter.getAccessToken(reqToken, reqTokenSecret, oauth_verifier, function(error, accessToken, accessTokenSecret, results) {
      if (error) {
      	console.log('----')
        console.log(error);
      } else {
        //store accessToken and accessTokenSecret somewhere (associated to the user)
        //Step 4: Verify Credentials belongs here
        twitter.verifyCredentials(accessToken, accessTokenSecret, {}, function(error, data, response) {
          if (error) {
            //something was wrong with either accessToken or accessTokenSecret
            //start over with Step 1
          } else {
            //accessToken and accessTokenSecret can now be used to make api-calls (not yet implemented)
            //data contains the user-data described in the official Twitter-API-docs
            //you could e.g. display his screen_name
            console.log('screen_name')
            console.log(data["screen_name"]);
          }
        });
      }
    });

  } else {
  twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results) {
    if (error) {
      console.log(error);
    } else {
      reqToken = requestToken;
      reqTokenSecret = requestTokenSecret;
      console.log(reqToken)
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.redirect('https://twitter.com/oauth/authenticate?oauth_token=' + reqToken);
      res.end();
    }
  });*/



});

client = new Twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token_key,
  access_token_secret: process.env.access_token_secret
});

router.post('/updatestatus', function(req, res) {
  client.post('statuses/update', { status: req.body.tweettext }, function(error, tweet, response) {
    if (!error) {
      res.json({ message: tweet });
    } else {
      console.log(error)
    }

  });
});


router.get('/tweets', function(req, res) {
  let params = { screen_name: process.env.screen_name };
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      res.json({ message: tweets });
    }
  });
});

router.post('/retweet', function(req, res) {
  let tweetId = req.body.tweetid.toString();
  client.post('statuses/retweet/' + tweetId, function(error, tweet, response) {
    if (!error) {
      res.json({ message: tweet });
    }
  });

})

router.post('/unretweet', function(req, res) {
  let tweetId = req.body.tweetid.toString();
  client.post('statuses/unretweet/' + tweetId, function(error, tweet, response) {
    if (!error) {
      res.json({ message: tweet });
    }
  });

});

router.post('/dofav', function(req, res) {
  let tweetId = req.body.tweetid.toString();
  client.post('favorites/create', { id: tweetId }, function(error, tweet, response) {
    if (!error) {
      res.json({ message: response });
    } else {
      res.json({ error: error });
    }
  });

});

router.post('/dounfav', function(req, res) {
  let tweetId = req.body.tweetid.toString();
  client.post('favorites/destroy', { id: tweetId }, function(error, tweet, response) {
    if (!error) {
      res.json({ message: tweet });
    } else {

      res.json({ error: error });
    }
  });

});

router.get('/favlist', function(req, res) {
  client.get('favorites/list', function(error, tweets, response) {
    if (!error) {
      res.json({ message: tweets });
    } else {

      res.json({ error: error });
    }
  });
});


app.use('/api', router);


app.listen(process.env.port);
console.log(`listens on port ${process.env.port} -> http://localhost:${process.env.port}`);