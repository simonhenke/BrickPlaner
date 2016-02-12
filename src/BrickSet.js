import React, { Component, PropTypes } from 'react';
import BoardField from './BoardField';
import Brick from './Brick';

export default class BrickSet extends Component {
  render() {
    var bricks = this.renderBricks();
    return (
      <div className="brickset">

       
        <span className="brickset-title">Add Projects to your Ressource Planer</span>
         <div className="separator"></div>
        {bricks}
      </div>
    );
  }

  renderBricks(){
    var brickElements = [];
    for(var i=0; i< this.props.bricks.length; i++){
      brickElements.push(<div className="brickset-element" key={i}>
        <Brick isNew data={this.props.bricks[i]} />
        <Brick isNew data={this.props.halfbricks[i]} />

        </div>);
    }

    // Fill up with empty brickset-elements to prevent unwanted flexbox 
    // if not 5, 10, 15 .. elements
    for(var i=0; i< (5 - this.props.bricks.length % 5); i++){
      brickElements.push(<div className="brickset-element" key={"fillup"+i}></div>);
    }
    return brickElements;
  }
}

