var size = [1920, 1080];
var ratio = size[0] / size[1];
var stage = new PIXI.Stage(0x333333, true);
var renderer = PIXI.autoDetectRenderer(size[0], size[1], null);
document.body.appendChild(renderer.view);
var texture = new PIXI.RenderTexture.create();
r1 = new PIXI.Graphics();
r1.beginFill(0x00ffff);
r1.drawRect(0, 0, 100, 100);
r1.endFill();
texture.render(r1);
var block = new PIXI.Sprite(texture);
block.position.x = 100;
block.position.y = 100;
block.anchor.x = .5;
block.anchor.y = .5;
stage.addChild(block);
requestAnimFrame(animate);
resize();
function animate() {
    requestAnimFrame(animate);
    block.rotation += .01;
    renderer.render(stage);
}
function resize() {
    if (window.innerWidth / window.innerHeight >= ratio) {
        var w = window.innerHeight * ratio;
        var h = window.innerHeight;
    } else {
        var w = window.innerWidth;
        var h = window.innerWidth / ratio;
    }
    renderer.view.style.width = w + 'px';
    renderer.view.style.height = h + 'px';
}
window.onresize = resize;
