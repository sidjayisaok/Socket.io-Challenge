import React from 'react';
import {render} from 'react-dom';

class Message extends React.Component{
  render() {
      return (
          <div className="message">
              <strong>{this.props.user} :</strong> 
              <span>{this.props.text}</span>        
          </div>
      );
  }
};

export default Message;