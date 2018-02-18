const express = require('express');
const app = express();
const Twitter = require('twitter');
const bodyParser = require('body-parser');
const router = express.Router();
let params = { screen_name: 'nodejs' };
let client;

require('dotenv').config()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + './../../')); //serves the index.html


client = new Twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token_key,
  access_token_secret: process.env.access_token_secret
});


router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
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
  client.post('favorites/create', {id: tweetId}, function(error, tweet, response) {
    if (!error) {
      res.json({ message: response });
    }else{
    	res.json({ error: error });
    }
  });

});

router.post('/dounfav', function(req, res) {
	let tweetId = req.body.tweetid.toString();
  client.post('favorites/destroy', {id: tweetId}, function(error, tweet, response) {
    if (!error) {
      res.json({ message: tweet });
    }else{
     
    	res.json({ error: error });
    }
  });

});

router.get('/favlist', function(req, res) {
  client.get('favorites/list', function(error, tweets, response) {
    if (!error) {
      res.json({ message: tweets });
    }else{
     
    	res.json({ error: error });
    }
  });
});


app.use('/api', router);


app.listen(process.env.port);
console.log(`listens on port ${process.env.port} -> http://localhost:${process.env.port}`);