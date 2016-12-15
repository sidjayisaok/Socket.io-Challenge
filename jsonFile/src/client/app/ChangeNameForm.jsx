import React from 'react';
import {render} from 'react-dom';

class ChangeNameForm extends React.Component{
  getInitialState() {
      return {newName: ''};
  },

  onKey(info) {
      this.setState({ newName : info.target.value });
  },

  handleSubmit(e) {
      e.preventDefault();
      var newName = this.state.newName;
      this.props.onChangeName(newName);    
      this.setState({ newName: '' });
  },

  render() {
      return(
          <div className='change_name_form'>
              <h3> Change Name </h3>
              <form onSubmit={this.handleSubmit}>
                  <input
                      onChange={this.onKey}
                      value={this.state.newName}
                  />
              </form>  
          </div>
      );
  }
};

export default ChangeNameForm;