import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList/RoomList.js'
import MessageList from './components/MessageList/MessageList.js'

var config = {
  apiKey: "AIzaSyD0bhiWmvrKSDG2N3sxTbxi7agQUNn-VnA",
  authDomain: "bloc-chat-react-fast.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-fast.firebaseio.com",
  projectId: "bloc-chat-react-fast",
  storageBucket: "bloc-chat-react-fast.appspot.com",
  messagingSenderId: "464369734059"
};

firebase.initializeApp(config);

class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      activeRoom: ''
    };

    this.setActiveRoom = this.setActiveRoom.bind(this);
  }

  setActiveRoom(room) {
    this.setState({
      activeRoom: room.name,
      activeRoomId: room.key,
    });
  }

  render() {
    return (
        <div className="App">
          <RoomList firebase={firebase} setActiveRoom={this.setActiveRoom} activeRoom={this.state.activeRoom}/>
          <div className="roomContent">
            <h1 className="roomId">
              {this.state.activeRoom}
            </h1>
            <MessageList firebase={firebase} activeRoom={this.state.activeRoom} />
          </div>

        </div>
    );
  }
}

export default App;
