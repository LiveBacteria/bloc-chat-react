import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList/RoomList.js'
import MessageList from './components/MessageList/MessageList.js'
import User from './components/User/User.js'

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
      activeRoom: '',
      user: ''
    };
    this.setActiveRoom = this.setActiveRoom.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  setActiveRoom(room) {
    this.setState({
      activeRoom: room.name,
      activeRoomId: room.key,
    });
  }

  setUser (user) {
    //alert("Works!");
    this.setState({user: user});
  }

  render() {
    return (
        <div className="App">
          <div className="roomId">
            <h1>
              {this.state.activeRoom}
            </h1>
          </div>
          <div className="roomListInfo">
            <RoomList firebase={firebase} setActiveRoom={this.setActiveRoom} activeRoom={this.state.activeRoom}/>
            <div className="userInfo">
              <User firebase={firebase} setUser={this.setUser} user={this.state.user}/>
            </div>
          </div>
          <div className="roomContent">
            <div className="messageList">
              <MessageList firebase={firebase} activeRoom={this.state.activeRoom} />
            </div>
          </div>
        </div>
    );
  }
}

export default App;
