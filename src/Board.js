import React, { Component, PropTypes } from 'react';
import Row from './Row';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

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
      </div>
    );
  }

  renderDay(index){
    var name;
    switch(index){
      case 0: name ="Montag"; break;  
      case 1: name ="Dienstag"; break;  
      case 2: name ="Mittwoch"; break;  
      case 3: name ="Donnerstag"; break;  
      case 4: name ="Freitag"; break;  
    }
    return <div key={index} className="dayField">{name}</div>
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



