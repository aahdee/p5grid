var boardRadius = 4;
var size;
var originHex;
var hexes = [];
var mainLayout;

function setup()
{
  createCanvas(windowWidth, windowHeight);
  background(25);
  size = Point(30,30);
  originPixel = Point(0, 0);
  mainLayout = hexLayout(pointyOrient, size, originPixel)
  hexGenerateBoard(boardRadius, hexes, Hex(0,0,0));
  originHex = Hex(0,0,0);
}

function draw()
{
  stroke('#A45287');
  background(25);
  push();
  translate(width/2, height/2);
  rotate(Math.sin(frameCount/30));
  //scale(Math.cos(frameCount/60));
  for (var i = 0; i < hexes.length; i++)
  {
    scale(Math.sin(frameCount/60));
    fill("#42002B")
    hexDraw(mainLayout, hexes[i]);
  }
  pop();
}
