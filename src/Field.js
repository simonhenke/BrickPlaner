import React, { Component } from 'react';

export default class Field extends Component {
  render() {
    return <div className="field">
    	{this.props.children}
    </div>;
  }
}
