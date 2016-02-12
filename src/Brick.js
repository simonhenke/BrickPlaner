import React, { Component, PropTypes } from 'react';
import { ItemTypes } from './Constants';
import { DragSource } from 'react-dnd';
import { switchBrickStyle } from './Game';
import { removeBrick } from './Game';

const brickSource = {
  beginDrag(props) {

    if(props.isNew){
      return {
        data: props.data,
        isNew: props.isNew
      };
    }else{
      return {
      	data: props.data,
      	old_x: props.x,
      	old_y: props.y,
        brickIndex: props.index
      };
    }
  },

  endDrag(props, monitor) {
    if (!monitor.didDrop() && ! props.isNew) {
    	removeBrick(props.x, props.y, props.index);
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
  	switchBrickStyle(this.props.x, this.props.y, this.props.index);
  }

  render() {
    var data = this.props.data;
  	const { connectDragSource, isDragging } = this.props;
  	var _class = "brick draggable"
  	_class = isDragging ? _class+" isDragging" : _class;
    _class = data.weight == 2 ? _class+" brick-full" : _class+" brick-half";
  	const bg = data.color;
    var name;
    if(this.props.isNew && data.weight == 2){
      name = <span className="brickName">{data.name}</span>;
    }

    return connectDragSource(
	    <div className={_class}
	    	 style={{background:bg}}
	    	 onDoubleClick={this.doubleClickHandler.bind(this)}>
         {name}
	    </div>
    ,{ dropEffect: 'move' });
  }
}

Brick.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

export default DragSource(ItemTypes.BRICK, brickSource, collect)(Brick);