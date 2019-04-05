import React, { Component } from 'react';
import styles from './MessageList.css'

class MessageList extends Component {
    constructor(props){
        super(props);
        this.state = {
            msgs: []
        }
        this.roomsRef = this.props.firebase.database().ref('messages');
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const msgs = snapshot.val();
            this.setState({msgs: this.state.msgs.concat(msgs)})
        });
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
                    (item.roomId === this.props.activeRoom) ?
                        <div key={'msg' + index}>
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