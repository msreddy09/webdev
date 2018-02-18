import React, { Component } from 'react';

class Header extends React.Component {
  
  constructor(props){
  	super(props)
  	this.state = {name : "Tweet Now"}
    
  }


  componentDidMount(){
  	
  }

  render() {
    return (
    	<div className="twitter-page-header">
	    	<div className="twitter-app-name">{this.state.name}</div>
	    	 
        </div>
    );
  }
}
export default Header;
