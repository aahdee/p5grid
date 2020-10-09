var boardRadius = 5; //radius of tri grid
var size; //size of tris
var tris = [];
var mainLayout;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(50);
  size = Point(50, 50);
  originPixel = Point(0, 0);
  mainLayout = triLayout(verticalOrient, size);
  triGenerateBoard(boardRadius, tris);
}

function draw() {
  stroke("#ED8FA5");
  background(50);
  push();
  translate(width / 2, height / 2);
  triDrawArray(mainLayout, tris, "#BE73B2");
  pop();
}
