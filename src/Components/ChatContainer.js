import React, { Component } from 'react';
import ChatWindow from './ChatWindow'

//main chat container
export default class ChatContainer extends Component{
    constructor(props){
        super(props)
        
        this.loggedOUT = this.loggedOUT.bind(this)
    }
    
    //handle logout
    loggedOUT(){
        this.props.loggedOUT()
    }

    render(){
        return(
            <ChatWindow loggedOUT={this.loggedOUT}/>
        )
    }
}