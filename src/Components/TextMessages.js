import React, { Component } from 'react';
import TextMessage from './TextMessage'


//this component is incharge of creating all the messages
export default class TextMessages extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: this.props.messages
        }
    
    }

    render() {
        return (
            this.state.messages.map((msg) => {   //run through each message and build a component for her
                return(
                <div>
                    <TextMessage msg={msg}>
                    </TextMessage>
                </div>
                )
            })
        )
    }
}

