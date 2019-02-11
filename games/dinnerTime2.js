//function runDinnerTime() {

//Aliases
let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Graphics = PIXI.Graphics,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite,
    Text = PIXI.Text,
    TextStyle = PIXI.TextStyle;

let dinnerTime = new PIXI.Application({ 
    width: 800,         // default: 800
    height: 600,        // default: 600
    antialias: true,    // default: false
    transparent: false, // default: false
    resolution: 1       // default: 1
    }
);

var stage = dinnerTime.stage;
var brush = new PIXI.Graphics();

var players = new Array(roomMembers.length);

dinnerTime.renderer.view.style.position = "absolute";
dinnerTime.renderer.autoResize = true;
dinnerTime.renderer.resize(window.innerWidth, window.innerHeight);

PIXI.loader.add("GrassPlane", "images/eating/grass.png")
PIXI.loader.add("DirtPlane", "images/eating/dirt.png")
//PIXI.loader.add("t3", "../images/eating/right_green.png")
PIXI.loader.load(setupDinnerTime);

// class Cow extends PIXI.Sprite {

//     constructor(name, x, y) {
//         this.name = name;
//         this.score = 0;
//     }

//     moveBrush(moving) {
//         if (moving) {
//             brush.position.copy(this);

//         var pixels = dinnerTime.renderer.extract.pixels(renderTexture);
//         var count = 0;
//         for (var i = 0, len = pixels.length; i < len; i += 4) {
//             if (pixels[i] === 255) {
//                 ++count;
//             }
//         }

//         this.score = (100 * count / (renderTexture.width * renderTexture.height)).toFixed(2);
//        // End.text = 'Progress: ' + this.score + '%';
//         //console.log('Progress: ' + progress + '%');

//         dinnerTime.renderer.render(brush, renderTexture, false, null, false);
//         }
//     }
//     movePlayer(velX, velY) {
//         this.x = this.x + velX;
//         this.Y = this.y + velY;
//     }
// }

function setupDinnerTime(loader, resources) {

    //styling for text
    let style = new TextStyle({
        fontFamily: "Futura",
         fontSize: 64,
         fill: "white"
       });


    /**
     * Start Screen
     */
    gameStartContainer = new Container();
    
    dinnerTime.stage.addChild(gameStartContainer);

    //create a background image for our instruction screen
    let instructionSceneImage = PIXI.Texture.fromImage('images/instructionalPages/DinnerTimeInstructions.png');

    //load it into a pixi sprite
    instructionScene = new PIXI.Sprite(instructionSceneImage);
    instructionScene.width = dinnerTime.screen.width; //screen width
    instructionScene.height = dinnerTime.screen.height; //screen height
    gameStartContainer.addChild(instructionScene);
    

    /**
     * Game Over Scene
     */
    gameOverContainer = new Container();
    dinnerTime.stage.addChild(gameOverContainer);

    gameOverContainer.visible = false;
    
    message = new Text("The End!", style);
    message.x = 120;
    message.y = dinnerTime.stage.height / 2 - 320;

    win = new Text("The End!", style);
    win.x = 120;
    win.y = dinnerTime.stage.height / 2 - 20;

    //end progress for each player
    var End = new PIXI.Text('Player 1: 0.00% ', {
        fontWeight: 'bold',
        //fill: '#cc00ff',
        align: 'center',
        stroke: '#FFFFFF',
        strokeThickness: 3
    });
    End.x = 50;
    End.y = 200;

    var End2 = new PIXI.Text('Player 2: 0.00% ', {
        fontWeight: 'bold',
        //fill: '#cc00ff',
        align: 'center',
        stroke: '#FFFFFF',
        strokeThickness: 3
    });
    End2.x = 50;
    End2.y = 250;

    gameOverContainer.addChild(win, message, End,End2);

    /**
     * Game Scene
     */
    var Timer = new PIXI.Text('Timer:', {
        fontWeight: 'bold',
        //fill: '#cc00ff',
        align: 'center',
        stroke: '#FFFFFF',
        strokeThickness: 3
    });
    Timer.x = 800;
    Timer.y = 25;

    gameContainer = new Container();
    dinnerTime.stage.addChild(gameContainer);
    gameContainer.visible = false;

    //the grass that the player eats
    var grassPlane = new PIXI.Sprite(resources["GrassPlane"].texture);
    gameContainer.addChild(grassPlane);
    grassPlane.width = dinnerTime.screen.width;
    grassPlane.height = dinnerTime.screen.height;

    //dirt that is revealed
    var dirtPlane = new PIXI.Sprite(resources["DirtPlane"].texture)
    gameContainer.addChild(dirtPlane);
	dirtPlane.width = dinnerTime.screen.width;
    dirtPlane.height = dinnerTime.screen.height;

    var renderTexture = PIXI.RenderTexture.create(dinnerTime.screen.width, dinnerTime.screen.height);
    var renderTextureSprite = new PIXI.Sprite(renderTexture);

    gameContainer.addChild(renderTextureSprite);
    dirtPlane.mask = renderTextureSprite;

    //timer stuff
    count = 300;
    dinnerTime.ticker.add(function(){
        count -= 0.025;
        Timer.text = 'Timer: ' + Math.floor(count);
    });

    /**
     * Game Progression
     */
    if(count < 0){
        gameContainer.visible = false;
        gameOverContainer.visible = true;
     }
    //  if (progress > progress2){
    //      message.text = "Player 1 Won!"
    //    }
    //  if (progress < progress2){
    //      message.text = "Player 2 Won!"
    //    }

    /**
     * Player Creation
     */
    
    let texture = PIXI.Texture.fromImage("images/eating/cow0.png");

    for(var i = 0; i < players.length; i++) {

        //create new cows with the names received in the packets
        //players[i] = new Cow(roomMembers[i]);
        players[i] = new PIXI.Sprite(texture);

        //testing these outside the constructor first
        players[i].name = roomMembers[i]
        players[i].x = 50 + i*50;
        players[i].y = screen.width/2 ; //+ (50*-1*(i+1))
        players[i].w = 120;
        players[i].h = 90;
        
        gameContainer.addChild(players[i]);
        console.log(player[i].name + " added.");
    }  

    state = play;

        
} //end of setup

function gameLoop(delta){
    //Update the current game state:
    state(delta);
  }
function play(delta) {
    for(var i = 0; i < players.length; i++) {
        players[i].x += players[i].vx;
        players[i].y += players[i].vy;
    }

}
function start(){
    gameStartContainer.visible = false;
    gameContainer.visible = true;
}

