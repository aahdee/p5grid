var boardRadius = 4;
var size;
var originHex;
var hexes = [];
var mainLayout;

function setup()
{
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  background(25);
  size = Point(45,45);
  originPixel = Point(0, 0);
  mainLayout = Layout(pointyOrient, size, originPixel)
  generateBoard(boardRadius, hexes, Hex(0,0,0));
  originHex = Hex(0,0,0);
}

function draw()
{
  stroke('#A45287');
  fill(50,50,50,50);
  rect(0,0,width,height);
  push();
  translate(width/2, height/2);
  for(var i = 0; i < hexes.length; i++)
  {
    push();
    scale(Math.cos(frameCount/random(90,100)));
    drawHex(mainLayout, hexes[i], color(66,0,43,150));
    pop();
  }
  pop();
}
