import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList/RoomList.js'

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

    };
  }
  render() {
    return (
      <div className="App">
        <RoomList firebase={firebase} />
      </div>
    );
  }
}

export default App;
