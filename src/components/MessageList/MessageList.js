import React, { Component } from 'react';

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

    render() {
        return(
            <div>
                {this.state.msgs.map((item) =>
                    (item.roomId === this.props.activeRoom) ?
                        <div>
                            <p>
                                {item.username}<br/>
                                {item.sentAt}<br/>
                                {item.content}<br/>
                                {item.roomId}<br/>
                            </p>
                    </div> : ''
                )}
            </div>
        );
    }
}

export default  MessageList;