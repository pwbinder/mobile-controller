var players;
var gameInProgress = false;
var words = [];

function startGame() {

    createPlayers();

    myGameArea.start();
    gameInProgress = true;
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = screen.width;
        this.canvas.height = screen.height;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function Component(width, height, color, x, y, type) {
    this.name;
    this.type = type;
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        //this.hitBottom();
    }

    this.speak = function(txt) {
        words.push(new Component(90, 90, "black", this.x, this.y, "text"));
        words.text = txt;
    }
}

function createPlayers() {
    console.log('Player created');
    players  = new Array(6);

    for (var i = 0; i < players.length; i++) {
        players[i] = new Component(30, 30, "red", 100, 120 + (40*(i+1)));

        players[i].name = roomMembers[i];
        players[i].gravity = 0;

        console.log(players[i].name);
    }
}

function updateGameArea() {

    myGameArea.clear();
    myGameArea.frameNo += 1;
    
    for (i = 0; i < players.length; i++) {
        players[i].newPos();
        players[i].update();
    }
    for (i = 0; i < words.length; i++) {
        words[i].update();
    }
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function move(obj, velX, velY) {
    obj.speedX = velX;
    obj.speedY = velY;
}

function speak(obj) {
    obj.speak("Arf Arf!");
}