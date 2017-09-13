/* @BoxObject()
* @author: Alba Gómez Segura
* @date: 25/02/2017
* @description: Object box
* @Attributes:
        gameTable;
* @methods:
*       sounds
*       markBomb
*       processRound
*       gameOver
*       checkResult
*/


this.Game = function(gameTable) {
	//properties
	this.gameTable = gameTable;

	/*
	* @name         sounds
	* @description  This method controls the game's sound depending on what is happening
	* @date         25/02/2017
	* @author       Alba Gómez Segura
	* @version      1.0
	* @params       none
	* @return       none
	*/
	this.sounds = {
		click : new Howl({urls: ["sound/click.wav"]}),
		win : new Howl({urls: ["sound/win.wav"]}),
		lose : new Howl({urls: ["sound/lose.mp3"]})
	}
	
	/*
	* @name         markBomb
	* @description  This method marks or unmarks the box with a bomb is the box is not already clicked
	* @date         25/02/2017
	* @author       Alba Gómez Segura
	* @version      1.0
	* @params       posX, posY
	* @return       none
	*/
	this.markBomb = function(posX, posY) {
		if (this.gameTable[posX][posY].getClick() == true) {
			return -1;
		} 
		if (this.gameTable[posX][posY].getFlag() == true) {
			this.gameTable[posX][posY].setFlag(false);
			this.gameTable[posX][posY].setColor("#424949");
			this.gameTable[posX][posY].paint();
		} else {
			this.gameTable[posX][posY].setFlag(true);
			this.gameTable[posX][posY].addFlag();
		}
	}
	
	/*
	* @name         processRound
	* @description  This method controls the functions for each canvas' position
	* @date         25/02/2017
	* @author       Alba Gómez Segura
	* @version      1.0
	* @params       posX, posY, numRows
	* @return       none
	*/
	this.processRound = function(posX, posY, numRows) {
		this.sounds.click.play();
		if (posX < 0 || posY < 0 || posX >= numRows || posY >= numRows) {
			return -1;
		}
		if (this.gameTable[posX][posY].getClick() == true || this.gameTable[posX][posY].getFlag() == true) {
			return -1;
		}
		var mine = this.gameTable[posX][posY].getMine();
		if (mine) {
			return this.gameOver();
		} else {
			this.gameTable[posX][posY].setColor("#99A3A4");
			this.gameTable[posX][posY].paint();
			this.gameTable[posX][posY].setClick(true);
			this.gameTable[posX][posY].setFlag(true);
			win++;
			if (this.checkResult(posX, posY) == 0) {
				this.processRound(posX-1, posY-1, numRows);
				this.processRound(posX, posY-1, numRows);
				this.processRound(posX+1, posY-1, numRows);
				this.processRound(posX+1, posY, numRows);
				this.processRound(posX+1, posY+1, numRows);
				this.processRound(posX, posY+1, numRows);
				this.processRound(posX-1, posY+1, numRows);
				this.processRound(posX-1, posY, numRows);
			} else {
				this.gameTable[posX][posY].setNumberMines(this.checkResult(posX, posY));
				this.gameTable[posX][posY].addTextMines();
			}
			if (win == Math.pow(numRows, 2) - numMines) {
				return 0;
			} else {
				return 2;
			}
		} 

	}

	/*
	* @name         gameOver
	* @description  When the game is over this method finds all the bombs and blocks all the boxes.
	* @date         25/02/2017
	* @author       Alba Gómez Segura
	* @version      1.0
	* @params       none
	* @return       none
	*/
	this.gameOver = function() {
		for (var i=0; i<this.gameTable.length; i++) {
			for (var j=0; j<this.gameTable[i].length; j++) {
				if (gameTable[i][j].getMine() == true) {
					gameTable[i][j].addBomb();
				}
				gameTable[i][j].setFlag(true);
				gameTable[i][j].setClick(true);
			}
		}
		win = 0;
		return 1;
	}
	
	/*
	* @name         checkResult
	* @description 	This method checks if there is any bomb in the box pressed.
	* @date         25/02/2017
	* @author       Alba Gómez Segura
	* @version      1.0
	* @params       none
	* @return       none
	*/
	this.checkResult = function(col, row) {
		var minesCount = 0;
		try {
			if (this.gameTable[col-1][row-1].getMine() == true) {
				minesCount++;
			}
		} catch (e) {
			minesCount = minesCount;
		}
		try {
			if (this.gameTable[col][row-1].getMine() == true) {
				minesCount++;
			}
		} catch (e) {
			minesCount = minesCount;
		}
		try {
			if (this.gameTable[col+1][row-1].getMine() == true) {
				minesCount++;
			}
		} catch (e) {
			minesCount = minesCount;
		}
		try {
			if (this.gameTable[col+1][row].getMine() == true) {
				minesCount++;
			}
		} catch (e) {
			minesCount = minesCount;
		}
		try {
			if (this.gameTable[col+1][row+1].getMine() == true) {
				minesCount++;
			}
		} catch (e) {
			minesCount = minesCount;
		}
		try {
			if (this.gameTable[col][row+1].getMine() == true) {
				minesCount++;
			}
		} catch (e) {
			minesCount = minesCount;
		}
		try {
			if (this.gameTable[col-1][row+1].getMine() == true) {
				minesCount++;
			}
		} catch (e) {
			minesCount = minesCount;
		}
		try {
			if (this.gameTable[col-1][row].getMine() == true) {
				minesCount++;
			}
		} catch (e) {
			minesCount = minesCount;
		}
		
		return minesCount;
	}
}


