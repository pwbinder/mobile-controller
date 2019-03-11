var canvasDiv = document.getElementById('sketch-canvas');
var sketchWidth = canvasDiv.offsetWidth;
var sketchHeight  = canvasDiv.offsetHeight;

function setup() {

   
    var sketchCanvas = createCanvas(sketchWidth, sketchHeight);
    sketchCanvas.parent("sketch-canvas");
    sketchCanvas.style('margin','0');
    console.log(sketchWidth);
    console.log(sketchHeight);
}

function draw() {
    background(0);

    
}

function Cursor(cursorW, cursorH, cursorColor, cursorX, cursorY) {
    this.name;
    this.type = type;
    this.cursorW = cursorW;
    this.cursorH = cursorH;
    this.speedX = 0;
    this.speedY = 0;
    this.cursorX = cursorX;
    this.cursorY = cursorY;
    
    this.update = function() {
    
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

