var boardRadius = 4;
var size;
var originHex;
var hexes = [];
var mainLayout;

function setup()
{
  createCanvas(windowWidth, windowHeight);
  background('#05282B');
  size = Point(30,30);
  originPixel = Point(width/2, height/2);
  mainLayout = hexLayout(pointyOrient, size, originPixel)
  hexGenerateBoard(boardRadius, hexes, Hex(0,0,0));
  originHex = Hex(0,0,0);
}

function draw()
{
  stroke('#601D37');
  push();
  translate(width/2, height/2);
  rotate(Math.sin(frameCount/30));
  scale(Math.cos(frameCount/60));
  hexDrawArray(mainLayout, hexes, '#6F6A22');
  pop();
}
