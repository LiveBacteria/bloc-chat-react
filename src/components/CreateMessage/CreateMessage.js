import React, { Component } from 'react';
import styles from './CreateMessage.css'

class CreateMessage extends Component {
    constructor(props){
        super(props);
        this.state ={
            value: '',
            message: {
                content: '',
                roomId: this.props.activeRoom,
                sentAt: '',
                username: this.props.activeUser
            }
        }
        this.messagesRef = this.props.firebase.database().ref('messages');
        //this.createMessage = this.createMessage.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange (e) {
        this.setState({value: e.target.value})
    }

    handleSubmit (e) {
        this.createMessage();
        e.preventDefault();
    }

    createMessage () {
        this.messagesRef.push({
            content: this.state.value,
            roomId: this.props.activeRoom,
            sentAt: this.props.firebase.database.serverValue.TIMESTAMP,
            username: this.props.activeUser
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={() => this.createMessage()}>
                    <input type="submit" value="Send" disabled={(this.state.value === '' ) ? 'disabled' : ''}/>
                    <textarea name="" id="" cols="175" rows="5" onChange={this.handleChange} disabled={(this.props.activeRoom === '' ) ? 'disabled' : ''}></textarea>
                </form>
            </div>
        );
    }
}

export default CreateMessage;