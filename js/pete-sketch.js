var canvasDiv = document.getElementById('sketch-canvas');
var sketchWidth = canvasDiv.offsetWidth;
var sketchHeight  = canvasDiv.offsetHeight;

//values for each cursor
var velX = 0;
var velY = 0;
var newVelX;
var newVelY;
var isMovingX;
var isMovingY;

function setup() {

   
    var sketchCanvas = createCanvas(sketchWidth, sketchHeight);
    sketchCanvas.parent("sketch-canvas");
    sketchCanvas.style('margin','0');
    
    detectDevice();
    connectToGame();
}

function draw() {

    //if the cursor is moving, move cursor
    if (isMovingX === true || isMovingY === true) {

        //move cursor
        roomMembers[username].move(newVelX, newVelY);

        //reset background
        background(255);

        //display user at new location
        // for (var i = 0; i < roomMembers.length; i++) {
        //     roomMembers[i].display();
        // }
        roomMembers.forEach(function(item){
            console.log(item);
            roomMembers[item].display();
        });
        
        //display lines
        for (var i = 0; i < paintings.length; i++) {
            paintings[i].display();
        }
    }
    
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
        rectMode(CENTER);
        rect(this.cursorX, this.cursorY, this.cursorW, this.cursorH);
    }

    move(velX, velY) {
        this.cursorX += velX;
        this.cursorY += velY;
    }

    paint(lineNo) {
        strokeWeight(10);
        paintings[lineNo] = new Painting(
            this.cursorX,
            this.cursorY,
            this.pCursorX,
            this.pCursorY
        );
        strokeWeight(1);
    }
}

//lines drawn are stored into this class
class Painting {

    constructor(x, y, pX, pY) {
        this.x = x;
        this.y = y;
        this.pX = pX;
        this.pY = pY;
    }

    display() {
        line(this.x, this.y, this.pX, this.pY);
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

