## Features

1.  Responsvie web layout 
2.  Tweet
3.  Retweet and its count
4.  Unretweet
5.  Favourite a tweet and count
6.  Unfavourite a tweet
7.  Displaying Timeline of user and count of tweets
8.  Displaying favourite tweets of user and its count
9.  Timestamp of tweet
10. Displaying Follower and Follwing count
11. Parse the Hash tags and display them as link to navigate.
12. Profile pics display

## Implementation

Used React as front-end framework
Used node and express framework to build REST API
Used twitter npm module for access twitter API
Webpack for bundling
scss files for styling

## usage

Download respository 

Run command  `npm install` for installing all dependency node modules.
Configure `.env` file to access the twitter API, Port number and etc.
Run command  `npm webpak` or `yarn webpack` to bundling the UI code.
Run command  `npm start` or `yarn start` to run the application.

Now application will be running on `http://localhost:3000/` 


######Note:

Tried to authenticate tokens against `consumer_key` and `consumer_secret` keys using [`node-twitter-api`](https://github.com/reneraab/node-twitter-api) module. Unfortunatley I got the issue like "Faileed to redirect to https://twitter.com/oauth/authenticate?oauth_token=[requestToken] due to CORS issue in Chrome browser"

Anyhow I tried to redirect the page from the front-end code. I am able to manage get tweets but somehow I failed to work with continuously due to authentication issues as below.

```
  [ { code: 220,
    message: 'Your credentials do not allow access to this resource.' } ]
[ { code: 220,
    message: 'Your credentials do not allow access to this resource.' } ]

```
####TODO

- Need to some code cleanup
- Needs to show error messages on UI screens regarding  API service errors



