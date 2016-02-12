let content = [];

initialiseContent();

let observer = null;
// ------------------------

/* Event Handling */

function emitChange() {
  localStorage["content"] = JSON.stringify(content);
  console.log(JSON.stringify(content));
  observer(content);
}

export function observe(o) {
  if (observer) {
    throw new Error('Multiple observers not implemented.');
  }
  observer = o;
  emitChange();
}

// ------------------------

function initialiseContent(){


	var storedData;
	if(localStorage["content"]){
		storedData = JSON.parse(localStorage["content"]);
	}

	if(storedData){
		content = storedData;
		console.log("test");
	}else{
		content = JSON.parse('[[[],[],[],[],[]],[[],[],[],[{"name":"NIN","color":"#03A9F4","weight":2}],[]],[[],[{"name":"Sed Diam Nonumy","color":"#4CAF50","weight":1}],[],[],[]],[[],[],[],[{"name":"another project","color":"#FF9800","weight":1}],[]]]');
	}
}


/* Create an empty row (array with 5 empty arrays) */ 
function newRowContent(){
	var row = [];
	for(var i=0; i<5; i++){
		var day = [];
		row.push(day);
	} 
	return row;
}

/* Initialises and returns an array of all possible brick objects */
export function getAvailableBricks(){
	// Colors by http://www.materialui.co/colors
	var bricks = [];
	bricks.push({
		name:"Lorem Ipsum",
		color:"#9C27B0",
		weight:2
	});

	bricks.push({
		name:"Dolor Sit",
		color:"#3F51B5",
		weight:2
	});

	bricks.push({
		name:"NIN",
		color:"#03A9F4",
		weight:2
	});

	bricks.push({
		name:"Short",
		color:"#009688",
		weight:2
	});

	bricks.push({
		name:"Sed Diam Nonumy",
		color:"#4CAF50",
		weight:2
	});

	bricks.push({
		name:"XYZ",
		color:"#CDDC39",
		weight:2
	});

	bricks.push({
		name:"another project",
		color:"#FF9800",
		weight:2
	});

	bricks.push({
		name:"A",
		color:"#FF5722",
		weight:2
	});

	return bricks;
}

export function getAvailableHalfBricks(){
	var halfbricks = [];
	getAvailableBricks().map(function(brick){
	  brick.weight = 1;
	  halfbricks.push(brick);
	});
	return halfbricks;
}

/* ! outdated ! helper function for printing 3 dim. array to console */
function printContent(){
	for(var y=0; y < content.length; y++){
		var log = "["
		for(var x=0; x<content[y].length; x++){

			log+= " ";		

			if(content[y][x][0] && ! content[y][x][1]){
				log += "["+content[y][x][0].substring(0,1)+"]";
			}else if(content[y][x][1]){
				log += "["+content[y][x][0].substring(0,1) + "," + content[y][x][1].substring(0,1) + "]";
			}else{
				log += "[-]";
			}
		}
		log+=" ]";
		console.log(log);
	}
	console.log("-------------------------------");
}

export function moveBrick(x, y, item) {
 
  console.log("moved "+item.data.name);

  var old_field = content[item.old_y][item.old_x] 
  old_field.splice( item.brickIndex, 1 ); // remove item from old pos

  var sameField = x == item.old_x && y == item.old_y;

  addBrick(x,y,item,sameField);

  
}

export function switchBrickStyle(x, y, brickIndex) {
	var fieldContent = content[y][x];
	var brick = fieldContent[brickIndex];
	brick.weight = brick.weight == 1 ? 2 : 1;

	// if bricks are on this field, remove the other one
	if(fieldContent.length == 2){
		var otherBrickIndex =  brickIndex == 0 ? 1 : 0;
		fieldContent.splice(otherBrickIndex, 1);
	}
	emitChange();
}

export function removeBrick(x, y, brickIndex) {
	var fieldContent = content[y][x];
	var toDelete = fieldContent[brickIndex];
  	fieldContent.splice( fieldContent.indexOf(toDelete), 1 );
  	emitChange();
}

export function addBrick(x, y, item, sameField){
	
  if(item.data.weight == 2 && !sameField){
  	content[y][x].splice(0, 2); // remove other bricks if large brick is placed
  }
  else if(content[y][x].length == 2 && !sameField){
  	content[y][x].splice(0, 1); // remove first brick if the field was full
  }
  if(content[y][x].length == 1 && content[y][x][0].weight == 2){
  	content[y][x][0].weight = 1; // split a full brick if you place a small on him
  }

  content[y][x].push(item.data); // add item to new pos

  emitChange();
}






