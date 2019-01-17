import React, { Component} from 'react';

class User extends Component {
    constructor(props){
      super(props);

      // state goes here
      const provider = new this.props.firebase.auth.GoogleAuthProvider();

    }

    render(){
      return(
        <div>
          <h3>Sign in</h3>
            <input type="submit" onClick={this.props.firebase.auth().signInWithPopup( provider )}></input>

        </div>
      );
    }



}

export default User;
