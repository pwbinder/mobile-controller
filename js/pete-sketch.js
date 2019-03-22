var canvasDiv = document.getElementById('sketch-canvas');
var sketchWidth = canvasDiv.offsetWidth;
var sketchHeight  = canvasDiv.offsetHeight;

function setup() {

   
    var sketchCanvas = createCanvas(sketchWidth, sketchHeight);
    sketchCanvas.parent("sketch-canvas");
    sketchCanvas.style('margin','0');
    console.log(sketchWidth);
    console.log(sketchHeight);
    detectDevice();
    connectToGame();
}

function draw() {
    //background(255);
    


}

class Cursor {
    
    constructor(cursorX, cursorY, cursorW, cursorH, cursorColor) {
        this.name;
        //this.type = type;
        this.cursorW = cursorW;
        this.cursorH = cursorH;
        this.speedX = 0;
        this.speedY = 0;
        this.cursorX = cursorX;
        this.cursorY = cursorY;
        this.cursorColor = cursorColor;
        this.pCursorX = cursorX;
        this.pCursorY = cursorY;
    }
    
    display() {
        fill(this.cursorColor);
        rect(this.cursorX, this.cursorY, this.cursorW, this.cursorH);
    }

    move(velX, velY) {
        this.cursorX += velX;
        this.cursorY += velY;
    }

    paint() {
        line(this.pCursorX, this.pCursorY, this.cursorX, this.cursorY);
    }
}

//create a new player to be added to the sketch
function createPlayers() {
    console.log('Player created');
    players = new Array();

    for(var i = 0; i < players.length; i++) {

        //create a new cursor
        players[i] = new Cursor(30, 30, "red", 100, 120 + (40*(i+1)))

        //add player to the array
        players[i].name = roomMembers[i];

        console.log(players[i].name);
    }
}


//resize canvas to the current height/width of the div
function resetCanvasSize() {
    sketchWidth = canvasDiv.offsetWidth;
    sketchHeight = canvasDiv.offsetHeight;
    resizeCanvas(sketchWidth,sketchHeight)
}

