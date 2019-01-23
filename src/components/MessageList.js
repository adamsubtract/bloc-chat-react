import React, { Component } from 'react';

class MessageList extends Component{
    constructor(props){
      super(props);

      this.state = {
         //init our state with an empty array so that later we can push things to it
         messages: [],
         newMessage: ''
       };

      // Set up our Reference to our messages Table in Firebase
      this.messagesRef = this.props.firebase.database().ref('messages');

      this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
     this.messagesRef.on('child_added', snapshot => {
         const message = snapshot.val();
         message.key = snapshot.key;

         this.setState({ messages: this.state.messages.concat( message ) });
     });
  }

  handleSubmit(e){
      e.preventDefault();
      console.log(this.props.user.displayName);
      console.log(this.props.activeRoom.key);
      console.log(this.state.newMessage);
      console.log(this.props.firebase.database.ServerValue.TIMESTAMP);

      const date = new Date(this.props.firebase.database.ServerValue.TIMESTAMP * 1000);

      this.messagesRef.push({
      content: this.state.newMessage,
      date: date,
      roomid: this.props.activeRoom.key,
      username: this.props.user.displayName});

    }

    handleChange(e){
      this.setState({newMessage: e.target.value});
    }


    render(){
      let chatbox
      if(this.props.activeRoom){
       chatbox =  <form className='create-message' onSubmit={(e) => this.handleSubmit(e)}>
                        <input type='text'
                               placeholder='Write your messages ...'
                               value={this.state.newMessage}
                               onChange={this.handleChange}></input>
                        <input type='submit' ></input>
                   </form>
      }
      return(
        <div>
         <ul>
             { this.state.messages.filter(message => message.roomid == this.props.activeRoom.key).map( (message, index) =>
                   <li className='message' key={index}>
                       {message.content} {message.username} {message.date}
                   </li>
              )}
         </ul>

         <h3>Messages</h3>
         {chatbox}
       </div>
      );
  }
}

export default MessageList;
