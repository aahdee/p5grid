var boardRadius = 4;
var size;
var originHex;
var hexes = [];
var mainLayout;

function setup()
{
  createCanvas(windowWidth, windowHeight);
  background(25);
  angleMode(degrees);
  size = Point(30,30);
  originPixel = Point(0, 0);
  mainLayout = Layout(pointyOrient, size, originPixel)
  generateBoard(boardRadius, hexes, Hex(0,0,0));
  originHex = Hex(0,0,0);
  //fft = new p5.FFT();
}

function draw()
{
  stroke('#A45287');
  push();
  translate(width/2, height/2);
  rotate(Math.sin(frameCount/30));
  scale(Math.cos(frameCount/60))
  drawHexesArray(mainLayout, hexes, '#42002B')
  pop();
}
