import React from 'react';
import ReactDOM from 'react-dom';

import Board from './Board';
import { observe } from './Game';

const rootEl = document.getElementById('root');

observe(content =>
	ReactDOM.render(
	  <Board content={content} />,
	  rootEl
	)
);


$(function() {
  var bricksInSet = $(".brickset .brick"); 
  bricksInSet.map(function(index,brick){
	  var name = $(brick).find(".brickName");
	  var nameLength = $(name).text().length;
	  var fontsize; 
	  if(nameLength <= 3){
	  	fontsize = "24px";
	  }else if(nameLength <= 6){
	  	fontsize = "20px";
	  }else{
	  	fontsize = "16px";
	  }
	  $(name).css("font-size",fontsize);

  });
});
