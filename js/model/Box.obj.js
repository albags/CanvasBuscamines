/* @BoxObject()
* @author: Alba Gómez Segura
* @date: 25/02/2017
* @description: Object box
* @Attributes:
        id;
        x;
        y;
        width: 
        height; 
        color; 
        mine;
        numberMines;
        imageObj;
        imageObj2;
        click;
        flag;
* @methods:
*       construct
*       set's and get's foor each attribute
*       paint
*       addTextMines
*       addBomb
*       addFlag
*/

this.Box = function() {
    this.id;
    this.x;
    this.y;
    this.width;
    this.height;
    this.color;
    this.mine;
    this.numberMines;
    this.imageObj;
    this.imageObj2;
    this.click;
    this.flag;
    
    //constructor
    this.construct = function(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.mine = false;
        this.numberMines = "";
        this.imageObj = new Image();
        this.imageObj.src = 'images/bomb.png';
        this.imageObj2 = new Image();
        this.imageObj2.src = 'images/bandera.ico';
        this.click = false;
        this.flag = false;
    }
    
    //accessors
    this.getX = function() {return this.x;}
    this.getY = function() {return this.y;}
    this.getWidth = function() {return this.width;}
    this.getHeight = function() {return this.height;}
    this.getColor = function() {return this.color;}
    this.getMine = function() {return this.mine;}
    this.getNumberMines = function() {return this.numberMines;}
    this.getClick = function() {return this.click;}
    this.getFlag = function() {return this.flag;}
    
    this.setX = function(x) {this.x = x;}
    this.setY = function(y) {this.y = y;}
    this.setWidth = function(width) {this.width = width;}
    this.setHeight = function(height) {this.height = height;}
    this.setColor = function(color) {this.color = color;}
    this.setMine = function(mine) {this.mine = mine;}
    this.setNumberMines = function(numberMines) {this.numberMines = numberMines;}
    this.setClick = function(click) {this.click = click;}
    this.setFlag = function(flag) {this.flag = flag;}
    
    this.paint = function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width-1, this.height-1);
    }

    this.addTextMines  = function() {
        ctx.font="20px Georgia";
        ctx.fillStyle = "red";
        ctx.fillText(this.numberMines, this.x+(this.width/2), this.y+(this.height/2));
    }

    this.addBomb = function () {
        ctx.drawImage(this.imageObj, this.x, this.y, this.width, this.height);
    }

    this.addFlag = function () {
        ctx.drawImage(this.imageObj2, this.x, this.y, this.width, this.height);
    }
}


