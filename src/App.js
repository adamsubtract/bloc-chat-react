import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';
import User from './components/User.js';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCQeuwe9U5ruVQoPWTkN-VxfiwCPsPoc0I",
  authDomain: "chatroom-d73c6.firebaseapp.com",
  databaseURL: "https://chatroom-d73c6.firebaseio.com",
  projectId: "chatroom-d73c6",
  storageBucket: "chatroom-d73c6.appspot.com",
  messagingSenderId: "929590754097"
};
firebase.initializeApp(config);


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      activeRoom: '',
      userName: '',
    };

  }

  setActiveRoom(room){
    this.setState({ activeRoom: room});
    console.log(this.state.activeRoom);
  }

  setUserName(name){
    this.setState({ userName: name });
  }

  render() {
    return (
      <div className="App">
      <h3>{this.state.activeRoom ? this.state.activeRoom.name : ''}</h3>
        <RoomList
        firebase={firebase}
        activeRoom={this.state.activeRoom}
        setActiveRoom={(e) => this.setActiveRoom(e)}/>

        <MessageList
        firebase={firebase}
        userName={this.state.userName}
        activeRoom={this.state.activeRoom}/>

        <User
        firebase={firebase}
        userName={this.state.userName}
        setUser={(name) => this.setUserName(name)}/>
      </div>
    );
  }
}

export default App;
