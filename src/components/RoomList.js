import React, { Component } from 'react';


class RoomList extends Component{
  constructor(props){
    super(props);

    this.state = {
      rooms: [],
      name: ''
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount(){
      this.roomsRef.on('child_added', snapshot => {
        const room = snapshot.val();
        room.key = snapshot.key;

        this.setState({ rooms: this.state.rooms.concat( room ) });

      });
  }

  createRoom(roomName){
    this.roomsRef.push({ name: roomName });

  }

  handleChange(e){
    this.setState({ name: e.target.value });
  }

  render() {
    return (
          //list of rooms
          <div className="App">

              <form className='create-room'
                onSubmit={(e) =>
                { e.preventDefault(); this.createRoom(this.state.name) }}
              >
              <h3>Creat chatroom</h3>
                <input type='text'
                  placeholder='room name'
                  onChange={(e) => this.handleChange(e)}>
                </input>
                <input type='submit' value="create"></input>
              </form>

          <ul>
          { this.state.rooms.map( (room, index) =>
            <a
                className='room'
                key= { room.key }
                onClick = {
                     (key) => this.props.setActiveRoom(room)
                }
                href="#">
                 <h3>{ room.name }</h3>
          </a>
          )
        }
          </ul>
          </div>
    );
  }
}
export default RoomList;
