/*
* @name         index.js
* @description  This file execute the code of our web page
* @author     	Alba Gómez Segura
* @date         25/02/2017
* @version      1.0
*/

//global variables
var gameTable = Array();
var ctx;
var canvasWidth = 600;
var canvasHeight = 600;
var boxWidth;
var boxHeight;
var margin = 105;
var game;
var win = 0;
var numMines = 0;
var numRows;

var ctx_name;

//document load

/*
* @name         $(document).ready
* @description  This method starts the application and controls the functions for each button
* @date         25/02/2017
* @author       Alba Gómez Segura
* @version      1.0
* @params       none
* @return       none
*/
$(document).ready(function() {
	var person = prompt("Please enter your name", "Harry Potter");
	loadInitialData(person);
	$("#startButton").click(function() {
		loadGame();
	});

	$("#restartButton").click(function() {
		restartGame();
	});
});

/*
* @name         restartGame()
* @description  This method restarts the game
* @date         25/02/2017
* @author       Alba Gómez Segura
* @version      1.0
* @params       none
* @return       none
*/
function restartGame() {
	if (confirm("Do you want to play again?")) {
		location.reload();
		loadGame();
	} 
}

/*
* @name         loadInitialData()
* @description  This method fills the canvas variables
* @date         25/02/2017
* @author       Alba Gómez Segura
* @version      1.0
* @params       person: player's name
* @return       none
*/
function loadInitialData(person) {
	var c = document.getElementById("namePlayer");
	ctx_name = c.getContext("2d");
	ctx_name.font = "20px Georgia";
	ctx_name.fillText("Player's name: "+person,30,30);

	var canvas = document.getElementById("gameCanvas");
	ctx = canvas.getContext("2d");
	
	$('#gameCanvas').mousedown(function(event) {
		switch (event.which) {
			case 1:
				// alert('Left Mouse button pressed.');
				canvas.onclick = function(value) {
					game.sounds.click.play();        
					processRound(value);
				}
				break;
			case 2:
				alert('Middle Mouse button pressed.');
				break;
			case 3:
				// alert('Right Mouse button pressed.');
				canvas.oncontextmenu = function(value) {        
					markBomb(value);
					return false;
				}
				break;
			default:
				alert('You have a strange Mouse!');
		}
	});
}

/*
* @name         processRound()
* @description  This method controls the functions for each canvas' position
* @date         25/02/2017
* @author       Alba Gómez Segura
* @version      1.0
* @params       cursorValue: box's position in the canvas
* @return       none
*/
function processRound(cursorValue) {
	var x = cursorValue.pageX;
	var y = cursorValue.pageY-margin-50; //substracts margin to the Y position
	var posX = Math.floor(x/boxWidth-0.06); // col
	var posY = Math.floor(y/boxHeight-0.06); // row
	result = game.processRound(posY, posX, numRows);
	switch (result) {
		case 0:
			game.sounds.win.play();
			alert("You win!");
			break;
		case 1:
			game.sounds.lose.play();
			alert("You lose!");
			break;
		case 2:
			break;
		default:
			break;
	}
}

/*
* @name         markBomb()
* @description  This method marks with a flag when the user selects a box with mouse's right button
* @date         25/02/2017
* @author       Alba Gómez Segura
* @version      1.0
* @params       cursorValue: box's position in the canvas
* @return       none
*/
function markBomb(cursorValue) {
	var x = cursorValue.pageX;
	var y = cursorValue.pageY-margin-50; //substracts margin to the Y position
	var posX = Math.floor(x/boxWidth-0.06); // col
	var posY = Math.floor(y/boxHeight-0.06); // row
	result = game.markBomb(posY, posX);
}

/*
* @name         loadGame()
* @description  This method picks the input numbers from width and height boxes, then uses those valors to generate an array with Box 					objects. Finally, calls the paint function to draw on canvas
* @date         25/02/2017
* @author       Alba Gómez Segura
* @version      1.0
* @params       none
* @return       none
*/
function loadGame() {
	//resets the canvas and the game table
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	gameTable = [];
	
	//picks measures and validates it
	numRows = $("#numRows").val();
	if (numRows == null || numRows == "" || isNaN(numRows) ||
			numRows < 4 || numRows > 30) numRows = 10;
	numRows = Math.floor(numRows);
	boxWidth = canvasWidth/numRows;
	boxHeight = canvasHeight/numRows;
	
	numMines = Math.floor(Math.pow(numRows,2)/6.4);
	
	//generates the game table
	for (var i=0; i < numRows; i++) {
		gameTable[i] = []; 
		for (var j=0; j< numRows; j++) {
			var b = new Box();
			b.construct(j*boxHeight, i*boxWidth, boxWidth, boxHeight, "#424949");
			b.paint();
			gameTable[i][j] = b;
		}
	}

	var i = 0;
	while (i < numMines) {
		var_x = Math.ceil(Math.random() * (numRows-1));
		var_y = Math.ceil(Math.random() * (numRows-1));
		if (gameTable[var_x][var_y].getMine() == false) {
			gameTable[var_x][var_y].setMine(true);
			i++;
		}
	}

	game = new Game(gameTable);
}
