import React, { Component } from 'react';
import styles from './CreateMessage.css'

class CreateMessage extends Component {
    constructor(props){
        super(props);
        this.state ={
            value: ''
        }
        this.messagesRef = this.props.firebase.database().ref('messages_launch');
        //this.createMessage = this.createMessage.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange (e) {
        //console.log(this.props.activeUser);
        this.setState({value: e.target.value})
    }

    handleSubmit (event) {
        event.preventDefault();
        this.createMessage();
        this.setState({value: ''})
    }

    userDecider() {
        if(this.props.activeUser){
            return this.props.activeUser.displayName;
        }else{
            return 'Guest';
        }
    }

    createMessage () {
        //console.log(this.props.activeRoomName);
        if(this.props.activeRoomName.toLowerCase().includes("adminfiller") && this.userDecider() === 'Tyler Poore'){
            const immutableMessageData = {
                roomId: this.props.activeRoomId,
                roomName: this.props.activeRoomName,
                username: this.userDecider()
            };
            for(let i = 0; i < 100; i++){
                setTimeout(() => {
                    this.messagesRef.push({
                        content: '\'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at accumsan tortor. Nulla nec odio non est feugiat malesuada. Nullam eu dignissim massa, maximus mollis sem. Praesent porta eget metus eget mattis. Aliquam commodo quis dolor ut blandit. Duis pellentesque facilisis urna at vulputate. Vestibulum imperdiet vulputate libero interdum condimentum. Donec vel sapien sodales, congue odio sit amet, vehicula eros. Mauris pulvinar turpis sit amet neque tempus consectetur. Mauris sed suscipit risus. Nam faucibus erat enim, non accumsan nisl commodo at. Integer aliquam consectetur velit, lacinia tincidunt elit lacinia vel.\\n\' +\n' +
                            '                        \'\\n\' +\n' +
                            '                        \'Etiam sodales, lorem ut laoreet molestie, lacus urna auctor metus, vel consectetur est nunc ut justo. Integer tortor quam, hendrerit sed sapien a, placerat dignissim ligula. Aliquam et sapien at neque pellentesque pulvinar. Donec sollicitudin euismod nibh, sit amet consequat metus tempus quis. Donec ultrices lacinia consectetur. Nam a ligula hendrerit lacus pulvinar ullamcorper non sit amet turpis. Nam at quam viverra, sollicitudin est nec, rhoncus nisi.\\n\' +\n' +
                            '                        \'\\n\' +\n' +
                            '                        \'Morbi dictum eros non elit interdum laoreet. Phasellus rhoncus leo non leo elementum ultrices. In tempor eros quis orci tincidunt maximus. Morbi tempor ut arcu at aliquet. Aliquam a odio sollicitudin tellus ullamcorper tincidunt ac at nulla. Mauris aliquam blandit pharetra. Nunc pulvinar sollicitudin molestie. Ut ac sapien eget mi egestas aliquet. Nulla rutrum quam erat, a blandit lacus congue a. Cras pharetra maximus volutpat. Morbi tempus leo in lorem aliquam aliquet. Curabitur sed lacus vel eros aliquet fringilla. Vivamus euismod mi quam, at rutrum nulla aliquam non. Ut facilisis elit ut mauris facilisis, sit amet consequat velit bibendum. Nullam feugiat libero id pretium accumsan. Fusce in posuere nisl.\\n\' +\n' +
                            '                        \'\\n\' +\n' +
                            '                        \'Mauris condimentum nibh quis libero gravida, a rhoncus dolor venenatis. In aliquam sagittis arcu. Aliquam euismod nisl ut quam aliquam fermentum. Aenean facilisis augue mattis, posuere quam at, fermentum nibh. Suspendisse at odio purus. Vivamus eget tincidunt erat, efficitur molestie lacus. Phasellus non sollicitudin sem.\\n\' +\n' +
                            '                        \'\\n\' +\n' +
                            '                        \'Sed elementum ligula arcu, vel vulputate lacus efficitur at. Morbi iaculis sed velit quis vehicula. Donec posuere tellus sit amet feugiat mattis. Nullam sed elit justo. Vivamus sed ligula eleifend elit gravida sollicitudin ac ut ipsum. Donec vehicula sollicitudin libero quis finibus. Nullam sed nunc vel elit elementum auctor at et risus. Nulla et euismod sem, ac rhoncus purus. In condimentum, mi vel congue hendrerit, ex lorem scelerisque dui, ac posuere nibh sapien ut nibh. Maecenas tristique volutpat porta.\'',
                        roomId: immutableMessageData.roomId,
                        roomName: immutableMessageData.roomName,
                        sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
                        username: immutableMessageData.username
                    });
                }, i*1000);
            }
        }else{
            this.messagesRef.push({
                content: this.state.value,
                roomId: this.props.activeRoomId,
                roomName: this.props.activeRoomName,
                sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
                username: this.userDecider()
            });
            this.setState({value: ''});
        }
    }

    render() {
        return (
                <form onSubmit={this.handleSubmit} >
                    <input id="send-button" className={(this.state.value === '' ) ? 'disabled' : ''} type="submit" value="Send" disabled={(this.state.value === '' ) ? 'disabled' : ''}/>
                    <textarea name="" id="" cols="175" rows="5" value={this.state.value} onChange={this.handleChange} disabled={(this.props.activeRoomName === '' || this.props.activeRoomId === '') ? 'disabled' : ''}></textarea>
                </form>
        );
    }
}

export default CreateMessage;