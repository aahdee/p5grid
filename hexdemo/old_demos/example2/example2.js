var boardRadius = 4;
var size;
var hexes = [];
var mainLayout;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  background(25);
  size = Point(45, 45);
  mainLayout = hexLayout(pointyOrient, size);
  hexGenerateBoard(boardRadius, hexes);
}

function draw() {
  stroke("#A45287");
  fill(50, 50, 50, 50);
  rect(0, 0, width, height);
  push();
  translate(width / 2, height / 2);
  for (var i = 0; i < hexes.length; i++) {
    push();
    scale(Math.cos(frameCount / random(90, 100)));
    fill(color(66, 0, 43, 150));
    hexDraw(mainLayout, hexes[i]);
    pop();
  }
  pop();
}
