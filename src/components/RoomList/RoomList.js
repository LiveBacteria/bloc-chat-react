import React, {Component} from 'react';
import styles from './RoomList.css'

class RoomList extends Component {
    constructor(props){
        super(props);
        this.state = {
            rooms: []
        }
        this.roomsRef = this.props.firebase.database().ref('rooms');
    }

    componentDidMount() {
        //const newRoomList = this.state.rooms;
        this.roomsRef.on('child_added', snapshot => {
            //newRoomList.concat(snapshot);
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({rooms: this.state.rooms.concat( room )})
        });
    }

    render() {
        return (
            <div id="room-list">
                <section id="informationalHeader">
                    <div>
                        <h1>Bloc Chat</h1>
                    </div>
                </section>
                <section id="rooms">
                    <div>
                        {this.state.rooms.map((room) =>
                            <div key={room.key}>
                                {room.name}
                            </div>
                            )
                        }
                    </div>
                </section>
            </div>
        );
    }
}

export default RoomList;