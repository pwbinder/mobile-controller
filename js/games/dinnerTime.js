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
document.body.appendChild(dinnerTime.view);
var stage = dinnerTime.stage;

dinnerTime.renderer.view.style.position = "absolute";
//dinnerTime.renderer.view.style.display = "block";
dinnerTime.renderer.autoResize = true;
dinnerTime.renderer.resize(window.innerWidth, window.innerHeight);

//prepare circle texture, that will be our brush
var brush = new PIXI.Graphics();
brush.beginFill(0xffffff);
brush.drawCircle(0, 0, 25);
brush.endFill();

PIXI.loader.add("GrassPlane", "grass.png")
PIXI.loader.add("DirtPlane", "dirt.png")
PIXI.loader.add("t3", "right_green.png")
//
PIXI.loader.load(setup);

let player1,state,player2, player3, player4, player5, player6, progress, progress2, startscene;

function setupDinnerTime(loader, resources) {
    //var roomMembers = 6; We get this from host.js
    var score = 0;
    var score2 = 0;
    
    gameStartScene = new Container();
    dinnerTime.stage.addChild(gameStartScene);

    let beginscene = PIXI.Texture.fromImage("DinnerTimeInstructions.png");
    startscene = new PIXI.Sprite(beginscene);
    gameStartScene.addChild(startscene);
    startscene.width = dinnerTime.screen.width;
    startscene.height = dinnerTime.screen.height;

    //gameStartScene.visible = false;

    gameOverScene = new Container();
    dinnerTime.stage.addChild(gameOverScene);

    gameOverScene.visible = false;
    let style = new TextStyle({
     fontFamily: "Futura",
      fontSize: 64,
      fill: "white"
    });
    message = new Text("The End!", style);
    message.x = 120;
    message.y = dinnerTime.stage.height / 2 - 320;
    win = new Text("The End!", style);
    win.x = 120;
    win.y = dinnerTime.stage.height / 2 - 20;
   
    gameOverScene.addChild(win, message);


    //actual game
    gameScene = new Container();
    dinnerTime.stage.addChild(gameScene);
    gameScene.visible = false;
 
    var background = new PIXI.Sprite(resources["GrassPlane"].texture);
    gameScene.addChild(background);
    background.width = dinnerTime.screen.width;
    background.height = dinnerTime.screen.height;

    var imageToReveal = new PIXI.Sprite(resources["DirtPlane"].texture)
    gameScene.addChild(imageToReveal);
	  imageToReveal.width = dinnerTime.screen.width;
    imageToReveal.height = dinnerTime.screen.height;

    var renderTexture = PIXI.RenderTexture.create(dinnerTime.screen.width, dinnerTime.screen.height);

    var renderTextureSprite = new PIXI.Sprite(renderTexture);
    gameScene.addChild(renderTextureSprite);
    imageToReveal.mask = renderTextureSprite;
    
    

    var Timer = new PIXI.Text('Timer:', {
        fontWeight: 'bold',
        //fill: '#cc00ff',
        align: 'center',
        stroke: '#FFFFFF',
        strokeThickness: 3
    });
    Timer.x = 800;
    Timer.y = 25;

    gameOverScene.addChild(End,End2);
    gameScene.addChild(Timer);

    count = 300;

    dinnerTime.ticker.add(function(){
    count -= 0.025;
    Timer.text = 'Timer: ' + Math.floor(count);
    console.log(progress);

  
});

    let texture = PIXI.Texture.fromImage("cow.png");

    //var players[roomMembers]
    player1 = new PIXI.Sprite(texture);
    player2 = new PIXI.Sprite(texture); 

    player1.x = 96;
    player1.y = 96;
    player1.vx = 0;
    player1.vy = 0;
    player1.width = 120;
    player1.height = 90;
    if(roomMembers > 1){
    player2 = new PIXI.Sprite(texture); 
    player2.x = 450;
    player2.y = 96;
    player2.vx = 0;
    player2.vy = 0;
    player2.width = 120;
    player2.height = 90;
    }
    if(roomMembers > 2){
    player3 = new PIXI.Sprite(texture); 
    player3.x = 804;
    player3.y = 96;
    player3.width = 120;
    player3.height = 90;
    gameScene.addChild(player3);
    }
    if (roomMembers > 3){
    player4 = new PIXI.Sprite(texture); 
    player4.x = player1.x;
    player4.y = 450;
    player4.width = 120;
    player4.height = 90;
    gameScene.addChild(player4);
    }
    if (roomMembers > 4){
    player5 = new PIXI.Sprite(texture);
    player5.x = player2.x;
    player5.y = player4.y;
    player5.width = 120;
    player5.height = 90;
    gameScene.addChild(player5);
    }
    if (roomMembers > 5){
        player6 = new PIXI.Sprite(texture);
        player6.x = player3.x;
        player6.y = player5.y;
        player6.width = 120;
        player6.height = 90;
        gameScene.addChild(player6);
    }

    //for loop, append all players
    gameScene.addChild(player1, player2);

    dinnerTime.stage.interactive = true;
    dinnerTime.stage.on('pointerdown', pointerDown);
    dinnerTime.stage.on('pointerup', pointerUp);
    dinnerTime.stage.on('pointermove', pointerMove);

    var dragging = false;

    function pointerMove(event) {
        if (dragging) {
            brush.position.copy(player1);

        var pixels = dinnerTime.renderer.extract.pixels(renderTexture);
                var count = 0;
                for (var i = 0, len = pixels.length; i < len; i += 4) {
                    if (pixels[i] === 255) {
                        ++count;
                    }
                }

                progress = (100 * count / (renderTexture.width * renderTexture.height)).toFixed(2);
                End.text = 'Progress: ' + progress + '%';
                //console.log('Progress: ' + progress + '%');

            dinnerTime.renderer.render(brush, renderTexture, false, null, false);
        }
    }

    function pointerMove2(event) {
        if (dragging) {
            brush.position.copy(player2);

        var pixels = dinnerTime.renderer.extract.pixels(renderTexture);
                var count = 0;
                for (var i = 0, len = pixels.length; i < len; i += 4) {
                    if (pixels[i] === 255) {
                        ++count;
                    }
                }

                 progress2 = (100 * count / (renderTexture.width * renderTexture.height)).toFixed(2);
                End2.text = 'Progress: ' + progress2 + '%';
                //console.log('Progress: ' + progress2 + '%');

            dinnerTime.renderer.render(brush, renderTexture, false, null, false);
        }
    }

    function pointerMove3(event) {
        if (dragging) {
            brush.position.copy(player3);

        var pixels = dinnerTime.renderer.extract.pixels(renderTexture);
                var count = 0;
                for (var i = 0, len = pixels.length; i < len; i += 4) {
                    if (pixels[i] === 255) {
                        ++count;
                    }
                }

               //  progress2 = (100 * count / (renderTexture.width * renderTexture.height)).toFixed(2);
               // End2.text = 'Progress: ' + progress2 + '%';
                //console.log('Progress: ' + progress2 + '%');

            dinnerTime.renderer.render(brush, renderTexture, false, null, false);
        }
    }

    function pointerMove4(event) {
        if (dragging) {
            brush.position.copy(player4);

        var pixels = dinnerTime.renderer.extract.pixels(renderTexture);
                var count = 0;
                for (var i = 0, len = pixels.length; i < len; i += 4) {
                    if (pixels[i] === 255) {
                        ++count;
                    }
                }

               //  progress2 = (100 * count / (renderTexture.width * renderTexture.height)).toFixed(2);
               // End2.text = 'Progress: ' + progress2 + '%';
                //console.log('Progress: ' + progress2 + '%');

            dinnerTime.renderer.render(brush, renderTexture, false, null, false);
        }
    }

    function pointerMove5(event) {
        if (dragging) {
            brush.position.copy(player5);

        var pixels = dinnerTime.renderer.extract.pixels(renderTexture);
                var count = 0;
                for (var i = 0, len = pixels.length; i < len; i += 4) {
                    if (pixels[i] === 255) {
                        ++count;
                    }
                }

               //  progress2 = (100 * count / (renderTexture.width * renderTexture.height)).toFixed(2);
               // End2.text = 'Progress: ' + progress2 + '%';
                //console.log('Progress: ' + progress2 + '%');

            dinnerTime.renderer.render(brush, renderTexture, false, null, false);
        }
    }

    function pointerMove6(event) {
        if (dragging) {
            brush.position.copy(player6);

        var pixels = dinnerTime.renderer.extract.pixels(renderTexture);
                var count = 0;
                for (var i = 0, len = pixels.length; i < len; i += 4) {
                    if (pixels[i] === 255) {
                        ++count;
                    }
                }

               //  progress2 = (100 * count / (renderTexture.width * renderTexture.height)).toFixed(2);
               // End2.text = 'Progress: ' + progress2 + '%';
                //console.log('Progress: ' + progress2 + '%');

            dinnerTime.renderer.render(brush, renderTexture, false, null, false);
        }
    }


    function pointerDown(event) {
        dragging = true;
        pointerMove(event);
        pointerMove2(event);
        pointerMove3(event);
        pointerMove4(event);
        pointerMove5(event);
        pointerMove6(event);
    }

    function pointerUp(event) {
        dragging = false;
    }

// end of mask render texture

// movement
    let left = keyboard(37),
        up = keyboard(38),
        right = keyboard(39),
        down = keyboard(40);
        w = keyboard(87);
        a = keyboard(65);
        s = keyboard(83);
        d = keyboard(68);
        enter = keyboard(13);

    left.press = () => {
      player1.x += -5;
      player1.vy = 0;
      dragging = true;
      pointerMove(event);
    };
    left.release = () => {
      if (!right.isDown && player1.vy === 0) {
        player1.vx = 0;
        dragging = true;
        pointerMove(event);
      }
    };
    up.press = () => {
      player1.y += -5;
      player1.vx = 0;
      dragging = true;
      pointerMove(event);
    };
    up.isDown = () => {
        dragging = true;
        pointerMove(event);
    }
    up.release = () => {
      if (!down.isDown && player1.vx === 0) {
        player1.vy = 0;
      }
    };
    right.press = () => {
      player1.x += 5;
      player1.vy = 0;
      dragging = true;
      pointerMove(event);
    };
    right.release = () => {
      if (!left.isDown && player1.vy === 0) {
        player1.vx = 0;
      }
    };
    down.press = () => {
      player1.y += 5;
      player1.vx = 0;
      dragging = true;
      pointerMove(event);
    };
    down.release = () => {
      if (!up.isDown && player1.vx === 0) {
        player1.vy = 0;
      }
    };
    
    w.press = () => {
      player2.y += -5;
      player2.vx = 0;
      dragging = true;
      pointerMove2(event);
    };
    w.release = () => {
      if (!s.isDown && player2.vx === 0) {
        player2.vy = 0;
      }
    };
    a.press = () => {
      player2.x += -5;
      player2.vy = 0;
        dragging = true;
        pointerMove2(event);
    };
    a.release = () => {
      if (!d.isDown && player2.vy === 0) {
        player2.vx = 0;
      }
    };
    s.press = () => {
      player2.y += 5;
      player2.vx = 0;
        dragging = true;
        pointerMove2(event);
    };
    s.release = () => {
      if (!w.isDown && player2.vx === 0) {
        player2.vy = 0;
      }
    };
    d.press = () => {
      player2.x += 5;
      player2.vy = 0;
        dragging = true;
        pointerMove2(event);
    };
    d.release = () => {
      if (!a.isDown && player2.vy === 0) {
        player2.vx = 0;
      }
    };
    enter.press = () => {
        start();
        count = 30;
        
    }
    state = play;

    dinnerTime.ticker.add(delta => gameLoop(delta));

    if(left.press == true){
        dragging = true;
        pointerMove(event);
    }

    

} // end of setup


function gameLoop(delta){
    //Update the current game state:
    state(delta);
  }
function play(delta) {
  player1.x += player1.vx;
  player1.y += player1.vy;
    player2.x += player2.vx;
    player2.y += player2.vy;

}
function start(){
    gameStartScene.visible = false;
    gameScene.visible = true;
}

function keyboard(keyCode) {
    var key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = event => {
      if (event.keyCode === key.code) {
        if (key.isUp && key.press) key.press();
        key.isDown = true;
        key.isUp = false;
      }
      event.preventDefault();
    };
    //The `upHandler`
    key.upHandler = event => {
      if (event.keyCode === key.code) {
        if (key.isDown && key.release) key.release();
        key.isDown = false;
        key.isUp = true;
      }
      event.preventDefault();
    };
    //Attach event listeners
    window.addEventListener(
      "keydown", key.downHandler.bind(key), false
    );
    window.addEventListener(
      "keyup", key.upHandler.bind(key), false
    );
    return key;
}

class Cow {

    constructor() {

    }

}