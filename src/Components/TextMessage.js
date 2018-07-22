import React, { Component } from 'react';


//lowest level component - contains all messsage details
export default class TextMessage extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            this.props.msg.owner == 'user' ?            //if message belongs to user, render this component (so the user can differ from his own messages and other user's messages)
            <div style={{ border: '1px solid gray', borderRadius: '5px', margin: '5px 5px 5px 5px', background: '#92a8d1'}}>
                <article name='avatar' style={{height: '30px', width: '30px', float: 'left'}}>
                    <img style={{ height: '30px', width: '30px', margin: '5px 0 0 5px' }} src={this.props.msg.avatar}/>
                </article>
                <article name='username' style={{marginLeft: '10px', display: 'inline-block', fontWeight: 'bold', fontSize: '22px'}}>
                    <p>{this.props.msg.username}</p>
                </article>
                <article name='text' style={{ marginLeft: '41px', fontWeight: 'bolder'}}>
                    <p style={{fontWeight: '10px'}}>{this.props.msg.text}</p>
                </article>
                <article name='timestamp' style={{ margin: '10px 0 -10px 41px',fontSize: '12px', fontWeight: 'lighter' }}>
                    <p>{this.props.msg.timestamp}</p>
                </article>
            </div> :                                //if message belongs to other user, render this component
            <div style={{ border: '1px solid gray', borderRadius: '5px', margin: '5px 5px 5px 5px'}}>
                <article name='avatar' style={{ marginRight: '10px', height: '30px', width: '30px', float: 'right' }}>
                    <img style={{ height: '30px', width: '30px', margin: '5px 0 0 5px' }} src={this.props.msg.avatar} />
                </article>
                <article name='username' style={{ float: 'right',display: 'block', fontWeight: 'bold', fontSize: '22px' }}>
                    <p>{this.props.msg.username}</p>
                </article>
                <article name='text' style={{ fontWeight: 'bolder', margin: '25px 0 0 41px'}}>
                    <p style={{ fontWeight: '10px'}}>{this.props.msg.text}</p>
                </article>
                <article name='timestamp' style={{ margin: '10px 0 -10px 41px', fontSize: '12px', fontWeight: 'lighter' }}>
                    <p>{this.props.msg.timestamp}</p>
                </article>
            </div>
        )
    }
}

 