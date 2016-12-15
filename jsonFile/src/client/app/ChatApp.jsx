const ChatApp = React.createClass({

  getInitialState() {
      return {users: [], messages:[], text: ''};
  },

  componentDidMount() {
      socket.on('init', this._initialize);
      socket.on('send:message', this._messageRecieve);
      socket.on('user:join', this._userJoined);
      socket.on('user:left', this._userLeft);
      socket.on('change:name', this._userChangedName);
  },

  _initialize(data) {
      let {users, name} = data;
      this.setState({users, user: name});
  },

  _messageRecieve(message) {
      let {messages} = this.state;
      messages.push(message);
      this.setState({messages});
  },

  _userJoined(data) {
      let {users, messages} = this.state;
      let {name} = data;
      users.push(name);
      messages.push({
          user: 'APPLICATION BOT',
          text : name +' Joined'
      });
      this.setState({users, messages});
  },

  _userLeft(data) {
      let {users, messages} = this.state;
      let {name} = data;
      let index = users.indexOf(name);
      users.splice(index, 1);
      messages.push({
          user: 'APPLICATION BOT',
          text : name +' Left'
      });
      this.setState({users, messages});
  },

  _userChangedName(data) {
      let {oldName, newName} = data;
      let {users, messages} = this.state;
      let index = users.indexOf(oldName);
      users.splice(index, 1, newName);
      messages.push({
          user: 'APPLICATION BOT',
          text : 'Change Name : ' + oldName + ' ==> '+ newName
      });
      this.setState({users, messages});
  },

  handleMessageSubmit(message) {
      let {messages} = this.state;
      messages.push(message);
      this.setState({messages});
      socket.emit('send:message', message);
  },

  handleChangeName(newName) {
      let oldName = this.state.user;
      socket.emit('change:name', { name : newName}, (result) => {
          if(!result) {
              return alert('error: name change not allowed');
          }
          let {users} = this.state;
          let index = users.indexOf(oldName);
          users.splice(index, 1, newName);
          this.setState({users, user: newName});
      });
  },

  render() {
      return (
          <div>
              <userList
                  users={this.state.users}
              />
              <MessageList
                  messages={this.state.messages}
              />
              <MessageForm
                  onMessageSubmit={this.handleMessageSubmit}
                  user={this.state.user}
              />
              <ChangeNameForm
                  onChangeName={this.handleChangeName}
              />
          </div>
      );
  }
});


React.render(<ChatApp/>, document.getElementById('app'));