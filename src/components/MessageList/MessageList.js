import React, { Component } from 'react';
import styles from './MessageList.css'

class MessageList extends Component {
    constructor(props){
        super(props);
        this.state = {
            msgs: [],
            alterChoice: false
        }
        this.messagesRef = this.props.firebase.database().ref('messages_launch');
        this.myRef = React.createRef();
    }

    componentDidUpdate () {
        const elem = document.querySelector('.messageList'); //your ref to the element say testNode in your case;
        elem.scrollTop = elem.scrollHeight;
    }

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const msgs = snapshot.val();
            this.setState({msgs: this.state.msgs.concat(msgs)})
        });
        /*
        const target = document.querySelector(".messageList");
        target.scrollTop = target.scrollHeight
        */
        /*
        const scroll = document.querySelector('.messageList');
        scroll.scrollTop = scroll.scrollHeight;
        scroll.animate({scrollTop: scroll.scrollHeight});
        */
    }

    alterDecider (choice) {
        //console.log("Entered Alter Decider");
        if(choice === true){
            this.setState({alterChoice: false});
            return 'alter';
        }else{
            this.setState({alterChoice: true});
            return '';
        }
    }

    parseHumanTimeDate (timestamp) {
        if(typeof timestamp !== "number"){
            return 'No Data';
        }else{
            const newDate = new Date(timestamp);
            return newDate.toDateString();
        }
    }

    render() {
        return(
            <div>
                {this.state.msgs.map((item, index) =>
                    (item.roomId === this.props.activeRoom || item.roomName === this.props.activeRoom) ?
                        <div key={'msg' + index} >
                            <ul>
                                <li className="username">{item.username}</li>
                                <li className="timestamp">{this.parseHumanTimeDate(item.sentAt)}</li>
                                <li className="msgContent">{item.content}</li>
                            </ul>
                    </div> : ''
                )}
            </div>
        );
    }
}

export default  MessageList;