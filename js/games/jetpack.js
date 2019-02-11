let Application = PIXI.Application,
      Container = PIXI.Container,
      loader = PIXI.loader,
      resources = PIXI.loader.resources,
      Graphics = PIXI.Graphics,
      TextureCache = PIXI.utils.TextureCache,
      Sprite = PIXI.Sprite,
      Text = PIXI.Text,
      TextStyle = PIXI.TextStyle;

  
  //Create a Pixi Application
  let app = new PIXI.Application({ 
    width: 800,         // default: 800
    height: 600,        // default: 600
    antialias: true,    // default: false
    transparent: false, // default: false
    resolution: 1       // default: 1
  }
);

  //Add the canvas that Pixi automatically created for you to the HTML document
  document.body.appendChild(app.view);
  app.renderer.view.style.position = "absolute";
  app.renderer.view.style.display = "block";
  app.renderer.autoResize = true;
  app.renderer.resize(window.innerWidth, window.innerHeight);


  loader
    .add("images/flappy.json")
    .load(setup);
  //Define any variables that are used in more than one function
  let cat, state, pillar, pillar2, pillar3, pillar4, pillar5, pillar6, id, Score, count;

  var lives = '';

  function setup() {
    gameScene = new Container();
    app.stage.addChild(gameScene);

    id = resources["images/flappy.json"].textures;

    let background = PIXI.Texture.fromImage("daysky.png");
    daysky = new PIXI.Sprite(background);
    gameScene.addChild(daysky);
    daysky.width = app.screen.width;
    daysky.height = app.screen.height;
   
    pillar = new Sprite(id["pillar4.png"]);
    pillar.width = 90;
    pillar.height = 650;
    pillar.x = app.screen.width + 520;
    pillar.y = 375; 
    gameScene.addChild(pillar);

    pillar3 = new Sprite(id["pillar4.png"]);
    pillar3.width = 90;
    pillar3.height = 650;
    pillar3.x = app.screen.width;
    pillar3.y = 375; 
    gameScene.addChild(pillar3);

    pillar4 = new Sprite(id["pillar4.png"]);
    pillar4.width = 90;
    pillar4.height = 650;
    pillar4.x = app.screen.width;
    pillar4.y = -400;
    gameScene.addChild(pillar4);


    pillar5 = new Sprite(id["pillar4.png"]);
    pillar5.width = 90;
    pillar5.height = 650;
    pillar5.x = app.screen.width + 1040;
    pillar5.y = 375; 
    gameScene.addChild(pillar5);

    pillar6 = new Sprite(id["pillar4.png"]);
    pillar6.width = 90;
    pillar6.height = 650;
    pillar6.x = app.screen.width + 1040;
    pillar6.y = -400;
    gameScene.addChild(pillar6);
  

    pillar_2 = new Sprite(id["pillar_2.png"]);
    pillar_2.width = 90;
    pillar_2.height = 650;
    pillar_2.x = app.screen.width + 520;
    pillar_2.y = -400;
    pillar_2.vx = 0;
    pillar_2.vy = 0;
    gameScene.addChild(pillar_2);

    cat = new Sprite(id["redbot.png"]);
    cat.width = 60;
    cat.height = 75;
    cat.x = app.screen.width/2;
    cat.y = app.screen.height/2; 
    cat.vx = 0;
    cat.vy = 0;
    gameScene.addChild(cat);

    player2 = new Sprite(id["redbot.png"]);
    player2.width = 60;
    player2.height = 75;
    player2.x = app.screen.width/2 + 150;
    player2.y = app.screen.height/2; 
    player2.vx = 0;
    player2.vy = 0;
    gameScene.addChild(player2);

    player3 = new Sprite(id["redbot.png"]);
    player3.width = 60;
    player3.height = 75;
    player3.x = app.screen.width/2 + 300;
    player3.y = app.screen.height/2; 
    player3.vx = 0;
    player3.vy = 0;
    gameScene.addChild(player3);

    player4 = new Sprite(id["redbot.png"]);
    player4.width = 60;
    player4.height = 75;
    player4.x = app.screen.width/2 - 150;
    player4.y = app.screen.height/2; 
    player4.vx = 0;
    player4.vy = 0;
    gameScene.addChild(player4);

    player5 = new Sprite(id["redbot.png"]);
    player5.width = 60;
    player5.height = 75;
    player5.x = app.screen.width/2 - 300;
    player5.y = app.screen.height/2; 
    player5.vx = 0;
    player5.vy = 0;
    gameScene.addChild(player5);

    player6 = new Sprite(id["redbot.png"]);
    player6.width = 60;
    player6.height = 75;
    player6.x = app.screen.width/2 - 450;
    player6.y = app.screen.height/2; 
    player6.vx = 0;
    player6.vy = 0;
    gameScene.addChild(player6); 


/*
    var Score = new PIXI.Text('Score');
    Score.x = 50;
    Score.y = 90;
app.stage.addChild(Score);
*/
//count = 0;

app.ticker.add(function() {

count += 0.025;
// update the text with a new string
//Score.text = 'Score: ' + lives;

});

    gameOverScene = new Container();
    app.stage.addChild(gameOverScene);

    gameOverScene.visible = false;
      let style = new TextStyle({
     fontFamily: "Futura",
      fontSize: 64,
      fill: "white"
    });
    message = new Text("The End!", style);
    message.x = 120;
    message.y = app.stage.height / 2 - 320;
    gameOverScene.addChild(message);

    

// ^new

    //Capture the keyboard arrow keys
    let left = keyboard(37),
        up = keyboard(38),
        right = keyboard(39),
        down = keyboard(40);
  
    //Up
    up.press = () => {
      cat.y += -20;
      cat.vx = 0;
      player2.y += -20;
      player3.y += -20;
      player4.y += -20;
      player5.y += -20;
      player6.y += -20;
    };
    up.release = () => {
      if (!down.isDown && cat.vx === 0) {
        cat.y -= 1;
        player2.y -= 1;
        player3.y -= 1;
        player4.y -= 1;
        player5.y -= 1;
        player6.y -=1;
        cat.vy = 0;
      }
    };
    //Set the game state
    state = play;   
    //Start the game loop 
    app.ticker.add(delta => gameLoop(delta));

  } //end setup

function gameLoop(delta){
    //Update the current game state:
    state(delta);
  }
function play(delta) {
  //Use the cat's velocity to make it move
  cat.x += cat.vx;
  cat.y += cat.vy; 


  if(hitTestRectangle(cat, pillar) || hitTestRectangle(cat, pillar_2) || 
      hitTestRectangle(cat, pillar3) || hitTestRectangle(cat, pillar4) || 
      hitTestRectangle(cat, pillar5) || hitTestRectangle(cat, pillar6)) {
    cat.visible = false;
    
    lives = 'player1' ;
    //state = end;
    //message.text = 'Score: ' + Math.floor(count);
    }
  
  if(hitTestRectangle(player2, pillar) || hitTestRectangle(player2, pillar_2) || 
      hitTestRectangle(player2, pillar3) || hitTestRectangle(player2, pillar4) || 
      hitTestRectangle(player2, pillar5) || hitTestRectangle(player2, pillar6)) {
    player2.visible = false;
    lives = 'player2' ;
    //state = end;
    //message.text = 'Score: ' + Math.floor(count);
    } 
  
  if(hitTestRectangle(player3, pillar) || hitTestRectangle(player3, pillar_2) || 
      hitTestRectangle(player3, pillar3) || hitTestRectangle(player3, pillar4) || 
      hitTestRectangle(player3, pillar5) || hitTestRectangle(player3, pillar6)) {
    player3.visible = false;
    lives = 'player3' ;
    //state = end;
    //message.text = 'Score: ' + Math.floor(count);
    }
  
  if(hitTestRectangle(player4, pillar) || hitTestRectangle(player4, pillar_2) || 
      hitTestRectangle(player4, pillar3) || hitTestRectangle(player4, pillar4) || 
      hitTestRectangle(player4, pillar5) || hitTestRectangle(player4, pillar6)) {
    player4.visible = false;
    lives = 'player4' ;
    //state = end;
    //message.text = 'Score: ' + Math.floor(count);
    }
  
  if(hitTestRectangle(player5, pillar) || hitTestRectangle(player5, pillar_2) || 
      hitTestRectangle(player5, pillar3) || hitTestRectangle(player5, pillar4) || 
      hitTestRectangle(player5, pillar5) || hitTestRectangle(player6, pillar6)) {
    player5.visible = false;
    lives = 'player5' ;
    //state = end;
    //message.text = 'Score: ' + Math.floor(count);
    }
  
  if(hitTestRectangle(player6, pillar) || hitTestRectangle(player6, pillar_2) || 
      hitTestRectangle(player6, pillar3) || hitTestRectangle(player6, pillar4) || 
      hitTestRectangle(player6, pillar5) || hitTestRectangle(player6, pillar6)) {
    player6.visible = false;
    lives = 'player6' ;
    //state = end;
    //message.text = 'Score: ' + Math.floor(count);
    }

  console.log(lives);
if( cat.visible == false && player2.visible == false && player3.visible == false && 
    player4.visible == false && player5.visible == false && player6.visible == false){
      state = end;
      message.text = 'Winner: ' + lives;
}

  
  if(cat.y >= app.screen.height){
    state = end;
    message.text = 'Score: ' + Math.floor(count);
  }


} 

function gravity() {
  requestAnimationFrame(gravity);
  var speed = 1;
 
  cat.y += 1;
  player2.y +=1;
  player3.y +=1;
  player4.y +=1;
  player5.y +=1;
  player6.y +=1;


if (count >= 70){ //70 
    speed = 1.5;  
  }
  if (count >= 120){ //70 
    speed = 2;  
  }
  if (count >= 160){ //70 
    speed = 2.5;  
  }

  pillar3.x -= speed;
  pillar4.x -=speed;
  pillar5.x -=speed;
  pillar6.x -= speed;
  pillar.x -= speed;
  pillar_2.x -= speed;
  restart();
}

gravity();

function restart(){
  if (pillar.x < 1 ){
    pillar.x += app.screen.width;
    pillar_2.x += app.screen.width;
    rand = Math.floor(Math.random()*270 + 250);
    pillar.y = rand;
    pillar_2.y = rand - 775; 
  }
  if (pillar3.x < 1 ){
    pillar3.x += app.screen.width;
    pillar4.x += app.screen.width;
    rand = Math.floor(Math.random()*270 + 250);
    pillar3.y = rand;
    pillar4.y = rand - 775; 
  }
  if (pillar5.x < 1 ){
    pillar5.x += app.screen.width;
    pillar6.x += app.screen.width;
    rand = Math.floor(Math.random()*270 + 250);
    pillar5.y = rand;
    pillar6.y = rand - 775; 
  }
}

function end() {
  gameScene.visible = false;
  gameOverScene.visible = true;
}

function contain(sprite, container) {
  let collision = undefined;
  //Left
  if (sprite.x < container.x) {
    sprite.x = container.x;
    collision = "left";
  }
  //Top
  if (sprite.y < container.y) {
    sprite.y = container.y;
    collision = "top";
  }
  //Right
  if (sprite.x + sprite.width > container.width) {
    sprite.x = container.width - sprite.width;
    collision = "right";
  }
  //Bottom
  if (sprite.y + sprite.height > container.height) {
    sprite.y = container.height - sprite.height;
    collision = "bottom";
  }
  //Return the `collision` value
  return collision;
}

function hitTestRectangle(r1, r2) {
  //Define the variables we'll need to calculate
  let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;
  //hit will determine whether there's a collision
  hit = false;
  //Find the center points of each sprite
  r1.centerX = r1.x + r1.width / 2; 
  r1.centerY = r1.y + r1.height / 2; 
  r2.centerX = r2.x + r2.width / 2; 
  r2.centerY = r2.y + r2.height / 2; 
  //Find the half-widths and half-heights of each sprite
  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;
  //Calculate the distance vector between the sprites
  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;
  //Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;
  //Check for a collision on the x axis
  if (Math.abs(vx) < combinedHalfWidths) {
    //A collision might be occuring. Check for a collision on the y axis
    if (Math.abs(vy) < combinedHalfHeights) {
      //There's definitely a collision happening
      hit = true;
    } else {
      //There's no collision on the y axis
      hit = false;
    }
  } else {
    //There's no collision on the x axis
    hit = false;
  }
  //`hit` will be either `true` or `false`
  return hit;
};

  //The `keyboard` helper function
  function keyboard(keyCode) {
    var key = {};
    key.code = keyCode;
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