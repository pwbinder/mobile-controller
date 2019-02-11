var canvasWidth = 320;
var canvasHeight = 500;
var gLoop;

game = document.getElementById('game');

context = c.getContext('2d');

game.width = width;
game.height = height;

//this function clears the canvas so that it looks as if objects are
//moving
var clear = function() {
    context.fillStyle = '#d0e7f9';
    //set active color to blue

    //UPDATE - as 'Ped7g' noticed - using clearRect() in here is useless, we cover whole surface of the canvas with blue rectangle two lines below. I just forget to remove that line
    //ctx.clearRect(0, 0, width, height);
    //clear whole surface
    ctx.beginPath();
    //start drawing
    ctx.rect(0, 0, width, height);
    //draw rectangle from point (0, 0) to
    //(width, height) covering whole canvas
    ctx.closePath();
    //end drawing
    ctx.fill();
    //fill rectangle with active
    //color selected before
}

/**
 * Drawing clouds
 */
var howManyCircles = 10, 

//clouds array
circles = [];

for (var i = 0; i < howManyCircles; i++) 
  circles.push([Math.random() * width, Math.random() * height, Math.random() * 100, Math.random() / 2]);
//add information about circles into
//the 'circles' Array. It is x & y positions, 
//radius from 0-100 and transparency 
//from 0-0.5 (0 is invisible, 1 no transparency)

var DrawCircles = function(){
  for (var i = 0; i < howManyCircles; i++) {
    context.fillStyle = 'rgba(255, 255, 255, ' + circles[i][3] + ')';
//white color with transparency in rgba
    context.beginPath();
    context.arc(circles[i][0], circles[i][1], circles[i][2], 0, Math.PI * 2, true);
//arc(x, y, radius, startAngle, endAngle, anticlockwise)
//circle has always PI*2 end angle
    context.closePath();
    context.fill();
  }
};

/**
 * Move the clouds down a given number of pixels
 */

var MoveCircles = function(deltaY){
    for (var i = 0; i < howManyCircles; i++) {
      if (circles[i][1] - circles[i][2] > height) {
  //the circle is under the screen so we change
  //informations about it 
        circles[i][0] = Math.random() * width;
        circles[i][2] = Math.random() * 100;
        circles[i][1] = 0 - circles[i][2];
        circles[i][3] = Math.random() / 2;
      } else {
  //move circle deltaY pixels down
        circles[i][1] += deltaY;
      }
    }
  };

/**
 * Game Loop
 */
var GameLoop = function () {
    clear();
    MoveCircles(5);
    DrawCircles();
    makePlayers();
    gLoop = setTimeout(GameLoop, 1000/50);
}
GameLoop();

/**
 * Player
 */
function Player(memberName) {

    //var players = new Array(6);
    //create new object based on function and assign 
    //what it returns to the 'player' variable
    
    var that = this;
    //'that' will be the context now
    
    //attributes
    that.name = memberName;
    that.image = new Image();
    //that.image.src = "/images/flappy/redbot.png";
    //create new Image and set it's source to the 
    //'angel.png' image I upload above
    
    that.width = 65;
    //width of the single frame
    that.height = 95;
    //height of the single frame
    
    that.X = 0;
    that.Y = 0;
    //X&Y position
    
    //methods 
    that.setPosition = function(x, y){
    that.X = x;
    that.Y = y;
    }

    that.draw = function(){
        try {
            context.drawImage(that.image, 0, 0, that.width, 
                that.height, that.X, that.Y, that.width, that.height);
        //cutting source image and pasting it into destination one, 
        //drawImage(Image Object, source X, source Y, source Width, 
        //source Height, destination X (X position), destination Y 
        //(Y position), Destination width, Destination height)
        } catch (e) {
        //sometimes, if character's image is too big and will not load 
        //until the drawing of the first frame, Javascript will throws 
        //error and stop executing everything. To avoid this we have to 
        //catch an error and retry painting in another frame. It is 
        //invisible for the user with 50 frames per second.
        }
    }
}
//we immediately execute the function above and 
//assign its result to the 'player' variable
//as a new object 

//player.setPosition(~~((width-player.width)/2),  ~~((height - player.height)/2));
//our character is ready, let's move it 
//to the center of the screen,
//'~~' returns nearest lower integer from
//given float, equivalent of Math.floor()

function makePlayers() {
    var players = new Array(6);

    for (var i = 0; i < n; i++) {
        players[i] = new Player();

        players[i].name = 1 + i;

        players[i].X = 50*(i+1);
        players[i].Y = screen.height/2;

        players[i].draw();
    }
}
