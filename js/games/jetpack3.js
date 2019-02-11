var myGamePiece;
var myObstacles = [];
var startingPlatform;
var myScore;
var players;
var gameInProgress = false;
var jump;

//call this to start the game, right now is called onload
function startGame() {
    // myGamePiece = new Component(30, 30, "red", 10, 120);
    // myGamePiece.gravity = 0.05;
    // playerTwo = new Component(30, 30, "blue", 10, 120);
    // playerTwo.gravity = 0.1;
    createPlayers();
    myScore = new Component("30px", "Consolas", "black", 280, 40, "text");
   
    //myObstacles[0].y += 1;
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

//consists of all objects of the game - players, score, obstacles
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
        this.hitBottom();
    }
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
            this.speedY = 0;
        }
    }
    this.crashWithTop = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) && (mytop > otherbottom) && (myleft > otherright) && (myright > otherleft)) {
            crash = false;
        }
        return crash;
    }
    this.crashWithBottom = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if (mytop > otherbottom) {
            crash = false;
        }
        return crash;
    }
    this.crashWithLeft = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if (myleft < otherright) {
            crash = false;
        }
        return crash;
    }
    this.crashWithRight = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if (myright > otherleft) {
            crash = false;
        }
        return crash;
    }
}

function createPlayers() {
    players  = new Array(6);

    for (var i = 0; i < players.length; i++) {
        players[i] = new Component(30, 30, "red", 120 + (40*(i+1)), 0);

        players[i].name = 1 + i;
        players[i].gravity = 0.05;

        // players[i].x = 50*(i+1);
        // players[i].y = screen.height/2;

        //players[i].draw();
        console.log(players[i].name);
    }
}

function updateGameArea() {

    //print starting platform
    //var startPlatY = 0;

   
    //startingPlatform = new Component(myGameArea.canvas.width, 10, "blue", 0, startPlatY);
    //startingPlatform.y += 1;
    //startingPlatform.update();

    //var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    var x, y, width, gap, minWidth, maxWidth, minGap, maxGap;

    //myObstacles.push(new Component(width, 10, "blue", 0, y));

    for (i = 0; i < myObstacles.length; i += 1) {
        for (j = 0; j < players.length; j++) {
            if (players[j].crashWithTop(myObstacles[i])) {
                console.log(players[j].crashWithTop(myObstacles[i]));
                console.log(players[j].speedY);
                players[j].speedY = ((players[j].speedY)*-1);
                //players[j].gravity = 0;
                //players[j].gravitySpeed = ((players[j].speedY)*-1);
                //accelerate(players[j], myObstacles[i].speedY - 2); 
                //players[j].gravitySpeed = myObstacles[i].speedY; 
                //jump = false;
            } 
            // if (players[j].crashWithTop(myObstacles[i])) {
            //     players[j].speedY = myObstacles[i].speedY;
            // }
            // if (players[j].crashWithLeft(myObstacles[i])) {

            // }
            // if (players[j].crashWithBottom(myObstacles[i])) {

            // }
        }
    }
    // for (i = 0; i < players.length; i++) {
    //     if (players[i].crashWith) {
    //         //accelerate(players[0],-5);
    //         console.log(jump);
    //     } else {
            
    //         console.log(jump);
    //     }
    // }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    
    
    

    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        y = myGameArea.canvas.height;
        startY = 0;
        // minHeight = 20;
        // maxHeight = 200;
        maxWidth = myGameArea.canvas.width - (myGameArea.canvas.width/7);
        minWidth = myGameArea.canvas.width - (myGameArea.canvas.width/7)*6;
        //height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        
        minGap = 150;
        maxGap = 300;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        //myObstacles.push(new Component(10, height, "green", x, 0));
        if (myObstacles.length < 1) {
            startY = 100;
            width = myGameArea.canvas.width;
            myObstacles.push(new Component(width, 10, "blue", 0, startY));
        } else {
            startY = 0;
            width = Math.floor(Math.random()*(maxWidth-minWidth+1)+minWidth);//
            myObstacles.push(new Component(width, 10, "green", 0, startY));
            //myObstacles.push(new Component(10, x - height - gap, "green", x, height + gap));
            myObstacles.push(new Component(x - width - gap, 10, "green", width + gap, startY));
            //console.log(maxWidth);
        }
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        //myObstacles[i].x += -1;
        myObstacles[i].y += 1;
        myObstacles[i].update();
    }
    myScore.text="SCORE: " + myGameArea.frameNo;
    myScore.update();
    for (i = 0; i < players.length; i++) {
        players[i].newPos();
        players[i].update();
        // myGamePiece.newPos();
        // myGamePiece.update();
        // playerTwo.newPos();
        // playerTwo.update();
    }
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function accelerate(obj, n) {
    obj.speedY = n;
   // obj.gravity = n;
}

function moveLeft(obj, n) {
    obj.speedX = n*-1;
}

function moveRight(obj, n) {
    obj.speedX = n;
}

