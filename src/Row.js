import React, { Component, PropTypes } from 'react';
import BoardField from './BoardField';
import Brick from './Brick';

export default class Row extends Component {
  render() {
    const fields = [];
    for(let i = 0; i<5; i++){
      fields.push(this.renderField(i));
    }
    return (
      <div className="row">
        <div className="user">{this.getUserIdentifier()}</div>
        {fields}
      </div>
    );
  }

  getUserIdentifier(){
    switch(this.props.rowIndex){
      case 0: return "D"; break;
      case 1: return "Y"; break;
      case 2: return "R"; break;
      case 3: return "C"; break;
    }
  }

  renderField(index) {
    const rowContent = this.props.content;
    const rowIndex = this.props.rowIndex;
    const fieldContent = rowContent[index];
    const child1 = fieldContent[0] ? <Brick data={fieldContent[0]} x={index} y={rowIndex} index={0} /> : null;
    const child2 = fieldContent[1] ? <Brick data={fieldContent[1]} x={index} y={rowIndex} index={1} /> : null;

    return (

        <BoardField key={index} fieldIndex={index} rowIndex={rowIndex}>
          {child1}
          {child2}
        </BoardField>
    
    );
  }
}

