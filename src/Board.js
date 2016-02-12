import React, { Component, PropTypes } from 'react';
import Row from './Row';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { getAvailableBricks } from './Game';
import { getAvailableHalfBricks } from './Game';
import BrickSet from './BrickSet'

class Board extends Component {
  render() {
    const rows = [];
    const rowCount = this.props.content.length;
    for(let i = 0; i<rowCount; i++){
      rows.push(this.renderRow(i));
    }

    const days = [];
    for(let i = 0; i<5; i++){
      days.push(this.renderDay(i));
    }

    return (
      <div className="board">
        <div className="axisDays">
          {days}
        </div>
        {rows}

        <BrickSet 
          bricks={getAvailableBricks()} 
          halfbricks={getAvailableHalfBricks()} />
      </div>
    );
  }

  renderDay(index){
    var name;
    switch(index){
      case 0: name =["Montag","Mo"]; break;  
      case 1: name =["Dienstag","Di"]; break;  
      case 2: name =["Mittwoch","Mi"]; break;  
      case 3: name =["Donnerstag","Do"]; break;  
      case 4: name =["Freitag","Fr"]; break;  
    }
    return <div key={index} className="dayField">
             <span>{name[0]}</span>
             <span>{name[1]}</span>
            </div>
  }

  renderRow(index) {
    //const rowContent = [  [],["SlateGray"],[],["SlateGray","GoldenRod"],["GoldenRod"]  ];  
    const rowContent = this.props.content[index];
    return (
      <Row key={index} content={rowContent} rowIndex={index}/>
    );
  }
}

export default DragDropContext(HTML5Backend)(Board);



