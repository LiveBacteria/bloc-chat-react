import React, {Component} from 'react';
import styles from './RoomList.css'

class RoomList extends Component {
    constructor(props){
        super(props);
        this.state = {
            rooms: [],
            value: ''
        }
        this.roomsRef = this.props.firebase.database().ref('rooms');

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        //const newRoomList = this.state.rooms;
        this.roomsRef.on('child_added', snapshot => {
            //newRoomList.concat(snapshot);
            const room = snapshot.val();
            //room.key = snapshot.key;
            this.setState({rooms: this.state.rooms.concat( room )})
        });
    }

    handleChange (e) {
        this.setState({value: e.target.value})
    }

    handleSubmit (e) {
        this.createRoom(this.state.value);
        this.setState({value: ''});
        e.preventDefault();
    }

    createRoom (roomInfo) {
        this.roomsRef.push({name: roomInfo, createdAt: this.props.firebase.database.ServerValue.TIMESTAMP})
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
                        {this.state.rooms.map((room, index) =>
                            <div key={index} onClick={() => this.props.setActiveRoom(room)} className={
                                (this.props.activeRoom === room.name) ? 'active' : ''
                            }>
                                {room.name}
                            </div>
                            )
                        }
                        {this.state.value}
                    </div>
                </section>
                <section id="createRooms">
                    <div>
                        <form onSubmit={this.handleSubmit} >
                            <input type="text" id="nameEntry" value={this.state.value} onChange={this.handleChange} />
                            <input type="submit" value="Create Room" disabled={(this.state.value === '') ? 'disabled' : ''}/>
                        </form>
                    </div>
                </section>
            </div>
        );
    }
}

export default RoomList;