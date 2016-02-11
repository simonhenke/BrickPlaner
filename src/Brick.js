import React, { Component, PropTypes } from 'react';
import { ItemTypes } from './Constants';
import { DragSource } from 'react-dnd';
import { switchBrickStyle } from './Game';
import { removeBrick } from './Game';

const brickSource = {
  beginDrag(props) {
    return {
    	type: props.type,
    	old_x: props.x,
    	old_y: props.y
    };
  },

  endDrag(props, monitor) {
    if (!monitor.didDrop()) {
    	removeBrick(props.x, props.y, props.type);
    }
  }

};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class Brick extends Component {

  doubleClickHandler(){
  	switchBrickStyle(this.props.x, this.props.y, this.props.type);
  }

  render() {
  	const { connectDragSource, isDragging } = this.props;
  	var _class = "brick draggable"
  	_class = isDragging ? _class+" isDragging" : _class;
  	const bg = this.props.type;
    return connectDragSource(
	    <div className={_class}
	    	 style={{background:bg}}
	    	 onDoubleClick={this.doubleClickHandler.bind(this)}>
	    </div>
    ,{ dropEffect: 'move' });
  }
}

Brick.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

export default DragSource(ItemTypes.BRICK, brickSource, collect)(Brick);