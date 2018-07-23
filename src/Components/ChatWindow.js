import React, { Component } from 'react';
import MessageBox from './MessageBox'
import TextMessages from './TextMessages'
import io from 'socket.io-client';

const socketURL = "https://spotim-demo-chat-server.herokuapp.com";

//chat window component - holds a messagebox component and TextMessages ( which hold each TextMessage)
export default class ChatWindow extends Component {
    constructor(props){
        super(props)
        this.state = {
            messages:[],
            socket: null
        }
        this.socketInit = this.socketInit.bind(this);
        this.composeMessage = this.composeMessage.bind(this);
        this.incomingMessages = this.incomingMessages.bind(this);
    }

    //initiate socket connection
    componentWillMount(){
        this.socketInit();
    }


    //handles socket connection
    socketInit() {
        const socket = io.connect(socketURL);
        socket.on('connect', () => {
            console.log('connected to server')
        })
        this.setState({
            socket
        })
    }

    //handle user message submission
    composeMessage(userMessage){
        userMessage.socketid = this.state.socket.id;
        sessionStorage.setItem('socketid', this.state.socket.id)
        new Promise((resolve)=>{
            let msgs = this.state.messages;
            msgs.push(userMessage)
            this.setState({
                messages: msgs
            });
            resolve('success!');
        }).then((resolve) => {
            console.log('emitting -> ', userMessage);
            this.state.socket.emit('spotim/chat', userMessage);
        })
    }

    //handles incoming messages
    incomingMessages(){
        this.state.socket.on('spotim/chat', (data) => {
            if(data.socketid === this.state.socket.id){ 
                //do nothing - because its the same message
            } else {
                let msgs = this.state.messages;
                msgs.push(data);
                this.setState({
                    messages: msgs
                });
            }
            console.log('recieved from server -> ', data)
        });
    }

    render(){
        // listenes to incoming messages repetitively
        this.incomingMessages()
        return(
            <div className='container' style={{maxWidth: '1000px'}}>
                <div className='d-flex justify-content-center' id='mainWindow' style={{marginTop: '20px'}}>
                    <div className='card bg-light mb-3' style={{width: '100%', height: '46rem'}}>
                        <div className='card-header'>
                            <h5 style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', margin: '0', display: 'inline-block'}}>Spot.IM Chat</h5>
                            <button id='logout' style={{float: 'right'}} onClick={this.props.loggedOUT}>Logout</button>
                        </div>
                        <div className='card-body' id='msgWindow' style={{ display: 'block', overflow: 'auto', marginBottom: '15px' }}>
                            <TextMessages messages={this.state.messages}>
                            </TextMessages>
                        </div>
                    </div>
                    <div style={{ position: 'fixed', bottom: '10px', width: '92%' }}>
                        <MessageBox composeMessage={this.composeMessage}>
                        </MessageBox>
                    </div>
                </div>
            </div>    
        )
    }
}