import React, { Component } from 'react';
import axios from 'axios';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';


const postTweetAPI = "/api/updatestatus";
const timeLineAPI = "/api/tweets";
const reTweetAPI = "/api/retweet"
const unReTweetAPI = "/api/unretweet";
const doFavAPI = "/api/dofav";
const doUnFavAPI = "/api/dounfav";
const favListAPI = "api/favlist"


class TweetBox extends React.Component {
  
  constructor(props){
  	super(props)
    this.state = {tweetext: "", messages : [], tweetbtnDisabled: true}
    this.updateStatus = this.updateStatus.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);
    this.retweet = this.retweet.bind(this);
    this.doFavorites = this.doFavorites.bind(this);
    this.getFavourites = this.getFavourites.bind(this);
    this.getTimeLine = this.getTimeLine.bind(this);
  }


 //To post user tweet
 updateStatus(event){
  	let that = this;
    let tweetText = this.state.tweetext;
  	if(tweetText.trim() !== "") {
	  	axios.post(postTweetAPI, {
	      tweettext: tweetText
	  	}).then(function(result) {    
	      that.getTimeLine()
	      that.setState(state => {
			return {
			  tweetext: ''
			}
		  })
	    })
    }
  }
  
  // Fetch user timeline 
  getTimeLine(){
  	let that = this;
  	axios.get(timeLineAPI).then(result => {   
      let messages = result.data.message;
       
      //to avoid retweeted tweets display
      let uniqueMessages = messages.filter((msg) =>{
	      return msg.retweeted_status ? false : true;
	    });
	    if(uniqueMessages.length !== 0) {
	      that.setState({
	      	messages:uniqueMessages, 
	      	tweets_count:uniqueMessages[0].user.statuses_count,
	      	friends_count: uniqueMessages[0].user.friends_count,
	      	followers_count: uniqueMessages[0].user.followers_count
	      });
	    }
    })
  }


  // Fetch user favs 
  getFavourites(){
  	let that = this;
  	axios.get(favListAPI).then(result => {   
      let uniqueMessages = result.data.message;       
      if(uniqueMessages.length !== 0) {
	      that.setState({
	      	messages:uniqueMessages, 
	      	favcount:uniqueMessages.length

	      });
      }
    })
  }

  handleChange(e) {
    this.setState({ tweetext: e.target.innerText });
  }

  keyUpHandler(e){
    this.setState({ tweetbtnDisabled: e.target.innerText.trim() !== "" ? false: true});
  }

  componentDidMount(){
  	/*axios.get('/api/').then(result => {
      console.log(result.message);
      //location.href = "https://twitter.com/oauth/authenticate?oauth_token="+result.data.message;
  	});*/
  	this.getTimeLine()
  	//this.getFavourites();
  }

  retweet(e) {
  	let idstr = e.target.getAttribute('tweetid');
  	let isRt = e.target.getAttribute('isrt');
    let apiSource = (isRt === 'true') ? unReTweetAPI: reTweetAPI
  	axios.post(apiSource, {
  		tweetid: idstr
  	}).then(result => {
  	    this.getTimeLine();
  	});
  }

  doFavorites(e){
  	let idstr = e.target.getAttribute('tweetid');
  	let isFv = e.target.getAttribute('isfv');
    let apiSource = (isFv === 'true') ? doUnFavAPI: doFavAPI;
  	axios.post(apiSource, {
  		tweetid: idstr
  	}).then(result => {
  	    this.getTimeLine();
  	});
  }
  
  render() {
     let messageText;
     let regex =  /(?:\s|^)(?:#(?!\d+(?:\s|$)))(\w+)(?=\s|$)/gi;
     //replace( regex , replacer)
  	 function replacer(hash){
       var replacementString = hash.trim();
       return ' <a href="https://twitter.com/hashtag/'+ replacementString.substr(1) +'" target="_blank">' + replacementString + '</a>';
     }
  	 const alltweets = this.state.messages.map((message, index) => 
        <div key={index} className="twitter-tweet-single">

         <div className="twitter-tweet-profile-img">
            <img src={message.user.profile_image_url} alt=""/>
         </div>
         <div className="twitter-tweet-data">
	         {message.retweeted && <span className="twitter-you-retweet-status"> <i className="fa fa-retweet"></i> You Retweeted </span>}
	         <div className="twitter-tweet-owner"> 
	             <b className="twitter-tweet-username"> {message.user.name} </b>
	             <span className="twitter-tweet-screenname">@{message.user.screen_name} </span>
	         </div>
	         <div className="tiwtter-tweet-body-content"> {ReactHtmlParser(message.text.replace( regex , replacer))} </div>

	         <div className="twitter-tweet-actions-container">
	           <span className="tiwtter-tweet-timestamp">{new Date(message.created_at).toString().substr(0,24)}</span>
	           <span className="twitter-tweet-action--buttons">
	              <i className="fa fa-heart fav-btn" tweetid={message.id_str} isfv={message.favorited.toString()} onClick={this.doFavorites}>{message.favorite_count > 0 && <span> {message.favorite_count}</span> }</i>
	              <i className="fa fa-retweet retweet-btn" tweetid={message.id_str} isrt={message.retweeted.toString()} onClick={this.retweet}> {message.retweet_count > 0 && <span> {message.retweet_count}</span> }</i>
	           </span>
	         </div>
	        </div>
        </div>
        
     );
    return (
      <div className="main">
    	<div className="twitter-tweetbox-container">
	    	<div suppressContentEditableWarning="true" contentEditable="true" className="twitter-textbox" onKeyUp={this.keyUpHandler} onBlur={ this.handleChange }>{this.state.tweetext}</div>
	    	<button className="twitter-button--primary twitter-tweet-button" disabled={this.state.tweetbtnDisabled} onClick={this.updateStatus}>Tweet Now</button>
        </div>
        <div className="twitter-timeline-container">
        <div className="twitter-user-tweets--heading">
          <span className="twitter-nav-link" onClick={this.getTimeLine}> Tweets {this.state.tweets_count} </span>
          <span className="twitter-nav-link" onClick={this.getFavourites}>Favorites {this.state.favcount}</span>
          <span> Following <b>{this.state.friends_count}</b></span>
          <span> Followers <b>{this.state.followers_count}</b></span>
        </div>
        {alltweets}
        </div>
      </div>
    );
  }
}
export default TweetBox;
