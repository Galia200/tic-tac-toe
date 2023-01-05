var player = 'X';
var choice= new Array();
choice['X']=[0,0,0,0,0,0,0,0,0];
choice['O']=[0,0,0,0,0,0,0,0,0];

var the_total_number_of_player_turns=0;

score= new Array();
score['X'] = 0;
score['O'] = 0;
var when_i_win =  [
	[1,1,1,0,0,0,0,0,0], 
	[0,0,0,1,1,1,0,0,0], 
	[0,0,0,0,0,0,1,1,1], 
	[1,0,0,1,0,0,1,0,0], 
	[0,1,0,0,1,0,0,1,0], 
	[0,0,1,0,0,1,0,0,1], 
	[1,0,0,0,1,0,0,0,1], 
	[0,0,1,0,1,0,1,0,0], 
];


function generateGame(){
	player='X';
	choice['X']=[0,0,0,0,0,0,0,0,0];
	choice['O']=[0,0,0,0,0,0,0,0,0];

	the_total_number_of_player_turns=0;
	document.getElementById('game-board').innerHTML = '';
	var ATTRIBUTE_unique=0;
	for (i=0; i<3; i++){
		for (col=0; col<3; col++) {
			var button = document.createElement("input");
			button.setAttribute("value", ' ');
			button.setAttribute("name", 'grid');
			button.setAttribute("class", 'grid-cell');
			button.setAttribute("type", 'button');
			button.setAttribute("onclick", "markCheck(this)");
			button.setAttribute("id",ATTRIBUTE_unique);
			document.getElementById('game-board').appendChild(button);
			ATTRIBUTE_unique++;
		}
		var breakline = document.createElement("br");
			document.getElementById('game-board').appendChild(breakline);
	}

}

function markCheck(obj){
	obj.value = player;
	the_total_number_of_player_turns++;
	var cabin=Number(obj.id);
	console.log('player' +player+'marked'+cabin);
	choice[player][cabin] = 1;

	checkPlayerHasAnyWinningPattern(choice[player]);
	if (player == 'X' ) {
		obj.setAttribute("class", 'green-player');
		player = 'O';
	} else {
		obj.setAttribute("class", 'red-player');
		player = 'X'

	}
	obj.setAttribute("disabled", 'disabled');


}
function checkPlayerHasAnyWinningPattern(selectionPlayer){
	 over=false;
	 for(var d=0; d < when_i_win.length; d++){
		console.log(selectionPlayer)
		console.log(when_i_win[d])
		over=calculation(selectionPlayer,when_i_win[d]);

			if(over===true){
				lockout();
				alert('Player '+player+' Won !!');
				SUpdate();
				break;
				
			}
		
	 }
		
			

		console.log('player X marked'+choice['X']);
		console.log('player O marked' +choice['O']);
		console.log(the_total_number_of_player_turns);
		console.log(over);

	if (the_total_number_of_player_turns ==9 && over === false){
		setTimeout(function(){
			alert('Game Draw!');
			}, 10);
			over = true;	
		}
	}
			
	



function calculation(player_selections, when_i_win){
	var win=0
		for (var j=0;j<9;j++){
			if(player_selections[j]+when_i_win[j]==2){
				win++;
			}
		}
		if(win==3){
			return true;
		}
	return false;
}

function lockout() {

	var elements = document.getElementsByClassName("grid-cell");
	for (var i = 0; i < elements.length; i++) {
	  elements[i].disabled =true;
	}
}
function SUpdate(){
	score[player]++;
	document.getElementById('score-'+player).innerHTML = score[player];
} 
function restartGame(){

	score['X'] = 0;
	document.getElementById('score-X').innerHTML = 0;
	score['O'] = 0;
	document.getElementById('score-O').innerHTML = 0;
}
