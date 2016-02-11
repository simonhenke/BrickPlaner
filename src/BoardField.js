/** Necessary Wrapper Class to perform the Drop Target Logic of a Field **/

import React, { Component, PropTypes } from 'react';
import Field from './Field';
import { ItemTypes } from './Constants';
import { DropTarget } from 'react-dnd';
import { moveBrick } from './Game';

const fieldTarget = {
  drop(props, monitor) {
    moveBrick(props.fieldIndex, props.rowIndex, monitor.getItem());
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class BoardField extends Component {
  render() {
    const { fieldIndex, rowIndex, connectDropTarget, isOver } = this.props;
    var _class ="boardField";
    _class = isOver ? _class+" isOver" : _class;

    return connectDropTarget(
      <div className={_class}>
        <Field>
          {this.props.children}
        </Field>
      </div>
    );
  }
}

BoardField.propTypes = {
  rowIndex: PropTypes.number.isRequired,
  fieldIndex: PropTypes.number.isRequired,
  isOver: PropTypes.bool.isRequired
};

export default DropTarget(ItemTypes.BRICK, fieldTarget, collect)(BoardField);


