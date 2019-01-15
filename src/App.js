import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';


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
  render() {
    return (
      <div className="App">
        <RoomList firebase={firebase}/>
        <MessageList firebase={firebase}/>
      </div>
    );
  }
}

export default App;
