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

    }

    componentDidMount(){
     this.messagesRef.on('child_added', snapshot => {
         const message = snapshot.val();
         message.key = snapshot.key;

         this.setState({ messages: this.state.messages.concat( message ) });
     });
  }

  createMessage(msg){
    this.messagesRef.push({ newMessage: msg });
  }

  handleChange(e){
    this.setState({ newMessage: e.target.value });
  }


    render(){
      return(
        <div>
         <ul>
             { this.state.messages.filter(message => message.roomid == this.props.activeRoom.key).map( (message, index) =>
                   <li className='message' key={index}>
                       {message.content}
                   </li>
              )}
         </ul>

         <form className='create-message'
           onSubmit={(e) =>
           { e.preventDefault(); this.createMessage(this.state.newMessage) }}>
         <h3>Creat chatroom</h3>
           <input type='text'
             placeholder='Write your messages ...'
             onChange={(e) => this.handleChange(e)}>
           </input>
             <input type='submit' ></input>
         </form>
       </div>
      );
  }
}

export default MessageList;
