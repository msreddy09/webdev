import React, { Component } from 'react';
import TweetBox from './TweetBox.jsx';
import Header from './Header.jsx';


class App extends React.Component {
  
  constructor(props){
  	super(props)
  	this.state = {name : "Tweet Now"}
    
  }


  componentDidMount(){
  	
  }

  render() {
    return (
    	<div className="twitter-app-desktop">
	    	<Header></Header>
	    	<div className="twitter-main">
	    	  <TweetBox></TweetBox>
	    	</div> 
        </div>
    );
  }
}
export default App;
