import React, { Component } from 'react';
import { NotificationContainer, NotificationManager } from '../../node_modules/react-notifications';

//main user message box - contains username and text input
export default class MessageBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
                    avatar: '',
                    username: '',
                    text: '',
                    timestamp: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.emitMessage = this.emitMessage.bind(this)
        this.getTime = this.getTime.bind(this)
    }


    //set username and avatar occurding to connection credentials
    componentWillMount(){
        this.setState({
            avatar: JSON.parse(sessionStorage.getItem('userDetails')).imageUrl,
            username: JSON.parse(sessionStorage.getItem('userDetails')).username,
        })
    }

    //get message timestamp
    getTime() {
        let date = new Date().toString();
        return date.slice(0, 24);
    }

    //emit user message
    emitMessage(e){
        e.preventDefault()
        this.state.text ?                   //this validates that the user has infect inserted a message - not 'blank'
        new Promise((resolve) => {
            this.setState({
                timestamp:  this.getTime()
            });
            resolve('Success')
        }).then((resolve) => {
            this.props.composeMessage(this.state)
            this.setState({
                text: ''
            })
        }) :
        NotificationManager.error('Cant send an empty message', 'Oops', 2000)
    }


    //handles change in username and text and stores them into the state
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <div className='d-flex justify-content-center'>
                <NotificationContainer/>
                <input type='text' name='username' value={this.state.username} onChange={this.handleChange} style={{textAlign: 'center', maxWidth: '7rem'}}/>
                <textarea rows='1' name='text' className='form-control' type="text" value={this.state.text} onChange={this.handleChange} style={{resize: 'none'}}>
                </textarea>
                <button type='button' className='btn btn-outline-primary' onClick={this.emitMessage}>Send</button>
            </div>
        )
    }
}
