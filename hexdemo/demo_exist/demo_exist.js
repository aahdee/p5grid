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
}

function draw()
{
  stroke('#A45287');
  background(50);
  push();
  translate(width/2, height/2);
  drawHexesArray(mainLayout, hexes, '#42002B');
  pop();
}

function keyPressed()
{
  if (keyCode === LEFT_ARROW)
  {
    size.x -= 5;
    mainLayout = Layout(pointyOrient, size, originPixel);
  }
  else if (keyCode === RIGHT_ARROW)
  {
    size.x += 5;
    mainLayout = Layout(pointyOrient, size, originPixel);
  }
  else if (keyCode === UP_ARROW)
  {
    size.y += 5;
    mainLayout = Layout(pointyOrient, size, originPixel);
  }
  else if (keyCode === DOWN_ARROW)
  {
    size.y -= 5;
    mainLayout = Layout(pointyOrient, size, originPixel);
  }
}
