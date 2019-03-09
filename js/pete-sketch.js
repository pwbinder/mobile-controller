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
   // console.log(sketchWidth);
    //console.log(sketchHeight);
}

function resetCanvasSize() {
    sketchWidth = canvasDiv.offsetWidth;
    sketchHeight = canvasDiv.offsetHeight;
    resizeCanvas(sketchWidth,sketchHeight)
}

