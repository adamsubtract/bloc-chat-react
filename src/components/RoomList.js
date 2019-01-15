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

  createRoom(e){
    e.preventDefault();
    this.roomsRef.push({ name: e.target.value });
  }

  handleChange(e){
    this.setState({ name: e.target.value });
  }

  render() {
    return (
          //list of rooms
          <div className="App">
          <ul>
          { this.state.rooms.map( (room, index) =>
            <li className='room' key={index}>
            {room.name}
            </li>)
          }
          </ul>

          //chat button
            <form className='create-room' onSubmit={(e) => this.createRoom(e)}>
              <h3>Creat chatroom</h3>
              <input type='text'
                placeholder='room name'
                value={this.state.name}
                onChange={(e) => this.handleChange(e)}>
              </input>
                <input type='submit' value="create"></input>
            </form>


          </div>
    );
  }
}
export default RoomList;
