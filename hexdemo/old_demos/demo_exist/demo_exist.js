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
  originPixel = Point(width/2, height/2);
  mainLayout = hexLayout(pointyOrient, size, originPixel)
  hexGenerateBoard(boardRadius, hexes, Hex(0,0,0));
  originHex = Hex(0,0,0);
}

function draw()
{
  stroke('#A45287');
  background(50);
  push();
  translate(width/2, height/2);
  fill("#42002b");
  hexDrawArray(mainLayout, hexes);
  pop();
}

function keyPressed()
{
  if (keyCode === LEFT_ARROW)
  {
    size.x -= 5;
    mainLayout = hexLayout(pointyOrient, size, originPixel);
  }
  else if (keyCode === RIGHT_ARROW)
  {
    size.x += 5;
    mainLayout = hexLayout(pointyOrient, size, originPixel);
  }
  else if (keyCode === UP_ARROW)
  {
    size.y += 5;
    mainLayout = hexLayout(pointyOrient, size, originPixel);
  }
  else if (keyCode === DOWN_ARROW)
  {
    size.y -= 5;
    mainLayout = hexLayout(pointyOrient, size, originPixel);
  }
}
