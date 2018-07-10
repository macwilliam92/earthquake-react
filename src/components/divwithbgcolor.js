import React, { Component } from 'react';

class DivWithGbColor extends Component {
  constructor(props) {
    super(props);
  }
  
  render(){
    return(
      <div className={ this.props.options[this.props.selected] }>{ this.props.selected }</div>
    )
  }
}

export default DivWithGbColor;