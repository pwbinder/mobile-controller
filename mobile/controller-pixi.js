let app = new PIXI.Application(1980, 1080);
var stage = new PIXI.Container();
var graphics = new PIXI.Graphics();

var joystick; 

app.autoResize = true;
app.stage.interactive = true;
app.stage.clearBeforeRender = true;

//window.onresize = checkForResize();

var w = window.innerWidth;
var h = window.innerHeight;

//function(event) {
//     var w = window.innerWidth;
//     var h = window.innerHeight;

//     app.view.style.width = w + "px";
//     app.view.style.height = h + "px";

//     app.stage.resize(w,h);
//     console.log('resized');
// }






function init() {
    console.log("init() successfully called.");
    document.body.appendChild(app.view);
    generateShapes();
}

function generateShapes() {
    

    graphics.lineStyle(0);
    graphics.beginFill(0xFFFF0B, 0.5);
    graphics.drawCircle(window.innerWidth/2, window.innerHeight/2,100);
    graphics.endFill();
    app.renderer.backgroundColor = 0xFF00FF;

    app.stage.addChild(graphics);
}




//sets the app size to the window
function checkForResize() {
    //var ratio = Math.min(w / app.renderer.width, h / app.renderer.height);
    app.stage.resize(window.innerWidth, window.innerHeight);
    // app.stage.position.set(app.renderer.width/2, app.renderer.height/2);
    // app.stage.scale.set(ratio, ratio);
    // app.stage.pivot.set(w/2, w/2);
    //graphics.position.x = (app.stage.width / 2) - (app.stage.width / 2);
    //graphics.position.y = (stage.height / 2) - (stage.height / 2);   

    // joystick = new VirtualJoystick({
    //     mouseSupport	: true,
    //     stationaryBase	: true,
    //     limitStickTravel : true,
    //     stickRadius : window.innerHeight/2,
    //     baseX		: window.innerWidth/3 - 50,
    //     baseY		: window.innerHeight/2
    // });
    //generateShapes();
    // graphics.beginFill();
    // graphics.moveTo(window.innerWidth/2, window.innerHeight/2);
    // graphics.endFill();
    console.log('resizing...');

    //
}



