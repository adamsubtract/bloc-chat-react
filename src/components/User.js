import React, { Component} from 'react';

class User extends Component {
    constructor(props){
      super(props);

    }

    componentDidMount(){
      this.props.firebase.auth().onAuthStateChanged( user => {
        this.props.setUser(user);
      });
    }



    signIn(){

      const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup(provider).then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
            });
          }

    signOut(){
      this.props.firebase.auth().signOut();
    }


    render(){
      return(
        <div>
          <h3>Sign in</h3>
            <input type="submit" onClick={this.signIn()}></input>
          <h3>Sign out</h3>
            <input type="submit" onClick={this.signOut()}></input>

        </div>
      );
    }



}

export default User;
