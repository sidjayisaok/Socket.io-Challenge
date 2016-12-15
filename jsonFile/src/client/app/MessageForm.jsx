import React from 'react';
import {render} from 'react-dom';

class MessageForm extends React.Component{

  getInitialState() {
      return {text: ''};
  },

  handleSubmit(info) {
      info.preventDefault();
      var message = {
          user : this.props.user,
          text : this.state.text
      }
      this.props.onMessageSubmit(message); 
      this.setState({ text: '' });
  },

  changeHandler(info) {
      this.setState({ text : info.target.value });
  },

  render() {
      return(
          <div className='message_form'>
              <h3>Write New Message</h3>
              <form onSubmit={this.handleSubmit}>
                  <input
                      onChange={this.changeHandler}
                      value={this.state.text}
                  />
              </form>
          </div>
      );
  }
};

export default MessageForm;
