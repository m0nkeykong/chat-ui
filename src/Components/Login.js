import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import ChatContainer from './ChatContainer'

//Login Page
export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            loggedIN: false
        }

        this.loginSuccess = this.loginSuccess.bind(this);
        this.loginFailure = this.loginFailure.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.loggedOUT = this.loggedOUT.bind(this);
    }

    //if logged on successfuly with Google
    loginSuccess(response) {
        console.log('connected')
        sessionStorage.setItem('userDetails', JSON.stringify({ username: response.profileObj.name, imageUrl: response.profileObj.imageUrl}));
        this.setState({
            loggedIN: true
        })
    }
    
    //handle logout
    loggedOUT(){
        this.setState({
            username: '',
            loggedIN: false
        })
        sessionStorage.clear();
        console.log('Logged out')
    }

    //handle change for username input
    handleChange(e) {
        this.setState({
            username: e.target.value
        })
    }

    //handle login without google and forward client to chat - avatar will be a guest default
    handleSubmit(e) {
        e.preventDefault();
        if(this.state.username != ''){
            console.log('procceded without a google account')
            sessionStorage.setItem('userDetails', JSON.stringify({ username: this.state.username, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmtAD4XW7ZlAu9QYqomAGm_r8XrAcz-oOBNF3u4lH-F7CAdsib' }));
            this.setState({
                loggedIN: true
            })
        } else {                                                                            //validate that the user has entered a username
            NotificationManager.error('Please enter a valid username', 'Oops!', 3000);
        }
    }

    //handle login failure from goole
    loginFailure(response) {
        console.log(response)
    }


    render() {
        return (
        /*check if logout from the system, in that case ask for credentials again, if not logged out - forward client to chat window*/
        sessionStorage.getItem('userDetails') ?         
            <ChatContainer loggedOUT={this.loggedOUT}/> :
            <div>
                <div className="img-fluid" style={{ backgroundImage: `url(./images/logo.png)`, backgroundPositionX: 'center', backgroundRepeat: 'no-repeat' ,margin: '0 auto', maxWidth: '35rem', height: '10rem', marginTop: '130px', backgroundSize: '27rem'}}>
                </div>
                <div className='d-flex justify-content-center' style={{marginTop: '40px'}}>
                    <GoogleLogin
                        clientId={'27160300776-vrr4hvulicl4e83njgaj6dhbgpbrs3to.apps.googleusercontent.com'}
                        buttonText="GOOGLE ME"
                        onSuccess={this.loginSuccess}
                        onFailure={this.loginFailure}>
                        <article style={{cursor: 'pointer'}}>
                            Login with Google
                        </article>
                    </GoogleLogin>
                </div>
                <article style={{textAlign: 'center', marginTop: '35px'}}>OR</article>
                <div className='d-flex justify-content-center' style={{ marginTop: '40px' }}>
                    <form onSubmit={this.handleSubmit}> 
                        <input className='form-control form-control-sm' 
                            placeholder="Enter Your Chat Username"
                            type='text'
                            id='username'
                            style={{textAlign: 'center'}}
                            onChange={this.handleChange}
                        />
                        <button className='btn btn-primary btn-lg' onClick={this.noLogin} style={{marginTop: '5px'}}>
                            Continue as guest
                        </button>
                    </form>
                </div>
                <NotificationContainer/>
            </div>
        )
    }
}
