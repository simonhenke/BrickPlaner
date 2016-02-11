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
        <div className="user">☺</div>
        <div className="fields">
          {fields}
        </div>
      </div>
    );
  }

  renderField(index) {
    const rowContent = this.props.content;
    const rowIndex = this.props.rowIndex;
    const fieldContent = rowContent[index];
    const child1 = fieldContent[0] ? <Brick type={fieldContent[0]} x={index} y={rowIndex}/> : null;
    const child2 = fieldContent[1] ? <Brick type={fieldContent[1]} x={index} y={rowIndex}/> : null;

    return (

        <BoardField key={index} fieldIndex={index} rowIndex={rowIndex}>
          {child1}
          {child2}
        </BoardField>
    
    );
  }
}

/*
Row.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.number.isRequired
    )
  ).isRequired
};*/