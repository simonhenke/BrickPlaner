let content = [];
let observer = null;

content.push(newRowContent());
content.push(newRowContent());
content[0][2] = ["#8BC34A"];
content[0][3] = ["#FF9800"];

function newRowContent(){
	var row = [];
	for(var i=0; i<5; i++){
		var day = [];
		row.push(day);
	} 
	return row;
}

function emitChange() {
  observer(content);
}

export function observe(o) {
  if (observer) {
    throw new Error('Multiple observers not implemented.');
  }
  observer = o;
  emitChange();
}

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
  // add the item to the new position
  content[y][x].push(item.type);
  console.log("moved "+item.type);
  // remove it from its old position
  // doing this by removing the first occurance of a brick of the moved type
  var old_field = content[item.old_y][item.old_x]
  var moved = old_field.filter(function(bricktype){
  	return bricktype === item.type;
  })[0];
  old_field.splice( old_field.indexOf(moved), 1 );

  printContent();
  emitChange();
}

export function switchBrickStyle(x, y, type) {
	var fieldContent = content[y][x];
	if(fieldContent.length < 2){
		fieldContent.push(type);
		emitChange();
	}
	else if(fieldContent[0] == fieldContent[1]){
		fieldContent.splice(1, 1);
		emitChange();
	}
}

export function removeBrick(x, y, type) {
	var fieldContent = content[y][x];
	var toDelete = fieldContent.filter(function(bricktype){
  		return bricktype === type;
  	})[0];
  	fieldContent.splice( fieldContent.indexOf(toDelete), 1 );
  	emitChange();
}






