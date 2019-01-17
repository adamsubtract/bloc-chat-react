import React, { Component} from 'react';

class User extends Component {
    constructor(props){
      super(props);

      this.provider = new this.props.firebase.auth.GoogleAuthProvider();

    }

    signIn(){
      this.props.firebase.auth().signInWithPopup( this.provider )
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
